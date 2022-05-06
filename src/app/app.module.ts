import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ɵs } from '@ng-select/ng-select';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CarouselModule } from 'ngx-owl-carousel-o';
// Components
import { AdminComponent } from './components/admin/admin.component';
// Module
import { SharedModule} from './shared/shared.module';
import { EspaceEntrepriseModule } from './components/espace-entreprise/espace-entreprise.module';
import { EspaceEtudiantModule } from './components/espace-etudiant/espace-etudiant.module';
import { PopupsModule } from './components/popups/popups.module';
import { PagesModule } from './pages/pages.module';
// import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({

  declarations: [
    AppComponent,
    AdminComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    CarouselModule,
    EspaceEntrepriseModule,
    EspaceEtudiantModule,
    PopupsModule,
    PagesModule
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [DatePipe,NgSelectConfig, ɵs,NgbActiveModal
  //   ,{
  //   provide:HTTP_INTERCEPTORS,
  //   useClass:TokenInterceptorService,
  //   multi:true
  // }
],
  bootstrap: [AppComponent],

})
export class AppModule {
}
