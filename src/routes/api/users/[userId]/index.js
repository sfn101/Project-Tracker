import { Router } from "express";

import routes from "./routes.js";
import projectsRoutes from "./projects/index.js"; // Changed from products to projects

const router = Router({ mergeParams: true });

router.use("/", routes);

router.use("/projects", projectsRoutes); // Changed from products to projects

export default router;
