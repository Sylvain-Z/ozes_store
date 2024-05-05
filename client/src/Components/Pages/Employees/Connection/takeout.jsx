import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { signout } from '../../../../store/slices/employee'

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
    , 500);
  };
  backToTakein();

  return <h3>Vous êtes déconnecté</h3>
};

export default TakeOut;