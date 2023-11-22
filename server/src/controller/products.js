import Query from "../model/Query.js";


const getOneProductsFull = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id WHERE products.id = ? ORDER BY pictures.id ASC LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};
const getProductsGlimpse = async (req, res) => {
    
    const query = "SELECT products.id, reference, stock_quantity, title, file_name, caption FROM products JOIN pictures ON pictures.product_id = products.id WHERE products.id = ? ORDER BY pictures.id ASC LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getProductsGalery = async (req, res) => {
    
    const query = "SELECT products.id, products.reference, products.stock_quantity, products.title, products.title_url, products.price, pictures.file_name, pictures.caption, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const getProductsDetails = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = ? AND products.title_url = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getPics_subById = async (req, res) => {
    
    const query = "SELECT * FROM pictures_sub WHERE product_id = ?";
    const [datas] = await Query.findByValue(query, req.params.id);
    if(!datas.length){
        res.status(404).json({msg: "image non trouvée"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getClothes = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = 'vetements'";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getClothesDetails = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = 'vetements' AND products.title_url = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getJewelry = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = 'bijoux'";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getJewelryDetails = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = 'bijoux' AND products.title_url = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getProductsCart = async (req, res) => {
    
    const query = "SELECT products.id, products.title, products.title_url, products.price, pictures.file_name1, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
    const [datas] = await Query.findByDatas(query);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    } 
};

const getLastId = async (req, res) => {
    
    const query = "SELECT id FROM products ORDER BY id DESC LIMIT 1";
    const [datas] = await Query.find(query);
    if(!datas.length){
        res.status(404).json({msg: "données non reconnue"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    } 
};

const getSubcategories = async (req, res) => {
    
    const query = "SELECT id, subcate_title FROM subcategories";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

const getProdSubcateById = async (req, res) => {
    
    const query = "SELECT product_id, subcategorie_id FROM products_subcategories WHERE product_id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "donnée non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};
const getPicById = async (req, res) => {
    
    const query = "SELECT * FROM pictures WHERE product_id = ? ORDER BY id DESC LIMIT 4";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "donnée non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};


const AddProduct = async (req, res) => {
    try {
        let msg ="";
        let msg2 ="";
        const datas = { 
            reference: req.body.reference,
            stock_quantity: req.body.stock_quantity,
            title: req.body.title,
            title_url: req.body.title_url,
            description: req.body.description,
            price: req.body.price,
            color: req.body.color,
            shape: req.body.shape,
            gender: req.body.gender,
            model_info: req.body.model_info,
            material: req.body.material,
            infosup: req.body.infosup,
            infosupplus: req.body.infosupplus,
            madeplace: req.body.madeplace,
        };

        const queryProduct =
            "SELECT reference FROM products WHERE reference = ?";
        const [product] = await Query.findByDatas(queryProduct, datas);

        if (product.length) {
            msg = "Un produit avec cette référence existe déjà";
            res.status(409).json({ msg });

        } else if (!product.length) {
            const datas = {
                reference: req.body.reference,
                stock_quantity: req.body.stock_quantity,
                title: req.body.title,
                title_url: req.body.title_url,
                description: req.body.description,
                price: req.body.price,
                color: req.body.color,
                shape: req.body.shape,
                gender: req.body.gender,
                model_info: req.body.model_info,
                material: req.body.material,
                infosup: req.body.infosup,
                infosupplus: req.body.infosupplus,
                madeplace: req.body.madeplace,
            };

        const query =
            "INSERT INTO products (reference, stock_quantity, title, title_url, description, price, color, shape, gender, model_info, material, infosup, infosupplus, madeplace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await Query.write(query, datas);

            msg2 = "Le produit a bien été créé";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};

const AddCategories = async (req, res) => {
    try {
        let msg ="";
        const datas = { 
            product_id: req.body.product_id,
            subcategorie_id: req.body.subcategorie_id,
        };

        const query =
            "INSERT INTO products_subcategories ( product_id, subcategorie_id) VALUES (?, ?)";
        await Query.write(query, datas);

            msg = "Le produit a bien été créé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

const AddPictures = async (req, res) => {
    try {
        let msg ="";
        const datas = { 
            file_name: req.body.file_name,
            caption: req.body.caption,
            product_id: req.body.product_id,
        };

        const query =
            "INSERT INTO pictures (file_name, caption, product_id) VALUE (?, ?, ?)";
        await Query.write(query, datas);

            msg = "Le produit a bien été créé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

const UpdateProduct = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            reference: req.body.reference,
            stock_quantity: req.body.stock_quantity,
            title: req.body.title,
            title_url: req.body.title_url,
            description: req.body.description,
            price: req.body.price,
            color: req.body.color,
            shape: req.body.shape,
            gender: req.body.gender,
            model_info: req.body.model_info,
            material: req.body.material,
            material_style: req.body.material_style,
            infosup: req.body.infosup,
            infosupplus: req.body.infosupplus,
            madeplace: req.body.madeplace,
            id: req.body.id,
                       };
            const query =
                "UPDATE products SET reference = ? , stock_quantity = ? , title = ? , title_url = ? , description = ? , price = ? , color = ?, shape = ? , gender = ? , model_info = ? , material = ? , material_style = ? , infosup = ? , infosupplus = ? , madeplace = ? WHERE id = ?";
            await Query.write(query, datas);

            msg = "Les informations ont été mises à jour !";
            res.status(201).json({ msg });
    } catch (error) {
        throw Error(error);
    }
};

const UpdateProductSubcate = async (req, res) => {
    try {
        let msg =""
        const datas = {
            subcategorie_id: req.body.subcategorie_id,
            product_id: req.body.product_id,
                       };
        const query =
            "UPDATE products_subcategories SET subcategorie_id = ? WHERE product_id = ?";
        await Query.write(query, datas);

            msg = "La catégorie a été modifiée";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

const UpdateProductPicById = async (req, res) => {
    try {
        let msg =""
        const datas = {
            file_name: req.body.file_name,
            caption: req.body.caption,
            product_id: req.body.product_id,
                       };
        const query =
            "UPDATE pictures SET file_name = ? , caption = ? WHERE product_id = ?";
        await Query.write(query, datas);

            msg = "Les informations ont été modifiée";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

const DeleteProduct = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM products WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

            msg = "Le produit a été supprimé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};



export { getOneProductsFull, getProductsGalery , getPics_subById , getProductsGlimpse , getProductsDetails , getClothes , getClothesDetails , getJewelry , getJewelryDetails , getProductsCart , getLastId , getSubcategories, getProdSubcateById , getPicById, AddProduct , AddCategories , AddPictures , UpdateProduct , UpdateProductSubcate , UpdateProductPicById , DeleteProduct };