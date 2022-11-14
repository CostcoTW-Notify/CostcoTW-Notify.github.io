export class Setting {
  public static OidcServier = "https://oidc-server-q4d4kz5xwq-de.a.run.app";
  // public static OidcServier = "https://localhost:7070";
  public static LineChatRoomService =
    "https://line-chat-room-service-q4d4kz5xwq-de.a.run.app";
  // public static LineChatRoomService = "https://localhost:7000";
  public static Client_ID = "github-io-client";
  public static Scope = "openid offline_access";
}

export class Routes {
  public static SignInCallbackEndpoint = "/signin-callback";
  public static SignOutCallbackEndpoint = "/signout-callback";
  public static IndexEndpoint = "/";
  public static ChatRoomEndpoint = "/ChatRoom";
}
