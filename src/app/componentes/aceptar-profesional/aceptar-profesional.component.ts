import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Profesional } from 'src/app/clases/profesional';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-aceptar-profesional',
  templateUrl: './aceptar-profesional.component.html',
  styleUrls: ['./aceptar-profesional.component.scss']
})
export class AceptarProfesionalComponent implements OnInit {

  @Output() exito: EventEmitter<any> = new EventEmitter();
  @Output() cancelar: EventEmitter<any> = new EventEmitter();
  @Input() listaProfesionalesNoHabilitados: any[] = [];

  constructor(private usuarioSerive: UsuarioService) {}

  ngOnInit(): void {}

  salir() {
    this.cancelar.emit();
  }

  habilitarProfesional(profesional:Profesional) {
    profesional.habilitado = true;
    this.usuarioSerive.actualizarProfesional(profesional);
    this.exito.emit("Profesioanal Habilitado");
  }
}
