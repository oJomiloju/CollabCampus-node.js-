
import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = (req, res) => {
    // CHECK EXISTING USER 
    const q = "SELECT * FROM user WHERE email = ? OR username = ?"
    db.query(q, [req.body.email, req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(409).json("User already exists!");

        // HASH THE PASSWORD AND CREATE A USER
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(req.body.password, salt);

        const q = "INSERT INTO user (`username`, `email`, `password`) VALUES (?)";
        const values = [
            req.body.username,
            req.body.email,
            hashedPassword,
        ]

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created.");
        });
    });
}

export const Login = (req, res) => {
    //CHECK IF USER EXISTS
    const q = "SELECT * FROM user WHERE username = ?";
    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("User not found!");

        // CHECK PASSWORD
        const checkPassword = bcrypt.compareSync(
            req.body.password,
            data[0].password
        );

        if (!checkPassword)
            return res.status(400).json("Wrong Password or username");

        // this token will be stored in our cookie 
        const token = jwt.sign({ id: data[0].id }, "jwtkey");
        const {password, ...other} = data[0]
        
        res.cookie("accessToken", token, {
            httpOnly: true,
        }).status(200).json(other);
    
    });
}

export const Logout = (req, res) => {
    res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
    }).status(200).json("User has been logged out");
}

