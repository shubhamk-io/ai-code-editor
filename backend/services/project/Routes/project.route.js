import express from "express"
import { allProjects, createProject, deleteProject, getSatrredProject, singleProject, toggleStarraedProject } from "../controllers/projectController.js";

const router = express.Router();

router.post("/",createProject);
router.get("/",allProjects);
router.post("/satrred",getSatrredProject);

// get project by id route
router.get("/:id",singleProject)

// why {patch} because update ho rha hai and same get by project id
router.patch("/:id",toggleStarraedProject);

// Deleter projec using by id 
router.delete("/:id",deleteProject)

export default router;