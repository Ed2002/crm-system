import { Menu } from "./components/Menu"
import { ItemMenu } from "./components/Menu/types"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Page } from "./components/Page";
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Input } from "./components/Forms/Input";
import { LoadButton } from "./components/Buttons/LoadButton";
import { MenuItem } from "@mui/material";
import { SelectInput } from "./components/Forms/Select";
import { InputCheckBox } from "./components/Forms/CheckBox";
import { TBody, THead, Table, Td, Th, Tr } from "./components/Table";
import { Card } from "./components/Card";


function App() {

  const formRef = useRef<FormHandles>(null);
  
  function handleSubmit(data: any) {
    console.log(data)
  }

  const menuItems:Array<ItemMenu> = [
    {
      Icon: <AccountCircleIcon/>,
      Link: "https://www.w3schools.com/tags/att_a_target.asp",
      Target: "_blank",
      Title: "ABC"
    },
    {
      Icon: <AnalyticsIcon/>,
      Link: "/",
      Target: "_self",
      Title: "ABC"
    }
  ];

  return (
    <Menu MenuItems={menuItems}>
      <Page Title="dasgsa" >
      <Form onSubmit={handleSubmit} ref={formRef}>
          <Input variant="filled" name="TesteNome" label="TesteLabel"/>
          <SelectInput name="TesteSelect" label="TesteLabel">
            <MenuItem value="TesteValue">TesteMenuItem</MenuItem>
            <MenuItem value="TesteValue2">TesteMenuItem2</MenuItem>
          </SelectInput>
          <InputCheckBox name="TesteCheckBox" label="TesteLabelCheckBox"/>
          <LoadButton variant="contained" name="TesteLoadButton" title="TesteTitleButton" type="submit"/>
        </Form>

        <Table>
          <THead>
            <tr>
              <Th>TesteTable</Th>
            </tr>
          </THead>
          <TBody>
            <Tr>
              <Td>TesteTBody</Td>
            </Tr>
            <Tr>
              <Td>TesteTBody1</Td>
            </Tr>
            <Tr>
              <Td>TesteTBody2</Td>
            </Tr>
            <Tr>
              <Td>TesteTBody3</Td>
            </Tr>
            <Tr>
              <Td>TesteTBody4</Td>
            </Tr>
          </TBody>
        </Table>

        <Card>
          <h1>TesteCard</h1>
          <h2>TesteCard</h2>
          <h3>TesteCard</h3>
          <h4>TesteCard</h4>
          <p>TesteCard</p>
        </Card>
      </Page>
    </Menu>
  )
}

export default App
