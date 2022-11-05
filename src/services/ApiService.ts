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

  async CreateAxiosInstance() {
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
      url: `/api/ChatRoom/${id}`,
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
      url: `/api/ChatRoom/${id}`,
      method: "patch",
      data: chatRoom,
    });

    return response.status === 200;
  }

  public async RemoveChatRoom(id: string): Promise<boolean> {
    const sender = await this.CreateAxiosInstance();

    let response = await sender({
      url: `/api/ChatRoom/${id}`,
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

    // Redirect to register url
    // console.log("url", response.data.register_Url);
    window.location.assign(response.data.register_Url);
  }
}
