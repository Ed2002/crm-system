import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Grid, IconButton, MenuItem, Stack } from "@mui/material";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";

import { GetAuthToken } from "../services/auth";
import { CardProject } from "../components/CardProject";

export const Project = () => {
  const formRef = useRef<FormHandles>(null);
  const { enqueueSnackbar } = useSnackbar();

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
    <div style={{ height: '100vh' }}>
      <div className="backgroud-white">

      <Modal Title="Cadastro de Projeto" Close={handleCloseModal} open={ModalTeste} maxWidth="md" fullWidth>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                  <Input name="name" label="Nome" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={11}>
                  <Input name="description" label="Descrição" variant="outlined" fullWidth multiline rows={5}/>
                </Grid>
                <Grid item xs={11} style={{ marginBottom: '30px' }}>
                  <LoadButton variant="contained" name="submit" title="Salvar" type="submit" fullWidth style={{height:"54px"}}/>
                </Grid>
              </Grid>
            </Form>
          </Modal>


        <Grid container spacing={1}
            sx={{
              '& > :not(style)': { marginTop: '16px', marginRight: '35px', marginLeft: '35px'},
            }}>
          <Grid item xs={4}>
            <h1>Bem vindo, {GetAuthToken()?.name}</h1>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <h2>Meus Projetos</h2>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <LoadButton variant="contained" name="addProject" title="Adicionar Projeto" type="button" onClick={handleOpenModal} fullWidth style={{height:"54px"}}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 4}}>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="baseline">
              <CardProject ProjectId={1} ProjectName="My Teste Project"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project"/>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={2} direction="row" justifyContent="center" alignItems="baseline">
              <CardProject ProjectId={1} ProjectName="My Teste Project"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project asdasdas"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project asdasdasdasdasdasasdasdasdasdasdasasdasdasdasdasdasasdasdasdasdasdas"/>
              <CardProject ProjectId={1} ProjectName="My Teste Project asdasdsadasdasdas"/>
            </Stack>
          </Grid>
        </Grid>

        <Grid container sx={{marginTop: 8, position: 'fixed', bottom: 0}} className="background-gradient">
          <Grid item xs={12} textAlign="center">
            <p style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.46)', marginBottom: '16px', fontSize: '20px', fontWeight: 'bold', color: 'white' }}>2023 - CRM</p>
          </Grid> 
        </Grid>
      </div>
    </div>
  )
}

export default Project;
