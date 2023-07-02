import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { useSnackbar } from 'notistack';
import { SelectInput } from "../components/Forms/Select";
import { Grid, IconButton, MenuItem } from "@mui/material";
import { Modal } from "../components/Modal";
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Client = () => {
  const formRef = useRef<FormHandles>(null);
  const { enqueueSnackbar } = useSnackbar();

  interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    document: string;
    status: number;
  }

  const [clients, setClients] = useState<Client[]>([]);
  const [registrationFormData, setRegistrationFormData] = useState({
    name: '',
    email: '',
    phone: '',
    document: '',
  });
  const [searchFormData, setSearchFormData] = useState({
    name: '',
    email: '',
    status: '',
    document: '',
  });

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await API.get("/ClientCrm");
        setClients(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClients();
  }, []);

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const formSearchRef = useRef<FormHandles>(null);
  const formModalRef = useRef<FormHandles>(null);

  function handleSearch(data: any) {
    const { name, email, status } = data;
  
    const filteredClients = clients.filter((client) => {
      const clientName = client.name.toLowerCase();
      const clientEmail = client.email.toLowerCase();
      const clientStatus = client.status === "true" ? "Ativo" : "Inativo";
  
      const nameMatch = clientName.includes(name.toLowerCase());
      const emailMatch = clientEmail.includes(email.toLowerCase());
      const statusMatch = status === "" || clientStatus.includes(status);
  
      return nameMatch && emailMatch && statusMatch;
    });
  
    setClients(filteredClients);
  }  
  
  async function handleSubmit(data: any) {
    try {
      const response = await API.post("/ClientCrm", data);
      const newClient: Client = response.data;
      
      setClients([...clients, newClient]);
  
      enqueueSnackbar("Cliente cadastrado com sucesso!", { variant: "success" });
  
      setRegistrationFormData({
        name: '',
        email: '',
        phone: '',
        document: '',
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar("Erro ao cadastrar cliente!", { variant: "error" });
    }
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
              value={searchFormData.name}
              onChange={(e) =>
                setSearchFormData({ ...searchFormData, name: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              name="email"
              label="E-mail"
              variant="outlined"
              fullWidth
              value={searchFormData.email}
              onChange={(e) =>
                setSearchFormData({ ...searchFormData, email: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <SelectInput
              name="status"
              label="Status"
              variant="outlined"
              fullWidth
              value={searchFormData.status}
              onChange={(e) =>
                setSearchFormData({ ...searchFormData, status: e.target.value })
              }
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
        <Form ref={formModalRef} onSubmit={handleSubmit}>
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
                value={registrationFormData.name}
                onChange={(e) =>
                  setRegistrationFormData({ ...registrationFormData, name: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={11}>
              <Input
                name="email"
                label="E-mail"
                variant="outlined"
                fullWidth
                value={registrationFormData.email}
                onChange={(e) =>
                  setRegistrationFormData({ ...registrationFormData, email: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={11}>
              <Input
                name="phone"
                label="Telefone"
                variant="outlined"
                fullWidth
                value={registrationFormData.phone}
                onChange={(e) =>
                  setRegistrationFormData({ ...registrationFormData, phone: e.target.value })
                }
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
          {clients.map((client) => (
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
