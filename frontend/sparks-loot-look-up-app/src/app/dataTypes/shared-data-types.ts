export interface LootListData {
  idraider: number;
  name: string;
  priority: number;
}

export interface ItemData {
  item_name: string;
  wowheadid: number;
}

export interface PlayerData {
  idraider: number;
  name: string;
  class: string;
  priority: number;
}

export interface BasicType {
  idraider: number;
  item_name: string;
  name: string;
  priority: number;
  wowheadid: number;
}
