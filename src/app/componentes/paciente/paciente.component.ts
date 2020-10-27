import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {

  vistaPaciente:string = "";
  
  constructor(private toast: ToastrService) { }

  ngOnInit(): void {}

  cambiarVistaPaciente(vista:string) {
    this.vistaPaciente = vista;
  }

  agarrarError(error:string) {
    this.toast.error(error);
  }

  agarrarExito(exito:string) {
    this.toast.success(exito);
  }

  agarrarCancelar() {
    this.vistaPaciente = "";
  }
}
