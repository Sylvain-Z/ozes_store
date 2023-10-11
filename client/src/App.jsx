import { Routes, Route } from 'react-router-dom';

import HOC from "./Components/HOC";
import Home from "./Components/Pages/Home/index";
import Shop from "./Components/Pages/Shop/index";
import ProductPage from "./Components/Pages/Shop/product_page";
import Brand from "./Components/Pages/Brand/index";
import SizeGuide from "./Components/Pages/Others/size_guide";
import CguCgv from "./Components/Pages/Others/cgu_cgv";
import Ulule from "./Components/Pages/Others/ulule";
// import SignIn from "./Components/Pages/Others/signin";



function App() {

  return (
    <>
      <Routes>

        <Route path="/" element={<HOC child={Home}/>} />
        <Route path="/le_store" element={<HOC child={Shop}/>} />
        <Route path="/le_store/:cate_url/:title_url" element={<HOC child={ProductPage}/>} />
        <Route path="/la_marque" element={<HOC child={Brand}/>} />
        <Route path="/guide_des_tailles" element={<HOC child={SizeGuide}/>} />
        <Route path="/cgu_cgv" element={<HOC child={CguCgv}/>} />
        <Route path="/ulule" element={<HOC child={Ulule}/>} />
        {/* <Route path="/connexion" element={<HOC child={SignIn}/>} /> */}
        
      </Routes>

		</>
  )
};

export default App;