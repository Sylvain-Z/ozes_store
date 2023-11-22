import { useDispatch } from 'react-redux';
import React from 'react'
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/user'
import { useState } from 'react';

function SignOut() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [ email, setEmail ] = useState("");

  dispatch(signout(email))

  function navigateToStore(){
    localStorage.removeItem("auth");
    localStorage.removeItem("myuserid");
    setTimeout(()=>
    {navigate("/le_store")}
    , 2000)
  };
  navigateToStore();

  return <h2>Vous êtes déconnecté, vous allez être rediriger à la boutique</h2>
};

export default SignOut;