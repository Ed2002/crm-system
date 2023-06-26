import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "./auth";
import { useSnackbar } from "notistack";

export const AuthProvider = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    useEffect((() => {
        const handleAuth = () => {
            if(VerifyToken())
            {
                if(window.location.pathname == "/login")
                {
                    enqueueSnackbar({
                        message: "Você já está logado!",
                        variant: "info"
                    });
                    setTimeout(()=>{
                        navigate("/");
                    },2000)
                }
            }
            else
            {
                if(window.location.pathname !== "/Register")
                {
                    enqueueSnackbar({
                        message: "Faça o login",
                        variant: "error"
                    });
                    setTimeout(()=>{
                        navigate("/Login");
                    },2000);
                }
            }
        }
        return () => handleAuth();
    }),[]);

    return (
        <>
        </>
    )
}