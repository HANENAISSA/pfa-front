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
  year: string;
  etat: string;

  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  public search:any = '';

  constructor(
    private candidatureService: CandidatureEtudiantService,
    public sharedService: SharedServiceService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
  ) {
    this.year = new Date().getFullYear().toString();
    this.etat = "3";
  }

  ngOnInit() {
    this.getAllOffreYears();
    this.getAllCandidature(this.etat, this.year);

  }


  async getAllOffreYears(){
    try {
      const {err,rows}=await this.sharedService.getYears(1)as any||[];
      if(!err){
        this.listYears=rows;
      }

    } catch (error) {
      this.listYears=[];
      return error;

    }

  }
  async getAllCandidature(etat, year: string) {
    const id_responsable = "2";
    try {
      const { err, rows } =
        ((await this.candidatureService.getListCandidature(
          id_responsable,
         etat,
          year
        )) as any) || [];
      if (!err) {
        this.listCandidature = rows;
      }
    } catch (error) {
      this.listCandidature = [];
      return error;
    }
  }

  changeYear(year: string) {
    this.listCandidature = [null];
    this.year = year;
    this.getAllCandidature(this.etat, year);
  }

  changeEtat(event) {
    this.listCandidature = [null];
    const etat = event.nextId.toString();
    this.etat = etat;
    this.getAllCandidature(etat, this.year);
  }



 async showDemande(demande) {
   try {
      const {err}=await this.candidatureService.updateCandidatureVue(demande.id_demande_stage_entreprise) as any;
      if(!err){

        this.getAllCandidature(this.etat,this.year)

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
