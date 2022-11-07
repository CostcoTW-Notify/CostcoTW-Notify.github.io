
import {
    Backdrop,
    Dialog,
    DialogContent,
    DialogTitle
} from '@mui/material'

interface ISuccess {
    Show: boolean
    OnClose: Function
}

const success: React.FC<ISuccess> = (props) => {


    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.Show}
            onClick={() => props.OnClose()}
        >
            <Dialog
                open
            >
                <DialogContent>

                    OK!
                </DialogContent>
            </Dialog>
        </Backdrop>
    )
}

export default success