import { useDispatch } from 'react-redux';
import React from 'react'
import { Link , useNavigate } from 'react-router-dom';

import { signout } from '../../../store/slices/user'
import { useState } from 'react';

function TakeOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");

  dispatch(signout(email))

  function backToTakein(){
    localStorage.removeItem("auth");
    setTimeout(()=>
    {navigate("/le_store")}
    , 2000)
  };
  backToTakein();

  return <h3>Vous êtes déconnecté, retournez à <Link to="/le_store">l'accueil</Link></h3>
};

export default TakeOut;