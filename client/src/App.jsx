import { BrowserRouter, Routes, Route } from 'react-router-dom';

/* Pages tout publique */
import HOC from "./Components/HOC/Index";
import Home from "./Components/Pages/Home/Index";
import Shop from "./Components/Pages/Shop/Index";
import ProductPage from "./Components/Pages/Shop/ProductPage";
import Brand from "./Components/Pages/Others/Brand";
import SizeGuide from "./Components/Pages/Others/SizeGuide";
import CguCgv from "./Components/Pages/Others/CguCgv";
import Ulule from "./Components/Pages/Others/Ulule";

import Cart from "./Components/Pages/Cart/Index";
import CartDeliveryInfos from "./Components/Pages/Cart/CartDeliveryInfos";
import PaymentPage from "./Components/Pages/Cart/PaymentPage";
import Thanks from "./Components/Pages/Cart/Thanks";

import NotFound from "./Components/Pages/Others/NotFound";

/* Pages compte client */
import Signup from "./Components/Pages/Users/Connection/Signup";
import Signin from "./Components/Pages/Users/Connection/Signin";
import SignOut from "./Components/Pages/Users/Connection/Signout";
import Dashboard from "./Components/Pages/Users/Index";
import Delivery from "./Components/Pages/Users/Profil/Delivery";
import DeliveryUpdate from "./Components/Pages/Users/Profil/DeliveryUpdate";
import InfoConnexion from "./Components/Pages/Users/Profil/InfoConnection";
import InfoConnexionUpdate from "./Components/Pages/Users/Profil/InfoConnectionUpdate";
import DeleteUser from "./Components/Pages/Users/Profil/DeleteUser";
import Orders from "./Components/Pages/Users/Orders/Index";
import OrderUserPage from "./Components/Pages/Users/Orders/OrderUserPage";
import SendMessages from "./Components/Pages/Users/Messages/Index";

import NotFoundUser from "./Components/Pages/Others/NotFoundUser";

/* Pages Employés */
import HOCEmployees from "./Components/HOCEmployees/Index";
import Takein from "./Components/Pages/Employees/Connection/takein";
import TakeOut from "./Components/Pages/Employees/Connection/takeout";
import Desk from "./Components/Pages/Employees/Index";
import Sales from "./Components/Pages/Employees/Sales/Index";
import OrderPage from "./Components/Pages/Employees/Sales/OrderPage";
import Reserve from "./Components/Pages/Employees/Stock/Index";
import Categories from "./Components/Pages/Employees/Stock/Categories/Index";
import DeleteCategorie from "./Components/Pages/Employees/Stock/Categories/DeleteCategorie";
import DeleteSubCategorie from "./Components/Pages/Employees/Stock/Categories/DeleteSubcategorie";
import UpdateSize from "./Components/Pages/Employees/Stock/Products/ProductUpdateSize";

import ProductAdd from "./Components/Pages/Employees/Stock/Products/ProductAdd";
import ProductAddSubCate from "./Components/Pages/Employees/Stock/Products/ProductAddSubCate";
import ProductAddPic from "./Components/Pages/Employees/Stock/Products/ProductAddPic";
import ProductUpdate from "./Components/Pages/Employees/Stock/Products/ProductUpdate";
import ProductDelete from "./Components/Pages/Employees/Stock/Products/ProductDelete";
import MsgRead from "./Components/Pages/Employees/Messages/MsgRead";
import MsgAnswer from "./Components/Pages/Employees/Messages/MsgAnswer";
import EmployeeInfo from "./Components/Pages/Employees/Infos/EmployeeInfo";
import EmployeeInfoUpdate from "./Components/Pages/Employees/Infos/EmployeeInfoUpdate";

import AccountManagement from "./Components/Pages/Employees/Management/Index";
import AddProfil from "./Components/Pages/Employees/Management/Addprofil";
import Profil from "./Components/Pages/Employees/Management/Profil";
import UpdateProfil from "./Components/Pages/Employees/Management/Updateprofil";
import DeleteProfil from "./Components/Pages/Employees/Management/Deleteprofil";

import NotFoundEmployees from "./Components/Pages/Others/NotFoundEmployees";


