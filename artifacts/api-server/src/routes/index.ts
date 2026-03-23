import { Router, type IRouter } from "express";
import healthRouter from "./health";
import dashboardRouter from "./cfip/dashboard";
import feedbackRouter from "./cfip/feedback";
import themesRouter from "./cfip/themes";
import sourcesRouter from "./cfip/sources";
import alertsRouter from "./cfip/alerts";

const router: IRouter = Router();

router.use(healthRouter);
router.use(dashboardRouter);
router.use(feedbackRouter);
router.use(themesRouter);
router.use(sourcesRouter);
router.use(alertsRouter);

export default router;
