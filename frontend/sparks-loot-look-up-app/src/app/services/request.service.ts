import {Injectable} from '@angular/core';
import {ItemData, LootListData, PlayerData} from '../dataTypes/shared-data-types';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() {
  }

  itemOptions = [{ID: 19364, Name: 'Ashkandi'}, {ID: 21134, Name: 'Dark Edge of Insanity'}];
  playerOptions = ['furyWarry1', 'furyWarry2'];

  dummyItemData = [
    {playerName: 'furyWarry1', rating: 1},
    {playerName: 'furyWarri2', rating: 2}
  ];

  dummyPlayerData = [
    {playerID: 1, playerName: 'furyWarry1', class: 'warry', modifier: 1},
    {playerID: 2, playerName: 'furyWarry2', class: 'warry', modifier: 9000},
  ];

  getItemOptions(): ItemData[] {
    return this.itemOptions;
  }

  getPlayerOptions(): string[] {
    return this.playerOptions;
  }

  getItemData(selectedItem: number): LootListData[] {
    if (selectedItem === 19364) {
      return this.dummyItemData;
    }
    return [];
  }

  getPlayerData(selectedPlayer: string): PlayerData {
    return this.dummyPlayerData.filter(player => player.playerName === selectedPlayer)[0];
  }
}
