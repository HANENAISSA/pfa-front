import { Component, OnInit } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormulaireCvServiceService } from "../../../services/formulaire-cv-service.service";
import  swal from "sweetalert";
import { OffreStage } from "../../../models/offre-stage.model";
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { PopupOffreComponent } from "../../popups/popup-offre/popup-offre.component";

@Component({
  selector: "app-list-offres-etudiant",
  templateUrl: "./list-offres-etudiant.component.html",
  styleUrls: ["./list-offres-etudiant.component.scss"],
})
export class ListOffresEtudiantComponent implements OnInit {
  listStage: OffreStage[] = [null];
  searchText;

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private modalService: NgbModal,

    public sharedService: SharedServiceService,

    public activeModal: NgbActiveModal,

    private offreStageServ: OffreStageServiceService,
    private formCvServ:FormulaireCvServiceService
  ) {
  }

  ngOnInit() {
    this.getAllOffreStages();
  }


  async getAllOffreStages() {
    try {
      const { err, rows } =
        ((await this.offreStageServ.getAllOffreNonPostuleStages(
        )) as any) || [];
      if (!err) {
        this.listStage = rows;
      }
    } catch (error) {
      this.listStage = [];
    }
  }
  async showOffre(id_offre_stage: string) {
    try {
      const { err } = (await this.offreStageServ.updateOffreVues(
        id_offre_stage
      )) as any;

      this.getOneOffreDetails(id_offre_stage, (data) => {
        const modalRef = this.modalService.open(PopupOffreComponent);
        modalRef.componentInstance.title = `DETAILS OFFRE`;
        modalRef.componentInstance.id_offre_stage = Number(id_offre_stage);
        modalRef.componentInstance.show = true;
        modalRef.componentInstance.role = "StudentPostuler";
        modalRef.componentInstance.details = data[0];
      });
    } catch (error) {
    }
  }

  async getOneOffreDetails(id_offre_stage: string, callback) {
    try {
      const { err, rows } =
        ((await this.offreStageServ.getOneOffreDetails(
          id_offre_stage
        )) as any) || [];
      if (!err) {
        callback(rows);
      }
    } catch (error) {
    }
  }
  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  async postulerOffre(idOffre : string) {
    swal({
      title: `Voulez-vous postuler dans cette offre ?`,
      buttons:['cancel','confirm'],
      closeOnEsc:true,
      closeOnClickOutside:true
    }).then(async(result) => {
      if(result){
        try {
          (await this.offreStageServ.updateOffrePostulations(idOffre)) as any;
          const { err, rows } =
            (await this.formCvServ.addDemandeStageEntreprise(idOffre)) as any;
          if (!err) {
            swal("Succès!", "Postulation effectuée avec succès", "success");
            this.sharedService.reloadComponent()
          }
        } catch (error) {
          swal("Échec!", error.error.message, "warning");
        }
      }
    });
    this.activeModal.dismiss();
   
  }
}
