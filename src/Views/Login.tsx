import { Grid, Paper } from '@mui/material';
import { useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Input } from '../components/Forms/Input';
import { LoadButton } from '../components/Buttons/LoadButton';
import { LoginType } from '../types/logintype';
import { API } from '../services/axios';
import { useSnackbar } from 'notistack';
import { SaveToken, VerifyToken } from '../services/auth';
import { useNavigate } from 'react-router-dom';
export const Login = () => {
    const formRef = useRef<FormHandles>(null);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const handleData = (data: LoginType) => {
        API.post(`${import.meta.env.VITE_AUTH_API_URL}/Login`,{
            email: data.email,
            password: data.senha
        }).then(response => {
            var res = response.data;
            if(res.success) {
                SaveToken(res.model);
                enqueueSnackbar({
                    message: 'Login realizado com sucesso!',
                    variant: "success"
                });
                setTimeout(()=>{
                    navigate("/");
                },2000);
            }
            else
            {
                enqueueSnackbar({
                    message: res.menssages[0],
                    variant: "success"
                });
            }
        }).catch(error => {
            enqueueSnackbar({
                message: "Erro em nosso servidor tente mais tarde!",
                variant: 'warning'
            })
        });
    };

    return (
        <div className='gradient'>
            <Paper variant='elevation' elevation={16} className='center-card'>
                <Grid container spacing={2} sx={{
                    padding: 1,
                }}>
                    <Grid item xs={12}>
                        <h2 className='center'>Login</h2>
                    </Grid>
                </Grid>
                <Form ref={formRef} onSubmit={handleData}>
                    <Grid container spacing={2} sx={{
                        padding: 4
                    }}>
                        <Grid item xs={12}>
                            <Input name='email' required variant='outlined' placeholder='E-mail' type='email' label="E-mail" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <Input name='senha' required variant='outlined' placeholder='Senha' type='password' label="Senha" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadButton size='large' variant='contained' type='submit' title='Login' name='loginbtn' fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadButton size='large' onClick={()=>{navigate("/Register")}} variant='outlined' type='button' title='Cadastrar' name='cadastrarbtn' fullWidth/>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    )
};