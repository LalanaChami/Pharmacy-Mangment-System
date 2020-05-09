import { Supplier } from './supplier.model';
import { Pipe ,PipeTransform} from '@angular/core';

@Pipe({
  name: 'supplierFilter',
  pure: false
})
export class SupplierFilterPipe implements PipeTransform{

  transform(suppliers: Supplier[], searchTerm: string) :Supplier[] {
    if(!suppliers || !searchTerm){
      return suppliers;
    }

    return suppliers.filter( supplier =>
                           supplier.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  }
}
