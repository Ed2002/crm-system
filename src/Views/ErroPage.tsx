import { useRouteError } from "react-router-dom";
import Grid from "@mui/material/Grid";
import erro from "./../assets/erro.gif";
import { useNavigate } from 'react-router-dom';
import { LoadButton } from "../components/Buttons/LoadButton/index";

export const ErroPage = () => {
    const error = useRouteError();
    const navigate = useNavigate();
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} className="center">
                    <img src={erro} alt="erro-404"/>
                </Grid>
                <Grid item xs={12} className="center" sx={{marginTop: -10}}>
                    <a href="https://storyset.com/technology">Technology illustrations by Storyset</a>
                </Grid>
                <Grid item xs={12} className="center">
                    <h2>Oops...</h2>
                </Grid>
                <Grid item xs={12} className="center">
                    <p><i>{error.statusText || error.message}</i></p>
                </Grid>
                <Grid item xs={12} className="center">
                    <LoadButton title="Voltar para a página inicial" onClick={()=>{navigate("/")}}/>
                </Grid>
            </Grid>
        </>
    );

}