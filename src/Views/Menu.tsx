import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Menu as MenuComponent } from "../components/Menu"
import { ItemMenu } from "../components/Menu/types"

interface IMenu {
    children: React.ReactNode;
}


export const Menu = ({children}:IMenu) => {

    const menuItems:Array<ItemMenu> = [
        {
          Icon: <HomeOutlinedIcon/>,
          Link: "/",
          Target: "_self",
          Title: "Home"
        },
        {
          Icon: <PersonOutlineIcon/>,
          Link: "/Client",
          Target: "_self",
          Title: "Users"
        },
        {
          Icon: <AssessmentOutlinedIcon/>,
          Link: "/Report",
          Target: "_self",
          Title: "Reports"
        },
        {
          Icon: <MailOutlineIcon/>,
          Link: "/Mail",
          Target: "_self",
          Title: "Mail Marketing"
        },
        {
          Icon: <FormatListBulletedIcon/>,
          Link: "/Form",
          Target: "_self",
          Title: "Forms"
        }
      ];
    



    return (
        <MenuComponent MenuItems={menuItems}>
        {children} 
        </MenuComponent>
    );
}