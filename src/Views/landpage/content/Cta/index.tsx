import Grid from "@mui/material/Grid";
import { Button } from "../../components/Button";
import HelloImg from './../../../../assets/hello.svg';
import './../../index.css';
import { Stack } from "@mui/material";
import { Link } from "react-router-dom";

export function Cta() {
  return (
    <Grid container spacing={4} sx={{ marginTop: '5px' }} className="container">
      <Grid item xs={7}>
        <Grid item xs={12}>
          <h2>Comece hoje a <span className="backText text-white">encantar</span> seu cliente!</h2>
        </Grid>
        <Grid item xs={8} sx={{ marginTop: 2 }}>
          <p>
            Crie agora mesmo sua conta gratuita e comece a ter um melhor relacionamento e
            comunicação com o seu cliente, de forma fácil, rápida e profissional.
          </p>
        </Grid>
        <Grid item xs={12}>
          <Stack direction={"row"} sx={{ marginTop: 4 }}>
            <Button
              variant="contained"
              Text="Criar Conta"
              size="large"
              fullWidth
              component={Link}
              to="/Login"
              sx={{ marginRight: 4 }}
            />
            <Button variant="outlined" Text="Saiba Mais" size="large" fullWidth />
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={2} sx={{ marginTop: 2 }}>
        <img src={HelloImg} alt="hello" width="407" height="177" />
      </Grid>
    </Grid>
  )
}
