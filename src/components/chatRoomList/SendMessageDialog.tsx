
import ApiService from '@/services/ApiService'
import {
    Box,
    Button,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    TextField,
} from '@mui/material'

interface ISendMessageBox {
    Id: string
    RoomName: string
    CloseDialog: Function
    ApiService: ApiService
}

const sendMessageBox: React.FC<ISendMessageBox> = (props) => {


    const sendMessage = async (x: any) => {
        const msg = x.target.value
        await props.ApiService.SendMessage(props.Id, msg)
        props.CloseDialog()
    }

    const handleMsgChange = async (x: any) => {

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
                    // id="name"
                    label="測試訊息"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.CloseDialog()}>取消</Button>
                <Button onClick={sendMessage}>發送</Button>
            </DialogActions>
        </Box >
    )
}

export default sendMessageBox