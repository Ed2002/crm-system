import Stack from "@mui/material/Stack";
import PaginationItem from '@mui/material/PaginationItem';
import Pagination, {PaginationProps} from "@mui/material/Pagination";
import './style.css';

interface Props
{
 Count: number;
}

type PagProps = PaginationProps & Props;

export const Pag = ({Count, ...rest}:PagProps) => {
    return (
        <Stack spacing={2}>
            <Pagination
                count={Count}
                shape="rounded"
                renderItem={item => (
                <PaginationItem classes={{ selected: 'select' }} {...item} />
                )}
                {...rest}
            />
        </Stack>
    );
}