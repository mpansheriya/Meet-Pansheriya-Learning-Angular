import { Pipe, PipeTransform } from '@angular/core';
import { Phone } from "../models/phone";
@Pipe({
  name: 'fullName',
  standalone: true
})
export class FullNamePipe implements PipeTransform {
  transform(phone: Phone): string {
    return `${phone.brand} ${phone.colour}`;
  }
}
