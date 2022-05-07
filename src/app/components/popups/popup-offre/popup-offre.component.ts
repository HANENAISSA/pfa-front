import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../../../services/shared-service.service';
import { OffreStageServiceService } from '../../../services/offre-stage-service.service';
import swal from "sweetalert";
import { FormulaireCvServiceService } from '../../../services/formulaire-cv-service.service';

@Component({
  selector: 'app-popup-offre',
  templateUrl: './popup-offre.component.html',
  styleUrls: ['./popup-offre.component.scss']
})
export class PopupOffreComponent implements OnInit {

  @Input() details:any=null;
  @Input() id_offre_stage:number=-1;
  @Input() title:string;
  @Input() etudiant=null;
  @Input() role:string;
  uploaded:boolean=false;
  listOffres=[]


    constructor(private offreService:OffreStageServiceService,
      private formCvServ:FormulaireCvServiceService,
    public activeModal: NgbActiveModal,
    public sharedService:SharedServiceService,
    private offreStageServ:OffreStageServiceService
     ) {
    }

  ngOnInit() {
    if(this.etudiant){
      this.getOffresEtudiantsTousContacts();
    }
  }




  async postulerOffre() {
    try {
      (await this.offreStageServ.updateOffrePostulations(this.id_offre_stage.toString())) as any;
      const { err, rows } =
        (await this.formCvServ.addDemandeStageEntreprise(this.id_offre_stage.toString())) as any;
      if (!err) {
        swal("Succès!", "Postulation effectuée avec succès", "success");
        this.sharedService.reloadComponent()
      }
    } catch (error) {
      swal("Échec!", "Postulation non effectuée", "error");
    }
    this.activeModal.dismiss()
  }


async getOffresEtudiantsTousContacts() {
  try {
    const { err, rows } =
      ((await this.offreStageServ.getOffresEtudiantsTousContacts(
        this.etudiant.id_etudiant,
        '1'//1 because its coming from list students contacted
      )) as any) || [];
    if (!err) {
      this.listOffres = rows;
    }
  } catch (error) {
    this.listOffres = [];
  }
}


}
