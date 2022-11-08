export class InventoryCheckItem {
  code?: string;
  name?: string;
}

export class Subscriptions {
  /**
   * 每日新上架特價商品
   */
  dailyNewOnSale?: boolean;

  /**
   * 每日新上架最低價商品 (價格尾數為 7 的商品)
   */
  dailyNewBestBuy?: boolean;

  /**
   * 庫存通知商品 Code
   */
  inventoryCheckList?: InventoryCheckItem[];
}

export class ChatRoom {
  id?: string;
  roomName?: string;
  /**
   * Group or User
   */
  roomType?: string;
  createAt?: Date;
  subscriptions?: Subscriptions;
}
