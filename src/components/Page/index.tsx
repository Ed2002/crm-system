import { BlankBoard } from "../BlankBoard"
import { BreadCrumbs } from "../BreadCrumbs"
import { BreadCrumbsLinks } from "../BreadCrumbs/types"
import { PageTitle } from "./style"

interface IPage {
    Title: string;
    children: React.ReactNode;
    BreadCrumb?: BreadCrumbsLinks
}

export const Page = ({Title,children,BreadCrumb}:IPage) => {
    return(
        <>
            <PageTitle>{Title}</PageTitle>
            <BlankBoard>
                {
                    BreadCrumb !== undefined ? (
                        <BreadCrumbs Links={BreadCrumb}/>
                    ) : ''
                }
                {children}
            </BlankBoard>
        </>
    );
}