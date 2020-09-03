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

  displayedColumns: string[] = ['rname', 'prioritynb', 'distributed'];
  dataSource: LootListData[];

  selectedItem = new FormControl();
  selectedItemID: number;
  items: ItemData[];

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.getItemOptions();
  }

  inputChanged(): void {
    if (this.selectedItem.value) {
      this.selectedItemID = this.getIDfromName(this.selectedItem.value);
      this.getItemData(this.selectedItemID);
    }
  }

  getItemData(selectedItem: number): void {
    this.requestService.getItemList().subscribe(data => {
      this.dataSource = data.filter(item => {
        return item.wowheadid === selectedItem;
      }).sort((n1, n2) => n1.prioritynb - n2.prioritynb);
    });
  }


  getIDfromName(name: string): number {
    const foundItems = this.items.filter(item => item.item_name === name);
    if (foundItems.length === 1) {
      return this.items.filter(item => item.item_name === name)[0].wowheadid;
    }
  }

  getItemOptions(): void {
    this.requestService.getItemList().subscribe(data => {
      this.items = [];
      for (const entry of data) {
        let exists = false;
        const object = {item_name: entry.item_name, wowheadid: entry.wowheadid} as ItemData;
        for (const item of this.items) {
          if (object.wowheadid === item.wowheadid) {
            exists = true;
          }
        }
        if (!exists) {
          this.items.push(object);
        }
      }
    });
  }

  isDistributed(element: any): boolean {
    return Number(element.distributed) > 0;
  }
}
