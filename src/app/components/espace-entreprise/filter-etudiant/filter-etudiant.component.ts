import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChercherProfilService } from '../../../services/chercher-profil.service';
import { CompetenceService } from '../../../services/competence.service';
import { PopupDemandeComponent } from '../../popups/popup-demande/popup-demande.component';
import { PopupOffreComponent } from '../../popups/popup-offre/popup-offre.component';
import { PopupShowCompetenceEtudiantComponent } from '../../popups/popup-show-competence-etudiant/popup-show-competence-etudiant.component';

@Component({
  selector: 'app-filter-etudiant',
  templateUrl: './filter-etudiant.component.html',
  styleUrls: ['./filter-etudiant.component.scss']
})
export class FilterEtudiantComponent implements OnInit {
  listEtudiant: any[] = [null];
  searchText;
  page = 1;
  pageSize = 5;
  pageSizes = [5, 10, 15];
  tabid: any;
  constructor( private serviceEtudiant:ChercherProfilService,
               private modalService: NgbModal,
               private router:Router
    ) {
      this.tabid='0';
    }

  ngOnInit() {
    this.getAllListEtudiant(this.tabid);// 0 tabid
  }


  async getAllListEtudiant(etat:string) {

    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getListEtudiant(etat
        )) as any) || [];
      if (!err) {
        this.listEtudiant = rows;
      }
    } catch (error) {
      this.listEtudiant = [];
    }
  }
  changeTabid(event) {
    this.listEtudiant = [null];
    const etat = event.nextId.toString();
    this.getAllListEtudiant(etat);
    this.tabid=etat;//send to get offre contactes or not switch the tabid
  }


  consulterProfil(crypted_user:string){
    this.router.navigate(['/entreprise/etudiant/profil/',crypted_user])
  }


  contacter(etudiant){
    const modalRef = this.modalService.open(PopupDemandeComponent);
    modalRef.componentInstance.title = `INVITATION A UN ENTRETIEN DE STAGE`;
    modalRef.componentInstance.etudiant = etudiant;
    modalRef.componentInstance.invitation = true;
    modalRef.componentInstance.tabid = this.tabid;
  }



  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
  }

  showOffresListContactees(etudiant){
    const modalRef = this.modalService.open(PopupOffreComponent);
    modalRef.componentInstance.title = `LISTE DES OFFRES CONTACTEES POUR ${etudiant.nom +' '+etudiant.prenom}`;
    modalRef.componentInstance.etudiant = etudiant;
  }


}

