const { pool } = require('../config/supabase.config');

async function signInWithUserPassword(username, password) {
  try {
        const user = await pool.query(
            "SELECT * FROM user WHERE username = $1 AND password = $2",
            [username, password]
        );  
        if (user.rows.length === 0) {
            return { error: 'User not found' };
        }
        return {user};
  } catch (error) {
    
  }
}

module.exports = {
  signInWithUserPassword,
};
