import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {ItemData, LootListData} from '../../dataTypes/shared-data-types';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  displayedColumns: string[] = ['name', 'priority', 'hasItem'];
  dataSource: LootListData[];

  selectedItem = new FormControl();
  selectedItemID: number;
  items: ItemData[];

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.items = this.requestService.getItemOptions();
  }

  inputChanged(): void {
    if (this.selectedItem.value) {
      this.dataSource = this.requestService.getItemData(this.getIDfromName(this.selectedItem.value));
      this.selectedItemID = this.getIDfromName(this.selectedItem.value);
    }
  }

  getIDfromName(name: string): number {
    const foundItems = this.items.filter(item => item.item_name === name);
    if (foundItems.length === 1) {
      return this.items.filter(item => item.item_name === name)[0].wowheadid;
    }
  }
}
