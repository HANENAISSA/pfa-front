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
  disabled:boolean=false


    constructor(private offreService:OffreStageServiceService,
      private formCvServ:FormulaireCvServiceService,
    public activeModal: NgbActiveModal,
    public sharedService:SharedServiceService,
     ) {
    }

  ngOnInit() {
    this.getOffresEtudiantsContactes()
  }

  async getOffresEtudiantsContactes() {
    const id_responsable_entreprise = "2"
    try {
      const { err, rows } =
        ((await this.offreService.getOffresEtudiantsContactes(id_responsable_entreprise,this.etudiant.id_etudiant)) as any) || [];
      if (!err) {
        this.listOffres = rows;
      }
    } catch (error) {
      this.listOffres = [];
    }
  }



async postulerOffre() {
  try {
    (await this.offreService.updateOffrePostulations(this.id_offre_stage.toString())) as any;
    const { err } =
      (await this.formCvServ.addDemandeStageEntreprise({'id_offre_stage':this.id_offre_stage.toString()})) as any;
    if (!err) {
      this.sharedService.reloadComponent();
      swal("Succès!", "Postulation effectuée avec succès", "success");
    }
  } catch (error) {
    swal("Échec!", "Opération non effectuée", "error");
  }
  this.activeModal.dismiss();
}



}
