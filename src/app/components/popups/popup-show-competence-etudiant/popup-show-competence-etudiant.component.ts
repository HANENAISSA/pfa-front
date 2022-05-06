import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChercherProfilService } from '../../../services/chercher-profil.service';
import { PopupDemandeComponent } from '../popup-demande/popup-demande.component';

@Component({
  selector: 'app-popup-show-competence-etudiant',
  templateUrl: './popup-show-competence-etudiant.component.html',
  styleUrls: ['./popup-show-competence-etudiant.component.scss']
})
export class PopupShowCompetenceEtudiantComponent implements OnInit {
  @Input() title: string;
  @Input() etudiant= null;


  listComp: any[] = [];

  constructor(
    public activeModal: NgbActiveModal,private serviceEtudiant:ChercherProfilService,private modalService: NgbModal,) { }

  ngOnInit() {
    this.getCompetenceByEtudiant();
  }
  async getCompetenceByEtudiant() {
    try {
      const { err, rows } =
        ((await this.serviceEtudiant.getCompetenceByEtudiant(this.etudiant.id_etudiant
        )) as any) || [];
      if (!err) {
       this.listComp = rows;
      }
    } catch (error) {
     this.listComp = [];
    }
  }

  contacter(){
    this.activeModal.dismiss()
    const modalRef = this.modalService.open(PopupDemandeComponent);
    modalRef.componentInstance.title = `INVITATION A UN ENTRETIEN DE STAGE`;
  //   modalRef.componentInstance.id = Number(demande.id_offre_stage);
    modalRef.componentInstance.etudiant = this.etudiant;
    modalRef.componentInstance.invitation = true;
  }
}
