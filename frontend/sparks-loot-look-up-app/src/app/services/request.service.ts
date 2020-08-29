import {Injectable} from '@angular/core';
import {ItemData, PlayerData} from '../dataTypes/shared-data-types';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor() {
  }

  itemOptions = ['item1', 'item2'];
  playerOptions = ['furyWarry1', 'furyWarry2'];

  dummyItemData = [
    {playerName: 'furyWarry1', rating: 1},
    {playerName: 'furyWarri2', rating: 2}
  ];

  dummyPlayerData = [
    {playerID: 1, playerName: 'furyWarry1', class: 'warry', modifier: 1},
    {playerID: 2, playerName: 'furyWarry2', class: 'warry', modifier: 9000},
  ];

  getItemOptions(): string[] {
    return this.itemOptions;
  }

  getPlayerOptions(): string[] {
    return this.playerOptions;
  }

  getItemData(selectedItem: string): ItemData[] {
    if (selectedItem === 'item1') {
      return this.dummyItemData;
    }
    return [];
  }

  getPlayerData(selectedPlayer: string): PlayerData {
    return this.dummyPlayerData.filter(player => player.playerName === selectedPlayer)[0];
  }
}
