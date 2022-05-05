import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginEntrepriseComponent } from './auth/login-entreprise/login-entreprise.component';
import { LoginEtudiantComponent } from './auth/login-etudiant/login-etudiant.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ContactComponent } from './contact/contact.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { VerifauthComponent } from './verifauth/verifauth.component';


const routes: Routes = [
  {
    path: "", component : AccueilComponent,
  },
  {
    path: "accueil", component : AccueilComponent,
  },
  {
    path: "apropos", component : AboutComponent,
  },
  {
    path: "contact", component : ContactComponent,
  },
  {
    path: "inscription", component : SignUpComponent,
  },
  {
    path: "compte/:hashedid", component : VerifauthComponent,
  },
  {
    path:"espace",
    children:[
      {
        path: "entreprise", component : LoginEntrepriseComponent,
      },
      {
        path: "etudiant", component : LoginEtudiantComponent,
      },
    ]
  },
  {
    path: "introuvable", component: NotfoundComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
