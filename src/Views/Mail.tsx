import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { SelectInput } from "../components/Forms/Select";
import { Grid, IconButton, MenuItem, Tooltip } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Modal } from "../components/Modal";
import * as Yup from 'yup';
import { GetAuthToken, GetToken } from "../services/auth";
import { enqueueSnackbar } from "notistack";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { MailTemplateType } from "../types/ApiTypes";
import { Pag } from "../components/Pagination";
import Menu from '@mui/material/Menu';

export const Mail = () => {
  const formRef = useRef<FormHandles>(null);
  const [Change,SetChange] = useState<boolean>(true);
  const [MailTemplates,SetMailTemplates] = useState<Array<MailTemplateType>>([]);
  const [Search,SetSearch] = useState<boolean>(true);
  const [Pagina,SetPagina] = useState<number>(1);
  const [Total,SetTotal] = useState<number>(1);
  const [selectedMailTemplate, setSelectedMailTemplate] = useState<MailTemplateType | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const callMailTemplateData = () => {
      API.get(`${import.meta.env.VITE_API_URL}MailTemplate`,{
          params:{
              "PageSize": 10,
              "Page": Pagina
          },
          headers:{
              Authorization: `Bearer ${GetToken()}`
          }
      }).then(response => {
          let {data} = response;
          if(data.success)
          {
              SetMailTemplates(data.model.values);
              SetTotal(data.model.totalPages);
              SetSearch(false);
          }
          else
          {
              enqueueSnackbar({
                  message: data.menssages[0],
                  variant: 'error'
              })
          }
      })
      .catch(err => {
          enqueueSnackbar({
              message: "Erro em nosso servidor, tente mais tarde!",
              variant: 'warning'
          })
      });
  }

  useEffect(() => {
    return () => callMailTemplateData();
   },[])

  const [ModalTeste, SetModalTeste] = useState<boolean>(false);
  
  const handleOpenModal = () => {
    SetModalTeste(true);
  };
  const handleCloseModal = () => {
    SetModalTeste(false);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, mailTemplate: MailTemplateType) => {
    setAnchorEl(event.currentTarget);
    setSelectedMailTemplate(mailTemplate); 
  };
  
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleDelete = (mailTemplate: MailTemplateType | null) => {
   
  };
  
  const handleStatusChange = (mailTemplate: MailTemplateType | null, status: boolean) => {
   
  };

  const handleCreate = async (data:MailTemplateType) => {
    try
    {
        const schema = Yup.object().shape({
            title: Yup.string().required("O título é obrigatório"),
            data: Yup.string().required("O conteúdo é obrigatório"),
        })

        await schema.validate(data, {
            abortEarly: false,
          });

          data.status = true;

          console.log(data);

        API.post(`${import.meta.env.VITE_API_URL}MailTemplate`,data,{
            headers:{
                Authorization: `Bearer ${GetToken()}`
            }
        }).then(response => {
            var cad = response.data;
            if(cad.success)
            {
                enqueueSnackbar({
                    message: "Template criado!",
                    variant: 'info'
                })
                SetChange(!Change);
                callMailTemplateData();
            }
            else
            {
                enqueueSnackbar({
                    message: cad.menssages[0],
                    variant: 'error'
                })
            }
        }).catch(err => {
            console.log(err);
            enqueueSnackbar({
                message: "Erro em nosso servidor, tente mais tarde!",
                variant: 'warning'
            })
        });
    }
    catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
            err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
            });
            formRef.current.setErrors(validationErrors);
        }
    }
}

  const convertStatus = (status:boolean) => {
    switch(status)
    {
      case true:
        return (<Tooltip title="Ativo" placement="left">
              <CheckOutlinedIcon color="success"/>
            </Tooltip>);
      case false:
        return (<Tooltip title="Inativo" placement="left">
              <CancelOutlinedIcon color="error"/>
            </Tooltip>);
    }
  }

  const formSearchRef = useRef<FormHandles>(null);
  const formModalRef = useRef<FormHandles>(null);

  useEffect(()=>{
    formSearchRef.current?.submitForm();
  },[Pagina])

const handleSearch = (data:any) => {
    API.get(`${import.meta.env.VITE_API_URL}MailTemplate`,{
      params:{
          "PageSize": 10,
          "Page": Pagina,
          "Title": data.title
      },
      headers:{
          Authorization: `Bearer ${GetToken()}`
      }
  }).then(response => {
      let {data} = response;
      if(data.success)
      {
        SetMailTemplates(data.model.values);
        SetTotal(data.model.totalPages);
          SetSearch(false);
      }
      else
      {
          enqueueSnackbar({
              message: data.menssages[0],
              variant: 'error'
          })
      }
  })
  .catch(err => {
      enqueueSnackbar({
          message: "Erro em nosso servidor, tente mais tarde!",
          variant: 'warning'
      })
  });
}

  return (
    <Page Title="E-mail Templates">
      <Form ref={formSearchRef} onSubmit={handleSearch}>
        <Grid container spacing={1}
            sx={{
              '& > :not(style)': { marginTop: '16px' },
            }}>
          <Grid item xs={8}>
            <Input name="title" label="Título" variant="outlined" fullWidth/>
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
            <LoadButton variant="outlined" name="newMail" title="Novo" type="button" onClick={handleOpenModal} fullWidth style={{height:"54px"}}/>
          </Grid>
        </Grid>
      </Form>

      <Modal Title="Envio de E-mails" Close={handleCloseModal} open={ModalTeste} maxWidth="md" fullWidth>
        <Form ref={formModalRef} onSubmit={handleCreate}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={11}>
              <Input name="title" label="Título" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={11}>
              <Input name="data" label="Conteúdo" variant="outlined" fullWidth multiline rows={5} />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '30px' }}>
              <LoadButton variant="contained" name="submit" title="Salvar" type="submit" fullWidth style={{ height: "54px" }} />
            </Grid>
          </Grid>
        </Form>
      </Modal>

      <Table style={{ marginTop: '40px'}}>
        <THead>
          <tr style={{textAlign: "left"}}>
            <Th>Título</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </THead>
        <TBody>
        {MailTemplates.map((mailTemplate) => (
            <Tr key={mailTemplate.id}>
              <Td>{mailTemplate.data}</Td>
              <Td>{convertStatus(mailTemplate.status)}</Td>
              <Td>
                <IconButton aria-label="menu" size="small" onClick={(e) => handleOpenMenu(e, mailTemplate)}>
                  <MoreVertIcon fontSize="inherit" style={{ color: "green" }} />
                </IconButton>
                <Menu
                  id="options-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => handleDelete(selectedMailTemplate)}>Excluir</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(selectedMailTemplate, false)}>Inativar</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(selectedMailTemplate, true)}>Ativar</MenuItem>
                </Menu>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
      <Grid
          container
          spacing={2}
          sx={{marginTop: 2}}
        >
          <Grid item xs={12}>
            <Pag Count={Total} hideNextButton hidePrevButton onChange={(e:any) => {SetPagina(Number(e.target.textContent))}}/>
          </Grid>
        </Grid>
    </Page>
  )
}

export default Mail;
