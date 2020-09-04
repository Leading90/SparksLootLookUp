import {Injectable} from '@angular/core';
import {BasicType, PlayerData, DistributeChangeBody} from '../dataTypes/shared-data-types';
import {HttpClient} from '@angular/common/http';
// tslint:disable-next-line:import-spacing
// @ts-ignore
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  returnData: string;
  itemData: BasicType[];

  constructor(private http: HttpClient) {
  }

  getItemList(): Observable<BasicType[]> {
    return this.http.get<BasicType[]>('http://95.217.185.88/api/read.php?lt=ll');
  }

  getRaiderList(): Observable<PlayerData[]> {
    return this.http.get<PlayerData[]>('http://95.217.185.88/api/read.php?lt=rl');
  }

  postIsDistributed(distributeElement: DistributeChangeBody): void {
    console.log(distributeElement);
    this.http.post( 'http://95.217.185.88/api/update.php' , distributeElement).subscribe(data => console.log(data));
  }
}
