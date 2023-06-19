import { useEffect } from "react";
import axios from 'axios';

export const Client = () => {

    useEffect(()=>{
        const exhttp = () => {
            axios({
                method: "get",
                url: "https://jsonplaceholder.typicode.com/todos/1",
            }).then(res => {
                console.log(res);
            }).catch(err => {
                alert(err);
            });
        }

        return () => exhttp();
    },[]);

   


    return (
        <div>
            <h1>Client</h1>
        </div>
    )
};