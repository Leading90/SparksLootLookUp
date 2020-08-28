import {Injectable} from '@angular/core';
import {TableData} from '../dataTypes/tableData';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() {
  }

  options = ['item1', 'item2'];


  tableData = [
    {playerName: 'furyWarry1', rating: 1},
    {playerName: 'furyWarri2', rating: 2}
  ];

  getOptions(): string[] {
    return this.options;
  }

  getTableData(selectedItem: string): TableData[] {
    if (selectedItem === 'item1') {
      return this.tableData;
    }
    return [];
  }
}
