import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BasicType} from '../../dataTypes/shared-data-types';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-raid-view',
  templateUrl: './raid-view.component.html',
  styleUrls: ['./raid-view.component.css']
})
export class RaidViewComponent implements OnInit {

  selectedBoss = new FormControl();
  bosses: BasicType[];

  selectedRaid = new FormControl();
  raids: BasicType[];

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.getRaidOptions();
    this.getBossOptions();
  }


  getBossOptions(raid?: string): void {
    this.requestService.getItemList().subscribe(data => {
      console.log(data);
      this.bosses = [];
      for (const entry of data) {
        let exists = false;
        for (const item of this.bosses) {
          if (entry.boss === item.boss) {
            exists = true;
          }
        }
        if (!exists) {
          this.bosses.push(entry);
        }
      }
    });
    if (raid) {
      this.bosses.filter(data => data.raid === raid);
    }
  }

  getRaidOptions(): void {
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
    });
  }


  bossChanged(): void {

  }

  raidChanged(): void {
    this.getBossOptions(this.selectedRaid.value);
  }
}
