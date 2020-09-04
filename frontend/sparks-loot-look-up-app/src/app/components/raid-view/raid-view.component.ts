import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BasicType} from '../../dataTypes/shared-data-types';
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

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.getItems();
    this.getRaidOptions();
    this.getBossOptions();
  }

  private getItems(): void {
    // separate because of async calls
    this.requestService.getItemList().subscribe(data => {
      this.items = data;
    });
  }

  private getBossOptions(): void {
    this.requestService.getItemList().subscribe(data => {
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

      console.log(this.bossesFull);
      this.bossesReduced = [...this.bossesFull];
      this.filteredBosses = this.selectedBoss.valueChanges.pipe(
        startWith(''),
        map(value => this._BossFilter(value))
      );
    });
  }

  private getRaidOptions(): void {
    this.requestService.getItemList().subscribe(data => {
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
    });
  }

  private _RaidFilter(value: string): BasicType[] {
    const filterValue = value.toLowerCase();
    console.log(this.bossesReduced);
    return this.raids.filter(option => option.raid.toLowerCase().includes(filterValue));
  }

  private _BossFilter(value: string): BasicType[] {
    const filterValue = value.toLowerCase();
    return this.bossesReduced.filter(option => option.boss.toLowerCase().includes(filterValue));
  }

  bossChanged(): void {

  }

  raidChanged(): void {
    this.bossesReduced = this.bossesFull.filter(data => data.raid === this.selectedRaid.value);
  }
}
