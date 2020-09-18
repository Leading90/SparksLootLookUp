export interface LootListData {
  idraider: number;
  rname: string;
  prioritynb: number;
  distributed: number;
  idlootlist: number;
}

export interface PlayerData {
  idraider: number;
  rname: string;
  class: string;
  modifier: number;
}

export interface BasicType {
  idraider: number;
  idlootlist: number;
  item_name: string;
  rname: string;
  prioritynb: number;
  wowheadid: number;
  distributed: number;
  raid: string;
  boss: string;
}

export interface DistributeChangeBody {
  idlootlist: string;
  distributed: string;
}
