import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert';
import { CandidatureEtudiantService } from '../../../services/candidature-etudiant.service';
import { SharedServiceService } from '../../../services/shared-service.service';

@Component({
  selector: 'app-popup-accref-stage',
  templateUrl: './popup-accref-stage.component.html',
  styleUrls: ['./popup-accref-stage.component.scss']
})
export class PopupAccrefStageComponent implements OnInit {
  @Input() decision: string ;
  @Input() id_demande: string;
  @Input() title: string;
  constructor( public activeModal: NgbActiveModal,
    private candidatureService:CandidatureEtudiantService,
    private sharedService:SharedServiceService ) { }

  ngOnInit() {
  }

 async onSubmit() {
    try {
      const {err}=await this.candidatureService.updateCandidatResEntretien(this.id_demande,this.decision) as any;
      if(!err){
        this.sharedService.reloadComponent();
        swal("Succes!", "Opération effectuée", "success");
      }
    }
    catch (error) {
      swal("Échec!", "Opération non effectuée", "error");
    }
    this.activeModal.dismiss();

  }

}
