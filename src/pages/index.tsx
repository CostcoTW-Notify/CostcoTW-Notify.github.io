import { useState, useEffect } from 'react'
import { AuthServiceDependency } from './interface/baseDependency'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../settings'

interface indexDependency extends AuthServiceDependency {

}

const index: React.FC<indexDependency> = (props) => {
    const navigate = useNavigate()
    const authService = props.AuthService

    const [message, setMessage] = useState("Please login...")

    useEffect(() => {
        const checkLogin = async () => {
            let user = await authService.GetUserInfo()
            if (user !== null)
                navigate(Routes.ChatRoomEndpoint)
        }

        checkLogin()
    })


    return (
        <div>
            <div>
                {message}
            </div>
            <div>
                <button onClick={() => authService.Login()}>
                    Login
                </button>
            </div>
        </div>
    )
}


export default index