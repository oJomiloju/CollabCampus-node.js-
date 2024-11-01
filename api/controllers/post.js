import { db } from "../db.js";
import jwt from "jsonwebtoken";


// Function to get all posts or filter by category
export const getPosts = (req, res) => {
    const q = req.query.category 
        ? "SELECT `id`, `title`, `desc`, `longdesc`, `postimg`, `date`, `category`, `uuid` FROM posts WHERE category=?" 
        : "SELECT `id`, `title`, `desc`, `longdesc`, `postimg`, `date`, `category`, `uuid` FROM posts";

    db.query(q, [req.query.category], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    });
}

// Function to get a single post by ID
export const getPost = (req, res) => {
    const q = "SELECT u.username, p.title, p.desc, p.longdesc, p.postimg, p.date, p.category, p.uuid FROM user u JOIN posts p ON u.id = p.uuid WHERE p.id = ?";
    const postId = req.params.id;

    db.query(q, [postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
    });
}


export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        // Adjusted query with values in correct order
        const q = "INSERT INTO posts(`title`, `desc`, `longdesc`, `date`, `uuid`, `category`, `postimg`) VALUES (?)";
        
        const values = [
            req.body.title,
            req.body.shortDesc,
            req.body.longDesc, // Added `longdesc` to match table structure
            req.body.date,
            userInfo.id,
            req.body.category,
            req.body.postimg
        ];

        db.query(q, [values], (err, data) => {
            if (err) {
                console.error("Error inserting post:", err); // Log detailed error
                return res.status(500).json("Error adding post");
            }
            return res.status(201).json("Post has been created"); // Status 201 for created
        });
    });
};


export const updatePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not authenticated");

    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const postId = req.params.id;
        console.log(`The post id is : ${postId}`)
        const q = "UPDATE posts SET `title`=?, `desc`=?, `longdesc`=?, `category`=?, `postimg`=? WHERE `id`=? AND `uuid`=?";
        
        const values = [
            req.body.title,
            req.body.shortDesc,
            req.body.longDesc, // Added `longdesc` to match table structure
            req.body.category,
            req.body.postimg
        ];

        db.query(q, [...values, postId, userInfo.id], (err, data) => {
            if (err) {
                console.error("Error updating post:", err); // Log detailed error
                return res.status(500).json("Error updating post");
            }
            return res.status(200).json("Post has been updated");
        });
    });
};


export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    console.log(`This is the Token ${token}`)
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

