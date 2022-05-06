import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';
import { TeamComponent } from '../layout/team/team.component';
import { SpinnerComponent } from '../layout/spinner/spinner.component';
import { ServicessComponent } from '../layout/servicess/servicess.component';
import { QuotesComponent } from '../layout/quotes/quotes.component';
import { OwlCarouselComponent } from '../layout/owl-carousel/owl-carousel.component';
import { FooterComponent } from '../layout/footer/footer.component';
import { CoursesComponent } from '../layout/courses/courses.component';
import { CategoriesComponent } from '../layout/categories/categories.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NotfoundComponent } from './notfound/notfound.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { FormsModule } from '@angular/forms';
import { VerifauthComponent } from './verifauth/verifauth.component';
import { LoginComponent } from './auth/login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../services/token-interceptor.service';



@NgModule({
  declarations: [
    AboutComponent,
    ContactComponent,
    AccueilComponent,
    NavbarComponent,
    CategoriesComponent,
    CoursesComponent,
    FooterComponent,
    OwlCarouselComponent,
    QuotesComponent,
    ServicessComponent,
    SpinnerComponent,
    TeamComponent,
    NotfoundComponent,
    SignUpComponent,
    VerifauthComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  exports:[
    AboutComponent,
    ContactComponent,
    AccueilComponent,
    NavbarComponent,
    CategoriesComponent,
    CoursesComponent,
    FooterComponent,
    OwlCarouselComponent,
    QuotesComponent,
    ServicessComponent,
    SpinnerComponent,
    TeamComponent,
    SignUpComponent,
    VerifauthComponent,
    LoginComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    PagesRoutingModule,
    FormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers:[{
    provide:HTTP_INTERCEPTORS,
    useClass:TokenInterceptorService,
    multi:true
  }],
})
export class PagesModule { }
