import Breadcrumbs from "@mui/material/Breadcrumbs"
import Link from "@mui/material/Link"
import { BreadCrumbsLinks } from "./types"
import { CurrentTitleText } from "./style"

interface IBreadcrumbs 
{
    Links: BreadCrumbsLinks
}

export const BreadCrumbs = ({Links}:IBreadcrumbs) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            {Links.Pass.map(item => (
                <Link underline="hover" color="inherit" href={item.Link}>
                    {item.Title}
                </Link>
            ))}
            <CurrentTitleText>{Links.CurrentTitle}</CurrentTitleText>
        </Breadcrumbs>
    )
}