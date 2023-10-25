import React from 'react'
import { useNavigate,  /* Link , useParams ,  useLocation */ } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import PreviousPage from "./Components/previousPage";

function Orders() {

  const { info } = useSelector((state) => state.user);

  const [ users, setUsers ] = useState(null);

  const navigate = useNavigate();
    
  useEffect(() => {
          async function getData() {
              try {
                const users = await fetch("/api/v1/users/"+ info.id);
                if (users.status === 404) {
                  navigate("users/not-found");
                }
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
      <PreviousPage/>

      <h3>L'historique de vos commandes</h3>

    </>
  )
}

export default Orders;