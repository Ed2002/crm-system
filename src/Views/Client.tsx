import { useEffect, useRef } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { FormHandles } from "@unform/core";
import { SelectInput } from "../components/Forms/Select";
import { MenuItem } from "@mui/material";

export const Client = () => {

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

    useEffect(()=>{
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
    },[]);

function handleSubmit(data:any) {
    console.log(data);
}

    return (

        <Page Title="Clientes">
            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input name="name" label="Nome"/>
                <Input name="email" label="E-mail"/>
                <LoadButton variant="contained" name="submit" title="Pesquisar" type="submit"/>
                <LoadButton variant="contained" name="submit" title="Cadastrar" type="submit"/>
            </Form>

            <Table>
                <THead>
                    <tr>
                        <Th>Nome</Th>
                        <Th>E-mail</Th>
                        <Th>Telefone</Th>
                        <Th>Status</Th>
                        <Th>Ações</Th>
                    </tr>
                </THead>
                <TBody>
                    <Tr>
                        <Td>Teste1</Td>
                        <Td>Teste1</Td>
                        <Td>Teste1</Td>
                        <Td>Teste1</Td>
                        <Td>Teste1</Td>
                    </Tr>
                </TBody>
            </Table>
        </Page>
    )

}

export default Client;
