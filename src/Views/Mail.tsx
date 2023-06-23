import { useEffect, useRef } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { SelectInput } from "../components/Forms/Select";
import { MenuItem } from "@mui/material";

export const Mail = () => {
  const formRef = useRef<FormHandles>(null);

  function teste() {
    API.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {
    const exhttp = () => {
      API.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(({data}) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    return () => exhttp();
  }, []);

  function handleSubmit(data: any) {
    console.log(data);
  }

  return (
    <Page Title="E-mails">
      <div style={{ margin: '20px 0' }}>
        <Form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Input name="titulo" label="Título" variant="outlined" style={{ width: '500px' }}/>
          <Input name="email" label="E-mail" variant="outlined" style={{ width: '500px' }}/>
          <Input name="status" label="Status" variant="outlined" style={{ width: '300px' }}/>
          <LoadButton variant="contained" name="submit" title="Pesquisar" type="submit" style={{ height: '50px', width: '200px' }}/>
        </Form>
      </div>

      <Table style={{ marginTop: '40px'}}>
        <THead>
          <tr style={{textAlign: "left"}}>
            <Th>Título</Th>
            <Th>E-mail</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Teste1</Td>
            <Td>Teste1</Td>
            <Td>Teste1</Td>
            <Td><LoadButton variant="contained" name="submit" title="{}" type="submit"/></Td>
          </Tr>
        </TBody>
      </Table>
    </Page>
  )
}

export default Mail;
