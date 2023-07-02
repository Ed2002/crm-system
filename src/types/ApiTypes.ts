export type ClientType = {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    Document: string;
    Status: number;
    IdProject: number;
}

export type FormTemplateType = {
    Id: number;
    Data: string;
    Status: boolean;
    IdMailMarketingList: number;
}

export type MailType = {
    Id: number;
    Body: string;
    IdMailTemplate: string;
}

export type MailMarketingListType = { 
    Id: number;
    ListName: string;
    Status: boolean;
    IdProject: number;
    IdMail: number;
}

export type MailTemplateType = {
    Id: number;
    Data: string;
    Status: boolean;
}

export type ProjectType = {
    Id: number;
    Name: string;
    Description: string;
    Photo: string;
    CreatedAt: string;
    Status: boolean;
    IdUserOwner: number;
}

export type ProjectAcessType = {
    Id: number;
    UserType: number;
    IdProject: number;
    IdUser: number;
}

export type ProjectDataType = {
    Id: number;
    Revenue: number;
    NumberOfClients: number;
    ProjectName: string;
    IdProject: number;
}

export type StatusMailType = {
    Id: number;
    SendStatus: number;
    IdMail: number;
}

export type UserType = {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    Photo: string;
    Status: boolean;
}