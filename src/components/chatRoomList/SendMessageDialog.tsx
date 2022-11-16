
import ApiService from '@/services/ApiService'
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'


interface ISendMessageBox {
    Id: string
    RoomName: string
    CloseDialog: Function
    ApiService: ApiService
}

const sendMessageBox: React.FC<ISendMessageBox> = (props) => {

    const [message, setMessage] = useState<string>("")

    const sendMessage = async (x: any) => {
        let result = await props.ApiService.SendMessage(props.Id, message)
        if (result)
            props.CloseDialog()

    }

    const handleMsgChange = async (event: any) => {
        setMessage(event.target.value)
    }

    return (
        <Box>
            <DialogTitle>發送測試訊息</DialogTitle>
            <DialogContent>
                <DialogContentText minWidth="30vw">
                    以下訊息將送至聊天室 : {props.RoomName}
                </DialogContentText>
                <TextField
                    onChange={handleMsgChange}
                    autoFocus
                    margin="dense"
                    label="測試訊息"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.CloseDialog()}>
                    <Typography sx={{ color: 'whitesmoke' }}>
                        取消
                    </Typography>
                </Button>
                <Button onClick={sendMessage}>
                    <Typography sx={{ color: 'whitesmoke' }}>
                        發送
                    </Typography>
                </Button>
            </DialogActions>
        </Box >
    )
}

export default sendMessageBox