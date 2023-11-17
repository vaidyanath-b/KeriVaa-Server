const {pool} = require('../config/supabase.config');

module.exports.addResult = async (addResultData) => {
    
        const {poll_id , option_id  } = addResultData; //add weightage here

        try {
            const newResult = await pool.query(
                "INSERT INTO poll_answer (poll_id, option_id) VALUES ($1, $2) RETURNING *",
                [poll_id, option_id]
            );
    
            return newResult.rows[0];
        } catch (err) {
            console.error(err.message);
            throw err;
        }

}

