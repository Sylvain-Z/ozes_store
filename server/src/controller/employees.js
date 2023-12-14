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
        const datas = {
            email: req.body.email,
        };
        const queryEmployyees =
            "SELECT email FROM employees WHERE email = ?";
        const [employees] = await Query.findByDatas(queryEmployyees, datas);

        if (employees.length) {
            msg = "Un collaborateur avec cet email existe déjà";
            res.status(409).json({ msg });

        } else if (!employees.length) {
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
            const TOKEN = sign({ lastname: employees[0].email }, SK);
            res.status(200).json({ msg, TOKEN });
            } else {
                msg2 = "Mot de passe incorrecte";
                res.status(401).json({msg2})
            }

        } else if (!employees.length) {
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
    }
    if(employees.length) {        
        res.status(200).json(employees);
        return;
    } 
};

const getEmployeeGlimpse = async (req, res) => {
    
    const query = "SELECT id, firstname, lastname, role FROM employees WHERE id = ?";
    const [datas] = await Query.findByDatas(query, req.params);
    if(!datas.length){
        res.status(404).json({msg: "produit non reconnu"})
    }
    if(datas.length) {        
        res.status(200).json(datas);
        return;
    }  
};

const getById = async (req, res) => {
    
    const query = "SELECT * FROM employees WHERE id = ?";
    const [employees] = await Query.findByDatas(query, req.params);
    if(!employees.length){
        res.status(404).json({msg: "donnée non reconnu"})
    }
    if(employees.length) {        
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
