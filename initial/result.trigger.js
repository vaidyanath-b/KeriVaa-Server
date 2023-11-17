const {pool} = require('../config/supabase.config');

module.exports.addResultTrigger = async ()=>{

    await pool.query(
        "CREATE OR REPLACE FUNCTION update_scores()"+
        "RETURNS TRIGGER AS $$"+
        "DECLARE correct_choice INT "+
        "correct_choice := NEW.option_id"+
        "        IF EXISTS ("+
         "   SELECT 1"+
         "   FROM poll_vote"+
         "   WHERE poll_id = NEW.poll_id"+
         "   AND user_choice = correct_choice"+
        ") THEN"+
            "INSERT INTO fl_score (user_id, score)"+
            "VALUES (NEW.user_id, 1)"+
            "ON CONFLICT (user_id) DO"+
            "UPDATE "+
            "SET score = score + 1"+
            "WHERE user_id IN ("+
                "SELECT user_id"+
                "FROM poll_vote"+
                "WHERE poll_id = NEW.poll_id"+
                "AND user_choice = correct_choice"+
            ");"+
        "END IF;"+
        "RETURN NEW;"+
        "END;"+
        "$$ LANGUAGE plpgsql;"+
"        CREATE OR REPLACE TRIGGER update_scores_trigger"+
"AFTER INSERT"+
"ON poll_answer"+
"FOR EACH ROW"+
"EXECUTE FUNCTION update_scores();"

    );
}