const {pool} = require('../config/supabase.config');

module.exports.createTeam = async (insertTeamData) => {
    
        const {teamName,eventId,teamCategory } = insertTeamData;
    
        try {
            const newTeam = await pool.query(
                "INSERT INTO team (team_name,event_id,team_category) VALUES ($1, $2, $3) RETURNING *",
                [teamName,eventId,teamCategory]
            );
               return newTeam.rows[0];
        } catch (err) {
            console.error(err.message);
        }
    }

module.exports.getTeam = async () => {
    try {
        const allteam = await pool.query("SELECT * FROM team");
        console.log(allteam.rows);
        return allteam.rows;
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports.getTeamById = async (id) => {
    try {
        const team = await pool.query("SELECT * FROM team WHERE id = $1", [id]);
        return {
            ...team.rows[0],
            teams: teams.rows
        };
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports.updateteam = async (id, updateteamData) => {
    const {teamName,eventId,teamCategory} = updateteamData;

    try {
        const updateteam = await pool.query(
            "UPDATE team SET team_name = $1, event_id = $2, team_category = $3 WHERE id = $4",
            [teamName,eventId,teamCategory,id]
        );
        return updateteam;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports.deleteteam = async (id) => {
    try {
        const deleteteam = await pool.query("DELETE FROM team WHERE id = $1", [id]);
        return deleteteam;
    } catch (err) {
        console.error(err.message);
    }
}


