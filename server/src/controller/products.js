import Query from "../model/Query.js";

const getOneProductsFull = async (req, res) => {

    const query = "SELECT * FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id WHERE products.id = ? ORDER BY pictures.id ASC LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if (!datas.length) {
        res.status(404).json({ msg: "produit non reconnu" })
    }
    if (datas.length) {
        res.status(200).json(datas);
        return;
    }
};
const getProductsGlimpse = async (req, res) => {

    const query = "SELECT products.id, reference, title, file_name, caption FROM products JOIN pictures ON pictures.product_id = products.id WHERE products.id = ? ORDER BY pictures.id ASC LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if (!datas.length) {
        res.status(404).json({ msg: "produit non reconnu" })
    }
    if (datas.length) {
        res.status(200).json(datas);
        return;
    }
};

const getProductsGalery = async (req, res) => {
    try {
        const query = "SELECT products.id, MIN(pictures.id) AS first_picture_id, products.reference, products.title, products.title_url, products.price, pictures.file_name, pictures.caption, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id GROUP BY products.id ORDER BY products.id ASC";
        const [datas] = await Query.find(query);

        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
};

const getProductsGaleryOffset = async (req, res) => {
    try {

        const { firstpage } = req.params;

        const itemsPerPage = 12;
        const offset = (firstpage - 1) * itemsPerPage;

        const query = "SELECT products.id, MIN(pictures.id) AS first_picture_id, products.reference, products.title, products.title_url, products.price, pictures.file_name, pictures.caption, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id GROUP BY products.id ORDER BY products.id ASC LIMIT ? OFFSET ?";
        const [datas] = await Query.findByDatas(query, [itemsPerPage, offset]);

        // retourne le total de page pour un certain nombre de produits par page
        const query2 = "SELECT CEIL(COUNT(*) / 12) AS totalPages FROM products";
        const [totalPages] = await Query.find(query2);

        res.status(200).json({ datas, totalPages });
    } catch (error) {
        throw Error(error);
    }
};

const getRandom = async (req, res) => {
    try {
        const query = "SELECT products.id, MIN(pictures.id) AS first_picture_id, products.reference, products.title, products.title_url, products.price, pictures.file_name, pictures.caption, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id GROUP BY products.id ORDER BY RAND() LIMIT 4;";
        const [datas] = await Query.find(query);

        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
};

const getProductsDetails = async (req, res) => {
    try {
        const query = "SELECT *, products.id AS product_id, MIN(pictures.id) AS first_picture_id FROM products JOIN pictures ON pictures.product_id = products.id JOIN sizes ON sizes.product_id = products.id WHERE products.title_url = ? AND products.id = ? GROUP BY products.id ORDER BY products.id ASC;";
        const [datas] = await Query.findByDatas(query, req.params);
        if (!datas.length) {
            res.status(404).json({ msg: "produit non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};
const getQuantitybyId = async (req, res) => {
    try {
        const query = "SELECT product_id, SUM(quantity) AS total FROM sizes WHERE product_id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        if (!datas.length) {
            res.status(404).json({ msg: "produit non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};
const getSizesByProductId = async (req, res) => {
    try {
        const query = "SELECT products.id AS product_id, reference, sizes.id AS sizes_id, label, quantity FROM products JOIN pictures ON pictures.product_id = products.id JOIN sizes ON sizes.product_id = products.id WHERE products.id = ? GROUP BY sizes.id";
        const [datas] = await Query.findByDatas(query, req.params);
        if (!datas.length) {
            res.status(404).json({ msg: "tailles non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};

const getProductsCart = async (req, res) => {
    try {
        const query = "SELECT products.id, products.title, products.title_url, products.price, pictures.file_name1, categories.cate_title FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id ORDER BY products.id ASC";
        const [datas] = await Query.findByDatas(query);
        if (!datas.length) {
            res.status(404).json({ msg: "produit non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};

const getLastId = async (req, res) => {
    try {
        const query = "SELECT id FROM products ORDER BY id DESC LIMIT 1";
        const [datas] = await Query.find(query);
        if (!datas.length) {
            res.status(404).json({ msg: "données non reconnue" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};

const getSubcategories = async (req, res) => {
    try {
        const query = "SELECT id, subcate_title FROM subcategories";
        const [datas] = await Query.find(query);

        res.status(200).json({ datas });
    } catch (error) {
        throw Error(error);
    }
};

const getProdSubcateById = async (req, res) => {
    try {


        const query = "SELECT subcate_title, product_id, subcategorie_id FROM subcategories JOIN products_subcategories ON products_subcategories.subcategorie_id = subcategories.id WHERE product_id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        if (!datas.length) {
            res.status(404).json({ msg: "donnée non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};

const getProductsByCategorie = async (req, res) => {
    try {
        const query = "SELECT products.id, MIN(pictures.id) AS first_picture_id, products.title, products.title_url, products.price, pictures.file_name, pictures.caption FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = ? GROUP BY products.id ORDER BY products.id ASC";
        const [datas] = await Query.findByDatas(query, req.params);
        if (!datas.length) {
            res.status(404).json({ msg: "donnée non reconnu" })
        } else {
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
    }
};
const getProductsByCategorieOffset = async (req, res) => {
    try {

        const { cate_title , firstpage } = req.params;
        
        const itemsPerPage = 12;
        const offset = (firstpage - 1) * itemsPerPage;

        const query = "SELECT products.id, MIN(pictures.id) AS first_picture_id, products.title, products.title_url, products.price, pictures.file_name, pictures.caption FROM products JOIN pictures ON pictures.product_id = products.id JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = ? GROUP BY products.id ORDER BY products.id ASC  LIMIT ? OFFSET ?";
        const [datas] = await Query.findByDatas(query, [cate_title, itemsPerPage, offset]);

        const query2 = "SELECT CEIL(COUNT(*) / 12) AS totalPages FROM products JOIN products_subcategories ON products_subcategories.product_id = products.id JOIN subcategories ON subcategories.id = products_subcategories.subcategorie_id JOIN categories ON categories.id = subcategories.categorie_id WHERE categories.cate_title = ?";
        const [totalPages] = await Query.findByDatas(query2, [cate_title]);

        res.status(200).json({ datas, totalPages });
    } catch (error) {
        throw Error(error);
    }
};

const AddProduct = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = {
            reference: req.body.reference,
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

        } else {
            const datas = {
                reference: req.body.reference,
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
                "INSERT INTO products (reference, title, title_url, description, price, color, shape, gender, model_info, material, infosup, infosupplus, madeplace) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const result = await Query.write(query, datas);

            const productId = result[0].insertId;  // récupère l'id du produit créé

            const querySize =
                "INSERT INTO sizes (label, product_id) VALUES (?, ?)";
            await Query.write(querySize, ["nouvelle taille", productId]);

            msg2 = "Le produit a bien été créé";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};
const AddSubCategories = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            product_id: req.body.product_id,
            subcategorie_id: req.body.subcategorie_id,
        };

        const query =
            "INSERT INTO products_subcategories ( product_id, subcategorie_id) VALUES (?, ?)";
        await Query.write(query, datas);

        msg = "La catégorie a bien été associée";
        res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};

const AddPictures = async (req, res) => { // à supprimer lorsque formidable sera ok
    try {
        let msg = "";
        const datas = {
            file_name: req.body.file_name,
            caption: req.body.caption,
            product_id: req.body.product_id,
        };

        const query =
            "INSERT INTO pictures (file_name, caption, product_id) VALUE (?, ?, ?)";
        await Query.write(query, datas);

        msg = "L'image a bien été associée";
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
            id: req.body.id,
        };
        const query =
            "UPDATE products SET reference = ? , title = ? , title_url = ? , description = ? , price = ? , color = ?, shape = ? , gender = ? , model_info = ? , material = ? , infosup = ? , infosupplus = ? , madeplace = ? WHERE id = ?";
        await Query.write(query, datas);

        msg = "Les informations ont été mises à jour !";
        res.status(201).json({ msg });
    } catch (error) {
        throw Error(error);
    }
};

const UpdateProductSubcate = async (req, res) => {
    try {
        let msg = ""
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
        let msg = ""
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
        let msg = ""
        let msg2 = ""
        const query =
            "DELETE FROM products WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

        msg = "Le produit a été supprimé"; // composant ProductDelete
        msg2 = "La création a été annulée"; // composant ProductAddSubCate
        res.status(201).json({ msg, msg2 });

    } catch (error) {
        throw Error(error);
    }
};



export { getOneProductsFull, getProductsGalery, getProductsGaleryOffset, getRandom, getSizesByProductId, getProductsGlimpse, getProductsDetails, getQuantitybyId, getProductsByCategorie, getProductsByCategorieOffset, getProductsCart, getLastId, getSubcategories, getProdSubcateById, AddProduct, AddSubCategories, AddPictures, UpdateProduct, UpdateProductSubcate, UpdateProductPicById, DeleteProduct };