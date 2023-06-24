import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {path: "",redirectTo: "/home",pathMatch: "full"},
  {path: "login",component: LoginComponent},
  {path: "register",component: RegisterComponent},
  {path: "home",component: HomeComponent},
  {path: "calendar", component: CalendarComponent},
  {path: "event-create", component: EventCreateComponent},
  {path: "event-details/:id", component: EventDetailsComponent},
  {path: "event-edit/:id", component: EventEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
