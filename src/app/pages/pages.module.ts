import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { AuthComponent } from './auth/auth.component';
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



@NgModule({
  declarations: [
    AboutComponent,
    AuthComponent,
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
    NotfoundComponent
  ],
  exports:[
    AboutComponent,
    AuthComponent,
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
    TeamComponent
  ],
  imports: [
    CommonModule,
    CarouselModule,
    PagesRoutingModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],

})
export class PagesModule { }
