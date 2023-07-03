export const SaveProject = (projectId: string) => {
    localStorage.setItem("Project", projectId);
}

export const GetProject = () => {
    return localStorage.getItem('Project');
}

export const DeleteProject = () => {
    localStorage.setItem("Project", '');
}