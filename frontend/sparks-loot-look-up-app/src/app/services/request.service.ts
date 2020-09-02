import {Injectable} from '@angular/core';
import {BasicType, ItemData, LootListData, PlayerData} from '../dataTypes/shared-data-types';
import {HttpClient} from '@angular/common/http';
// tslint:disable-next-line:import-spacing
// @ts-ignore
import * as  dummyData from '../../assets/dummyData.json';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  exampleUrl = 'https://swapi.dev/api/';
  returnData: string;

  constructor(private http: HttpClient) {
  }

  playerOptions = ['furyWarry1', 'furyWarry2'];

  dummyItemData = [
    {idraider: 1, name: 'furyWarry1', priority: 1},
    {idraider: 2, name: 'furyWarri2', priority: 2}
  ];

  dummyPlayerData = [
    {idraider: 1, name: 'furyWarry1', class: 'warry', priority: 1},
    {idraider: 2, name: 'furyWarry2', class: 'warry', priority: 9000},
  ];

  getItemOptions(): ItemData[] {
    const itemDataList: ItemData[] = [];
    for (const entry of dummyData.lootlist) {
      let test = true;
      const object = {item_name: entry.item_name, wowheadid: entry.wowheadid} as ItemData;
      for (const item of itemDataList) {
        if (object.wowheadid === item.wowheadid) {
          test = false;
        }
      }
      if (test) {
        itemDataList.push(object);
      }
    }
    return itemDataList;
  }

  getPlayerOptions(): PlayerData[] {
    return dummyData.raiderlist;
  }

  getItemData(selectedItem: number): LootListData[] {
    return dummyData.lootlist.filter(entry => {
      return entry.wowheadid === selectedItem;
    }).sort((n1, n2) => n1.priority - n2.priority);
  }

  getLootListData(selectedPlayer: string): BasicType[] {
    return dummyData.lootlist.filter(player => {
      return player.name === selectedPlayer;
    }).sort((n1, n2) => n1.priority - n2.priority);
  }

  getPlayerData(selectedPlayer: string): PlayerData {
    const playerEntry = dummyData.raiderlist.filter(player => {
      return player.name === selectedPlayer;
    })[0] ;
    return playerEntry as PlayerData;
  }

  getFromHTTPExample(): void {
    this.http.get(this.exampleUrl + 'people/1')
      .subscribe((data: any) => this.returnData = data);
    console.log(this.returnData);
  }
}
