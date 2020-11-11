import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { ProfesionalComponent } from './componentes/profesional/profesional.component';
import { PacienteComponent } from './componentes/paciente/paciente.component';
import { HorariosProfesionalComponent } from './componentes/horarios-profesional/horarios-profesional.component';
import { TurnosProfesionalComponent } from './componentes/turnos-profesional/turnos-profesional.component';
import { PedirTurnosPacienteComponent } from './componentes/pedir-turnos-paciente/pedir-turnos-paciente.component';
import { MisTurnosPacienteComponent } from './componentes/mis-turnos-paciente/mis-turnos-paciente.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AtenderProfesionalComponent } from './componentes/atender-profesional/atender-profesional.component';
import { AltaAdministradorComponent } from './componentes/alta-administrador/alta-administrador.component';
import { AdministradorComponent } from './componentes/administrador/administrador.component';
import { AceptarProfesionalComponent } from './componentes/aceptar-profesional/aceptar-profesional.component';
import { EncuestaProfesionalComponent } from './componentes/encuesta-profesional/encuesta-profesional.component';
import { EncuestaPacienteComponent } from './componentes/encuesta-paciente/encuesta-paciente.component';
import { EspecialidadesComponent } from './componentes/especialidades/especialidades.component';
import { ProfesionalesComponent } from './componentes/profesionales/profesionales.component';
import { TurnosComponent } from './componentes/turnos/turnos.component';
import { CambioDeColorPorEstadoDirectiva } from './directivas/cambio-de-color-por-estado-directiva';
import { VerReseniaComponent } from './componentes/ver-resenia/ver-resenia.component';
import { DiaDeLaFechaPipe } from './pipes/dia-de-la-fecha.pipe';
import { DatePipe } from '@angular/common';
import { BuscarTurnosAdministradorComponent } from './componentes/buscar-turnos-administrador/buscar-turnos-administrador.component';
import { Turnos15DiasPipe } from './pipes/turnos15-dias.pipe';
import { VerTurnoComponent } from './componentes/ver-turno/ver-turno.component';

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
    NavBarComponent,
    ProfesionalComponent,
    PacienteComponent,
    HorariosProfesionalComponent,
    TurnosProfesionalComponent,
    PedirTurnosPacienteComponent,
    MisTurnosPacienteComponent,
    PerfilComponent,
    AtenderProfesionalComponent,
    AltaAdministradorComponent,
    AdministradorComponent,
    AceptarProfesionalComponent,
    EncuestaProfesionalComponent,
    EncuestaPacienteComponent,
    EspecialidadesComponent,
    ProfesionalesComponent,
    TurnosComponent,
    CambioDeColorPorEstadoDirectiva,
    VerReseniaComponent,
    DiaDeLaFechaPipe,
    BuscarTurnosAdministradorComponent,
    Turnos15DiasPipe,
    VerTurnoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
	  ToastrModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule, 
    AngularFireDatabaseModule,
    AngularFireStorageModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
