import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventEditComponent } from './components/event-edit/event-edit.component';
import { EventCreateComponent } from './components/event-create/event-create.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CommentCreateComponent } from './components/comment-create/comment-create.component';
import { CommentDetailsComponent } from './components/comment-details/comment-details.component';
import { CommentEditComponent } from './components/comment-edit/comment-edit.component';
import { AboutComponent } from './components/about/about.component';
import { ResourcesComponent } from './components/resources/resources.component';

const routes: Routes = [
  {path: "",redirectTo: "/home",pathMatch: "full"},
  {path: "login",component: LoginComponent},
  {path: "register",component: RegisterComponent},
  {path: "home",component: HomeComponent},
  {path: "about", component: AboutComponent},
  {path: "resources", component: ResourcesComponent},
  {path: "calendar", component: CalendarComponent},
  {path: "event-create", component: EventCreateComponent},
  {path: "event-details/:id", component: EventDetailsComponent},
  {path: "event-edit/:id", component: EventEditComponent},
  {path: "post-create", component: PostCreateComponent},
  {path: "post-details/:id", component: PostDetailsComponent},
  {path: "post-edit/:id", component: PostEditComponent},
  {path: "comment-create", component: CommentCreateComponent},
  {path: "comment-details/:id", component: CommentDetailsComponent},
  {path: "comment-edit/:id", component: CommentEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
