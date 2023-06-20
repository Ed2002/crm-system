import { useEffect } from "react";
import { API } from "../services/axios";

export const Client = () => {

    useEffect(()=>{
        const exhttp = () => {
            API.get('https://jsonplaceholder.typicode.com/todos/1')
            .then(({data}) => {
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            })
        }
        return () => exhttp();
    },[]);

   


    return (
        <div>
            <h1>Client</h1>
            <p>{import.meta.env.VITE_TESTE}</p>
        </div>
    )
};