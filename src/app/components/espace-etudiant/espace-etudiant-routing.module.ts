import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
  {
    path: "cv/:id", component : FormulaireCvComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceEtudiantRoutingModule { }
