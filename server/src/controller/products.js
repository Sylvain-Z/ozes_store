import Query from "../model/Query.js";

const getProductsGalery = async (req, res) => {
    
    const query = "SELECT products.id, products.title, products.title_url, products.price, pictures.file_name1, pictures.caption1, categories.cate_url FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
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

export { getProductsGalery , getProductsDetails };