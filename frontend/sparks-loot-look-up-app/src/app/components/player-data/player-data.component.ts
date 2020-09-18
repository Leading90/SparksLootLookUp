import {Component, OnInit} from '@angular/core';
import {BasicType, DistributeChangeBody, LootListData, PlayerData} from '../../dataTypes/shared-data-types';
import {FormControl} from '@angular/forms';
import {RequestService} from '../../services/request.service';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LogInService} from '../../services/log-in.service';

@Component({
  selector: 'app-player-data',
  templateUrl: './player-data.component.html',
  styleUrls: ['./player-data.component.css']
})
export class PlayerDataComponent implements OnInit {

  selectedName = new FormControl();
  selectedPlayersModifier = new FormControl();
  playerList: PlayerData[];
  filteredPlayers: Observable<PlayerData[]>;
  dataSource: BasicType[];
  playerData = 'no player selected';
  displayedColumns: string[] = ['item_name', 'prioritynb', 'distributed'];

  constructor(private requestService: RequestService, private logInService: LogInService) {
  }

  get loggedIn(): boolean {
    return this.logInService.isLoggedIn();
  }

  ngOnInit(): void {
    this.setUpPlayerList();
  }

  inputChanged(): void {
    if (this.selectedName.value) {
      this.setPlayerData(this.selectedName.value);
      this.getLootListData(this.selectedName.value);
    }
  }

  getLootListData(selectedPlayer: string): void {
    this.requestService.getItemListTotal().subscribe(data => {
      this.dataSource = data.filter(player => {
        return player.rname === selectedPlayer;
      }).sort((n1, n2) => n1.prioritynb - n2.prioritynb);
    });
  }

  setPlayerData(selectedPlayer: string): void {
    this.requestService.getRaiderList().subscribe(
      data => {
        const playerData = data.find(player => {
          return player.rname === selectedPlayer;
        });
        if (playerData) {
          this.selectedPlayersModifier.setValue(playerData.modifier);
          this.playerData = JSON.stringify(playerData);
        }
      });
  }

  modifierChanged(): void {
    // TODO: change modifier
  }

  private setUpPlayerList(): void {
    this.requestService.getRaiderList().subscribe(
      data => {
        this.playerList = data;

        this.filteredPlayers = this.selectedName.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value))
        );
      }
    );
  }

  private _filter(value: string): PlayerData[] {
    const filterValue = value.toLowerCase();
    return this.playerList.filter(option => option.rname.toLowerCase().includes(filterValue));
  }

  switchDistributed(element: LootListData, checked: boolean): void {
    this.requestService.postIsDistributed({
      idlootlist: element.idlootlist.toString(),
      distributed: checked ? '1' : '0'
    } as DistributeChangeBody);
  }

  isDistributed(element: any): boolean {
    return Number(element.distributed) > 0;
  }
}
