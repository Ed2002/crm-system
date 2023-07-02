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
import * as Yup from 'yup';
import { GetAuthToken, GetToken } from "../services/auth";
import { enqueueSnackbar } from "notistack";

export const Mail = () => {
  const formRef = useRef<FormHandles>(null);
    const [Change,SetChange] = useState<boolean>(true);
    const [MailTemplates,SetMailTemplates] = useState<Array<MailTemplateType>>([]);
    const [Search,SetSearch] = useState<boolean>(true);

    const callMailTemplateData = () => {
      API.get(`${import.meta.env.VITE_API_URL}MailTemplate`,{
          params:{
              "PageSize": 10,
              "Page":1,
              "Id": Number(GetAuthToken()?.sub)
          },
          headers:{
              Authorization: `Bearer ${GetToken()}`
          }
      }).then(response => {
          let {data} = response;
          if(data.success)
          {
              console.log(data.model.values[0]);
              SetMailTemplates(data.model.values[0]);
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
              message: "Erro na criação do template!",
              variant: 'warning'
          })
      });
  }

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

  const handleCreate = async (data:MailTemplateType) => {
    try
    {
        const schema = Yup.object().shape({
            data: Yup.string().required("O conteúdo é obrigatório"),
        })

        await schema.validate(data, {
            abortEarly: false,
          });

          data.status = 1;

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
                message: "Erro em nosso servidor tente mais tarde!",
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

  return (
    <Page Title="E-mail Templates">
      <Form ref={formRef} onSubmit={handleSubmit}>
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
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item xs={11}>
              <Input name="title" label="Título" variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={11}>
              <Input name="data" label="Conteúdo" variant="outlined" fullWidth multiline rows={5} />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '30px' }}>
              <LoadButton variant="contained" name="submit" title="Enviar" type="submit" fullWidth style={{ height: "54px" }} />
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
              <Td>{mailTemplate.status}</Td>
              <Td>
                <IconButton aria-label="delete" size="small">
                  <MoreVertIcon fontSize="inherit" style={{ color: "green" }} />
                </IconButton>
              </Td>
            </Tr>
          ))}
        </TBody>
      </Table>
    </Page>
  )
}

export default Mail;
