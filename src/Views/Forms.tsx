import { useEffect, useRef, useState } from "react";
import { API } from "../services/axios";
import { Page } from "../components/Page";
import { LoadButton } from "../components/Buttons/LoadButton";
import { Input } from "../components/Forms/Input";
import { TBody, THead, Table, Td, Th, Tr } from "../components/Table";
import { Form } from "@unform/web";
import { Grid, IconButton, MenuItem, Tooltip } from "@mui/material";
import { SelectInput } from "../components/Forms/Select";
import { Modal } from "../components/Modal";
import { Pag } from "../components/Pagination";
import { FormTemplateType } from "../types/ApiTypes";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { FormHandles } from "@unform/core/typings/types";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import { GetToken } from "../services/auth";
import { enqueueSnackbar } from "notistack";

export const Forms = () => {
    const formRef = useRef<FormHandles>(null);
    const [Change, SetChange] = useState<boolean>(true);
    const [Forms, SetForms] = useState<Array<FormTemplateType>>([]);
    const [Pagina, SetPagina] = useState<number>(1);
    const [Total, SetTotal] = useState<number>(1);
    const [Search, SetSearch] = useState<boolean>(true);
    const [selectedForm, setSelectedForm] = useState<FormTemplateType | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, form: FormTemplateType) => {
        setAnchorEl(event.currentTarget);
        setSelectedForm(form); 
      };
      
      const handleCloseMenu = () => {
        setAnchorEl(null);
      };
    
      const handleDelete = (form: FormTemplateType | null) => {
        if (form) {
            API.delete(`${import.meta.env.VITE_API_URL}FormTemplate/${form.id}`, {
              headers: {
                Authorization: `Bearer ${GetToken()}`
              }
            })
              .then(response => {
                const { data } = response;
                if (data.success) {
                  enqueueSnackbar({
                    message: "Formulário excluído!",
                    variant: 'info'
                  });
                } else {
                  enqueueSnackbar({
                    message: data.menssages[0],
                    variant: 'error'
                  });
                }
              })
              .catch(err => {
                enqueueSnackbar({
                  message: "Erro em nosso servidor. Tente novamente mais tarde!",
                  variant: 'warning'
                });
              });
          }
      };
      
      const handleStatusChange = (form: FormTemplateType | null, status: boolean) => {
        if (form) {
            API.put(`${import.meta.env.VITE_API_URL}FormTemplate/${form.id}`, { status }, {
              headers: {
                Authorization: `Bearer ${GetToken()}`
              }
            })
              .then(response => {
                const { data } = response;
                if (data.success) {
                  enqueueSnackbar({
                    message: "Status do formulário alterado!",
                    variant: 'info'
                  });
                  SetForms(prevForms =>
                    prevForms.map(c => {
                      if (c.id === form.id) {
                        return { ...c, status };
                      }
                      return c;
                    })
                  );
                } else {
                  enqueueSnackbar({
                    message: data.menssages[0],
                    variant: 'error'
                  });
                }
              })
              .catch(err => {
                enqueueSnackbar({
                  message: "Erro em nosso servidor. Tente novamente mais tarde!",
                  variant: 'warning'
                });
              });
          }
      };

const convertStatus = (status: boolean) => {
    switch (status) {
    case true:
        return (
        <Tooltip title="Ativo" placement="left">
            <CheckOutlinedIcon color="success" />
        </Tooltip>
        );
    case false:
        return (
        <Tooltip title="Inativo" placement="left">
            <CancelOutlinedIcon color="info" />
        </Tooltip>
        );
    }
};

return (
    <Page Title="Form Templates">
    <Grid container spacing={1} sx={{ '& > :not(style)': { marginTop: '16px' } }}>
        <Grid item xs={9} />
        <Grid item xs={3}>
        <LoadButton variant="contained" name="submit" title="Gerar Link" type="submit" fullWidth style={{ height: "54px" }} />
        </Grid>
    </Grid>

    <Table style={{ marginTop: '40px' }}>
        <THead>
        <tr style={{ textAlign: "left" }}>
            <Th>Link</Th>
            <Th>Status</Th>
            <Th>Id MailMarketing</Th>
            <Th>Ações</Th>
        </tr>
        </THead>
        <TBody>
        {Forms.map((form) => (
            <Tr key={form.id}>
            <Td>{form.data}</Td>
            <Td>{convertStatus(form.status)}</Td>
            <Td>
                <IconButton aria-label="menu" size="small" onClick={(e) => handleOpenMenu(e, form)}>
                    <MoreVertIcon fontSize="inherit" style={{ color: "green" }} />
                </IconButton>
                <Menu
                  id="options-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={() => handleDelete(selectedForm)}>Excluir</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(selectedForm, false)}>Inativar</MenuItem>
                  <MenuItem onClick={() => handleStatusChange(selectedForm, true)}>Ativar</MenuItem>
                </Menu>
              </Td>
            </Tr>
        ))}
        </TBody>
    </Table>

    <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid item xs={12}>
        <Pag Count={Total} hideNextButton hidePrevButton onChange={(e: any) => { SetPagina(Number(e.target.textContent)) }} />
        </Grid>
    </Grid>
    </Page>
);
};
  