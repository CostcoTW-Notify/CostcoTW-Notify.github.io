import {
    Dialog,
    Button,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Stack,
    Tooltip
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
                <TableCell>{chatRoom.roomName}</TableCell>
                <TableCell >{translateRoomType(chatRoom.roomType!.toString())}</TableCell>
                <TableCell>
                    <Stack direction="row-reverse">
                        <Tooltip title="移除聊天室">
                            <Button aria-label='Remove chat room' sx={{ p: 0 }} onClick={handleRemoveChatRooms}>
                                <DeleteIcon />
                            </Button>
                        </Tooltip>
                        <Tooltip title="發送測試訊息">
                            <Button aria-label='Send test message' sx={{ p: 0 }} onClick={handleSendMessage}>
                                <SendIcon />
                            </Button>
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
