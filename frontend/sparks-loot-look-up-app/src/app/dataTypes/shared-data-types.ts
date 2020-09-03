export interface LootListData {
  idraider: number;
  rname: string;
  prioritynb: number;
  distributed: number;
}

export interface ItemData {
  item_name: string;
  wowheadid: number;
}

export interface PlayerData {
  idraider: number;
  rname: string;
  class: string;
  modifier: number;
}

export interface BasicType {
  idraider: number;
  item_name: string;
  rname: string;
  prioritynb: number;
  wowheadid: number;
  distributed: number;
}
