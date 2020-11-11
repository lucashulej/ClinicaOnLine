import { Directive, Input, ElementRef, AfterViewInit} from '@angular/core';

@Directive({
  selector: '[changeStatusColor]'
})
export class CambioDeColorPorEstadoDirectiva implements AfterViewInit {
    constructor(private elementRef:ElementRef) { }
 
    color:string;
 
    @Input() set changeStatusColor(status: string) {
       if(status == 'Aceptado')
         this.color = 'orange';
       else if(status == 'Atendido')
         this.color = 'green';
       else if(status == 'Cancelado')
         this.color = 'red';
       else if(status == 'Pendiente')
         this.color = 'grey';
    }
 
     ngAfterViewInit(): void {
      this.elementRef.nativeElement.style.backgroundColor = this.color;
      this.elementRef.nativeElement.style.color = 'white';
      this.elementRef.nativeElement.style.textTransform = 'uppercase';
      this.elementRef.nativeElement.style.fontSize = '1.5rem'
    }
}
