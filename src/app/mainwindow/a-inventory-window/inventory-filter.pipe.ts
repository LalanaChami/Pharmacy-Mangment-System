import { Inventory } from './inventory.model';

import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  name: 'inventoryFilter',
  pure: false
})
export class InventoryFilterPipe implements PipeTransform{

  transform(inventorys: Inventory[], searchTerm: string) :Inventory[] {
    if(!inventorys || !searchTerm){
      return inventorys;
    }

    return inventorys.filter( inventory =>
      inventory.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
