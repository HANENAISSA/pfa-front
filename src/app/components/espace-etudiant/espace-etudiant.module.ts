import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormulaireCvComponent } from './formulaire-cv/formulaire-cv.component';
import { ListDemandesEtudiantComponent } from './list-demandes-etudiant/list-demandes-etudiant.component';
import { ListOffresEtudiantComponent } from './list-offres-etudiant/list-offres-etudiant.component';
import { EspaceEtudiantRoutingModule } from './espace-etudiant-routing.module';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PagesModule } from '../../pages/pages.module';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../../services/token-interceptor.service';


@NgModule({
  declarations: [
    FormulaireCvComponent,
    ListDemandesEtudiantComponent,
    ListOffresEtudiantComponent,
    // NotfoundComponent
  ],
  imports: [
    CommonModule,
    EspaceEtudiantRoutingModule,
    FormsModule,
    NgbModule,
    Ng2SearchPipeModule,
    PagesModule,

  ],
  exports: [
    FormulaireCvComponent,
    ListDemandesEtudiantComponent,
    ListOffresEtudiantComponent
  ],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
  schemas: [NO_ERRORS_SCHEMA],

})
export class EspaceEtudiantModule { }
