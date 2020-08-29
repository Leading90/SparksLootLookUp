import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {LootListData} from '../../dataTypes/shared-data-types';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  displayedColumns: string[] = ['playerName', 'rating'];
  dataSource: LootListData[];

  selectedItem = new FormControl();
  selectedItemID: number;
  items = this.requestService.getItemOptions();

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
  }

  inputChanged(): void {
    if (this.selectedItem.value) {
      this.dataSource = this.requestService.getItemData(this.getIDfromName(this.selectedItem.value));
      this.selectedItemID = this.getIDfromName(this.selectedItem.value);
      console.log(this.selectedItemID);
    }
  }

  getIDfromName(name: string): number {
    return this.items.filter(item => item.Name === name)[0].ID;
  }
}
