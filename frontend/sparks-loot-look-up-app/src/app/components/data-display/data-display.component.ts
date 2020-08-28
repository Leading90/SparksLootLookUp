import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {TableData} from '../../dataTypes/tableData';

@Component({
  selector: 'app-data-display',
  templateUrl: './data-display.component.html',
  styleUrls: ['./data-display.component.css']
})
export class DataDisplayComponent implements OnInit {

  displayedColumns: string[] = ['playerName', 'rating'];
  dataSource: TableData[];

  selectedItem = new FormControl();
  items = this.requestService.getOptions();

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
  }

  inputChanged(): void {
    this.dataSource = this.requestService.getTableData(this.selectedItem.value);
  }
}
