import Query from "../model/Query.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";

const { sign } = jsonwebtoken;
const { SK }   = process.env;
const SALT = 10;

const check_token = async (req, res) => {
    try {
        const queryUser = "SELECT email FROM users WHERE email = ?";
        await Query.findByValue(queryUser, req.params.email);
        res.status(200).json({msg: "Vérifié", id: queryUser.email })
    } catch (error) {
        throw Error(error);
    }
};

const createAccount = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = { lastname: req.body.lastname, email: req.body.email };
        const queryUser =
            "SELECT lastname, email FROM users WHERE email = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "Un utilisateur avec ce nom ou cet email existe déjà";
            res.status(409).json({ msg });

        } else if (!user.length) {
            const datas = {
                lastname: req.body.lastname,
                email: req.body.email,
                password: await hash(req.body.password, SALT),
            };

            const query =
                "INSERT INTO users (lastname, email, password, role, registration_date) VALUES(?, ?, ?, '3', NOW())";
            await Query.write(query, datas);

            msg = "Votre compte a bien été créé";
            msg2 = "Rendez-vous sur la page de connexion";
            res.status(201).json({ msg , msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};


const signin = async (req, res) => {
    try {
        let msg = "";
        const datas = { email: req.body.email };
        const queryUser = "SELECT * FROM users WHERE email = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "Votre compte a été trouvé";
            const matchPassword = await bcrypt.compare(req.body.password, user[0].password);
            
            if (matchPassword){
            const TOKEN = sign({ email: user[0].email }, SK);
            res.status(200).json({ msg, TOKEN });
            } else {
                msg = "Mot de passe incorrecte";
                res.status(401).json({msg})
            }

        } else if (!user.length) {
            msg = "L'email ou le mot de passe est incorrecte";
            res.status(409).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

const getAllUsers = async (req, res) => {
    
    const queryUser = "SELECT * FROM users JOIN adresses ON adresses.user_id = users.id";
    const [user] = await Query.find(queryUser);

    console.log(user)

    res.status(200).json({ user });
};

const userInformations = async (req, res) => {
    
    const queryUser = "SELECT * FROM users WHERE users.email = ?";
    const [user] = await Query.findByDatas(queryUser, req.params);

    console.log("USERINFORMATIONS CONTROLLER user --->", user);

    if(!user.length){
        res.status(404).json({msg: "utilisateur non reconnu"})
    }
    if(user.length) {        
        res.status(200).json(user);
        return;
    } 
};

const updatePersonalsInformations = async (req, res) => {
    try {
        let msg = "";
        const datas = { firstname : req.body.firstname,
                        lastname: req.body.lastname,
                        password: await hash(req.body.password, SALT),
                        email: req.body.email,       
                       };
        const queryUser =
            "SELECT id, email, firstname, lastname, password FROM users WHERE users.email = ?";
        const [user] = await Query.findByDatas(queryUser, req.params);

        console.log("updatePersonalsInformations CONTROLLER REQ.PARAMS --->", req.params);
        console.log("updatePersonalsInformations CONTROLLER user --->", user);
        console.log("updatePersonalsInformations CONTROLLER DATAS --->", datas);
        
        if(user.length){
            const query =
                "UPDATE users SET firstname = ? , lastname = ? , password = ? , email = ? WHERE users.email = ?";
            await Query.write(query, datas);

            msg = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

const updateDeliveryInformations = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            number: req.body.number,
            street: req.body.street,
            complement: req.body.complement,
            postal_code: req.body.postal_code,
            city: req.body.city,
            phone: req.body.phone,                 
            email: req.body.email,                   
                       };
        const queryUser =
            "SELECT id, email, number, street, complement, postal_code, city, phone FROM users WHERE email = ?";
        const [user] = await Query.findByDatas(queryUser, req.params);

        if(user.length){
            const query =
                "UPDATE users SET number = ? , street = ? , complement = ? , postal_code = ? , city = ?, phone = ?  WHERE email = ?";
            await Query.write(query, datas);

            msg = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg });
            }

    } catch (error) {
        throw Error(error);
    }
};

const updatePassword = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            // password: req.body.password,
            password: await hash(req.body.password, SALT),                  
                       };
        const queryUser =
            "SELECT id, email, password FROM users WHERE email = ?";
        const [user] = await Query.findByDatas(queryUser, req.params);

        if(user.length){
            const query =
                "UPDATE users SET password = ?  WHERE email = ?";
            await Query.write(query, datas);

            msg = "Votre mot de passe à été mis à jour !";
            res.status(201).json({ msg });
            }

    } catch (error) {
        throw Error(error);
    }
};

export { check_token, createAccount, signin , getAllUsers, userInformations , updatePersonalsInformations, updateDeliveryInformations, updatePassword };
