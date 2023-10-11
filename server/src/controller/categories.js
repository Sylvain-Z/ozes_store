import Query from "../model/Query.js";

const getAllCategories = async (req, res) => {
    
    const query = "SELECT * FROM sub-categories";
    const [datas] = await Query.find(query);
    
    res.status(200).json({ datas });
};

export { getAllCategories };
