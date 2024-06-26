const { validationResult } = require("express-validator");
const {
  insertStudyPlan,
  selectStudyPlans,
  selectStudyPlanById,
  updateStudyPlanById,
  removeStudyPlanById,
} = require("../models/studyPlansModel");

// post new study plan //this should be posted to a specific user

exports.postStudyPlan = async (req, res, next) => {
  //need to use next for the error at some point
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { task, start_datetime, end_datetime } = req.body;
    if (!task || !start_datetime || !end_datetime) {
      return res.status(400).json({ msg: "Missing required fields" });
    }
    const userId = req.user.userId;
    const newStudyPlan = await insertStudyPlan(
      userId,
      task,
      start_datetime,
      end_datetime
    );
    res.status(201).json({ study_plan: newStudyPlan });
  } catch (err) {
    console.error(err.message, "<-- post error message");
    console.error(err, "<-- post error");
    // next(err);
  }
};

// get all study plans

exports.getStudyPlans = async (req, res, next) => {
  const userId = req.user.userId;
  const allStudyPlans = await selectStudyPlans(userId);
  res.status(200).json({ study_plans: allStudyPlans });
};

// get study plan by id

exports.getStudyPlanById = async (req, res, next) => {
  try {
    const { study_plan_id } = req.params;
    const selectedStudyPlan = await selectStudyPlanById(study_plan_id);
    res.status(200).json({ study_plan: selectedStudyPlan });
  } catch (err) {
    next(err);
  }
};

// patch study plan by id

exports.patchStudyPlanById = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { study_plan_id } = req.params;
    const { task, start_datetime, end_datetime } = req.body;
    const updatedStudyPlan = await updateStudyPlanById(
      task,
      start_datetime,
      end_datetime,
      study_plan_id
    );
    res.status(200).json({ study_plan: updatedStudyPlan });
  } catch (err) {
    next(err);
  }
};

// delete study plan by id // check again if this needs to return a body

exports.deleteStudyPlanById = async (req, res, next) => {
  try {
    const { study_plan_id } = req.params;
    const studyPlanToDelete = await removeStudyPlanById(study_plan_id);
    res.status(204).json(studyPlanToDelete);
  } catch (err) {
    next(err);
  }
};
