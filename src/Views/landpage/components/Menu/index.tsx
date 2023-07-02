import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar";

export const Menu = () => {
    return (
        <>
            <AppBar
            style={{
                backgroundColor: 'var(--green)',
                color: '#fff',
            }}
            >
            <Toolbar>
                <h3>CRM</h3>
            </Toolbar>
            </AppBar>
            <Toolbar />
        </>
    );
}