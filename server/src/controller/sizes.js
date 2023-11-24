import Query from "../model/Query.js";

const getSizes = async (req, res) => {
    
    const query = "SELECT * FROM sizes";
    const [datas] = await Query.find(query);

    res.status(200).json({ datas });
};

/* const getSizesById = async (req, res) => {
    
    const query = "SELECT * FROM sizes WHERE id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "taille non reconnue"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
}; */
const getSizesByProductId = async (req, res) => {
    
    const query = "SELECT * FROM  sizes WHERE product_id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "taille non reconnue"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};
const getProductSizeByIds = async (req, res) => {
    
    const query = "SELECT * FROM sizes WHERE product_id = ? AND id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "taille non reconnue"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const AddSizes = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = { 
            label: req.body.label,
            quantity: req.body.quantity,
            product_id: req.body.product_id,
        };
        const querySizes =
            "SELECT label FROM sizes WHERE label = ? AND product_id = ?";
        const [size] = await Query.findByDatas(querySizes, datas);

        if (size.length) {
            msg = "Une taille avec cette appellation existe déjà";
            res.status(409).json({ msg });

        } else if (!size.length) {
            const datas = { 
                label: req.body.label,
                quantity: req.body.quantity,
                product_id: req.body.product_id,
            };

            const query =
                "INSERT INTO sizes (label, quantity , product_id) VALUES(?, ?, ?)";
            await Query.write(query, datas);

            msg2 = "La taille a bien été créée";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};
const UpdateSizes = async (req, res) => {
    try {
        let msg =""
        const datas = {
            label: req.body.label,
            quantity: req.body.quantity,
            product_id: req.body.product_id,
            id: req.body.id,
                       };
        const query =
            "UPDATE sizes SET label = ?, quantity = ? WHERE product_id = ? AND id = ?";
        await Query.write(query, datas);

            msg = "Les information sur la taille ont été modifiées";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

/* const AttribSizes = async (req, res) => { 
    try {
        let msg = "";
        let msg2 = "";
        const datas = {
            product_id: req.body.product_id,
            size_id: req.body.size_id,
        };
        const querySizes =
            "SELECT * FROM products_sizes WHERE product_id = ? AND size_id = ?";
        const [size] = await Query.findByDatas(querySizes, datas);

        if (size.length) {
            msg = "Cette taille est déjà attribuée";
            res.status(409).json({ msg });

        } else if (!size.length) {
            const datas = {
                product_id: req.body.product_id,
                size_id: req.body.size_id,
            };

            const query =
                "INSERT INTO products_sizes (product_id, size_id) VALUES(?, ?)";
            await Query.write(query, datas);

            msg2 = "La taille a bien été attribuée";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
}; */

/* const RemoveSizes = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM products_sizes WHERE product_id = ? AND size_id = ?";
        await Query.deleteByDatas(query, req.params);
        
        msg = "La taille a été retirée";
        res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
}; */
const DeleteSizes = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM sizes WHERE product_id = ? AND id = ?";
        await Query.deleteByDatas(query, req.params);
        
        msg = "La taille a été supprimée";
        res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};

export { getSizes , getProductSizeByIds /*, getSizesById   , AttribSizes */, getSizesByProductId , AddSizes , UpdateSizes /* , RemoveSizes */ , DeleteSizes };