import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DemandeStageEntreprise } from "../../../models/demande-stage-entreprise";
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
  disabled: boolean = false;

  constructor(
    private offreStageServ: OffreStageServiceService,
    public sharedService: SharedServiceService,
    private modalService: NgbModal,
    private formCvServ:FormulaireCvServiceService
  ) {
    // this.year = new Date().getFullYear().toString();
  }

  ngOnInit() {
    // this.getAllOffreYears();

    this.getAllOffreStages();
  }

  // async getAllOffreYears(){
  //   try {
  //     const {err,rows}=await this.sharedService.getYears(0)as any||[];
  //     if(!err){
  //       this.listYears=rows;
  //     }

  //   } catch (error) {
  //     this.listYears=[];
  //     return error;

  //   }

  // }
  async getAllOffreStages() {
    try {
      const id_etudiant = "1";
      const { err, rows } =
        ((await this.offreStageServ.getAllOffreNonPostuleStages(
          id_etudiant
        )) as any) || [];
      if (!err) {
        this.listStage = rows;
      }
    } catch (error) {
      this.listStage = [];
      return error;
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
      return error;
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
      return error;
    }
  }

  // showFormPostule(id_offre_stage: string) {
  //   const modalRef = this.modalService.open(PopupOffreComponent);
  //   modalRef.componentInstance.title = `FORMULAIRE POSTULATION`;
  //   modalRef.componentInstance.id = Number(id_offre_stage);
  //   modalRef.componentInstance.show = true;
  // }


  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  async postulerOffre(idOffre : string) {
    const idEtudiant = "1";
    try {
      (await this.offreStageServ.updateOffrePostulations(idOffre)) as any;
      const demande = new DemandeStageEntreprise(idEtudiant, idOffre);
      const { err, rows } =
        (await this.formCvServ.addDemandeStageEntreprise(demande)) as any;
      if (!err) {
        swal("Succès!", "Postulation effectuée avec succès", "success");
        this.sharedService.reloadComponent()
      }
    } catch (error) {
      swal("Échec!", "Postulation non effectuée", "error");
      return error;
    }
  }
}
