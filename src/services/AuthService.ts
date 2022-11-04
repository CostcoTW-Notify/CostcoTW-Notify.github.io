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
    const currentHost = `${window.location.protocol}//${window.location.host}`;
    const settings: UserManagerSettings = {
      authority: Setting.OidcServier,
      client_id: Setting.Client_ID,
      redirect_uri: `${currentHost}${Routes.SignInCallbackEndpoint}`,
      //   silent_redirect_uri: `${currentHost}/silent-renew.html`,
      post_logout_redirect_uri: `${currentHost}${Routes.SignOutCallbackEndpoint}`,
      response_type: "code",
      scope: Setting.Scope,
      userStore: new WebStorageStateStore({ store: window.localStorage }),
    };
    this._userManager = new UserManager(settings);
    Log.setLogger(console);
    Log.setLevel(Log.DEBUG);

    this._userManager.events.addAccessTokenExpired(() => {
      console.log("Token expired!");
      this._userManager.signoutRedirect();
    });
    this._userManager.events.addUserSignedIn(() => {
      console.log("SignIn success!");
    });
    this._userManager.events.addUserSignedOut(() => {
      console.log("Sign Out!");
    });
  }

  public Login() {
    return this._userManager.signinRedirect();
  }

  public LoginCallback() {
    return this._userManager.signinCallback();
  }

  public Logout() {
    console.log("Redirect logout");
    return this._userManager.signoutRedirect();
  }

  public LogoutCallback() {
    return this._userManager.signoutCallback();
  }

  public GetUserInfo() {
    return this._userManager.getUser();
  }

  public async GetAccessToken() {
    let user = await this.GetUserInfo();
    if (user === null) this.Login();
    return user?.access_token;
  }
}
