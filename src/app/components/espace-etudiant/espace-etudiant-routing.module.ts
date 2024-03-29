import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../../pages/notfound/notfound.component';
import { FilterEntrepriseComponent } from './filter-entreprise/filter-entreprise.component';
import { FormulaireCvComponent } from './formulaire-cv/formulaire-cv.component';
import { ListDemandesEtudiantComponent } from './list-demandes-etudiant/list-demandes-etudiant.component';
import { ListOffresEtudiantComponent } from './list-offres-etudiant/list-offres-etudiant.component';
import { MesStagesComponent } from './mes-stages/mes-stages.component';
import { VisitProfilResponsableComponent } from './visit-profil-responsable/visit-profil-responsable.component';


const routes: Routes = [
  {
    path: "offresStages", component : ListOffresEtudiantComponent,
  },
  {
    path: "demandesStages", component : ListDemandesEtudiantComponent,
  },
  {
    path: "profil", component : FormulaireCvComponent,
  },
  {
    path: "entreprise/profil/:id", component : VisitProfilResponsableComponent,
  },
  {
    path: "recherche/entreprise", component: FilterEntrepriseComponent
  },
  {
    path: "mesStages", component: MesStagesComponent
  },
  {
    path: "introuvable", component: NotfoundComponent
  },
  {
    path: "",
    redirectTo: "/etudiant/offresStages",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/etudiant/introuvable",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceEtudiantRoutingModule { }
