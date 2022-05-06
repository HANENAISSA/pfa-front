import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from '../../pages/notfound/notfound.component';
import { FormulaireCvComponent } from './formulaire-cv/formulaire-cv.component';
import { ListDemandesEtudiantComponent } from './list-demandes-etudiant/list-demandes-etudiant.component';
import { ListOffresEtudiantComponent } from './list-offres-etudiant/list-offres-etudiant.component';


const routes: Routes = [
  {
    path: "offresStages", component : ListOffresEtudiantComponent,
  },
  {
    path: "demandesStages", component : ListDemandesEtudiantComponent,
  },
  // {
  //   path: "profil/:tabid", component : FormulaireCvComponent,
  // },
  {
    path: "profil", component : FormulaireCvComponent,
  },
  {
    path: "entreprise/profil", component : FormulaireCvComponent,
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
