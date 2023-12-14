import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FETCH_URL } from '../../assets/const';

import { signout } from "../../store/slices/user";

import Header from './Header'
import Footer from './Footer'

function HOCEmployees({ child, authe }) {

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN = localStorage.getItem("authe");


    useEffect(() => {
        async function checkAuth() {
            if (authe) {
                if (!TOKEN) {
                    navigate("/");
                }
                if (TOKEN) {
                    const res = await fetch(FETCH_URL + "users/check_token", {
                        headers: { Authentication: "Bearer " + TOKEN },
                    });
                    if (res.status === 401) {
                        localStorage.removeItem("authe")
                        dispatch(signout());
                        navigate("/le_store");
                    }
                    if (res.status === 200) {
                        const json = await res.json();
                        console.log("200");
                        setTokenIsValid(true);
                    }
                }
            }
        }

        checkAuth();
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