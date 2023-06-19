import { Menu } from "../components/Menu"
import { ItemMenu } from "../components/Menu/types"
import { Page } from "../components/Page";
import { Card } from "../components/Card";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';


function Home() {

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
    <Menu MenuItems={menuItems}>
      <Page Title="Project X">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card style={{ flex: '1', marginRight: '10px' }}>
            <h3>Novos Clientes Cadastrados</h3>
          </Card>
  
          <Card style={{ flex: '1', marginRight: '10px' }}>
            <h3>Clientes Aguardando Atendimento</h3>
          </Card>
  
          <Card style={{ flex: '1' }}>
            <h3>Finalizados</h3>
          </Card>
        </div>

        <Card>
          <h1>Relatório Aqui</h1>
        </Card>

      </Page>
    </Menu>
  )  
}

export default Home;
