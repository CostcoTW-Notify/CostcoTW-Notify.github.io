import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '@/settings'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import LoginPanel from '@/components/LoginPanel/loginPanel'

interface IIndexDependency extends IAuthServiceDependency {

}

const index: React.FC<IIndexDependency> = (props) => {
    const navigate = useNavigate()
    const authService = props.AuthService

    useEffect(() => {
        const checkLogin = async () => {
            let user = await authService.GetUserInfo()
            if (user !== null)
                navigate(Routes.ChatRoomEndpoint)
        }

        checkLogin()
    })


    return (
        <>
            <LoginPanel />
        </>
    )
}


export default index