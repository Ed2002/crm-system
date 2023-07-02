import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Grid, IconButton, MenuItem } from "@mui/material";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const Project = () => {
  const formRef = useRef<FormHandles>(null);
  const { enqueueSnackbar } = useSnackbar();

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
    <div style={{ height: '100vh' }}>
      <div className="gradient" style={{ position: 'relative' }}>
        <Grid container spacing={1}
            sx={{
              '& > :not(style)': { marginTop: '16px', marginRight: '35px', marginLeft: '35px'},
            }}>
          <Grid item xs={4}>
            <h1>Bem vindo, User!</h1>
          </Grid>

          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={9}>
                <h2>Meus Projetos</h2>
              </Grid>
              <Grid item xs={3} textAlign="right">
                <LoadButton variant="outlined" name="addProject" title="Adicionar Projeto" type="button" onClick={handleOpenModal} fullWidth style={{height:"54px"}}/>
              </Grid>
            </Grid>
          </Grid>

          <Modal Title="Cadastro de Projeto" Close={handleCloseModal} open={ModalTeste} maxWidth="md" fullWidth>
            <Form ref={formRef} onSubmit={handleSubmit}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                  <Input name="name" label="Nome" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={11}>
                  <Input name="description" label="Descrição" variant="outlined" fullWidth multiline rows={5}/>
                </Grid>
                <Grid item xs={11}>
                  <Input name="createDate" label="Data de Criação" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={11} style={{ marginBottom: '30px' }}>
                  <LoadButton variant="contained" name="submit" title="Salvar" type="submit" fullWidth style={{height:"54px"}}/>
                </Grid>
              </Grid>
            </Form>
          </Modal>

          <Grid item xs={3}>
            <Card style={{ position: "relative", height: "200px" }}>
              <h3>Project Name</h3>
              <IconButton
                style={{
                  position: "absolute",
                  right: "10px",
                  bottom: "10px",
                  zIndex: 1,
                  fontSize: "35px",
                }}
                aria-label="ArrowForwardIcon"
                size="small"
                onClick={() => {
                  window.location.href = '/';
              }}
              >
                <ArrowForwardIcon fontSize="inherit" style={{ color: "green" }} />
              </IconButton>
            </Card>
          </Grid>

          <Grid item xs={12} textAlign="center" style={{ position: 'absolute', bottom: '0', left: '0', right: '0' }}>
            <p style={{ marginBottom: '16px', fontSize: '20px', fontWeight: 'bold', color: 'white' }}>2023 - CRM</p>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default Project;
