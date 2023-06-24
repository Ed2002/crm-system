import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { SelectInput } from "../components/Forms/Select";
import { Grid, IconButton, MenuItem } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal } from "../components/Modal";

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

  const [ModalTeste, SetModalTeste] = useState<boolean>(false);
  
  const handleOpenModal = () => {
    SetModalTeste(true);
  };
  const handleCloseModal = () => {
    SetModalTeste(false);
  };

  return (
    <Page Title="E-mails">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={1}
            sx={{
              '& > :not(style)': { marginTop: '16px' },
            }}>
          <Grid item xs={4}>
            <Input name="name" label="Título" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={4}>
            <Input name="email" label="E-mail" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={2}>
            <SelectInput name="status" label="Status" variant="outlined" fullWidth>
              <MenuItem value="true">Enviado</MenuItem>
              <MenuItem value="false">Não Enviado</MenuItem>
            </SelectInput>
          </Grid>
          <Grid item xs={1}>
            <LoadButton variant="contained" name="submit" title="Pesquisar" type="submit" fullWidth style={{height:"54px"}}/>
          </Grid>
          <Grid item xs={1}>
            <LoadButton variant="outlined" name="newMail" title="Novo" type="button" onClick={handleOpenModal} fullWidth style={{height:"54px"}}/>
          </Grid>
        </Grid>
      </Form>

      <Modal Title="Cadastro de Clietes" Close={handleCloseModal} open={ModalTeste} maxWidth="md" fullWidth >
        <p>Fazer</p>
      </Modal>

      <Table style={{ marginTop: '40px'}}>
        <THead>
          <tr style={{textAlign: "left"}}>
            <Th>Nome</Th>
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
            <Td><IconButton aria-label="delete" size="small"> <MoreVertIcon fontSize="inherit" style={{color:"green"}}/></IconButton></Td>
          </Tr>
        </TBody>
      </Table>
    </Page>
  )
}

export default Mail;
