import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import swal from "sweetalert";
import { OffreStage } from "../../../models/offre-stage.model";
import { OffreStageServiceService } from "../../../services/offre-stage-service.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { PopupOffreComponent } from "../../popups/popup-offre/popup-offre.component";

@Component({
  selector: "app-list-offres-stage",
  templateUrl: "./list-offres-stage.component.html",
  styleUrls: ["./list-offres-stage.component.scss"],
})
export class ListOffresStageComponent implements OnInit {
  listStage: OffreStage[] = [null];
  year: string;
  listYears: [] = [];
  searchText: string;
  etat: string;

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private offreStageServ: OffreStageServiceService,
    private router: Router,
    private modalService: NgbModal,
    public sharedService: SharedServiceService,
    private offreService: OffreStageServiceService
  ) {}

  ngOnInit() {
    this.etat = "0";
    this.getAllOffreStages(this.etat);
  }

  async getAllOffreStages(etat: string) {
    try {
      const { err, rows } =
        ((await this.offreStageServ.getAllOffreStages(etat)) as any) || [];
      if (!err) {
        this.listStage = rows;
      }
    } catch (error) {
      this.listStage = [];
    }
  }

  updateOffre(offre: OffreStage) {
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `MODIFICATION D'UNE OFFRE`;
    modalRef.componentInstance.id = Number(offre.id_offre_stage);
    modalRef.componentInstance.offreStage = { ...offre };
  }

  passerOffre(offre: OffreStage) {
    const cryptedData = this.sharedService.encryptData(JSON.stringify(offre));
    this.router.navigate(["/entreprise/modif"], {
      queryParams: { data: cryptedData },
    });
  }

  supprimerOffre(id_offre: string) {
    swal({
      title: "Voulez-vous supprimer l'offre?",
      buttons: ["cancel", "confirm"],
      closeOnEsc: true,
      closeOnClickOutside: true,
    }).then((result) => {
      if (result) {
        this.deleteOffre(id_offre);
      }
    });
  }
  AddOffre() {
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `NOUVELLE OFFRE`;
  }

  async showOffre(id_offre_stage: string) {
    this.getOneOffreDetails(id_offre_stage, (details) => {
      const modalRef = this.modalService.open(PopupOffreComponent);
      modalRef.componentInstance.title = `DETAILS OFFRE`;
      modalRef.componentInstance.id = Number(id_offre_stage);
      modalRef.componentInstance.show = true;
      modalRef.componentInstance.details = details[0];
    });
  }

  showAddOffre() {
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `NOUVELLE OFFRE`;
    modalRef.componentInstance.show = true;
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
    } catch (error) {}
  }

  changeEtat(event) {
    this.listStage = [null];
    const etat = event.nextId.toString();
    this.etat = etat;
    this.getAllOffreStages(etat);
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  async closeOpenOffre(id_offre_stage: number, id_etat_offre: string) {
    try {
      const { err, rows } =
        ((await this.offreStageServ.closeOpenOffre(
          id_offre_stage.toString(),
          id_etat_offre
        )) as any) || [];
      if (!err) {
        swal("Succès!", "Opération effctuée avec succès", "success");
        this.getAllOffreStages(this.etat);
      }
    } catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
    }
  }

  deleteOffre(id_offre_stage: string) {
    try {
      const { err } = this.offreService.deleteOffreStage(id_offre_stage) as any;
      if (!err) {
        swal("Succès!", "Suppression effectuée avec succès", "success");
        this.sharedService.reloadComponent();
      }
    } catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
    }
  }
}
