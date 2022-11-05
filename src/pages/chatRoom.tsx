import { AuthServiceDependency } from './interface/baseDependency'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../settings'
import ApiService from '../services/ApiService'
interface ChatRoomDependency extends AuthServiceDependency {

}

const chatRoom: React.FC<ChatRoomDependency> = (props) => {
    const navigate = useNavigate()
    const apiService = new ApiService()

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
                <button onClick={() => props.AuthService.GetUserInfo()}>
                    renew token
                </button>
            </div>
            <button onClick={() => {
                props.AuthService.Logout()
            }}>
                Logout
            </button>
            <button onClick={() => apiService.FetchAllChatRoom().then(x => console.log('ChatRooms', x))}>
                Fetch All Room
            </button>
            <button onClick={() => apiService.RegisterNewChatRoom()}>
                Register New Room
            </button>

        </div >
    )
}

export default chatRoom