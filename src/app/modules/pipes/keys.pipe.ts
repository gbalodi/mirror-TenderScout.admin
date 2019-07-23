import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'keys'
})
export class KeysPipe implements PipeTransform {

  public transform(obj: Object): string[] {
    const keys: string[] = [];
    for (let key in obj) {
      keys.push(key);
    }
    return keys;
  }

}
