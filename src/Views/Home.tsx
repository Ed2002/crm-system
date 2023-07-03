import { Card } from "../components/Card";
import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <Page Title="Project X">
      <Grid container spacing={1} sx={{ "& > :not(style)": { marginTop: "16px" } }}>
        <Grid item xs={4}>
          <Card>
            <h3>Novos Clientes Cadastrados</h3>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <h3>Clientes Aguardando Atendimento</h3>
          </Card>
        </Grid>

        <Grid item xs={4}>
          <Card>
            <h3>Finalizados</h3>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <h1>Relatório Aqui</h1>
      </Card>
    </Page>
  );
}

export default Home;
