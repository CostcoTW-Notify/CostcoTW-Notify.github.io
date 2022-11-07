import { useEffect, useState } from 'react'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import {
    Button,
    Typography,
    Stack,
    SxProps
} from '@mui/material'
import ChatRoomList from '@/components/chatRoomList/ChatRoomList'
import ApiService from '@/services/ApiService'
import { ChatRoom } from '@/models/ChatRoom'

interface IChatRoom extends IAuthServiceDependency {

}

const chatRoom: React.FC<IChatRoom> = (props) => {
    const apiService = new ApiService()

    const [chatRoomData, setChatRoomData] = useState<ChatRoom[]>([])

    useEffect(() => {
        const fetchChatRoom = async () => {
            const chatRooms = await apiService.FetchAllChatRoom()
            setChatRoomData(chatRooms)
        }

        fetchChatRoom()
    }, [])


    const stackProp: SxProps = {
        p: '2em',
        backgroundColor: 'gray'
    }

    return (
        <Stack
            spacing={2}
            sx={stackProp}>
            <Stack alignItems="flex-end">
                <Button variant='contained' onClick={() => apiService.RegisterNewChatRoom()}>
                    <Typography>
                        建立新通知
                    </Typography>
                </Button>
            </Stack>
            <ChatRoomList ChatRooms={chatRoomData} ApiService={apiService} />
        </Stack>
    )
}

export default chatRoom