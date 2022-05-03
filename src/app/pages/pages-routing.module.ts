import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AccueilComponent } from './accueil/accueil.component';
import { AuthComponent } from './auth/auth.component';
import { ContactComponent } from './contact/contact.component';


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
    path: "auth", component : AuthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
