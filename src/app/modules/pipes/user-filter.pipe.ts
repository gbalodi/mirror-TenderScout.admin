import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(items: any, searchText?: string, selectedCollaborate?: string): any {
    if (!items) return [];
    if (selectedCollaborate === 'all' && !searchText) return items;
    searchText = searchText.toLowerCase();
    var searchedItems = []
    // if (selectedCollaborate === 'all') {
    searchedItems = items.filter(it => {
      if (it.fullname) {
        return it.fullname.toLowerCase().includes(searchText);
      } else if (it.profiles[0]) {
        return it.profiles[0].fullname.toLowerCase().includes(searchText);
      }
    });
    // } else {
    if (selectedCollaborate !== 'all') {
      searchedItems = searchedItems.filter(it => {
        return it.profile_type.includes(selectedCollaborate);
      });
    }
    return searchedItems;
  }
}

