import { useEffect, useState, useContext } from 'react'
import GlobalUIContext from '@/context/GlobalUIContext'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import {
    Box,
    Button,
    Typography,
    Stack,
    SxProps,
    Container,
    useMediaQuery,
    useTheme
} from '@mui/material'
import ChatRoomList from '@/components/chatRoomList/ChatRoomList'
import ApiService from '@/services/ApiService'
import { ChatRoom } from '@/models/ChatRoom'

interface IChatRoom extends IAuthServiceDependency {
}

const chatRoom: React.FC<IChatRoom> = (props) => {
    const apiService = new ApiService()
    const globalUI = useContext(GlobalUIContext)
    const [chatRoomData, setChatRoomData] = useState<ChatRoom[]>([])

    useEffect(() => {
        const fetchChatRoom = async () => {
            const chatRooms = await apiService.FetchAllChatRoom()
            setChatRoomData(chatRooms)
        }

        globalUI.showLoading(true)
        fetchChatRoom().finally(() => globalUI.showLoading(false))
    }, [])


    const stackProp: SxProps = {
        p: '2em',
    }

    const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

    const paddingWeight = isMobile ? undefined : '10vw'
    return (
        <Box sx={{
            backgroundColor: 'darkgray',
            height: '90vh',
            paddingLeft: paddingWeight,
            paddingRight: paddingWeight,
        }}>
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
        </Box>
    )

}

export default chatRoom