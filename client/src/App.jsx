import { BrowserRouter , Routes, Route } from 'react-router-dom';

import HOC from "./Components/HOC/index";

import Home from "./Components/Pages/Home/index";
import Shop from "./Components/Pages/Shop/index";
import ProductPage from "./Components/Pages/Shop/product_page";
import Brand from "./Components/Pages/Brand/index";
import SizeGuide from "./Components/Pages/Others/size_guide";
import CguCgv from "./Components/Pages/Others/cgu_cgv";
import Ulule from "./Components/Pages/Others/ulule";
import Signup from "./Components/Pages/Users/signup";
import Signin from "./Components/Pages/Users/signin";
import SignOut from "./Components/Pages/Users/signout";
import Dashboard from "./Components/Pages/Users/Dashboard";
import Delivery from "./Components/Pages/Users/Delivery";
import DeliveryUpdate from "./Components/Pages/Users/DeliveryUpdate";
import InfoUser from "./Components/Pages/Users/InfoUser";
import InfoUserUpdate from "./Components/Pages/Users/InfoUserUpdate";
import Orders from "./Components/Pages/Users/Orders";
import CustomersServices from "./Components/Pages/Users/CustomersServices";

import HOCEmployees from "./Components/HOCEmployees/index";
import Takeup from "./Components/Pages/Employees/takeup";
import Takein from "./Components/Pages/Employees/takein";
import TakeOut from "./Components/Pages/Employees/takeout";
import Warehouse from "./Components/Pages/Employees/Warehouse";
import Reserve from "./Components/Pages/Employees/Reserve";
import Sales from "./Components/Pages/Employees/Sales";
import CustomerMessages from "./Components/Pages/Employees/CustomerMessages";

import NotFound from "./Components/Pages/Others/notFound";
import NotFoundUser from "./Components/Pages/Others/notFoundUser";

function App() {


  return (
    
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
            <Route path="creer-un-compte" element={<HOC child={Signup}/>} />
            <Route path="connexion" element={<HOC child={Signin}/>} />
            <Route path="deconnexion" element={<HOC child={SignOut}/>} />
            <Route path=":id" element={<HOC child={Dashboard} auth={true}/>} />
            <Route path="infos-livraison/:id" element={<HOC child={Delivery} auth={true}/>} />
            <Route path="infos-livraison-update/:id" element={<HOC child={DeliveryUpdate} auth={true}/>} />
            <Route path="infos-perso/:id" element={<HOC child={InfoUser} auth={true}/>} />
            <Route path="infos-perso-update/:id" element={<HOC child={InfoUserUpdate} auth={true}/>} />
            <Route path="vos-commandes/:id" element={<HOC child={Orders} auth={true}/>} />
            <Route path="sav-message/:id" element={<HOC child={CustomersServices} auth={true}/>} />
            <Route path="not-found" element={<HOCEmployees child={NotFoundUser} auth={true}/>} />
          </Route>
          
          <Route path="employes">
            <Route path="creer-un-compte" element={<HOCEmployees child={Takeup}/>} />
            <Route path="connexion" element={<HOCEmployees child={Takein}/>} />
            <Route path="deconnexion" element={<HOCEmployees child={TakeOut}/>} />
            <Route path="entrepot" element={<HOCEmployees child={Warehouse} auth={true}/>} />
            <Route path="reserve" element={<HOCEmployees child={Reserve} auth={true}/>} />
            <Route path="les-commandes" element={<HOCEmployees child={Sales} auth={true}/>} />
            <Route path="messages-clients" element={<HOCEmployees child={CustomerMessages} auth={true}/>} />
          </Route>

          <Route path="not-found" element={<HOC child={NotFound}/>}/>

        </Routes>
      </BrowserRouter>

  )
};

export default App;