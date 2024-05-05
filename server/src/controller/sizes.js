import Query from "../model/Query.js";

const getSizesByProductId = async (req, res) => {
    try {
        const query = "SELECT * FROM  sizes WHERE product_id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        if(!datas.length){
            res.status(404).json({msg: "taille non reconnue"})
        } else {        
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
    throw Error(error);
    }
};
const getProductSizeByIds = async (req, res) => {
    try {
        const query = "SELECT * FROM sizes WHERE product_id = ? AND id = ?";
        const [datas] = await Query.findByDatas(query, req.params);
        if(!datas.length){
            res.status(404).json({msg: "taille non reconnue"})
        } else {        
            res.status(200).json(datas);
            return;
        }
    } catch (error) {
        throw Error(error);
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

        } else {
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

export { getProductSizeByIds , getSizesByProductId , AddSizes , UpdateSizes , DeleteSizes };