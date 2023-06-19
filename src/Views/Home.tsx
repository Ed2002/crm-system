import { Page } from "../components/Page";
import { Card } from "../components/Card";



function Home() {

  
  return (
      <Page Title="Project X">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Card style={{ flex: '1', marginRight: '10px' }}>
            <h3>Novos Clientes Cadastrados</h3>
          </Card>
  
          <Card style={{ flex: '1', marginRight: '10px' }}>
            <h3>Clientes Aguardando Atendimento</h3>
          </Card>
  
          <Card style={{ flex: '1' }}>
            <h3>Finalizados</h3>
          </Card>
        </div>

        <Card>
          <h1>Relatório Aqui</h1>
        </Card>

      </Page>
  )  
}

export default Home;
