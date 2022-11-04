import { AuthServiceDependency } from './interface/baseDependency'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../settings'

interface ChatRoomDependency extends AuthServiceDependency {

}

const chatRoom: React.FC<ChatRoomDependency> = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        const ensureLogin = async () => {
            let user = await props.AuthService.GetUserInfo()
            if (user === null)
                navigate(Routes.IndexEndpoint)
            // else
            //     console.log('user : ', user)
        }

        ensureLogin()
    })



    return (
        <div>
            <div>
                You are log in now !
            </div>
            <div>

            </div>
            <button onClick={() => {
                console.log('dowork')
                props.AuthService.Logout()
            }}>
                Logout
            </button>
        </div >
    )
}

export default chatRoom