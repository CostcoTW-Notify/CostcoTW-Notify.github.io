import {
    Dialog,
    Collapse,
    IconButton,
    TableCell,
    TableRow,
    Stack,
    Tooltip,
    Typography,
    useTheme,
    useMediaQuery,
} from '@mui/material'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useState, Fragment, useContext } from 'react'
import GlobalUIContext from '@/context/GlobalUIContext'
import { ChatRoom } from "@/models/ChatRoom"
import ApiService from '@/services/ApiService';
import Subscription from './Subscription'
import SendMessageDialog from './SendMessageDialog'


const ExpendButton: React.FC<{ show: boolean, onClick: Function }> = ({ show, onClick }) => {
    return (
        <Tooltip title="展開訂閱項目">
            <IconButton aria-label="expand row" onClick={() => onClick()} >
                {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
        </Tooltip>
    )
}

const SendTestMessageButton: React.FC<{ onClick: Function }> = ({ onClick }) => {

    return (
        <Tooltip title="發送測試訊息">
            <IconButton aria-label='Send test message' onClick={() => onClick()}>
                <SendIcon />
            </IconButton>
        </Tooltip>
    )
}

const RemoveRoomButton: React.FC<{ onClick: Function }> = ({ onClick }) => {

    return (
        <Tooltip title="移除聊天室">
            <IconButton aria-label='Remove chat room' onClick={() => onClick()}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

interface IChatRoomRow {
    ChatRoom: ChatRoom
    ApiService: ApiService
}

const chatRoomRow: React.FC<IChatRoomRow> = (props) => {
    const chatRoom = props.ChatRoom
    const [showDetail, setShowDetail] = useState(false)
    const [showSendMessageBox, setShowSendMessageBox] = useState(false)
    const globalUI = useContext(GlobalUIContext)
    const translateRoomType = (type: string) => {
        switch (type.toUpperCase()) {
            case "GROUP":
                return "群組"
            case "USER":
                return "只傳給你"
            default:
                return "未知"
        }
    }

    const handleRemoveChatRooms = () => {
        globalUI.showLoading(true)
        props.ApiService.RemoveChatRoom(chatRoom.id!)
            .finally(() => {
                window.location.reload()
                globalUI.showLoading(false)
            })
    }

    const handleSendMessage = () => {
        setShowSendMessageBox(true)
    }

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <Fragment key={chatRoom.id}>
            <TableRow>
                <TableCell >
                    <Stack direction='row' alignItems='center'>
                        {isMobile ? null :
                            <ExpendButton show={showDetail} onClick={() => setShowDetail(!showDetail)} />
                        }
                        <Typography textAlign="center">
                            {chatRoom.roomName}
                        </Typography>
                    </Stack>
                </TableCell>
                <TableCell sx={{ p: 0 }}>
                    <Typography>
                        {translateRoomType(chatRoom.roomType!.toString())}
                    </Typography>
                </TableCell>
                {isMobile ? null :
                    <TableCell >
                        <Stack direction="row-reverse" spacing={2}>
                            <RemoveRoomButton onClick={handleRemoveChatRooms} />
                            <SendTestMessageButton onClick={handleSendMessage} />
                        </Stack>
                    </TableCell>
                }
            </TableRow>

            {isMobile ?
                <TableRow>
                    <TableCell>
                        <Stack direction="row" spacing={2}>
                            <ExpendButton show={showDetail} onClick={() => setShowDetail(!showDetail)} />
                            <SendTestMessageButton onClick={handleSendMessage} />
                            <RemoveRoomButton onClick={handleRemoveChatRooms} />
                        </Stack>
                    </TableCell>
                    <TableCell />
                </TableRow>
                : null
            }

            <TableRow>
                {/* <TableCell /> */}
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
