import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

interface Props {
    title: string,
    name: string
}

type LoadButtonProps = LoadingButtonProps & Props;

export const LoadButton = ({title, name, ...rest}:LoadButtonProps) => {
    return (
        <LoadingButton
            name={name}
            color="success"
            {...rest}
        >
            {title}
        </LoadingButton>
    );
}