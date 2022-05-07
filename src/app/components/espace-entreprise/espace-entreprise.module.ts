import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandeCandidaturesComponent } from './demande-candidatures/demande-candidatures.component';
import { FilterEtudiantComponent } from './filter-etudiant/filter-etudiant.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { NewOffreStageComponent } from './offre-stage/new-offre-stage/new-offre-stage.component';
import { EspaceEntrepriseRoutingModule } from './espace-entreprise-routing.module';
import { FormsModule } from '@angular/forms';
import {  NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagesModule } from '../../pages/pages.module';
import { ProfileComponent } from './profile/profile.component';
import { VisitProfilEtudiantComponent } from './visit-profil-etudiant/visit-profil-etudiant.component';
import { EditOffreStageComponent } from './offre-stage/edit-offre-stage/edit-offre-stage.component';
import { ListOffresStageComponent } from './offre-stage/list-offres-stage/list-offres-stage.component';

@NgModule({
  declarations: [
    DemandeCandidaturesComponent,
    EditOffreStageComponent,
    FilterEtudiantComponent,
    ListOffresStageComponent,
    StagiairesComponent,
    NewOffreStageComponent,
    ProfileComponent,
    VisitProfilEtudiantComponent
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
    ProfileComponent,
    VisitProfilEtudiantComponent
  ],
  schemas: [NO_ERRORS_SCHEMA],


})
export class EspaceEntrepriseModule { }
