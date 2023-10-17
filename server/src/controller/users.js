import { hash } from "bcrypt";
import Query from "../model/Query.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt"

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
            "SELECT lastname, email FROM users WHERE lastname = ? OR email = ?";
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

            console.log("4444444", user);
            console.log("333333", "mdp hashé :", user[0].password, "//// mdp formulaire :" ,req.body.password);
            const matchPassword = await bcrypt.compare(req.body.password, user[0].password);
            console.log("22222", matchPassword);
            if (matchPassword){       
            console.log("111111", user[0].password); 
            const TOKEN = sign({ email: user[0].email }, SK);
            res.status(200).json({ msg, TOKEN });
            } if(!matchPassword) {
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

export { check_token, createAccount, signin };
