export class Setting {
  public static OidcServier = "https://oidc-server-q4d4kz5xwq-de.a.run.app";
  // public static OidcServier = "http://localhost:49162";
  public static Client_ID = "github-io-client";
  public static Scope = "offline_access";
}

export class Routes {
  public static SignInCallbackEndpoint = "/signin-callback";
  public static SignOutCallbackEndpoint = "/signout-callback";
  public static IndexEndpoint = "/";
  public static ChatRoomEndpoint = "/ChatRoom";
}
