import IconButton from "@mui/material/IconButton";
import { Card } from "../Card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from "@mui/material/Tooltip";

interface ICardProject {
    ProjectId: number;
    ProjectName: string;
    FuncSettings?: ()=>void;
    FuncAccess?: ()=>void;
}

export const CardProject = ({ProjectId, ProjectName, FuncSettings, FuncAccess}:ICardProject) => {
    return (
        <Card style={{position: "relative", height: "200px", minWidth: '20%', maxWidth: '20%' }}>
            <Typography noWrap component='h3'>{ProjectName}</Typography>
            <Tooltip title="Acessar">
                <IconButton
                style={{
                    position: "absolute",
                    right: "10px",
                    bottom: "10px",
                    zIndex: 1,
                    fontSize: "35px",
                }}
                size="small"
                onClick={FuncAccess}
                >
                    <ArrowForwardIcon fontSize="inherit" style={{ color: "green" }} />
                </IconButton>
            </Tooltip>
            <Tooltip title="Configurações">
            <IconButton
            style={{
                position: "absolute",
                right: "80%",
                bottom: "10px",
                zIndex: 1,
                fontSize: "35px",
            }}
            size="small"
            onClick={FuncSettings}
            >
                <SettingsIcon fontSize="inherit" style={{ color: "gray" }} />
            </IconButton>
            </Tooltip>
        </Card>
    )
}