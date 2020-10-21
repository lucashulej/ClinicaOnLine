import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';

var firebaseConfig = {
  apiKey: "AIzaSyC3GjrUEl1qTbX0FG4Ztf1y7V1ouGnaBLQ",
  authDomain: "clinica-9cabd.firebaseapp.com",
  databaseURL: "https://clinica-9cabd.firebaseio.com",
  projectId: "clinica-9cabd",
  storageBucket: "clinica-9cabd.appspot.com",
  messagingSenderId: "878997521217",
  appId: "1:878997521217:web:5c5064f840d8e4ab6a57c0"
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
