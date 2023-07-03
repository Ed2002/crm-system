import { FormHandles } from "@unform/core/typings/types";
import { Card } from "../components/Card";
import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import { ClientType } from "../types/ApiTypes";
import { useRef, useState, useEffect } from "react";
import { API } from "../services/axios";
import { GetToken } from "../services/auth";
import { GetProject } from "../services/project";

export const Home = () => {
  
  const formRef = useRef<FormHandles>(null);
  const [totalClients, setTotalClients] = useState<number>(0);
  const [activeClients, setActiveClients] = useState<number>(0);
  const [inactiveClients, setInactiveClients] = useState<number>(0);

  useEffect(() => {
    const fetchClientsData = async () => {
      try {
        const response = await API.get(`${import.meta.env.VITE_API_URL}ClientCrm`, {
          params: {
            projectId: Number(GetProject()),
          },
          headers: {
            Authorization: `Bearer ${GetToken()}`,
          },
        });

        const { data } = response;

        if (data.success) {
          const clients = data.clients;
          const total = clients.length;
          const active = clients.filter((client: ClientType) => client.status === true).length;
          const inactive = clients.filter((client: ClientType) => client.status === false).length;

          setTotalClients(total);
          setActiveClients(active);
          setInactiveClients(inactive);
        } else {
          console.log("Error:", data.messages[0]);
        }
      } catch (error) {
        console.log("Error:", error.message);
      }
    };

    fetchClientsData();
  }, []);

  return (
    <Page Title="Dados Projeto">
      <Grid container spacing={1} sx={{ "& > :not(style)": { marginTop: "16px" } }}>
        <Grid item xs={4}>
          <Card>
            <h3>Quantidade de Clientes</h3>
            <p>{totalClients}</p>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <h3>Clientes Ativos</h3>
            <p>{activeClients}</p>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <h3>Clientes Inativos</h3>
            <p>{inactiveClients}</p>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <h1>Relatório Aqui</h1>
      </Card>
    </Page>
  );
};

export default Home;
