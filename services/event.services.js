const {pool} = require('../config/supabase.config');

module.exports.addEvent = async (addEventData) => {
    
        const {name , date,hub_id } = addEventData;
    
        try {
            const newEvent = await pool.query(
                "INSERT INTO event (name,date,hub_id) VALUES ($1, $2, $3) RETURNING *",
                [name,date,hub_id]
            );
    
            return newEvent.rows[0];
        } catch (err) {
            console.error(err.message);
        }

}

module.exports.getEvents = async () => {
    try {
        const allEvents = await pool.query("SELECT * FROM eventHub");
        return allEvents.rows;
    }
    catch (err) {
        console.error(err.message);
    }
}   

module.exports.getEventById = async (id) => {
    try {
        const allEvents = await pool.query("SELECT * FROM eventHub WHERE id = $1", [id]);
        return allEvents.rows[0];
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports.updateEvent = async (id, updateEventData) => {
    const {name , end_date,start_date } = updateEventData;

    try {
        const updatedEvent = await pool.query(
            "UPDATE eventHub SET name = $1, date = $2, time = $3, location = $4, description = $5, image = $6, created = $7 WHERE id = $8",
            [name,end_date,start_date, id]
        );
        return updatedEvent;
    } catch (err) {
        console.error(err.message);
    }
}
module.exports.deleteEvent = async (id) => {
    try {
        const deleteEvent = await pool.query("DELETE FROM eventHub WHERE id = $1", [id]);
        return deleteEvent;
    } catch (err) {
        console.error(err.message);
    }
}


