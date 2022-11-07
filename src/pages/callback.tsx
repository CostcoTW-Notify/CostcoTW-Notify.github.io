
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../settings'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'

interface ILoginCallback extends IAuthServiceDependency {

}

const loginCallback: React.FC<ILoginCallback> = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        const processLogin = async (loggedIn: boolean) => {
            if (!loggedIn) {
                await props.AuthService.LoginCallback()
            }
            navigate(Routes.IndexEndpoint)
        }

        const processLogout = async (loggedIn: boolean) => {
            if (loggedIn) {
                await props.AuthService.LogoutCallback()
                console.log('Logout success')
            }
            navigate(Routes.IndexEndpoint)
        }

        const processCallback = async () => {
            let user = await props.AuthService.GetUserInfo()
            let alreadyLoggedIn = user !== null

            if (window.location.pathname.startsWith(Routes.SignInCallbackEndpoint))
                await processLogin(alreadyLoggedIn)
            else if (window.location.pathname.startsWith(Routes.SignOutCallbackEndpoint))
                await processLogout(alreadyLoggedIn)
            else
                navigate(Routes.IndexEndpoint)
        }

        processCallback();
    }, [])

    return <></>
}

export default loginCallback