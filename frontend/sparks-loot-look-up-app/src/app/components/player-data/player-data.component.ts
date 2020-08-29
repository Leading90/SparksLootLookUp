import {Component, OnInit} from '@angular/core';
import {PlayerData} from '../../dataTypes/shared-data-types';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.css']
})
export class PlayerDataComponent implements OnInit {

  selectedItem = new FormControl();
  items = this.requestService.getPlayerOptions();
  playerData = 'no player selected';

  constructor(private requestService: RequestService) {
  }

  ngOnInit(): void {
  }

  inputChanged(): void {
    this.playerData = JSON.stringify(this.requestService.getPlayerData(this.selectedItem.value));
  }
}
