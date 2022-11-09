import {
    Box,
    Tooltip,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    Typography
} from '@mui/material'
import { useState, useEffect } from 'react'
import { IAuthServiceDependency } from '@/interface/components/IAuthServiceDependency'
import { User } from 'oidc-client-ts'
enum LoginMenuItems {
    Logout = "Logout"
}

interface IAppBarDependency extends IAuthServiceDependency { }

const avater: React.FC<IAppBarDependency> = (props) => {
    const loginMenu = Object.values(LoginMenuItems)

    const [loginUser, setLoginUser] = useState<User | null>(null)
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };


    const onUserMenuClick = (item: string) => {
        setAnchorElUser(null)
        if (item === LoginMenuItems.Logout)
            props.AuthService.Logout()
    }


    useEffect(() => {
        const fetchUserInfo = async () => {
            let user = await props.AuthService.GetUserInfo()
            setLoginUser(user)
        }

        fetchUserInfo()
    }, [])

    const showAvatar = () => {
        return (
            <Box>
                <Tooltip title="開啟選單">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={loginUser?.profile.name} src={loginUser?.profile.picture} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={() => setAnchorElUser(null)}
                >
                    {loginMenu.map((item) => (
                        <MenuItem key={item} onClick={() => onUserMenuClick(item)}>
                            <Typography textAlign="center">{item}</Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        )
    }

    return (
        <>
            {loginUser ? showAvatar() : null}
        </>
    )
}

export default avater