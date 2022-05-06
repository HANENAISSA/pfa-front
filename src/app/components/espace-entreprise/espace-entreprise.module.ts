import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeCandidaturesComponent } from './demande-candidatures/demande-candidatures.component';
import { EditOffreStageComponent } from './edit-offre-stage/edit-offre-stage.component';
import { FilterEtudiantComponent } from './filter-etudiant/filter-etudiant.component';
import { ListOffresStageComponent } from './list-offres-stage/list-offres-stage.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { NewOffreStageComponent } from './new-offre-stage/new-offre-stage.component';
import { EspaceEntrepriseRoutingModule } from './espace-entreprise-routing.module';
import { FormsModule } from '@angular/forms';
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagesModule } from '../../pages/pages.module';
import { ProfileComponent } from './profile/profile.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../../services/token-interceptor.service';

@NgModule({
  declarations: [
    DemandeCandidaturesComponent,
    EditOffreStageComponent,
    FilterEtudiantComponent,
    ListOffresStageComponent,
    StagiairesComponent,
    NewOffreStageComponent,
    ProfileComponent
    // NotfoundComponent
  ],
  imports: [
    CommonModule,
    EspaceEntrepriseRoutingModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    PagesModule
  ],
  exports: [
    DemandeCandidaturesComponent,
    EditOffreStageComponent,
    FilterEtudiantComponent,
    ListOffresStageComponent,
    StagiairesComponent,
    NewOffreStageComponent,
    ProfileComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers:[
  //   {
  //   provide:HTTP_INTERCEPTORS,
  //   useClass:TokenInterceptorService,
  //   multi:true
  // }
],

})
export class EspaceEntrepriseModule { }
