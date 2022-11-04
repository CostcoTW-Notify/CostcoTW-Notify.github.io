import {
    createBrowserRouter
} from 'react-router-dom'
import { Routes } from '../settings';
import Index from '../pages/index'
import LoginCallback from '../pages/callback';
import ChatRoom from '../pages/chatRoom';
import AuthService from '../services/AuthService';


const getRouter = (authService: AuthService) => {

    const router = createBrowserRouter([
        {
            path: Routes.IndexEndpoint,
            element: <Index AuthService={authService} />,
        },
        {
            path: Routes.SignInCallbackEndpoint,
            element: <LoginCallback AuthService={authService} />
        },
        {
            path: Routes.SignOutCallbackEndpoint,
            element: <LoginCallback AuthService={authService} />
        },
        {
            path: Routes.ChatRoomEndpoint,
            element: <ChatRoom AuthService={authService} />
        }
    ]);

    return router
}


export { getRouter }