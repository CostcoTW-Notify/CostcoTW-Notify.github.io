class Subscriptions {
  /**
   * 每日新上架特價商品
   */
  DailyNewOnSale?: boolean;

  /**
   * 每日新上架最低價商品 (價格尾數為 7 的商品)
   */
  DailyNewBestBuy?: boolean;

  /**
   * 庫存通知商品 Code
   */
  InventoryCheckList?: string[];
}

export class ChatRoom {
  Id?: string;
  RoomName?: string;
  /**
   * Group or User
   */
  RoomType?: string;
  CreateAt?: Date;
  Subscriptions?: Subscriptions;
}
