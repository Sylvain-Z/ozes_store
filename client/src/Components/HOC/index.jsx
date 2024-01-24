import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { FETCH_URL } from '../../assets/const';
import { getItemWithExpiration } from '../../assets/functions';

import { signout } from "../../store/slices/user";

import Header from './Header'
import Footer from './Footer'

function HOC({ child, auth }) {

    const Child = child;

    const { pathname } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [tokenIsValid, setTokenIsValid] = useState(false);
    const TOKEN = getItemWithExpiration('auth');

    useEffect(() => {
        async function checkAuth() {
            if (auth) {
                if (!TOKEN) {
                    navigate("/");
                }
                if (TOKEN) {
                    const res = await fetch(FETCH_URL + "users/check_token", {
                        headers: { Authentication: "Bearer " + TOKEN },
                    });
                    if (res.status === 401) {
                        localStorage.removeItem("auth")
                        localStorage.removeItem("myuserid")
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
    }, [auth]);

    return (
        <div id={pathname === "/" ? "home_body" : ""}>

            {(!auth || (auth && tokenIsValid)) && <Header />}

            <main className="navigation_main">
                {(!auth || (auth && tokenIsValid)) && <Child />}
            </main>

            <Footer />


        </div>
    );
}

export default HOC;