import { useEffect, useRef } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { FormHandles } from "@unform/core";
import { Card } from "../components/Card";

export const Report = () => {
  const formRef = useRef<FormHandles>(null);

  function teste() {
    API.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(({data}) => {
        console.log(data);
      })
      .catch(err => {
        console.log(err);
      })
  };

  useEffect(() => {
    const exhttp = () => {
      API.get('https://jsonplaceholder.typicode.com/todos/1')
        .then(({data}) => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
    }
    return () => exhttp();
  }, []);

  return (
    <Page Title="Relatórios">
        <Card>
          <h1>Projetos - Potencial</h1>
        </Card>
        <Card>
          <h1>Usuários/Projetos</h1>
        </Card>
        <Card>
          <h1>E-mails Enviados</h1>
        </Card>
    </Page>
  )
}

export default Report;
