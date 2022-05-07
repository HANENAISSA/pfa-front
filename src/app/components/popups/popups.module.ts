import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopupCompetenceComponent } from './popup-competence/popup-competence.component';
import { PopupDemandeComponent } from './popup-demande/popup-demande.component';
import { PopupExperienceComponent } from './popup-experience/popup-experience.component';
import { PopupOffreComponent } from './popup-offre/popup-offre.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    PopupCompetenceComponent,
    PopupDemandeComponent,
    PopupExperienceComponent,
    PopupOffreComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule
  ],
  entryComponents : [
    PopupCompetenceComponent,
    PopupDemandeComponent,
    PopupExperienceComponent,
    PopupOffreComponent,
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class PopupsModule { }
