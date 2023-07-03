import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useSnackbar, enqueueSnackbar } from 'notistack';
import { Grid, Grow, IconButton, MenuItem, Stack } from "@mui/material";
import { Modal } from "../components/Modal";
import { Card } from "../components/Card";

import { GetAuthToken, GetToken } from "../services/auth";
import { CardProject } from "../components/CardProject";
import { useNavigate } from "react-router-dom";
import { SaveProject } from "../services/project";
import { ProjectType } from "../types/ApiTypes";
import { Loanding } from "../components/Loanding";
import * as Yup from 'yup';
import { InputCheckBox } from "../components/Forms/CheckBox";

export const Project = () => {
  const formRef = useRef<FormHandles>(null);
  const formUpdateRef = useRef<FormHandles>(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [Projects,SetProjects] = useState<Array<ProjectType>>([]);
  const [Search,SetSearch] = useState<boolean>(true);
  const [Project,SetProject] = useState<ProjectType>(null);

  const [ModalAdd, SetModalAdd] = useState<boolean>(false);
  const [ModalUpdate, SetModalUpdate] = useState<boolean>(false);
  
  const handleSearch = () => {
    SetSearch(true);
    API.get(`${import.meta.env.VITE_API_URL}Project`,{
      params:{
        "PageSize": 9999,
        "Page": 1,
        "idUserOwner": Number(GetAuthToken()?.sub)
      },
      headers:{
        Authorization: `Bearer ${GetToken()}`
      }
    }).then(response => {
      var list = response.data;
      if(list.success)
      {
        SetSearch(false);
        SetProjects(list.model.values);
      }
      else
      {
        enqueueSnackbar({
          message: list.menssages[0],
          variant: 'error'
        })
      }
    }).catch(err => {
      console.log(err);
      enqueueSnackbar({
        message: "Erro em nosso servidor tente mais tarde!",
        variant: 'warning'
      })
    })
  }

  const handleAdd = async (data:ProjectType) => {
    try
    {
      const schema = Yup.object().shape({
        name: Yup.string().required("O Nome é obrigatório"),
        description: Yup.string().required("A descrição é obrigatório"),
      })

      await schema.validate(data, {
          abortEarly: false,
        });

      data.idUserOwner = Number(GetAuthToken()?.sub)
      data.photo = '';
      data.status = true;
      data.createdAt = new Date().toISOString();

      API.post(`${import.meta.env.VITE_API_URL}Project`,data,{
        headers:{
          Authorization: `Bearer ${GetToken()}`
        }
      }).then(response => {
        const add = response.data;
        if(add.success)
        {
          enqueueSnackbar({
            message: `Projeto criado ${add.model}!`,
            variant: 'info'
          })
          handleCloseModal();
          handleSearch();
        }
        else
        {
          /*enqueueSnackbar({
            //message: add.menssages[0],
            //variant: 'error'
          })*/
        }
      })
      .catch(err => {
          console.log(err);
          enqueueSnackbar({
              message: "Erro em nosso servidor tente mais tarde!",
              variant: 'warning'
          })
      })

    }
    catch(err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
            });
            formRef.current.setErrors(validationErrors);
        }
    }
  }

  useEffect(()=>{
    return () => handleSearch();
  },[]);

  const handleOpenModal = () => {
    SetModalAdd(true);
  };
  const handleCloseModal = () => {
    SetModalAdd(false);
  };

  const handleOpenModalUpdate = () => {
    SetModalUpdate(true);
  };
  const handleCloseModalUpdate = () => {
    SetModalUpdate(false);
  };

  const handleAccess = (IdProject:number) => {
    SaveProject(IdProject.toString());
    navigate(`/${IdProject}/Home`);
  }

  const handleConfig = (Project:ProjectType) => {
    SetProject(Project);
    handleOpenModalUpdate();
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className="backgroud-white">

          <Modal Title="Cadastro de Projeto" Close={handleCloseModal} open={ModalAdd} maxWidth="md" fullWidth>
            <Form ref={formRef} onSubmit={handleAdd}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                  <Input required name="name" label="Nome" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={11}>
                  <Input required name="description" label="Descrição" variant="outlined" fullWidth multiline rows={5}/>
                </Grid>
                <Grid item xs={11} style={{ marginBottom: '30px' }}>
                  <LoadButton variant="contained" name="submit" title="Salvar" type="submit" fullWidth style={{height:"54px"}}/>
                </Grid>
              </Grid>
            </Form>
          </Modal>


          <Modal Title="Atualizar Projeto" Close={handleCloseModalUpdate} open={ModalUpdate} maxWidth="md" fullWidth>
            <Form ref={formUpdateRef} onSubmit={()=>{}}>
              <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={11}>
                  <Input required defaultValue={Project?.name} name="name" label="Nome" variant="outlined" fullWidth/>
                </Grid>
                <Grid item xs={11}>
                  <Input required defaultValue={Project?.description} name="description" label="Descrição" variant="outlined" fullWidth multiline rows={5}/>
                </Grid>
                <Grid item xs={11}>
                  <LoadButton variant="contained" name="status" title={Project?.status ? 'INATIVAR' : 'ATIVAR'} color={Project?.status ? 'error' : 'success'} fullWidth type="button" />
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

            {Search ? (
                <Loanding/>
            ) : (
              <Grow in={!Search}>
                <Grid container sx={{marginTop: 4}}>
                    <Grid item xs={12}>
                        {Projects.length ? (
                          <Stack spacing={1}  useFlexGap flexWrap="wrap" maxWidth="100%" direction="row" justifyContent="center" alignItems="center">
                            {Projects.map(item => (
                              <CardProject ProjectId={item.id} ProjectName={item.name} FuncSettings={()=>{handleConfig(item)}} FuncAccess={()=>{handleAccess(item.id)}}/>
                            ))}
                          </Stack>
                        ) : (
                          <Stack spacing={2} maxWidth="90%" direction="row" justifyContent="center" alignItems="baseline">
                            <h3 className="center">Sem Projetos Ainda!</h3>
                          </Stack>
                        )}
                        
                    </Grid>
                </Grid>
              </Grow>
            )}
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
