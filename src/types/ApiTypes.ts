export type ClientType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    document: string;
    status: number;
    idProject: number;
}

export type FormTemplateType = {
    id: number;
    data: string;
    status: boolean;
    idMailMarketingList: number;
}

export type MailType = {
    id: number;
    body: string;
    idMailTemplate: string;
}

export type MailMarketingListType = { 
    id: number;
    listName: string;
    status: boolean;
    idProject: number;
    idMail: number;
}

export type MailTemplateType = {
    id: number;
    data: string;
    status: boolean;
}

export type ProjectType = {
    id: number;
    name: string;
    description: string;
    photo: string;
    createdAt: string;
    status: boolean;
    idUserOwner: number;
}

export type ProjectAcessType = {
    id: number;
    userType: number;
    idProject: number;
    idUser: number;
}

export type ProjectDataType = {
    id: number;
    revenue: number;
    numberOfClients: number;
    projectName: string;
    idProject: number;
}

export type StatusMailType = {
    id: number;
    sendStatus: number;
    idMail: number;
}

export type UserType = {
    id: number;
    name: string;
    email: string;
    phone: string;
    photo: string;
    status: boolean;
}