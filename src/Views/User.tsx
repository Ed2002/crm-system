import { Page } from "../components/Page";
import Grid from "@mui/material/Grid";
import Avatar from '@mui/material/Avatar';

export const User = () => {
    return (
        <div className="gradient">
            <Page Title="Olá Eduardo">
                <Grid container spacing={2} sx={{padding: 4}}>
                    <Grid item xs={6}>
                        <Avatar
                            alt="EduardoDuarte"
                            src="/photo.png"
                            sx={{ width: 90, height: 90 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <h2>Eduardo Duarte</h2>
                    </Grid>
                </Grid>
            </Page>
        </div>
    );
}