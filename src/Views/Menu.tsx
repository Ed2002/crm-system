import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Menu as MenuComponent } from "../components/Menu"
import { ItemMenu } from "../components/Menu/types"
import { SnackbarProvider } from 'notistack';
import { AuthProvider } from '../services/auth_provider';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { GetProject } from '../services/project';

interface IMenu {
    children: React.ReactNode;
}

export const Menu = ({ children }: IMenu) => {
    const menuItems: Array<ItemMenu> = [
        {
            Icon: <HomeOutlinedIcon sx={{ fontSize: 30 }} />,
            Link: `/${Number(GetProject())}/Home`,
            Target: "_self",
            Title: "Home"
        },
        {
            Icon: <PersonOutlineIcon sx={{ fontSize: 30 }} />,
            Link: `/${Number(GetProject())}/Clients`,
            Target: "_self",
            Title: "Usuários"
        },
        {
            Icon: <AssessmentOutlinedIcon sx={{ fontSize: 30 }} />,
            Link: `/${Number(GetProject())}/Report`,
            Target: "_self",
            Title: "Relatórios"
        },
        {
            Icon: <MailOutlineIcon sx={{ fontSize: 30 }} />,
            Link: `/${Number(GetProject())}/Mail`,
            Target: "_self",
            Title: "Mail Marketing"
        },
        {
            Icon: <FormatListBulletedIcon sx={{ fontSize: 30 }} />,
            Link: `/${Number(GetProject())}/Forms`,
            Target: "_self",
            Title: "Formulários"
        },
        {
            Icon: <AccountCircleIcon style={{ fontSize: 45, position: 'fixed', bottom: 40, marginLeft: 23 }} />,
            Link: "/User",
            Target: "_self",
            Title: "Usuário"
        }
    ];

    return (
        <MenuComponent MenuItems={menuItems}>
            <SnackbarProvider>
                {children}
            </SnackbarProvider>
            <AuthProvider />
        </MenuComponent>
    );
}
