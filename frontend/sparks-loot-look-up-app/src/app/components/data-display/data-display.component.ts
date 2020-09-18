import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {BasicType, DistributeChangeBody, LootListData} from '../../dataTypes/shared-data-types';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LogInService} from '../../services/log-in.service';

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
  items: BasicType[];
  filteredItems: Observable<BasicType[]>;

  constructor(private requestService: RequestService, private logInService: LogInService) {
  }

  get loggedIn(): boolean {
    return this.logInService.isLoggedIn();
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
    this.requestService.getItemListTotal().subscribe(data => {
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

  isDistributed(element: any): boolean {
    return Number(element.distributed) > 0;
  }

  switchDistributed(element: LootListData, checked: boolean): void {
    this.requestService.postIsDistributed({
      idlootlist: element.idlootlist.toString(),
      distributed: checked ? '1' : '0'
    } as DistributeChangeBody);
  }

  private getItemOptions(): void {
    this.requestService.getItemList().subscribe(data => {
        this.items = [];
        for (const entry of data) {
          let exists = false;
          for (const item of this.items) {
            if (entry.wowheadid === item.wowheadid) {
              exists = true;
            }
          }
          if (!exists) {
            this.items.push(entry);
          }
        }

        this.filteredItems = this.selectedItem.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    );
  }

  private _filter(value: string): BasicType[] {
    const filterValue = value.toLowerCase();
    return this.items.filter(option => option.item_name.toLowerCase().includes(filterValue));
  }

}
