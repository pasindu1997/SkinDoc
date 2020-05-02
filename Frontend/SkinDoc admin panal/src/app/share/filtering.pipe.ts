import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtering'
})
export class FilteringPipe implements PipeTransform {

  transform(clinics: Document[], search: String): Document[] {
    //if the search input value is equal or null it returns all the clinics in the array
    if (search == null || search == ""){
      return clinics;
    }
      //if the search has a string then the clinics will be filtered with the make parameter
      return clinics.filter(a=>a["skinClinicName"].toLowerCase().indexOf(search.toLowerCase()) !== -1);



  }

}
