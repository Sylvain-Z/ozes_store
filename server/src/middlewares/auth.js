import jwt from 'jsonwebtoken';

const { SK } = process.env;

export const auth = (req, res, next) => {
    const TOKEN = req.headers.authentication && req.headers.authentication.slice(7);
    // console.log("TOKEN", TOKEN)
    if(TOKEN === undefined || TOKEN === "null"){
        res.status(404).json({msg: "token not found"});
        return;
    } else {
        jwt.verify(TOKEN, SK, (err, decoded)=>{
            // console.log("DECODED_USER", decoded)
            if(err){
                res.status(401).json({status: 401, msg: "token invalid"});
                return;
            } else {
                req.params.pseudo = decoded.pseudo;
                next();
            }
        });
    }
}