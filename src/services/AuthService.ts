import {
  UserManager,
  WebStorageStateStore,
  Log,
  UserManagerSettings,
} from "oidc-client-ts";
import { Setting, Routes } from "../settings";

export default class AuthService {
  private _userManager: UserManager;
  constructor() {
    const settings: UserManagerSettings = {
      authority: Setting.OidcServier,
      client_id: Setting.Client_ID,
      redirect_uri: `${window.location.origin}${Routes.SignInCallbackEndpoint}`,
      post_logout_redirect_uri: `${window.location.origin}${Routes.SignOutCallbackEndpoint}`,
      response_type: "code",
      scope: Setting.Scope,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    this._userManager = new UserManager(settings);
    Log.setLogger(console);
    Log.setLevel(Log.DEBUG);

    this._userManager.events.addAccessTokenExpired(() => {
      console.log("Token expired!");
      this._userManager.removeUser();
    });
    this._userManager.events.addUserSignedIn(() => {
      console.log("SignIn success!");
    });
    this._userManager.events.addUserSignedOut(() => {
      console.log("Sign Out!");
    });
  }

  public async Login() {
    await this._userManager.signinRedirect();
  }

  public LoginCallback() {
    return this._userManager.signinCallback();
  }

  public Logout() {
    return this._userManager.signoutRedirect();
  }

  public LogoutCallback() {
    return this._userManager.signoutCallback();
  }

  public async GetUserInfo() {
    const user = await this._userManager.getUser();
    if (user?.expired) return null;
    return user;
  }

  public async GetAccessToken() {
    let user = await this.GetUserInfo();
    if (user === null || user.expired) window.location.assign("/");
    return user?.access_token;
  }
}
