import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FETCH_URL } from '../../assets/const';
import { getItemWithExpiration } from '../../assets/functions';

import { signout } from "../../store/slices/user";

import Header from './Header'
import Footer from './Footer'

function HOCEmployees({ child, authe }) {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN_EMPL = getItemWithExpiration('authe');

    useEffect(() => {
        async function checkAuthe() {
            if (authe) {
                if (!TOKEN_EMPL) {
                    navigate("/employes/connexion");
                }
                if (TOKEN_EMPL) {
                    const res = await fetch(FETCH_URL + "employees/check_token", {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authentication': `Bearer ${TOKEN_EMPL}`,
                        },
                    });
                    if (res.status === 401) {
                        localStorage.removeItem("authe")
                        localStorage.removeItem("myemployeeid")
                        dispatch(signout());
                        navigate("/employes/connexion");
                    }
                    if (res.status === 200) {
                        const json = await res.json();
                        console.log("200");
                        setTokenIsValid(true);
                    }
                }
            }
        }

        checkAuthe();
    }, [authe]);



    const Child = child;

    return (
        <>
            <div id={pathname === "/" ? "home_body" : ""}>

                {(!authe || (authe && tokenIsValid)) && <Header />}

                <main className="navigation_main">
                    {(!authe || (authe && tokenIsValid)) && <Child />}
                </main>

                <Footer />


            </div>

        </>
    );
}

export default HOCEmployees;