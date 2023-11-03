import React from 'react'
import { Link , /* useNavigate, useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { /*useSelector ,  useDispatch */ } from "react-redux";

import PreviousPage from "./Components/previousPage";

function Orders() {

  // const { info } = useSelector((state) => state.user);
  // const navigate = useNavigate();

  const [ users, setUsers ] = useState(null);

    
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

  return (
    <>
      {/* <PreviousPage/> */}
      {/* <PreviousPage user={user}/> */}

      <h3>L'historique de vos commandes</h3>

    </>
  )
}

export default Orders;