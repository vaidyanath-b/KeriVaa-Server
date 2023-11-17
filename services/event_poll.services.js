const {pool} = require('../config/supabase.config');

module.exports.addPoll = async (addPollData) => {

    const {description , options , eventId } = addPollData;   

    try {
        const res = await pool.query(
            "INSERT INTO event_poll (description,event_id) VALUES ($1, $2) RETURNING *",
            [description, eventId]
        );

        const newPollId = res.rows[0].id;

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            await pool.query(
                "INSERT INTO poll_options (value, poll_id) VALUES ($1, $2)",
                [option[i], newPollId]
            );
        }
    
        return true;
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports.getPolls = async (eventId) => {
    try {
        const allPolls = await pool.query("SELECT * FROM event_poll WHERE event_id = $1", [eventId]);
        return allPolls.rows;
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports.getPollById = async (id) => {
    try {
        const poll = await pool.query("SELECT * FROM event_poll WHERE id = $1", [id]);
        const options = await pool.query("SELECT * FROM poll_options WHERE poll_id = $1", [id]);
        return {
            ...poll.rows[0],
            options: options.rows
        }
    }


    catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports.updatePollQuestion = async (id, updatePollData) => {
    const {description , options } = updatePollData;

    try {
        const updatedPoll = await pool.query(
            "UPDATE event_poll SET description = $1 WHERE id = $2",
            [description, id]
        );

        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            await pool.query(
                "UPDATE poll_options SET value = $1 WHERE poll_id = $2 AND id = $3",
                [option[i], id, option.id]
            );
        }
        return true;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}

module.exports.deletePoll = async (id) => {
    try {
        const deletePoll = await pool.query("DELETE FROM event_poll WHERE id = $1", [id]);
        return deletePoll;
    } catch (err) {
        console.error(err.message);
        throw err;
    }
}
 
module.exports.pollVote = async (pollId, optionId ,userId) => {

    try{
        const res = await pool.query(
            "INSERT INTO poll_votes (poll_id, option_id , user_id) VALUES ($1, $2, $3) RETURNING *",
            [pollId, optionId , userId]
        );
    }
    catch (err) {
        console.error(err.message);
        throw err;
    }
}



