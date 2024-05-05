import Query from "../model/Query.js";


const getProductCartByRef = async (req, res) => {
    try {
    const query = "SELECT products.id, reference, title, title_url, price, file_name, caption FROM products JOIN pictures ON pictures.product_id = products.id WHERE reference = ? LIMIT 1";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    } 
    } catch (error) {
        throw Error(error);
    }   
};

const CreateOrder = async (req, res) => {
    try {
        let msg = "";
        const orderDatas = {
            order_price: req.body.order_price,
            user_id: req.body.user_id,
        };
        const cart = req.body.cart; // c'est la state cart qui est utilisée pour obtenir la liste des produits

            try {
                const orderQuery =
                    "INSERT INTO orders (order_date, order_price, user_id) VALUES(CURRENT_TIMESTAMP, ?, ?)";
                const resultOrder = await Query.write(orderQuery, orderDatas);
                
                const orderId = resultOrder[0].insertId;  // récupère l'id de la commande passée
                
                const productQuery =
                    "INSERT INTO orders_products (order_id, product_id, size, quantity, priceEach) VALUES(?, ?, ?, ?, ?)";

                    for (const product of cart) {  // boucle pour chaque produit inclu dans le panier
                        const productData = {
                            product_id: product.product_id,
                            size: product.size,
                            quantity: product.quantity,
                            priceEach: product.priceEach,
                        };
                        await Query.write(productQuery, [orderId, productData.product_id, productData.size, productData.quantity, productData.priceEach]);
                    }

                msg = "La commande a été validée";
                res.status(201).json({ msg });
            } catch (error) {
                throw Error(error);
            }    
            
    } catch (error) {
        throw Error(error);
    }

};
const CreateOrderLocalStorage = async (req, res) => {
    try {
        let msg = "";
        const userDatas = {
            id: req.body.userLs_Id,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            number: req.body.number,
            street: req.body.street,
            complement: req.body.complement,
            postal_code: req.body.postal_code,
            city: req.body.city,
            phone: req.body.phone,
        };
        const orderDatas = {
            order_price: req.body.order_price,
        };
        const cart = req.body.cart; // c'est la state cart qui est utilisée pour obtenir la liste des produits

            try {
                const userQuery =
                    "INSERT INTO users (id, pseudo, firstname, lastname, email, number, street, complement, postal_code, city, phone) VALUES(?, 'commandeInvite', ?, ?, ?, ?, ?, ?, ?, ?, ?)";
                await Query.write(userQuery, userDatas);

                const orderQuery =
                    "INSERT INTO orders (order_date, order_price, user_id) VALUES(CURRENT_TIMESTAMP, ?, ?)";
                const resultOrder = await Query.write(orderQuery, [orderDatas.order_price, userDatas.id]);
                
                const orderId = resultOrder[0].insertId;  // récupère l'id de la commande passée
                
                const productQuery =
                    "INSERT INTO orders_products (order_id, product_id, size, quantity, priceEach) VALUES(?, ?, ?, ?, ?)";

                    for (const product of cart) {  // boucle pour chaque produit inclu dans le panier
                        const productData = {
                            product_id: product.product_id,
                            size: product.size,
                            quantity: product.quantity,
                            priceEach: product.priceEach,
                        };
                        await Query.write(productQuery, [orderId, productData.product_id, productData.size, productData.quantity, productData.priceEach]);
                    }

                msg = "La commande a été validée";
                res.status(201).json({ msg });
            } catch (error) {
                throw Error(error);
            }    
            
    } catch (error) {
        throw Error(error);
    }

};

const getOrders = async (req, res) => {
    try {
    const query = "SELECT * FROM orders ORDER BY order_date DESC";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas }); 
    } catch (error) {
        throw Error(error);
    }   
};

const getOrdersByID = async (req, res) => {  // pas paramétré
    try {
    const query = "SELECT orders.id AS order_id, order_date, order_price, tracking_number, orders_products.priceEach, orders_products.quantity, products.id AS product_id, products.reference, products.title, MIN(pictures.id) AS first_picture_id, pictures.file_name, pictures.caption, pseudo, firstname, lastname, email, number, street, complement, postal_code, city, phone FROM orders JOIN orders_products ON orders_products.order_id = orders.id JOIN products ON products.id = orders_products.product_id JOIN pictures ON products.id = pictures.product_id JOIN users ON orders.user_id = users.id WHERE orders.id = ? GROUP BY products.id ORDER BY products.id ASC";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produits non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
    } catch (error) {
        throw Error(error);
    }    
};
const getUserOrders = async (req, res) => {
    try {
    const query = "SELECT orders.id, order_date, order_price, tracking_number, users.id AS user_id, pseudo FROM orders JOIN users ON orders.user_id = users.id WHERE users.id = ? ORDER BY order_date DESC";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produits non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
    } catch (error) {
        throw Error(error);
    }    
};

const getOrdersByUserID = async (req, res) => { 
    try {
    const query = "SELECT orders.id AS order_id, order_date, order_price, tracking_number, orders_products.priceEach, orders_products.quantity, products.id, products.reference, products.title, MIN(pictures.id) AS first_picture_id, pictures.file_name, pictures.caption, users.id AS user_id, firstname, lastname, email, number, street, complement, postal_code, city, phone FROM orders JOIN orders_products ON orders_products.order_id = orders.id JOIN products ON products.id = orders_products.product_id JOIN pictures ON products.id = pictures.product_id JOIN users ON users.id = orders.user_id WHERE user_id = ? AND order_id = ? GROUP BY products.id ORDER BY products.id ASC";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produits non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
    } catch (error) {
        throw Error(error);
    }    
};

const UpdateTrackingNumber = async (req, res) => {
    try {
        let msg =""
        const datas = {
            tracking_number: req.body.tracking_number,
            id: req.body.id,
                       };
        const query =
            "UPDATE orders SET tracking_number = ? WHERE id = ?";
        await Query.write(query, datas);

            msg = "Le numéro de suivi a été modifié";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};



export { getProductCartByRef , CreateOrder , CreateOrderLocalStorage , getOrders , getOrdersByID , UpdateTrackingNumber , getUserOrders, getOrdersByUserID};