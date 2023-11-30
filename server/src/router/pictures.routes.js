import { Router } from "express";
// import multer from 'multer'; // +++++++++++++++++++
// import pool from '../database/config'; // +++++++++++++++++++

import { getPicturesByProductId , getSecondaryPicById , AddPictures} from "../controller/pictures.js";

const router = Router();
// const upload = multer({ dest: 'uploads/' });

router.post("/add-pictures/:id", AddPictures); //  composant : Employees/ProductAdd

/* router.post('/upload', upload.single('file_name'), async (req, res) => {  // +++++++++++++++++++
    const file_name = req.file_name;
  
    if (!file_name) {
      return res.status(400).json({ error: 'Aucun fichier uploadé.' });
    }
  
    // Enregistre le nom du fichier en base de données
    const filename = file_name.file_name;
  
    try {
      const query = 'INSERT INTO images (file_name) VALUES (?)';
      await pool.query(query, [filename]);
  
      res.json({ message: 'Upload réussi !' });
    } catch (error) {
      console.error('Erreur lors de l\'insertion en base de données :', error.message);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }); // +++++++++++++++++++ */
  

// router.delete("/delete/:id", DeleteProduct); // composant : Employees/ProductDelete

router.get("/products/:id", getPicturesByProductId); // photos nécessaires à la page ../Shop/product_page
router.get("/secondary-pictures/:id", getSecondaryPicById); // photos nécessaires à la page Employees/ProductUpdate



export default router;