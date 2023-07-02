import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { enqueueSnackbar, useSnackbar } from 'notistack';
import { SelectInput } from "../components/Forms/Select";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { Modal } from "../components/Modal";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { GetAuthToken, GetToken } from "../services/auth";
import { ClientType } from "../types/ApiTypes";
import * as Yup from 'yup';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);
  const [Change,SetChange] = useState<boolean>(true);
  const [Clients,SetClients] = useState<Array<ClientType>>([]);
  const [Search,SetSearch] = useState<boolean>(true);

  const callClientData = () => {
    API.get(`${import.meta.env.VITE_API_URL}ClientCrm`,{
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
            SetClients(data.model.values[0]);
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
            message: "Erro em nosso servidor tente mais tarde!",
            variant: 'warning'
        })
    });
}

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  
  const handleCreate = async (data:ClientType) => {
    try
    {
        const schema = Yup.object().shape({
            name: Yup.string().required("O Nome é obrigatório"),
            email: Yup.string().email().required("O E-mail é obrigatório"),
            phone: Yup.string().required("O Telefone é obrigatório"),
            document: Yup.string().required("O CPF é obrigatório"),
        })

        await schema.validate(data, {
            abortEarly: false,
          });

          data.status = 1;
          data.idProject = 0;

          console.log(data);

        API.post(`${import.meta.env.VITE_API_URL}ClientCrm`,data,{
            headers:{
                Authorization: `Bearer ${GetToken()}`
            }
        }).then(response => {
            var cad = response.data;
            if(cad.success)
            {
                enqueueSnackbar({
                    message: "Cliente criado!",
                    variant: 'info'
                })
                SetChange(!Change);
                callClientData();
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

const formSearchRef = useRef<FormHandles>(null);
const formModalRef = useRef<FormHandles>(null);

function handleSearch(data:ClientType) {

  const filteredClients = Clients.filter((client) => {

    if (data.name && !client.name.toLowerCase().includes(data.name.toLowerCase())) {
      return false;
    }
    if (data.email && !client.email.toLowerCase().includes(data.email.toLowerCase())) {
      return false;
    }
    if (data.status !== '' && data.status !== String(client.status)) {
      return false;
    }
    return true;
  });

  SetClients(filteredClients);
}
 
  
  return (
    <Page Title="Clientes">
      <Form ref={formSearchRef} onSubmit={handleSearch}>
        <Grid
          container
          spacing={1}
          sx={{
            '& > :not(style)': { marginTop: '16px' },
          }}
        >
          <Grid item xs={4}>
            <Input
              name="name"
              label="Nome"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              name="email"
              label="E-mail"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <SelectInput
              name="status"
              label="Status"
              variant="outlined"
              fullWidth
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="true">Atendido</MenuItem>
              <MenuItem value="false">Em Atendimento</MenuItem>
              <MenuItem value="false">Não Atendido</MenuItem>
            </SelectInput>
          </Grid>
          <Grid item xs={1}>
            <LoadButton
              variant="contained"
              name="submit"
              title="Pesquisar"
              type="submit"
              fullWidth
              style={{ height: "54px" }}
            />
          </Grid>
          <Grid item xs={1}>
            <LoadButton
              variant="outlined"
              name="cadastrar"
              title="Cadastrar"
              type="button"
              onClick={handleOpenModal}
              fullWidth
              style={{ height: "54px" }}
            />
          </Grid>
        </Grid>
      </Form>

      <Modal
        Title="Cadastro de Clientes"
        Close={handleCloseModal}
        open={modalOpen}
        maxWidth="md"
        fullWidth
      >
        <Form ref={formModalRef} onSubmit={handleCreate}>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={11}>
              <Input
                name="name"
                label="Nome"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <Input
                name="email"
                label="E-mail"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <Input
                name="phone"
                label="Telefone"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11}>
              <Input
                name="document"
                label="CPF"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={11} style={{ marginBottom: '30px' }}>
              <LoadButton
                variant="contained"
                name="submit"
                title="Cadastrar"
                type="submit"
                fullWidth
                style={{ height: "54px" }}
              />
            </Grid>
          </Grid>
        </Form>
      </Modal>

      <Table style={{ marginTop: '40px' }}>
        <THead>
          <tr style={{ textAlign: "left" }}>
            <Th>Nome</Th>
            <Th>E-mail</Th>
            <Th>Telefone</Th>
            <Th>Status</Th>
            <Th>Ações</Th>
          </tr>
        </THead>
        <TBody>
          {Clients.map((client) => (
            <Tr key={client.id}>
              <Td>{client.name}</Td>
              <Td>{client.email}</Td>
              <Td>{client.phone}</Td>
              <Td>{client.status}</Td>
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
  );
};

export default Client;
