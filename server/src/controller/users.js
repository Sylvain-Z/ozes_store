import Query from "../model/Query.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";

const { sign } = jsonwebtoken;
const { SK }   = process.env;
const SALT = 10;

const check_token = async (req, res) => {
    try {
        const queryUser = "SELECT pseudo FROM users WHERE pseudo = ?";
        await Query.findByValue(queryUser, req.params.pseudo);
        res.status(200).json({msg: "Vérifié", id: queryUser.pseudo })
    } catch (error) {
        throw Error(error);
    }
};

const createAccount = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        let msg3 = "";
        const datas = { 
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password,
        };

        // Expression régulière pour la validation du format des champs
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,12}$/; 

        if (!emailRegex.test(datas.email)) {
            return res.status(400).json({ msg: "L'email n'est pas dans un format valide"})
        }
        if (!passwordRegex.test(datas.password)) {
            return res.status(400).json({ msg: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un caractère spécial et a une longueur comprise entre 8 et 12 caractères."})
        }

        // Vérification de l'unicité du pseudo
        const queryUser =
            "SELECT pseudo FROM users WHERE pseudo = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "Un utilisateur avec ce pseudo existe déjà";
            res.status(409).json({ msg });

        } else {
            const datas = {
                id: req.body.id,
                pseudo: req.body.pseudo,
                email: req.body.email,
                password: await hash(req.body.password, SALT),
            };

            const query =
                "INSERT INTO users (id, pseudo, email, password, registration_date) VALUES(?, ?, ?, ?, NOW())";
            await Query.write(query, datas);

            msg2 = "Votre compte a bien été créé";
            msg3 = "Rendez-vous sur la page de connexion";
            res.status(201).json({ msg2 , msg3 });
        }
    } catch (error) {
        throw Error(error);
    }
};


const signin = async (req, res) => {
    try {
        let msg = "";
        const datas = { pseudo: req.body.pseudo };
        const queryUser = "SELECT * FROM users WHERE pseudo = ?";
        const [user] = await Query.findByDatas(queryUser, datas);

        if (user.length) {
            msg = "Votre compte a été trouvé";
            const matchPassword = await bcrypt.compare(req.body.password, user[0].password);
            
            if (matchPassword){
            const TOKEN = sign({ pseudo: user[0].pseudo }, SK);
            res.status(200).json({ msg, TOKEN });
            } else {
                msg = "Le pseudo ou le mot de passe est incorrecte";
                res.status(401).json({msg})
            }

        } else {
            msg = "Le pseudo ou le mot de passe est incorrecte";
            res.status(409).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};

const getAllUsers = async (req, res) => {
    
    const queryUser = "SELECT * FROM users";
    const [user] = await Query.find(queryUser);

    res.status(200).json({ user });
};

const userInformations = async (req, res) => {
    
    const queryUser = "SELECT * FROM users WHERE users.pseudo = ?";
    const [user] = await Query.findByDatas(queryUser, req.params);

    if(!user.length){
        res.status(404).json({msg: "utilisateur non reconnu"})
    } else {        
        res.status(200).json(user);
        return;
    } 
};

const updateDelivery = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            number: req.body.number,
            street: req.body.street,
            complement: req.body.complement,
            postal_code: req.body.postal_code,
            city: req.body.city,
            phone: req.body.phone,                 
            pseudo: req.body.pseudo,                   
                       };
        const queryUser =
            "SELECT id, pseudo, firstname, lastname, number, street, complement, postal_code, city, phone FROM users WHERE pseudo = ?";
        const [user] = await Query.findByDatas(queryUser, req.params);

        if(user.length){
            const query =
                "UPDATE users SET firstname = ? , lastname = ? , number = ? , street = ? , complement = ? , postal_code = ? , city = ?, phone = ?  WHERE pseudo = ?";
            await Query.write(query, datas);

            msg = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg });
            }

    } catch (error) {
        throw Error(error);
    }
};

const updateLogin = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = { 
            password: await hash(req.body.password, SALT),
            email: req.body.email,       
            pseudo: req.body.pseudo,       
                       };

        // Expression régulière pour la validation du format des champs
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,12}$/; 

        if (!emailRegex.test(datas.email)) {
            return res.status(400).json({ msg: "L'email n'est pas dans un format valide"})
        }
        if (!passwordRegex.test(req.body.password)) {
            return res.status(400).json({ msg: "Le mot de passe doit contenir au moins une lettre minuscule, une lettre majuscule, un caractère spécial et a une longueur comprise entre 8 et 12 caractères."})
        }

        
        // Vérification de l'unicité du pseudo
        const queryUser =
            "SELECT id, pseudo, email, password FROM users WHERE users.pseudo = ?";
        const [user] = await Query.findByDatas(queryUser, req.params);
        
        if(user.length){
            const query =
                "UPDATE users SET password = ? , email = ? WHERE users.pseudo = ?";
            await Query.write(query, datas);

            msg2 = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};

const DeleteUser = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM users WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

            msg = "Le profil a été supprimé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};



export { check_token, createAccount, signin , getAllUsers, userInformations , updateDelivery, updateLogin , DeleteUser };
