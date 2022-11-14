import {
    createBrowserRouter
} from 'react-router-dom'
import { Routes } from '../settings';
import Index from '../pages/index'
import LoginCallback from '../pages/callback';
import ChatRoom from '../pages/chatRoom';
import AuthService from '../services/AuthService';
import AppBar from '@/components/appBar/AppBar'

const getRouter = (authService: AuthService) => {

    const router = createBrowserRouter([
        {
            path: Routes.IndexEndpoint,
            element: <>
                <AppBar />
                <Index AuthService={authService} />
            </>
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
            element: <>
                <AppBar />
                <ChatRoom AuthService={authService} />
            </>
        }
    ]);

    return router
}


export { getRouter }