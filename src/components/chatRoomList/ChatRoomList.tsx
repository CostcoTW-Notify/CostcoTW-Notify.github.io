import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
} from '@mui/material'

import ChatRoomRow from '@/components/chatRoomList/ChatRoomRow'
import { ChatRoom } from '@/models/ChatRoom';
import ApiService from '@/services/ApiService';


interface IChatRoomList {
    ChatRooms: ChatRoom[]
    ApiService: ApiService
}

const chatRoomList: React.FC<IChatRoomList> = (props) => {


    return (
        <TableContainer component={Paper} sx={{
            height: '70vh'
        }}>
            <Table stickyHeader aria-label='Chat room list'>
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell ><Typography variant='h6'> 名稱 </Typography> </TableCell>
                        <TableCell ><Typography variant='h6'> 類型 </Typography></TableCell>
                        <TableCell ></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.ChatRooms.map(x => <ChatRoomRow key={x.id} ChatRoom={x} ApiService={props.ApiService} />)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default chatRoomList