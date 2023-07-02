import jwt_decode from "jwt-decode";
import { AuthType } from "../types/authtype";

export const SaveToken = (token: string) => {
    localStorage.setItem("CrmAuthToken", token);
}

export const GetToken = () => {
    return localStorage.getItem('CrmAuthToken');
}

export const DeleteToken = () => {
    localStorage.setItem("CrmAuthToken", '');
}

export const GetAuthToken = () => {
    let token = GetToken();
    if (token === null) {
        return null;
    }
    let decoded:AuthType = jwt_decode((token as string));
    return decoded;
}

export const VerifyToken = () => {
    let token = GetToken();
    if (token === null) {
        return false;
    }
    let decoded = jwt_decode((token as string));
    if (Date.now() >= decoded.exp * 1000) {
        console.log("Not authorized");
        return false;
    }
    else
    {
        console.log("Authorized");
        return true;
    }
}