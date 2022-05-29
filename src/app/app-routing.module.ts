import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AdminComponent } from "./components/admin/admin.component";
import { EntrepriseGuard } from "./guards/entreprise.guard";
import { EtudiantGuard } from "./guards/etudiant.guard";

const routes: Routes = [
   {
    path: "",
   loadChildren : () => import('./pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: "entreprise",
    component: AdminComponent,
    children: [
      {
        path: "", loadChildren : () => import('./components/espace-entreprise/espace-entreprise.module').then(m => m.EspaceEntrepriseModule),
      },
    ],
    // canActivateChild:[EntrepriseGuard]
  },
  {
    path: "etudiant",
    component: AdminComponent,
    children: [
      {
        path: "", loadChildren : () => import('./components/espace-etudiant/espace-etudiant.module').then(m => m.EspaceEtudiantModule),
      }
    ],
    // canActivateChild:[EtudiantGuard]
  },
  {
    path: "",
    redirectTo: "/accueil",
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "/accueil",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
