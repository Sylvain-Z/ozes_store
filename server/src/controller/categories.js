import Query from "../model/Query.js";

const getCategories = async (req, res) => {
    
    const query = "SELECT * FROM categories";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};
const getCategoryById = async (req, res) => {
    
    const query = "SELECT * FROM categories WHERE id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "catégorie non reconnue"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
};

const getSubcategories = async (req, res) => {
    
    const query = "SELECT * FROM subcategories";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};
const getSubategoryById = async (req, res) => {
    
    const query = "SELECT * FROM subcategories WHERE id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "catégorie non reconnue"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
};

const AddCategories = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = { cate_title: req.body.cate_title };
        const queryCate =
            "SELECT cate_title FROM categories WHERE cate_title = ?";
        const [cate] = await Query.findByDatas(queryCate, datas);

        if (cate.length) {
            msg = "Une catégorie avec cet appellation existe déjà";
            res.status(409).json({ msg });

        } else {
            const datas = {
                cate_title: req.body.cate_title,
            };

            const query =
                "INSERT INTO categories (cate_title) VALUES(?)";
            await Query.write(query, datas);

            msg2 = "La catégorie a bien été créée";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};
const AddSubcategories = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = {
            subcate_title: req.body.subcate_title,
            categorie_id: req.body.categorie_id,
         };
        const queryCate =
            "SELECT subcate_title FROM subcategories WHERE subcate_title = ?";
        const [cate] = await Query.findByDatas(queryCate, datas);

        if (cate.length) {
            msg = "Une sous-catégorie avec cet appellation existe déjà";
            res.status(409).json({ msg });

        } else {
            const datas = {
                subcate_title: req.body.subcate_title,
                categorie_id: req.body.categorie_id,
             };

            const query =
                "INSERT INTO subcategories (subcate_title, categorie_id) VALUES(?, ?)";
            await Query.write(query, datas);

            msg2 = "La catégorie a bien été créée";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};

const DeleteCategorie = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM categories WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);
        
        msg = "La catégorie a été supprimée";
        res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

const DeleteSubcategorie = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM subcategories WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

        msg = "La sous-catégorie a été supprimée";
        res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};





export { getCategories , getCategoryById , getSubcategories , getSubategoryById , AddCategories , AddSubcategories , DeleteCategorie, DeleteSubcategorie };