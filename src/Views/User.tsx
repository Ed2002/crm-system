import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { FormHandles } from "@unform/core";
import { Form } from '@unform/web';
import { Input } from "../components/Forms/Input/index";
import { useEffect, useRef, useState } from "react";
import { LoadButton } from "../components/Buttons/LoadButton/index";
import { API } from "../services/axios";
import { GetAuthToken, GetToken } from "../services/auth";
import { UserType } from "../types/ApiTypes";
import { enqueueSnackbar } from "notistack";
import CircularProgress from "@mui/material/CircularProgress";
import { Loanding } from "../components/Loanding";
import Grow from "@mui/material/Grow";
import * as Yup from 'yup';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const User = () => {
    const formRef = useRef<FormHandles>(null);
    const [Change,SetChange] = useState<boolean>(true);
    const [User,SetUser] = useState<UserType>(null);
    const [Search,SetSearch] = useState<boolean>(true);


    const callUserData = () => {
        API.get(`${import.meta.env.VITE_API_URL}User`,{
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
                SetUser(data.model.values[0]);
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

    useEffect(()=>{
        return () => callUserData();
    },[]);

    const handleUpdate = async (data:UserType) => {
        try
        {
            const schema = Yup.object().shape({
                name: Yup.string().required("O Nome é obrigatório"),
                email: Yup.string().email().required("O E-mail é obrigatório"),
            })
    
            await schema.validate(data, {
                abortEarly: false,
              });
            
            data.id = Number(GetAuthToken()?.sub);
            data.status = User.status;

            API.put(`${import.meta.env.VITE_API_URL}User`,data,{
                headers:{
                    Authorization: `Bearer ${GetToken()}`
                }
            }).then(response => {
                var cad = response.data;
                if(cad.success)
                {
                    enqueueSnackbar({
                        message: "Dados Atualizados!",
                        variant: 'info'
                    })
                    SetChange(!Change);
                    callUserData();
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
        <div className="gradient">
            <Page Title="">
                <IconButton
                    sx={{ position: 'fixed', left: 60 }}
                    onClick={() => {
                        window.location.href = ':IdProject/Home';
                    }}
                >
                    <ArrowBackIcon />
                </IconButton>

                {Search ? (
                    <Loanding/>
                ) : (
                    <Grow in={!Search}>
                        <Stack spacing={2} sx={{textAlign:'center', marginBottom: 5}}>
                            <div className="avatar-container">
                                <Avatar
                                    alt={User.name}
                                    src={User.photo}
                                    sx={{ width: 90, height: 90, display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center' }}
                                />
                            </div>
                            <h2>{User.name}</h2>
                            <div className="center" >
                                {User.status ? (
                                    <Chip sx={{width: 100}} label="ATIVO" color="success" variant="outlined" />
                                ) : (
                                    <Chip sx={{width: 100}} label="INATIVO" color="error" variant="outlined" />
                                )}
                            </div>
                            <Form ref={formRef} onSubmit={handleUpdate}>
                                <Input name="name" defaultValue={User.name} required label="Nome" disabled={Change} type="text" fullWidth sx={{marginTop: 4}}/>
                                <Input name="photo" defaultValue={User.photo ?? ''} label="Avatar" placeholder="Avatar url" disabled={Change} type="text" fullWidth sx={{marginTop: 4}}/>
                                <Input name="email" defaultValue={User.email} required label="E-mail" disabled={Change} type="email" fullWidth sx={{marginTop: 4}}/>
                                <Input name="phone" defaultValue={User.phone ?? ''} label="Telefone" placeholder="(XX) X XXXX-XXXX" disabled={Change} type="tel" fullWidth sx={{marginTop: 4}}/>
                                <LoadButton name="update-data" title="Alterar Dados" size="large" type="button" onClick={()=>{SetChange(!Change)}} sx={{marginTop: 4}} fullWidth/>
                                {!Change ? (
                                    <LoadButton name="update-submit" title="Salvar Alterações" size="large" type="submit" variant="contained" sx={{marginTop: 4}} fullWidth/>
                                    
                                ) : ''}
                            </Form>
                        </Stack>
                    </Grow>
                )}
            </Page>
        </div>
    );
}
