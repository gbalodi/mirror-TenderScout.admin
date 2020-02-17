import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitle'
})
export class CustomTitlePipe implements PipeTransform {

  transform(value: string): any {
    if (!value)
      return null;

    return value.replace(/_/g, ' ');
  }

}
