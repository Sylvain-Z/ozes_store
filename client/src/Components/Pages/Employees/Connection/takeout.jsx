import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/employees'
import { useState } from 'react';

function TakeOut() { // Takeout = Signout, nom modifié pour éviter l'amalgame avec l'App.jsx

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");

  dispatch(signout(email))

  function backToTakein(){
    localStorage.removeItem("authe");
    localStorage.removeItem("myemployeeid");
    setTimeout(()=>
    {navigate("/employes/connexion")}
    , 2000)
  };
  backToTakein();

  return <h3>Vous êtes déconnecté</h3>
};

export default TakeOut;