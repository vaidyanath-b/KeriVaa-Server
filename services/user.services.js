const {pool} = require('../config/supabase.config');

module.exports.addUser = async (addUserData) => {

    const {username , password } = addUserData;

    try {
        const newUser = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, password]
        );

        return newUser.rows[0];
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports.getUsers = async () => {
    try {
        const allUsers = await pool.query("SELECT * FROM users");
        return allUsers.rows;
    }
    catch (err) {
        console.error(err.message);
    }
}


