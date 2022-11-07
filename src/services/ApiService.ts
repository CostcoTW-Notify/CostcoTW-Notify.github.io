import { ChatRoom } from "../models/ChatRoom";
import { Setting } from "../settings";
import AuthService from "./AuthService";
import axios from "axios";

interface IApiService {
  FetchAllChatRoom(): Promise<ChatRoom[]>;
  FetchChatRoom(id: string): Promise<ChatRoom>;
  UpdateChatRoom(id: string, chatRoom: ChatRoom): Promise<boolean>;
  RemoveChatRoom(id: string): Promise<boolean>;
  RegisterNewChatRoom(): Promise<void>;
}

export default class ApiService implements IApiService {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  private async CreateAxiosInstance() {
    let access_token = await this.authService.GetAccessToken();
    const instance = axios.create({
      baseURL: Setting.LineChatRoomService,
      headers: { Authorization: `Bearer ${access_token}` },
    });
    return instance;
  }

  public async FetchAllChatRoom(): Promise<ChatRoom[]> {
    const sender = await this.CreateAxiosInstance();

    let response = await sender<ChatRoom[]>({
      url: `/api/ChatRooms`,
      method: "get",
    });

    return response.data;
  }

  public async FetchChatRoom(id: string): Promise<ChatRoom> {
    const sender = await this.CreateAxiosInstance();

    let response = await sender<ChatRoom>({
      url: `/api/ChatRooms/${id}`,
      method: "get",
    });

    return response.data;
  }

  public async UpdateChatRoom(
    id: string,
    chatRoom: ChatRoom
  ): Promise<boolean> {
    const sender = await this.CreateAxiosInstance();

    let response = await sender({
      url: `/api/ChatRooms/${id}`,
      method: "patch",
      data: chatRoom,
    });

    return response.status === 200;
  }

  public async RemoveChatRoom(id: string): Promise<boolean> {
    const sender = await this.CreateAxiosInstance();

    let response = await sender({
      url: `/api/ChatRooms/${id}`,
      method: "delete",
    });

    return response.status === 200;
  }

  public async RegisterNewChatRoom(): Promise<void> {
    const sender = await this.CreateAxiosInstance();
    // get redirect from server
    let response = await sender({
      url: `/LineNotify/RegisterChatRoomUrl?redirect_uri=${window.location.href}`,
      method: "get",
    });

    window.location.assign(response.data.register_Url);
  }

  public async SendMessage(id: string, message: string): Promise<void> {
    throw "後端忘了做... 晚點補";
    // const sender = await this.CreateAxiosInstance();

    // let response = await sender({

    // })
  }
}
