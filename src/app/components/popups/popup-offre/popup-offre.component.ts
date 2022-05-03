import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedServiceService } from '../../../services/shared-service.service';
import { OffreStageServiceService } from '../../../services/offre-stage-service.service';
import swal from "sweetalert";

@Component({
  selector: 'app-popup-offre',
  templateUrl: './popup-offre.component.html',
  styleUrls: ['./popup-offre.component.scss']
})
export class PopupOffreComponent implements OnInit {

  @Input() show:boolean=false;
  @Input() details:any=null;
  @Input() id_offre_stage:number=-1;
  @Input() title:string;
  @Input() etudiant=null;
  @Input() role:string;
  uploaded:boolean=false;
  listOffres=[]
  disabled:boolean=false


    constructor(private offreService:OffreStageServiceService,
    public activeModal: NgbActiveModal,public sharedService:SharedServiceService,
    private modalService: NgbModal,

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
      return error;
    }
  }

deleteOffre(){
  try {
      const {err,row,message}=this.offreService.deleteOffreStage(this.id_offre_stage.toString()) as any;
      if(!err){
        swal("Succès!", "Suppression effectuée avec succès", "success");

        this.activeModal.dismiss();
        this.sharedService.reloadComponent();
      }

    } catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
      this.activeModal.dismiss();

      return error;

    }
}


async postulerOffre() {
  // const idEtudiant = "1";

  // this.activeModal.dismiss();
  // const modalRef = this.modalService.open(PopupVideoComponent);
  // modalRef.componentInstance.title = `PRESENTATION VIDEO (OPTIONNEL)`;
  // modalRef.componentInstance.data = [idEtudiant,this.id_offre_stage];
  // modalRef.componentInstance.show = true;

}


}
