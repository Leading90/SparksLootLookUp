import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {ItemData} from '../../dataTypes/shared-data-types';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  displayedColumns: string[] = ['playerName', 'rating'];
  dataSource: ItemData[];

  selectedItem = new FormControl();
  items = this.requestService.getItemOptions();

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
  }

  inputChanged(): void {
    this.dataSource = this.requestService.getItemData(this.selectedItem.value);
  }
}
