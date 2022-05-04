import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { DemandeEtudiantService } from "../../../services/demande-etudiant.service";
import { SharedServiceService } from "../../../services/shared-service.service";
import { PopupOffreComponent } from "../../popups/popup-offre/popup-offre.component";

@Component({
  selector: "app-list-demandes-etudiant",
  templateUrl: "./list-demandes-etudiant.component.html",
  styleUrls: ["./list-demandes-etudiant.component.scss"],
})
export class ListDemandesEtudiantComponent implements OnInit {
  searchText:string;
  listdemande = [null];
  etat:string;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];

  constructor(
    private demandeStageServ: DemandeEtudiantService,
    private modalService: NgbModal,
    public sharedService : SharedServiceService
  ) {
    this.etat="3";
  }

  ngOnInit() {
    this.getAllDemandestages(this.etat);
  }


  async getAllDemandestages(etat:string) {
    this.listdemande = [null];
    try {
      const id_etudiant = "1";
      const { err, rows } =await this.demandeStageServ.getListDemande(id_etudiant,etat) as any;
      if (!err) {
       this.listdemande=rows;
      }
    } catch (error) {
      this.listdemande=[];
      return error;
    }
  }

  showDemandeDetails(demande) {

    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `DETAILS OFFRE`;
    modalRef.componentInstance.details = demande;
    modalRef.componentInstance.show = true;
    modalRef.componentInstance.role = "StudentDemande";

  }




changeEtat(event){
  const etat=event.nextId.toString();
  this.etat=etat;
  this.getAllDemandestages(etat);
}


handlePageSizeChange(event: any): void {
  this.pageSize = event.target.value;
  this.page = 1;
}


}
