import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyToken } from "./auth";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
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
                enqueueSnackbar({
                    message: "Faça o login",
                    variant: "error"
                });
                setTimeout(()=>{
                    navigate("/login");
                },2000);
            }
        }
        return () => handleAuth();
    }),[]);

    return (
        <>
        </>
    )
}