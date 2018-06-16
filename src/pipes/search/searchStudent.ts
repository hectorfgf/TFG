import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'searchStudent',
})
export class SearchStudentPipe implements PipeTransform {

  transform(list: any[], searchTerm: string): any[] {
    if (searchTerm) {
      searchTerm = searchTerm.toUpperCase();
      return list.filter(item => {
        return (item.name+item.surname).toUpperCase().indexOf(searchTerm) !== -1
      });
    } else {
      return list;
    }
  }
}
