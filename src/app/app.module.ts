import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainscreenComponent } from './components/mainscreen/mainscreen.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainscreenBodyComponent } from './components/mainscreen-body/mainscreen-body.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FaqComponent } from './components/faq/faq.component';
import { HttpClientModule } from '@angular/common/http';
import { RsvpSuccessComponent } from './components/rsvp-success/rsvp-success.component';

const routes: Routes = [
  {path: "", component: MainscreenBodyComponent},
  {path: "home", component: MainscreenBodyComponent},
  {path: "rsvp", component: RsvpComponent},
  {path: "faq", component: FaqComponent},
  {path: "success", component: RsvpSuccessComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    MainscreenComponent,
    RsvpComponent,
    HeaderComponent,
    MainscreenBodyComponent,
    RsvpSuccessComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
