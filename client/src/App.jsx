import { BrowserRouter , Routes, Route } from 'react-router-dom';

import HOC from "./Components/HOC/index";
import Home from "./Components/Pages/Home/index";
import Shop from "./Components/Pages/Shop/index";
import ProductPage from "./Components/Pages/Shop/product_page";
import Brand from "./Components/Pages/Brand/index";
import SizeGuide from "./Components/Pages/Others/size_guide";
import CguCgv from "./Components/Pages/Others/cgu_cgv";
import Ulule from "./Components/Pages/Others/ulule";
import SignIn from "./Components/Pages/Users/signin";
import SignUp from "./Components/Pages/Users/signup";
import Dashboard from "./Components/Pages/Users/Dashboard";
import Informations from "./Components/Pages/Users/Informations";
import Orders from "./Components/Pages/Users/Orders";
import CustomersServices from "./Components/Pages/Users/CustomersServices";

import NotFound from "./Components/Pages/Others/notFound";

function App() {

  return (
    <>
    <BrowserRouter>
        <Routes>

          <Route path="/" element={<HOC child={Home}/>} />

          <Route path="le_store">
            <Route path="" element={<HOC child={Shop}/>} />
            <Route path=":cate_url/:title_url" element={<HOC child={ProductPage}/>} />
          </Route>

          <Route path="la_marque" element={<HOC child={Brand}/>} />
          <Route path="guide_des_tailles" element={<HOC child={SizeGuide}/>} />
          <Route path="cgu_cgv" element={<HOC child={CguCgv}/>} />
          <Route path="ulule" element={<HOC child={Ulule}/>} />

          <Route path="utilisateurs">
            <Route path="connexion" element={<HOC child={SignIn}/>} />
            <Route path="votre-compte" element={<HOC child={Dashboard} auth={true}/>} />
            <Route path="informations" element={<HOC child={Informations} auth={true}/>} />
            <Route path="vos-commandes" element={<HOC child={Orders} auth={true}/>} />
            <Route path="sav-message" element={<HOC child={CustomersServices} auth={true}/>} />
            <Route path="creer-un-compte" element={<HOC child={SignUp}/>} />
          </Route>

          <Route path="not-found" element={<HOC child={NotFound}/>}/>

        </Routes>
      </BrowserRouter>
		</>
  )
};

export default App;