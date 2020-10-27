import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profesional',
  templateUrl: './profesional.component.html',
  styleUrls: ['./profesional.component.scss']
})
export class ProfesionalComponent implements OnInit {

  vistaProfesional:string = "";
  
  constructor(private toast: ToastrService) { }

  ngOnInit(): void {}

  cambiarVistaProfesional(vista:string) {
    this.vistaProfesional = vista;
  }

  agarrarError(error:string) {
    this.toast.error(error);
  }

  agarrarExito(exito:string) {
    this.toast.success(exito);
  }

  agarrarCancelar() {
    this.vistaProfesional = "";
  }
}
