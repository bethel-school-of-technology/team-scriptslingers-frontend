import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailsComponent,
    EventEditComponent,
    EventCreateComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
