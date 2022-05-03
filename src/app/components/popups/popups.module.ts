import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupAccrefStageComponent } from './popup-accref-stage/popup-accref-stage.component';
import { PopupCompetenceComponent } from './popup-competence/popup-competence.component';
import { PopupDemandeComponent } from './popup-demande/popup-demande.component';
import { PopupExperienceComponent } from './popup-experience/popup-experience.component';
import { PopupOffreComponent } from './popup-offre/popup-offre.component';
import { PopupShowCompetenceEtudiantComponent } from './popup-show-competence-etudiant/popup-show-competence-etudiant.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    PopupAccrefStageComponent,
    PopupCompetenceComponent,
    PopupDemandeComponent,
    PopupExperienceComponent,
    PopupOffreComponent,
    PopupShowCompetenceEtudiantComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  entryComponents : [
    PopupAccrefStageComponent,
    PopupCompetenceComponent,
    PopupDemandeComponent,
    PopupExperienceComponent,
    PopupOffreComponent,
    PopupShowCompetenceEtudiantComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class PopupsModule { }
