import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { SelectInput } from "../components/Forms/Select";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { Modal } from "../components/Modal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);
  const { enqueueSnackbar } = useSnackbar();

  function teste() {
    API.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(({data}) => {
        enqueueSnackbar({
           message: 'Requisição API feita com sucesso',
           variant: "success" 
        });
        console.log(data);
      })
      .catch(err => {
        enqueueSnackbar({
            message: 'Erro na requisição API',
            variant: "success" 
         });
        console.log(err);
      })
  };

  useEffect(() => {
    const exhttp = () => {
      API.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(({data}) => {
          enqueueSnackbar({
            message: 'Requisição API feita com sucesso',
            variant: "success" 
          });
          console.log(data);
        })
        .catch(err => {
          enqueueSnackbar({
            message: 'Erro na requisição API',
            variant: "success" 
          });
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

    <Page Title="Clientes">
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={1}
            sx={{
              '& > :not(style)': { marginTop: '16px' },
            }}>
          <Grid item xs={4}>
            <Input name="name" label="Nome" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={4}>
            <Input name="email" label="E-mail" variant="outlined" fullWidth/>
          </Grid>
          <Grid item xs={2}>
            <SelectInput name="status" label="Status" variant="outlined" fullWidth>
              <MenuItem value="true">Ativo</MenuItem>
              <MenuItem value="false">Inativo</MenuItem>
            </SelectInput>
          </Grid>
          <Grid item xs={1}>
            <LoadButton variant="contained" name="submit" title="Pesquisar" type="submit" fullWidth style={{height:"54px"}}/>
          </Grid>
          <Grid item xs={1}>
            <LoadButton variant="outlined" name="cadastrar" title="Cadastrar" type="button" onClick={handleOpenModal} fullWidth style={{height:"54px"}}/>
          </Grid>
        </Grid>
      </Form>

      <Modal Title="Cadastro de Clietes" Close={handleCloseModal} open={ModalTeste} maxWidth="md" fullWidth>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={11}>
              <Input name="name" label="Nome" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={11}>
              <Input name="email" label="E-mail" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={11}>
              <Input name="phone" label="Telefone" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={11}>
              <Input name="document" label="CPF" variant="outlined" fullWidth/>
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '30px' }}>
              <LoadButton variant="contained" name="submit" title="Cadastrar" type="submit" fullWidth style={{height:"54px"}}/>
            </Grid>
          </Grid>
        </Form>
      </Modal>

      <Table style={{ marginTop: '40px'}}>
        <THead>
          <tr style={{textAlign: "left"}}>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </THead>
        <TBody>
          <Tr>
            <Td>Teste1</Td>
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

export default Client;
