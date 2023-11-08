import Query from "../model/Query.js";

const getProductsGalery = async (req, res) => {
    
    const query = "SELECT products.id, products.stock_quantity, products.title, products.title_url, products.price, pictures.file_name1, pictures.caption1, categories.cate_url FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};


const getProductsDetails = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_url = ? AND products.title_url = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getClothes = async (req, res) => {
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_url = 'vetements'";
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
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_url = 'vetements' AND products.title_url = ?";
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
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_url = 'bijoux'";
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
    
    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_url = 'bijoux' AND products.title_url = ?";
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
    
    const query = "SELECT products.id, products.title, products.title_url, products.price, pictures.file_name1, categories.cate_url FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
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

const AddProduct = async (req, res) => {
    try {
        let msg ="";
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
        };

        const query =
            "INSERT INTO products (reference, stock_quantity, title, title_url, description, price, color, shape, gender, model_info, material, material_style, infosup, infosupplus, madeplace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await Query.write(query, datas);

            msg = "Le produit a bien été créé";
            res.status(201).json({ msg });
        
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
            file_name1: req.body.file_name1,
            caption1: req.body.caption1,
            file_name2: req.body.file_name2,
            caption2: req.body.caption2,
            file_name3: req.body.file_name3,
            caption3: req.body.caption3,
            file_name4: req.body.file_name4,
            caption4: req.body.caption4,
            file_name5: req.body.file_name5,
            caption5: req.body.caption5,
            product_id: req.body.product_id,
        };

        const query =
            "INSERT INTO pictures (file_name1, caption1, file_name2, caption2, file_name3, caption3, file_name4, caption4, file_name5, caption5, product_id) VALUE (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        await Query.write(query, datas);

            msg = "Le produit a bien été créé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};



export { getProductsGalery , getProductsDetails , getClothes , getClothesDetails , getJewelry , getJewelryDetails , getProductsCart , getLastId , AddProduct ,AddCategories , AddPictures };