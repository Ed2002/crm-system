import { ReactElement } from "react";

export type ItemMenu = {
    Title: string,
    Link: string,
    Target: '_blank' | '_self' | '_parent' | '_top' 
    Icon: ReactElement<any, any>
}