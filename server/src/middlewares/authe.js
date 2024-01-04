import jwt from 'jsonwebtoken';

const { SK_EMPL } = process.env;

export const authe = (req, res, next) => {
    const TOKEN_EMPL = req.headers.authentication && req.headers.authentication.slice(7);
    // console.log("TOKEN_EMPL", TOKEN_EMPL)
    if(TOKEN_EMPL === undefined || TOKEN_EMPL === "null"){
        res.status(404).json({msg: "token not found"});
        return;
    } else {
        jwt.verify(TOKEN_EMPL, SK_EMPL, (err, decoded)=>{
            // console.log("DECODED_EMPL", decoded)
            if(err){
                res.status(401).json({status: 401, msg: "token invalid"});
                return;
            } else {
                req.params.email = decoded.email;
                next();
            }
        });
    }
}