import {Component, OnInit} from '@angular/core';
import {BasicType, PlayerData} from '../../dataTypes/shared-data-types';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.css']
})
export class PlayerDataComponent implements OnInit {

  selectedName = new FormControl();
  selectedPlayersModifier = new FormControl();
  playerList: PlayerData[];
  dataSource: BasicType[];
  playerData = 'no player selected';
  displayedColumns: string[] = ['item_name', 'priority'];

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
    this.playerList = this.requestService.getPlayerOptions();
  }

  inputChanged(): void {
    if (this.selectedName.value) {
      const player = this.requestService.getPlayerData(this.selectedName.value);
      console.log(player.modifier);
      this.selectedPlayersModifier.setValue(player.modifier);
      this.playerData = JSON.stringify(player);
      this.dataSource = this.requestService.getLootListData(this.selectedName.value);
    }
  }

  modifierChanged(): void {
    // TODO: change modifier
  }
}
