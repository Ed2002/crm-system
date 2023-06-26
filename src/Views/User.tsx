import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { FormHandles } from "@unform/core";
import { Form } from '@unform/web';
import { Input } from "../components/Forms/Input/index";
import { useRef, useState } from "react";
import { LoadButton } from "../components/Buttons/LoadButton/index";

export const User = () => {
    const formRef = useRef<FormHandles>(null);
    const [Change,SetChange] = useState<boolean>(true);
    return (
        <div className="gradient">
            <Page Title="Olá Eduardo">
                <Stack spacing={2} sx={{textAlign:'center'}}>
                    <Avatar
                        alt="EduardoDuarte"
                        src="/photo.png"
                        sx={{ width: 90, height: 90 }}
                    />
                    <h2>Eduardo Duarte</h2>
                    <div className="center" >
                        <Chip sx={{width: 100}} label="ATIVO" color="success" variant="outlined" />
                    </div>
                    <Form ref={formRef} onSubmit={()=>{}}>
                        <Input name="email" value="ed@mail.com" label="E-mail" disabled={Change} type="email" fullWidth sx={{marginTop: 4}}/>
                        <Input name="telefone" value="(47) 9 9999-9999" label="Telefone" disabled={Change} type="tel" fullWidth sx={{marginTop: 4}}/>
                        <LoadButton title="Alterar Dados" onClick={()=>{SetChange(!Change)}}/>
                    </Form>
                </Stack>
            </Page>
        </div>
    );
}