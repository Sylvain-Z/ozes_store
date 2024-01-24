import Query from "../model/Query.js";

const ReadAll = async (req, res) => {
    
    const query = "SELECT * FROM messages ORDER BY publication_date DESC ";
    const [messages] = await Query.find(query);
    if(!messages.length){
        res.status(404).json({msg: "pas de message dans la base de données"})
    } else {        
        res.status(200).json(messages);
        return;
    }  
};

const EmployeeReadUserMessages = async (req, res) => {
    
    const query = "SELECT * FROM messages WHERE id = ? ORDER BY id DESC";
    const [messages] = await Query.findByDatas(query, req.params);
    if(!messages.length){
        res.status(404).json({msg: "pas de message de cet utilisateur"})
    } else {        
        res.status(200).json(messages);
        return;
    }  
};
const UserReadHisMessages = async (req, res) => {
    
    const query = "SELECT * FROM messages WHERE user_id = ? ORDER BY id DESC";
    const [messages] = await Query.findByDatas(query, req.params);
    if(!messages.length){
        res.status(404).json({msg: "pas de message de cet utilisateur"})
    } else {        
        res.status(200).json(messages);
        return;
    }  
};

const WriteMessage = async (req, res) => {
    try {
        let msg ="";
        const message = { 
            id: req.body.id,
            user_pseudo: req.body.user_pseudo,
            user_email: req.body.user_email,
            subject: req.body.subject,
            content: req.body.content,
            user_id: req.body.user_id,
        };
        const query =
            "INSERT INTO messages (id, user_pseudo, user_email, subject, content, publication_date, answer, answer_date, status, user_id) VALUES(?, ?, ?, ?, ?, CURRENT_TIMESTAMP, NULL, NULL, 'en attente', ?)";
        await Query.write(query, message);

            msg = "Votre message a bien été envoyé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};
const ReadOneStatus = async (req, res) => {
    
    const query = "SELECT id , user_pseudo , user_email, content , status FROM messages WHERE id = ? ORDER BY publication_date";
    const [messages] = await Query.findByDatas(query, req.params);
    if(!messages.length){
        res.status(404).json({msg: "pas de message correspondant dans la base de données"})
    } else {        
        res.status(200).json(messages);
        return;
    }  
};

const AnswerMessages = async (req, res) => {
    try {
        let msg = "";
        const datas = { 
            answer: req.body.answer,  
            id: req.body.id, 
                       };
            const query =
                "UPDATE messages SET answer = ? , answer_date = CURRENT_TIMESTAMP , status = 'Répondu' WHERE id = ?";
            await Query.write(query, datas);
        
            msg = "Réponse envoyée";
            res.status(201).json({ msg });

    } catch (error) {
        throw Error(error);
    }
};


export { ReadAll, EmployeeReadUserMessages, UserReadHisMessages , WriteMessage , ReadOneStatus , AnswerMessages };