function App() {


  return (

    <BrowserRouter>
      <Routes>

        <Route path="/" element={<HOC child={Home} />} />
        <Route path="/panier" element={<HOC child={Cart} />} />
        <Route path="/panier/info-livraison" element={<HOC child={CartDeliveryInfos} />} />
        <Route path="/panier/paiement" element={<HOC child={PaymentPage} />} />
        <Route path="/remerciements" element={<HOC child={Thanks} />} />

        <Route path="le_store">
          <Route path="" element={<HOC child={Shop} />} />
          <Route path=":title_url/:id" element={<HOC child={ProductPage} />} />
        </Route>

        <Route path="la_marque" element={<HOC child={Brand} />} />
        <Route path="guide_des_tailles" element={<HOC child={SizeGuide} />} />
        <Route path="cgu_cgv" element={<HOC child={CguCgv} />} />
        <Route path="ulule" element={<HOC child={Ulule} />} />

        <Route path="utilisateurs">
          <Route path="creer-un-compte" element={<HOC child={Signup} />} />
          <Route path="connexion" element={<HOC child={Signin} />} />
          <Route path="deconnexion" element={<HOC child={SignOut} />} />
          <Route path=":id" element={<HOC child={Dashboard} auth={true} />} />
          <Route path="vos-commandes/:id" element={<HOC child={Orders} auth={true} />} />
          <Route path="vos-commandes/:user_id/:id" element={<HOC child={OrderUserPage} auth={true} />} />
          <Route path="messages/:id" element={<HOC child={SendMessages} auth={true} />} />
          <Route path="infos-livraison/:id" element={<HOC child={Delivery} auth={true} />} />
          <Route path="infos-livraison-update/:id" element={<HOC child={DeliveryUpdate} auth={true} />} />
          <Route path="infos-connexion/:id" element={<HOC child={InfoConnexion} auth={true} />} />
          <Route path="infos-connexion-update/:id" element={<HOC child={InfoConnexionUpdate} auth={true} />} />
          <Route path="supprimer-compte/:id" element={<HOC child={DeleteUser} auth={true} />} />
          <Route path="not-found" element={<HOCEmployees child={NotFoundUser} auth={true} />} />
        </Route>

        <Route path="employes">

          <Route path="connexion" element={<HOCEmployees child={Takein} />} />
          <Route path="deconnexion" element={<HOCEmployees child={TakeOut} />} />
          <Route path="" element={<HOCEmployees child={Desk} />} />
          <Route path="ventes" element={<HOCEmployees child={Sales} authe={true} />} />
          <Route path="commande/:order_id" element={<HOCEmployees child={OrderPage} authe={true} />} />

          <Route path="stock">
            <Route path="" element={<HOCEmployees child={Reserve} authe={true} />} />
            <Route path="categories">
              <Route path="" element={<HOCEmployees child={Categories} authe={true} />} />
              <Route path="categories/delete/:id" element={<HOCEmployees child={DeleteCategorie} authe={true} />} />
              <Route path="subcategories/delete/:id" element={<HOCEmployees child={DeleteSubCategorie} authe={true} />} />
            </Route>
            <Route path="ajouter-produit" element={<HOCEmployees child={ProductAdd} authe={true} />} />
            <Route path="attribuer-sous-catégorie" element={<HOCEmployees child={ProductAddSubCate} authe={true} />} />
            <Route path="ajouter-image" element={<HOCEmployees child={ProductAddPic} authe={true} />} />
            <Route path="actualiser/:id" element={<HOCEmployees child={ProductUpdate} authe={true} />} />
            <Route path="update-size/:product_id/:size_id" element={<HOCEmployees child={UpdateSize} authe={true} />} />
            <Route path="suppression/:id" element={<HOCEmployees child={ProductDelete} authe={true} />} />
          </Route>

          <Route path="messages" >
            <Route path="" element={<HOCEmployees child={MsgRead} authe={true} />} />
            <Route path="repondre/:id" element={<HOCEmployees child={MsgAnswer} authe={true} />} />
          </Route>

          <Route path="gestion-comptes">
            <Route path="" element={<HOCEmployees child={AccountManagement} authe={true} />} />
            <Route path="creer-compte" element={<HOCEmployees child={AddProfil} authe={true} />} />
            <Route path=":id" element={<HOCEmployees child={Profil} authe={true} />} />
            <Route path="actualiser/:id" element={<HOCEmployees child={UpdateProfil} authe={true} />} />
            <Route path="suppression/:id" element={<HOCEmployees child={DeleteProfil} authe={true} />} />
          </Route>

          <Route path=":id" element={<HOCEmployees child={EmployeeInfo} authe={true} />} />
          <Route path="actualiser-mes-infos/:id" element={<HOCEmployees child={EmployeeInfoUpdate} authe={true} />} />
        </Route>

        <Route path="not-found" element={<HOC child={NotFound} />} />
        <Route path="employes/not-found" element={<HOCEmployees child={NotFoundEmployees} authe={true} />} />

      </Routes>
    </BrowserRouter>

  )
};

export default App;