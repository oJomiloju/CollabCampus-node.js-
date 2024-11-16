import { db } from "../db.js";

export const getUserProfile = (req, res) => {
  const userId = req.params.id; // Extract user ID from the URL

  // Query to fetch user details
  const userQuery = "SELECT id, username, email FROM user WHERE id = ?";
  const postsQuery = "SELECT * FROM posts WHERE uuid = ?"; // Fetch posts by the user

  db.query(userQuery, [userId], (err, userResult) => {
    if (err) return res.status(500).json(err);

    if (userResult.length === 0) {
      return res.status(404).json("User not found!");
    }

    db.query(postsQuery, [userId], (err, postsResult) => {
      if (err) return res.status(500).json(err);

      // Combine user info and posts in the response
      res.status(200).json({ user: userResult[0], posts: postsResult });
    });
  });
};
