import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!args) {return value;}
   
   // for(const text of args) {
     // alert(args)
      var re = new RegExp(args, 'gi'); //'gi' for case insensitive and can use 'g' if you want the search to be case sensitive.
      value =  value.replace(re, "<span class='highlight-search-text'>" + args +"</span>");
     // alert(value)
   // }
    return value;
  }

}
