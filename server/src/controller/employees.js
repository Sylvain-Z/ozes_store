import Query from "../model/Query.js";
import { hash } from "bcrypt";
import bcrypt from "bcrypt"
import jsonwebtoken from "jsonwebtoken";

const { sign } = jsonwebtoken;
const { SK_EMPL }  = process.env;
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
        const datas = {
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

        // Vérification de l'unicité de l'email
        const queryEmployyees =
            "SELECT email FROM employees WHERE email = ?";
        const [employees] = await Query.findByDatas(queryEmployyees, datas);

        if (employees.length) {
            msg = "Un collaborateur avec cet email existe déjà";
            res.status(409).json({ msg });

        } else {
            const datas = {
                id: req.body.id,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                role: req.body.role,
                email: req.body.email,
                password: await hash(req.body.password, SALT),
            };

            const query =
                "INSERT INTO employees (id , firstname, lastname, role, email, password, registration_date) VALUES(?, ?, ?, ?, ?, ?, NOW())";
            await Query.write(query, datas);

            msg2 = "Le compte a bien été créé";
            res.status(201).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};


const signin = async (req, res) => {
    try {
        let msg = "";
        let msg2 = "";
        const datas = { email: req.body.email };
        const queryEmployees = "SELECT * FROM employees WHERE email = ?";
        const [employees] = await Query.findByDatas(queryEmployees, datas);

        if (employees.length) {
            msg = "Connexion réussie";
            const matchPassword = await bcrypt.compare(req.body.password, employees[0].password);
            
            if (matchPassword){
            const TOKEN_EMPL = sign({ email: employees[0].email }, SK_EMPL);
            res.status(200).json({ msg, TOKEN_EMPL });
            } else {
                msg2 = "L'email ou le mot de passe est incorrecte";
                res.status(401).json({msg2})
            }

        } else {
            msg2 = "L'email ou le mot de passe est incorrecte";
            res.status(409).json({ msg2 });
        }
    } catch (error) {
        throw Error(error);
    }
};

const getAllEmployees = async (req, res) => {
    
    const queryEmployees = "SELECT * FROM employees ORDER BY lastname";
    const [datas] = await Query.find(queryEmployees);

    res.status(200).json({ datas });
};

const getByEmail = async (req, res) => {
    
    const query = "SELECT * FROM employees WHERE employees.email = ?";
    const [employees] = await Query.findByDatas(query, req.params);

    if(!employees.length){
        res.status(404).json({msg: "utilisateur non reconnu"})
    } else {        
        res.status(200).json(employees);
        return;
    } 
};

const getEmployeeGlimpse = async (req, res) => {
    
    const query = "SELECT id, firstname, lastname, role FROM employees WHERE id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    } else {        
        res.status(200).json(datas);
        return;
    }  
};

const getById = async (req, res) => {
    
    const query = "SELECT * FROM employees WHERE id = ?";
    const [employees] = await Query.findByDatas(query, req.params);
    if(!employees.length){
        res.status(404).json({msg: "donnée non reconnu"})
    } else {        
        res.status(200).json(employees);
        return;
    }  
};

const updateInfo = async (req, res) => {
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
            email: req.body.email,           
                       };
        const query =
            "SELECT id, firstname, lastname, number, street, complement, postal_code, city, email phone FROM employees WHERE email = ?";
        const [employees] = await Query.findByDatas(query, req.params);

        if(employees.length){
            const query =
                "UPDATE employees SET firstname = ? , lastname = ? , number = ? , street = ? , complement = ? , postal_code = ? , city = ?, phone = ? WHERE email = ?";
            await Query.write(query, datas);

            msg = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg });
            }

    } catch (error) {
        throw Error(error);
    }
};
const updateInfoEmployees = async (req, res) => {
    try {
        let msg = "";
        const datas = {
            firstname : req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role: req.body.role,
            number: req.body.number,
            street: req.body.street,
            complement: req.body.complement,
            postal_code: req.body.postal_code,
            city: req.body.city,
            phone: req.body.phone,             
            id: req.body.id,                  
                       };
        const query =
            "SELECT id, firstname, lastname, email , role, number, street, complement, postal_code, city, email phone FROM employees WHERE id = ?";
        const [employees] = await Query.findByDatas(query, req.params);

        if(employees.length){
            const query =
                "UPDATE employees SET firstname = ? , lastname = ? , email = ? , role = ? , number = ? , street = ? , complement = ? , postal_code = ? , city = ?, phone = ? WHERE id = ?";
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
        const datas = { 
            password: await hash(req.body.password, SALT),
            email: req.body.email,       
            lastname: req.body.lastname,       
                       };
        const query =
            "SELECT id, lastname, email, password FROM employees WHERE employees.email = ?";
        const [employees] = await Query.findByDatas(query, req.params);
        
        if(employees.length){
            const query =
                "UPDATE employees SET password = ? , email = ? WHERE employees.lastname = ?";
            await Query.write(query, datas);

            msg = "Vos informations ont été mise à jour !";
            res.status(201).json({ msg });
        }
    } catch (error) {
        throw Error(error);
    }
};


const deleteEmployee = async (req, res) => {
    try {
        let msg =""
        const query =
            "DELETE FROM employees WHERE id = ?";
        await Query.deleteByValue(query, req.params.id);

            msg = "Le compte a été supprimé";
            res.status(201).json({ msg });
        
    } catch (error) {
        throw Error(error);
    }
};




export { check_token, createAccount, signin , getAllEmployees, getByEmail , getEmployeeGlimpse , getById , updateInfo , updateInfoEmployees , updateLogin ,  deleteEmployee};
