import { BrowserRouter , Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC/index";
import Home from "./Components/Pages/Home/index";
import Shop from "./Components/Pages/Shop/index";
import ProductPage from "./Components/Pages/Shop/product_page";
import Brand from "./Components/Pages/Others/brand";
import SizeGuide from "./Components/Pages/Others/size_guide";
import CguCgv from "./Components/Pages/Others/cgu_cgv";
import Ulule from "./Components/Pages/Others/ulule";
import Cart from "./Components/Pages/Others/cart";

import NotFound from "./Components/Pages/Others/notFound";

/* Pages compte client */
import Signup from "./Components/Pages/Users/Log/signup";
import Signin from "./Components/Pages/Users/Log/signin";
import SignOut from "./Components/Pages/Users/Log/signout";
import Dashboard from "./Components/Pages/Users";
import Delivery from "./Components/Pages/Users/delivery";
import DeliveryUpdate from "./Components/Pages/Users/deliveryUpdate";
import InfoConnexion from "./Components/Pages/Users/infoConnexion";
import InfoConnexionUpdate from "./Components/Pages/Users/infoConnexionUpdate";
import Orders from "./Components/Pages/Users/orders";
import SendMessages from "./Components/Pages/Users/sendMessages";

import NotFoundUser from "./Components/Pages/Others/notFoundUser";

/* Pages Employés */
import HOCEmployees from "./Components/HOCEmployees/index";
import Takeup from "./Components/Pages/Employees/Log/takeup";
import Takein from "./Components/Pages/Employees/Log/takein";
import TakeOut from "./Components/Pages/Employees/Log/takeout";
import Desk from "./Components/Pages/Employees/index";
import Sales from "./Components/Pages/Employees/Sales";
import Reserve from "./Components/Pages/Employees/Stock/index";
import Categories from "./Components/Pages/Employees/Stock/Categories/index";
import DeleteCategories from "./Components/Pages/Employees/Stock/Categories/deleteCategorie";
import DeleteSubCategories from "./Components/Pages/Employees/Stock/Categories/deleteSubcategorie";

import ProductAdd from "./Components/Pages/Employees/Stock/productAdd";
import ProductAddCate from "./Components/Pages/Employees/Stock/productAddCate";
import ProductAddPic from "./Components/Pages/Employees/Stock/productAddPic";
import ProductUpdate from "./Components/Pages/Employees/Stock/productUpdate";
import ProductDelete from "./Components/Pages/Employees/Stock/productDelete";
import UserMsgRead from "./Components/Pages/Employees/Messages/userMsgRead";
import UserMsgAnswer from "./Components/Pages/Employees/Messages/userMsgAnswer";
import EmployeesInfo from "./Components/Pages/Employees/Infos/employeesInfo";
import EmployeesInfoUpdate from "./Components/Pages/Employees/Infos/employeesInfoUpdate";

import NotFoundEmployees from "./Components/Pages/Others/notFoundEmployees";


function App() {


  return (
    
    <BrowserRouter>
        <Routes>

          <Route path="/" element={<HOC child={Home}/>} />
          <Route path="/panier" element={<HOC child={Cart}/>} />

          <Route path="le_store">
            <Route path="" element={<HOC child={Shop}/>} />
            <Route path=":cate_title/:title_url/:id" element={<HOC child={ProductPage}/>} />
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
            <Route path="infos-connexion/:id" element={<HOC child={InfoConnexion} auth={true}/>} />
            <Route path="infos-connexion-update/:id" element={<HOC child={InfoConnexionUpdate} auth={true}/>} />
            <Route path="vos-commandes/:id" element={<HOC child={Orders} auth={true}/>} />
            <Route path="messages/:id" element={<HOC child={SendMessages} auth={true}/>} />
            <Route path="not-found" element={<HOCEmployees child={NotFoundUser} auth={true}/>} />
          </Route>
          
          <Route path="employes">
            <Route path="creer-un-compte" element={<HOCEmployees child={Takeup}/>} />
            <Route path="connexion" element={<HOCEmployees child={Takein}/>} />
            <Route path="deconnexion" element={<HOCEmployees child={TakeOut}/>} />
            <Route path="" element={<HOCEmployees child={Desk}/>} />
            <Route path="ventes" element={<HOCEmployees child={Sales} auth={true}/>} />

            <Route path="stock">
              <Route path="" element={<HOCEmployees child={Reserve} auth={true}/>} />
              <Route path="categories">
                <Route path="" element={<HOCEmployees child={Categories} auth={true}/>} />
                <Route path="categories/delete/:id" element={<HOCEmployees child={DeleteCategories} auth={true}/>} />
                <Route path="subcategories/delete/:id" element={<HOCEmployees child={DeleteSubCategories} auth={true}/>} />
                


              </Route>
              <Route path="ajouter-produit" element={<HOCEmployees child={ProductAdd} auth={true}/>} />
              <Route path="attribuer-sous-catégorie" element={<HOCEmployees child={ProductAddCate} auth={true}/>} />
              <Route path="attribuer-infos-images" element={<HOCEmployees child={ProductAddPic} auth={true}/>} />
              <Route path="actualiser/:id" element={<HOCEmployees child={ProductUpdate} auth={true}/>} />
              <Route path="suppression/:id" element={<HOCEmployees child={ProductDelete} auth={true}/>} />
            </Route>

            <Route path="messages" >
              <Route path="" element={<HOCEmployees child={UserMsgRead} auth={true}/>} />
              <Route path="repondre/:id" element={<HOCEmployees child={UserMsgAnswer} auth={true}/>} />
            </Route>

            <Route path=":id" element={<HOCEmployees child={EmployeesInfo} auth={true}/>} />
            <Route path="actualiser-mes-infos/:id" element={<HOCEmployees child={EmployeesInfoUpdate} auth={true}/>} />
          </Route>

          <Route path="not-found" element={<HOC child={NotFound}/>}/>
          <Route path="employes/not-found" element={<HOCEmployees child={NotFoundEmployees}/>}/>

        </Routes>
      </BrowserRouter>

  )
};

export default App;