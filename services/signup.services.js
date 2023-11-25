const { pool } = require('../config/supabase.config');

async function signUpWithUserPassword(username, password) {
  try {
        const user = await pool.query(
            "INSERT into user (username,password) VALUES ($1,$2) ",
            [username, password]
        );  
        return {user};
  } catch (error) {
    
  }
}

module.exports = {
  signUpWithUserPassword,
};