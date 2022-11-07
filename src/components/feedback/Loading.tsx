
import {
    Backdrop,
    CircularProgress
} from '@mui/material'


interface ILoading {
    show: boolean
}

const loading: React.FC<ILoading> = (props) => {

    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={props.show}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default loading