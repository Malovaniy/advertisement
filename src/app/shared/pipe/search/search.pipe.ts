import { Pipe, PipeTransform } from '@angular/core';
import { IBoard } from '../../interface/board.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IBoard>, field: string): Array<IBoard> {
    if (!field) return value
    if (!value) return []

    return value.filter(item => item.name.toLocaleLowerCase().
      includes(field.toLocaleLowerCase()))

  }
}
