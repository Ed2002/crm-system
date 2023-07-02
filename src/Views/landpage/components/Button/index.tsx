import { Button as ButtonMUI, ButtonProps} from "@mui/material";

interface IButtonProps {
    Text: string
}

type BtnPros = ButtonProps & IButtonProps;

export const Button = ({
    Text, ...rest
}:BtnPros) => (
    <ButtonMUI color="success" {...rest}>
        {Text}
    </ButtonMUI>
)