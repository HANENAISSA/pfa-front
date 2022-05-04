import { Component, OnInit } from "@angular/core";
import { CandidatureEtudiantService } from "../../../services/candidature-etudiant.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import {  NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PopupDemandeComponent } from "../../popups/popup-demande/popup-demande.component";
import { PopupAccrefStageComponent } from "../../popups/popup-accref-stage/popup-accref-stage.component";

@Component({
  selector: "app-demande-candidatures",
  templateUrl: "./demande-candidatures.component.html",
  styleUrls: ["./demande-candidatures.component.scss"],
})
export class DemandeCandidaturesComponent implements OnInit {
  listCandidature = [null];
  listYears = [];
  searchText;
  etat: string;

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private candidatureService: CandidatureEtudiantService,
    public sharedService: SharedServiceService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    this.etat = "3";
  }

  ngOnInit() {
    this.getAllCandidature(this.etat);
  }

  async getAllCandidature(etat) {
    const id_responsable = "2";
    try {
      const { err, rows } =
        ((await this.candidatureService.getListCandidature(
          id_responsable,
         etat,
        )) as any) || [];
      if (!err) {
        this.listCandidature = rows;
      }
    } catch (error) {
      this.listCandidature = [];
      return error;
    }
  }

  changeEtat(event) {
    this.listCandidature = [null];
    const etat = event.nextId.toString();
    this.etat = etat;
    this.getAllCandidature(this.etat);
  }

 async showDemande(demande) {
   try {
      const {err}=await this.candidatureService.updateCandidatureVue(demande.id_demande_stage_entreprise) as any;
      if(!err){
        this.getAllCandidature(this.etat)
        const modalRef = this.modalService.open(PopupDemandeComponent);
        modalRef.componentInstance.title = `DETAILS DEMANDE`;
        modalRef.componentInstance.id = Number(demande.id_offre_stage);
        modalRef.componentInstance.etat = this.etat;
        modalRef.componentInstance.details = demande;
      }
    }
    catch (error) {
     return error;
   }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }



  accref(id_demande:string,decision:string)
  {
        const modalRef = this.modalService.open(PopupAccrefStageComponent);
        modalRef.componentInstance.title = `DECISION DE STAGE`;
        modalRef.componentInstance.id_demande = id_demande;
        modalRef.componentInstance.decision = decision;
  }

}
