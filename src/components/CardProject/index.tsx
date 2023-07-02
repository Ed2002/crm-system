import IconButton from "@mui/material/IconButton";
import { Card } from "../Card";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SettingsIcon from '@mui/icons-material/Settings';

interface ICardProject {
    ProjectId: number;
    ProjectName: string;
    FuncSettings?: ()=>void;
}

export const CardProject = ({ProjectId, ProjectName, FuncSettings}:ICardProject) => {

    const navigate = useNavigate();

    return (
        <Card style={{position: "relative", height: "200px", minWidth: '20%', maxWidth: '20%' }}>
            <Typography noWrap component='h3'>{ProjectName}</Typography>
            <IconButton
            style={{
                position: "absolute",
                right: "10px",
                bottom: "10px",
                zIndex: 1,
                fontSize: "35px",
            }}
            size="small"
            onClick={() => {
                navigate(`/${ProjectId}/Home/`)
            }}
            >
                <ArrowForwardIcon fontSize="inherit" style={{ color: "green" }} />
            </IconButton>
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
        </Card>
    )
}