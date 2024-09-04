import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AllmoviesComponent } from './allmovies/allmovies.component';
import { RecommendComponent } from './recommend/recommend.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookingComponent } from './booking/booking.component';
import { SeatSelectionComponent } from './seat-selection/seat-selection.component';


const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'header',component:HeaderComponent},
  {path:'footer',component:FooterComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'allMovies',component:AllmoviesComponent},
  {path:'recommend',component:RecommendComponent},
  {path: 'dashboard',component:DashboardComponent},
  {path:'booking', component:BookingComponent},
  {path:'seatSelection',component:SeatSelectionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
