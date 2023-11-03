import { useState , useEffect } from 'react';


async function fetchUser ( url ){

    const [ users, setUsers ] = useState(null);
    let fetchURL = url;
    const myuserid = localStorage.getItem("myuserid");

    useEffect(() => {
        async function getData() {
            try {
                let id="Invite"; 
    
                if(!myuserid){ 
                    id="Invite"; 
                }else{ 
                id=myuserid; 
                } 
    
                const users = await fetch("/api/v1/users/"+ id);
            
                if (users.status === 200) {
                    const json = await users.json();
                    setUsers(json);
                }
            } catch (error) {
            throw Error(error);
            }
        }
        getData();
        }, []);

}

export { fetchUser };