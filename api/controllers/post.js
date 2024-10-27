import { db } from "../db.js";
import * as jwt from 'jsonwebtoken';


export const getPosts = (req, res) => {
    const q = req.query.category ? "SELECT * FROM posts WHERE category=?": "SELECT * FROM posts";
    db.query(q, [req.query.category], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

export const getPost = (req, res) => {
    const q = "SELECT `username`, `title`, `desc`, `postimg`, `date`, `category`, `uuid` FROM user u JOIN posts p ON u.id=p.uuid WHERE p.id=?"
    const postId = req.params.id;
    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
}

export const addPost = (req, res) => {
    res.json("from controllers post")
}

export const updatePost = (req, res) => {
    res.json("from controllers post")
}

export const deletePost = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) return res.status(401).json("Not authenticated");
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uuid` = ?";
        db.query(q, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Post has been deleted");
        });
    });
}

