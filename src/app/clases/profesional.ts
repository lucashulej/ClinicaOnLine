import { Usuario } from './usuario';

export class Profesional extends Usuario {
    especialidades = [];
    diasLaborales;
    duracion:number;
    desdeSemanal:string;
    hastaSemanal:string;
    desdeSabados:string;
    hastaSabados:string;
    habilitado:boolean;
    atencion = [];
}
