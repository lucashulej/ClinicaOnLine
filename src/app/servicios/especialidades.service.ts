import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {

  especialidades: Observable<any[]>;
  listaEspecialidades: any[];

  constructor(private db : AngularFireDatabase) { 
    this.especialidades = this.db.list('especialidades').valueChanges(); 
    this.especialidades.subscribe(especialidades => this.listaEspecialidades = especialidades, error => console.log(error));
  }

  actualizarEspecialidades(nuevaListaEspecialidades) {
    for (const especialidad of nuevaListaEspecialidades) {
      if(!this.listaEspecialidades.includes(especialidad)) {
        this.db.list('especialidades').push(especialidad);
      }
    }
  }
}
