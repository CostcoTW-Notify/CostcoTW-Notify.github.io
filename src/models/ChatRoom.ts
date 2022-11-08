export interface Dictionary {
  [index: string]: string;
}

export interface Subscriptions {
  /**
   * 每日新上架特價商品
   */
  dailyNewOnSale: boolean;

  /**
   * 每日新上架最低價商品 (價格尾數為 7 的商品)
   */
  dailyNewBestBuy: boolean;

  /**
   * 庫存通知商品 Code
   */
  inventoryCheckList: Dictionary;
}

export interface ChatRoom {
  id: string;
  roomName: string;
  /**
   * Group or User
   */
  roomType: string;
  createAt: Date;
  subscriptions: Subscriptions;
}
