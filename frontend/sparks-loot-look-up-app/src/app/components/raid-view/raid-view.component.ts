import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BasicType, LootListData} from '../../dataTypes/shared-data-types';
import {RequestService} from '../../services/request.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-raid-view',
  templateUrl: './raid-view.component.html',
  styleUrls: ['./raid-view.component.css']
})
export class RaidViewComponent implements OnInit {

  selectedBoss = new FormControl();
  bossesFull: BasicType[];
  bossesReduced: BasicType[];
  filteredBosses: Observable<BasicType[]>;

  selectedRaid = new FormControl();
  raids: BasicType[];
  filteredRaids: Observable<BasicType[]>;

  items: BasicType[];
  dataSource: BasicType[];
  displayedColumns: string[] = ['item_name', 'rname', 'prioritynb'];

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.setUp();
  }

  private setUp(): void {
    this.requestService.getItemList().subscribe(data => {
      this.items = [...data];
      this.getRaidOptions(data);
      this.getBossOptions(data);
    });
  }

  private getBossOptions(data: BasicType[]): void {
    this.bossesFull = [];
    for (const entry of data) {
      let exists = false;
      for (const item of this.bossesFull) {
        if (entry.boss === item.boss) {
          exists = true;
        }
      }
      if (!exists) {
        this.bossesFull.push(entry);
      }
    }
    this.bossesReduced = [...this.bossesFull];
    this.filteredBosses = this.selectedBoss.valueChanges.pipe(
      startWith(''),
      map(value => this._BossFilter(value))
    );
  }

  private getRaidOptions(data: BasicType[]): void {
    this.raids = [];
    for (const entry of data) {
      let exists = false;
      for (const item of this.raids) {
        if (entry.raid === item.raid) {
          exists = true;
        }
      }
      if (!exists) {
        this.raids.push(entry);
      }
    }
    this.filteredRaids = this.selectedRaid.valueChanges.pipe(
      startWith(''),
      map(value => this._RaidFilter(value))
    );
  }

  private _RaidFilter(value: string): BasicType[] {
    const filterValue = value.toLowerCase();
    return this.raids.filter(option => option.raid.toLowerCase().includes(filterValue));
  }

  private _BossFilter(value: string): BasicType[] {
    const filterValue = value.toLowerCase();
    return this.bossesReduced.filter(option => option.boss.toLowerCase().includes(filterValue));
  }

  bossChanged(): void {
    this.dataSource = this.items.filter(option => option.boss === this.selectedBoss.value);
  }

  raidChanged(): void {
    this.bossesReduced = this.bossesFull.filter(data => data.raid === this.selectedRaid.value);
    this.selectedBoss.setValue('');
    this.dataSource = this.items.filter(option => option.raid === this.selectedRaid.value);
    this.dataSource.sort((n1, n2) => n1.prioritynb - n2.prioritynb);
    this.dataSource.sort((n1, n2) => n2.item_name.localeCompare(n1.item_name));
  }
}
