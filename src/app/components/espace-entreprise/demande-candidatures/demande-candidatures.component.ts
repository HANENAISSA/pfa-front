import { Component, OnInit } from "@angular/core";
import { CandidatureEtudiantService } from "../../../services/candidature-etudiant.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import {  NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { PopupDemandeComponent } from "../../popups/popup-demande/popup-demande.component";
import swal from "sweetalert";
import { DemandeEtudiantService } from "../../../services/demande-etudiant.service";

@Component({
  selector: "app-demande-candidatures",
  templateUrl: "./demande-candidatures.component.html",
  styleUrls: ["./demande-candidatures.component.scss"],
})
export class DemandeCandidaturesComponent implements OnInit {
  listCandidature = [null];
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
    private demandeService:DemandeEtudiantService

  ) {
    this.etat = "3";
  }

  ngOnInit() {
    this.getAllCandidature(this.etat);

  }

  async getAllCandidature(etat) {

    try {
      const { err, rows } =
        ((await this.candidatureService.getListCandidature(
         etat,
        )) as any) || [];
      if (!err) {
        this.listCandidature = rows;
      }
    } catch (error) {
      this.listCandidature = [];
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
        const modalRef = this.modalService.open(PopupDemandeComponent);
        modalRef.componentInstance.title = `DETAILS DEMANDE`;
        modalRef.componentInstance.etat = this.etat;
        modalRef.componentInstance.details = demande;
      }
    }
    catch (error) {
      swal('Echec!','Erreur ! Réssayer plus tard ! ','warning')
   }
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }



  accref(id_demande:string,decision:boolean)
  {
      swal({
        title: `Voulez-vous ${decision?'accepter':'refuser'} la demande?`,
        buttons:['cancel','confirm'],
        closeOnEsc:true,
        closeOnClickOutside:true
      }).then(async(result) => {
        if(result){
          this.decideDemande(id_demande,decision?'5':'4')//5 and 4 are state in db
        }
      });
      this.activeModal.dismiss();

  }

  async decideDemande(id_demande:string,decision:string){
    try {
      const { err } =
        ((await this.demandeService.decideDemande(id_demande,decision)) as any) || [];
      if (!err) {
        this.sharedService.reloadComponent();
        swal("Succès!", "Opération effectuée", "success");
      }
    } catch (error) {
      swal("Echec!", error.error.message, "warning");
    }
  }

}
