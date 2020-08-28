import {Component, OnInit} from '@angular/core';
import {RequestService} from '../../services/request.service';
import {TableData} from '../../dataTypes/tableData';


@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['playerName', 'rating'];
  dataSource: TableData[];

  constructor(private reqService: RequestService) {
  }

  ngOnInit(): void {
    this.dataSource = this.reqService.getTableData('test');
  }

}
