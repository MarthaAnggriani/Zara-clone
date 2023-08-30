// handling jwt
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function generateAccessToken(user) {
    const { id, email, role } = user;
    return jwt.sign({ id, email, role }, JWT_SECRET, { expiresIn: "10h" });
}

function verifyAccessToken(access_token) {
    return jwt.verify(access_token, JWT_SECRET);
}

module.exports = { generateAccessToken, verifyAccessToken };