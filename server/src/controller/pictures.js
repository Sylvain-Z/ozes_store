import Query from "../model/Query.js";
import formidable from "formidable";
import fs from 'fs';
import path from 'path';

const getPicturesByProductId = async (req, res) => {
    
    const query = "SELECT * FROM pictures WHERE product_id = ?";
    const [datas] = await Query.findByValue(query, req.params.id);
    if(!datas.length){
        res.status(404).json({msg: "image non trouvée"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getSecondaryPicById = async (req, res) => {
    try {
    const query = "WITH RankedPictures AS ( SELECT pictures.id AS picture_id, pictures.file_name, pictures.caption, products.id AS product_id, ROW_NUMBER() OVER (PARTITION BY products.id ORDER BY pictures.id) AS row_num FROM products JOIN pictures ON products.id = pictures.product_id ) SELECT product_id, picture_id, file_name, caption FROM RankedPictures WHERE row_num > 1 AND product_id = ?;";
    const [datas] = await Query.findByDatas(query, req.params);
    } catch (error) {
        console.error("Erreur lors de la sélection en base de donnée :", error.message);
        res.status(500).json({ error: "Erreur lors de la sélection en base de donnée." });
    }
    if(!datas.length){
        res.status(404).json({msg: "donnée non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};


const AddPictures = async (req, res) => {
    try {
        let msg ="";
        const form = formidable({
            uploadDir: "public/store",
            keepExtensions: true,
            allowEmptyFiles: false,            
        });
        form.parse( req, async (error, fields, files) => {
            console.log("fields", fields);
            console.log("files", files);
            
            const img = {
                file_name: Object.keys(files).length ? files.image[0].newFilename : "noImg.png",
                product_id: fields.product_id,
            }
            
            console.log("product_id", img);

            try {
                const query = "INSERT INTO pictures (file_name, caption, product_id) VALUES (?, 'image d''un produit', ?)";  // double appostrophe pour protéger le caractère (qu'il ne soit pas interpréter par sql)
                await Query.write(query, img);
            } catch (error) {
                console.error("Erreur lors de l'insertion :", error.message);
                res.status(500).json({ error: "Erreur lors de l'insertion en base de données." });
            }
            console.log("image compte", files.image.length);
            
            msg = "L'image a bien été uploadée";
            res.status(201).json({ msg });
        });

    
    } catch (error) {
        throw Error(error);
    }
};



export { getPicturesByProductId , getSecondaryPicById , AddPictures};