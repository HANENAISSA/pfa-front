import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemandeCandidaturesComponent } from './demande-candidatures/demande-candidatures.component';
import { EditOffreStageComponent } from './edit-offre-stage/edit-offre-stage.component';
import { FilterEtudiantComponent } from './filter-etudiant/filter-etudiant.component';
import { ListOffresStageComponent } from './list-offres-stage/list-offres-stage.component';
import { NewOffreStageComponent } from './new-offre-stage/new-offre-stage.component';
import { StagiairesComponent } from './stagiaires/stagiaires.component';


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
    path: "modif", component: EditOffreStageComponent
    ,data:{'some data':"values"}
  },
  {
    path: "recherche", component: FilterEtudiantComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceEntrepriseRoutingModule { 

}
