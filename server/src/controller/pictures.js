import Query from "../model/Query.js";
import formidable from "formidable";

const getPicturesByProductId = async (req, res) => {
    try {
        const query = "SELECT * FROM pictures WHERE product_id = ?";
        const [datas] = await Query.findByValue(query, req.params.id);
        if(!datas.length){
            res.status(404).json({msg: "images non trouvées"})
        }
        if(datas.length) {        
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    } 
};

const getPicturesByIds = async (req, res) => {
    try {
        const query = "SELECT * FROM pictures WHERE product_id = ? AND id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        if(!datas.length){
            res.status(404).json({msg: "images non trouvée"})
        }
        if(datas.length) {        
            res.status(200).json(datas);
            return;
        }
        } catch (error) {
            throw Error(error);
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
                        
            const img = {
                file_name: Object.keys(files).length ? files.image[0].newFilename : "noImg.png",
                caption: fields.caption,
                product_id: fields.product_id,
            }

            try {
                const query = "INSERT INTO pictures (file_name, caption, product_id) VALUES (?, ?, ?)";  // double appostrophe pour protéger le caractère (qu'il ne soit pas interpréter par sql)
                await Query.write(query, img);
            } catch (error) {
                console.error("Erreur lors de l'insertion :", error.message);
                res.status(500).json({ error: "Erreur lors de l'insertion en base de données." });
            }

            msg = "L'image a bien été uploadée";
            res.status(201).json({ msg });
        });

    
    } catch (error) {
        throw Error(error);
    }
};
const DeletePictures = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM pictures WHERE product_id = ? AND id = ?";
        await Query.deleteByDatas(query, req.params);
        
        msg = "L'image a été supprimée";
        res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};


export { getPicturesByProductId , getPicturesByIds , AddPictures , DeletePictures };