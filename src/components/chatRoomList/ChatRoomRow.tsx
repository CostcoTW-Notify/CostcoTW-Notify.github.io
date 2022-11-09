import {
    Dialog,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Stack,
    Tooltip,
    Typography
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState, Fragment } from 'react'
import { ChatRoom } from "@/models/ChatRoom"
import ApiService from '@/services/ApiService';
import Subscription from './Subscription'
import SendMessageDialog from './SendMessageDialog'

interface IChatRoomRow {
    ChatRoom: ChatRoom
    ApiService: ApiService
}

const chatRoomRow: React.FC<IChatRoomRow> = (props) => {
    const chatRoom = props.ChatRoom
    const [showDetail, setShowDetail] = useState(false)
    const [showSendMessageBox, setShowSendMessageBox] = useState(false)

    const translateRoomType = (type: string) => {
        switch (type.toUpperCase()) {
            case "GROUP":
                return "群組"
            case "USER":
                return "一對一聊天"
            default:
                return "未知"
        }
    }

    const handleRemoveChatRooms = () => {
        props.ApiService.RemoveChatRoom(chatRoom.id!)
            .finally(() => {
                window.location.reload()
            })
    }

    const handleSendMessage = () => {
        setShowSendMessageBox(true)
    }

    return (
        <Fragment key={chatRoom.id}>
            <TableRow>
                <TableCell>
                    <Tooltip title="展開訂閱項目">
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setShowDetail(!showDetail)}
                        >
                            {showDetail ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </Tooltip>
                </TableCell>
                <TableCell>
                    <Typography>
                        {chatRoom.roomName}
                    </Typography>
                </TableCell>
                <TableCell >
                    <Typography>
                        {translateRoomType(chatRoom.roomType!.toString())}
                    </Typography>
                </TableCell>
                <TableCell>
                    <Stack direction="row-reverse" spacing={2}>
                        <Tooltip title="移除聊天室">
                            <IconButton aria-label='Remove chat room' onClick={handleRemoveChatRooms}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="發送測試訊息">
                            <IconButton aria-label='Send test message' onClick={handleSendMessage}>
                                <SendIcon />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell sx={{ paddingTop: 0, paddingBottom: 0 }} colSpan={4}>
                    <Collapse in={showDetail} timeout="auto" unmountOnExit>
                        <Subscription
                            RoomId={chatRoom.id!}
                            Subscription={chatRoom.subscriptions}
                            ApiService={props.ApiService} />
                    </Collapse>
                </TableCell>
            </TableRow>
            <Dialog open={showSendMessageBox} onClose={() => setShowSendMessageBox(false)}>
                <SendMessageDialog
                    Id={chatRoom.id!}
                    RoomName={chatRoom.roomName!}
                    CloseDialog={() => setShowSendMessageBox(false)}
                    ApiService={props.ApiService}
                />
            </Dialog>
        </Fragment>
    )
}


export default chatRoomRow
