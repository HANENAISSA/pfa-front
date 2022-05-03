import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProfileComponent } from "./components/profile/profile.component";
import { AdminComponent } from "./components/admin/admin.component";
import { AccueilComponent } from "./pages/accueil/accueil.component";

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
        path: "profil",
        component: ProfileComponent,
      },
      {
        path: "", loadChildren : () => import('./components/espace-entreprise/espace-entreprise.module').then(m => m.EspaceEntrepriseModule),
      },     
    ],
  },
  {
    path: "etudiant",
    component: AdminComponent,
    children: [
      {
        path: "profil",
        component: ProfileComponent,
      },
      {
        path: "", loadChildren : () => import('./components/espace-etudiant/espace-etudiant.module').then(m => m.EspaceEtudiantModule),
      }
    ],
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
