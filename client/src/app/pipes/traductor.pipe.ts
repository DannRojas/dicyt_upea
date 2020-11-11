import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'traductor'
})
export class TraductorPipe implements PipeTransform {

  transform(value: string): string {
    if(!value) return '';
    switch (value){
      case "admin":
        return "Administrador";
        break;
      case "investigator":
        return "Investigador";
        break;
      case "aux":
        return "Auxiliar";
        break;
      case "responsable":
        return "Responsable";
        break;
      case "morning":
        return "Mañana";
        break;
      case "afternoon":
        return "Tarde";
        break;
      case "evening":
        return "Noche";
        break;
      case "coordinator":
        return "Coordinador";
        break;
      case "tutor":
        return "Tutor";
        break;
      default:
        return ''
        break;
    }
  }

}
