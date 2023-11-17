const {pool} = require('../config/supabase.config');

module.exports.createEventHub = async (insertEventHubData) => {
    
        const {name , end_date,start_date } = insertEventHubData;
    
        try {
            const newEventHub = await pool.query(
                "INSERT INTO eventHub (name,end_date,start_date) VALUES ($1, $2, $3) RETURNING *",
                [name,end_date,start_date]
            );
               return newEventHub.rows[0];
        } catch (err) {
            console.error(err.message);
        }
    }

module.exports.geteventhubs = async () => {
    try {
        const alleventhub = await pool.query("SELECT * FROM eventHub");
        console.log(alleventhub.rows);
        return alleventhub.rows;
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports.geteventhubById = async (id) => {
    try {
        const eventHub = await pool.query("SELECT * FROM eventHub WHERE id = $1", [id]);
        const events = await pool.query("SELECT * FROM event WHERE hub_id = $1", [id]);
        return {
            ...events.rows[0],
            events: events.rows
        };
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports.updateeventhub = async (id, updateeventhubData) => {
    const {name , end_date,start_date } = updateeventhubData;

    try {
        const updatedeventhub = await pool.query(
            "UPDATE eventHub SET name = $1, date = $2, time = $3, location = $4, description = $5, image = $6, created = $7 WHERE id = $8",
            [name,end_date,start_date, id]
        );
        return updatedeventhub;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports.deleteeventhub = async (id) => {
    try {
        const deleteeventhub = await pool.query("DELETE FROM eventHub WHERE id = $1", [id]);
        return deleteeventhub;
    } catch (err) {
        console.error(err.message);
    }
}

module.exports.getEventsOfHub = async (hubId) => {
    try {
        const allEvents = await pool.query("SELECT * FROM event WHERE hub_id = $1", [hubId]);
        return allEvents.rows;
    }
    catch (err) {
        console.error(err.message);
    }
}



