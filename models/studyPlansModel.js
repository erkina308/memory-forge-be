const db = require("../connection");

//insert study plan into study plans table

exports.insertStudyPlan = async (task, start_datetime, end_datetime) => {
  try {
    // const { text, start_datetime, end_datetime } = req.body; //this should be in the controller // this should also be updated to dynamically take the id
    const newStudyPlan = await db.query(
      `INSERT INTO study_plans (user_id, task, start_datetime, end_datetime) VALUES (1, $1, $2, $3) RETURNING *;`,
      [task, start_datetime, end_datetime]
    );

    return newStudyPlan.rows[0];
  } catch (err) {
    console.error(err.message);
  }
};

//select all study plans from study plans table

exports.selectStudyPlans = async () => {
  try {
    const allStudyPlans = await db.query(`SELECT * FROM study_plans;`);
    return allStudyPlans.rows;
  } catch (err) {
    console.error(err.message);
  }
};

//select study plan by id from study plans table

exports.selectStudyPlanById = async (study_plan_id) => {
  try {
    const studyPlanById = await db.query(
      `SELECT * FROM study_plans WHERE study_plan_id = $1;`,
      [study_plan_id]
    );
    return studyPlanById.rows;
  } catch (err) {
    console.error(err.message);
  }
};