import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { LoadButton } from "../../components/Buttons/LoadButton";
import { Input } from "../../components/Forms/Input";
import { Form } from '@unform/web';
import { useRef } from "react";
import { FormHandles } from "@unform/core";
import './index.css';
import { RegisterType } from "../../types/registertype";
import * as Yup from 'yup';
import { API } from "../../services/axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { SaveToken } from "../../services/auth";

export const Register = () => {
    const formRef = useRef<FormHandles>(null);
    const navigate = useNavigate();

    const handleData = async (data:RegisterType) => {
        try
        {
            const schema = Yup.object().shape({
                email: Yup.string().email().required(),
                senha: Yup.string().min(4,"A senha deve conter no minimo 4 caracteres").required(),
                confirmSenha: Yup.string() .oneOf([Yup.ref('senha')], 'As senhas devem ser iguais')
            })
    
            await schema.validate(data, {
                abortEarly: false,
              });

            API.post(`${import.meta.env.VITE_AUTH_API_URL}/Register`,{
                email: data.email,
                password: data.senha  
            }).then(response => {
                var cad = response.data;
                if(cad.success)
                {
                    enqueueSnackbar({
                        message: "Bem vindo a bordo!",
                        variant: 'success'
                    })

                    API.post(`${import.meta.env.VITE_AUTH_API_URL}/Login`,{
                        email: data.email,
                        password: data.senha
                    }).then(response => {
                        var res = response.data;
                        SaveToken(res.model);
                        setTimeout(()=>{
                            navigate(`/User/${cad.model}`)
                        },2000);
                    }).catch(error => {
                        enqueueSnackbar({
                            message: "Erro em nosso servidor tente mais tarde!",
                            variant: 'warning'
                        })
                    });
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
        <div className='RegisterPage'>
            <Paper variant='elevation' elevation={16} className='RegisterCard'>
                <Grid container spacing={2} sx={{
                    padding: 1,
                }}>
                    <Grid item xs={12}>
                        <h2 className='center'>Registre-se</h2>
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
                            <Input name='confirmSenha' required variant='outlined' placeholder='Confirme a Senha' type='password' label="Confirme a Senha" fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadButton size='large' variant='contained' type='submit' title='Cadastrar' name='cadastrarbtn' fullWidth/>
                        </Grid>
                        <Grid item xs={12}>
                            <LoadButton size='large' onClick={()=>{navigate("/Login")}} variant='text' type='button' title='Fazer Login' name='loginbtn' fullWidth/>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </div>
    );
}