import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../../pages/notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { DemandeCandidaturesComponent } from './demande-candidatures/demande-candidatures.component';
import { EditOffreStageComponent } from './offre-stage/edit-offre-stage/edit-offre-stage.component';
import { FilterEtudiantComponent } from './filter-etudiant/filter-etudiant.component';
import { ListOffresStageComponent } from './offre-stage/list-offres-stage/list-offres-stage.component';
import { NewOffreStageComponent } from './offre-stage/new-offre-stage/new-offre-stage.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';
import { VisitProfilEtudiantComponent } from './visit-profil-etudiant/visit-profil-etudiant.component';


const routes: Routes = [
  {
    path: "offresStages", component : ListOffresStageComponent,
  },
  {
    path: "stagiaires", component : StagiairesComponent,
  },
  {
    path: "candidatures", component : DemandeCandidaturesComponent,
  },
  {
    path: "nouvelle", component: NewOffreStageComponent
  },
  {
    path: "profil", component: ProfileComponent
  },
  {
    path: "etudiant/profil/:id", component: VisitProfilEtudiantComponent
  },
  {
    path: "modif", component: EditOffreStageComponent
    ,data:{'some data':"values"}
  },
  {
    path: "recherche/profil", component: FilterEtudiantComponent
  },
  {
    path: "introuvable", component: NotfoundComponent
  },
  {
    path: "",
    redirectTo: "/entreprise/offresStages",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/entreprise/introuvable",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceEntrepriseRoutingModule {

}
