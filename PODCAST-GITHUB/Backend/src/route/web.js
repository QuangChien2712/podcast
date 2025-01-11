const express = require("express");
const userController = require("../controllers/userController");
const contentController = require("../controllers/contentController");
const reviewController = require("../controllers/reviewController");
const measureController = require("../controllers/measureController");
const payController = require("../controllers/payController");
const roleController = require("../controllers/roleController");
const scheduleController = require("../controllers/scheduleController");
const time_scheduleController = require("../controllers/time_scheduleController");
const userService = require("../services/userService");
const verifyToken = require("./verifyToken");

let router = express.Router();

const initWebRoute = (app) => {
    router.post("/create-new-account", userController.handleCreateNewAccount);
    router.put("/edit-account", verifyToken.verifyTokenAndAuth, userController.handleEditAccount);
    router.put("/update-password", verifyToken.verifyTokenAndAuth, userController.handleUpdatePassword);
    router.post("/login", userController.handleLogin);
    router.post("/logout", userController.handleLogout);
    router.post("/refresh", verifyToken.verifyToken, userService.requestRefreshToken);

    // User
    router.get("/get-all-users", verifyToken.verifyTokenAndAuth, userController.handleGetAllUsers); 
    router.get("/get-account", verifyToken.verifyTokenAndAuth, userController.handleGetAccount);    
    router.get("/get-user", verifyToken.verifyTokenAndAuth, userController.handleGetUser);    
    
    router.put("/edit-user", verifyToken.verifyTokenAndAuth, userController.handleEditUser);
    router.post("/create-new-user", verifyToken.verifyTokenAndIsAdmin, userController.handleCreateNewUser);
    router.delete("/delete-user", verifyToken.verifyTokenAndIsAdmin, userController.handleDeleteUser);

    // Content
    router.post("/create-new-content", verifyToken.verifyTokenAndAuth, contentController.handleCreateNewContent);
    router.get("/get-all-contents", verifyToken.verifyTokenAndAuth, contentController.handleGetAllContents);    
    router.put("/edit-content", verifyToken.verifyTokenAndAuth, contentController.handleEditContent);
    router.delete("/delete-content", verifyToken.verifyTokenAndAuth, contentController.handleDeleteContent);

    router.get("/get-all-contents-ptsn", contentController.handleGetAllContentsPTSN);

    // Review
    router.post("/create-new-review", verifyToken.verifyTokenAndAuth, reviewController.handleCreateNewReview);
    router.get("/get-all-reviews", verifyToken.verifyTokenAndAuth, reviewController.handleGetAllReviews);    
    router.put("/edit-review", verifyToken.verifyTokenAndAuth, reviewController.handleEditReview);
    router.delete("/delete-review", verifyToken.verifyTokenAndAuth, reviewController.handleDeleteReview);

    router.get("/get-content-review", reviewController.handleGetReview); 

    // Measure
    router.post("/create-new-measure", verifyToken.verifyTokenAndAuth, measureController.handleCreateNewMeasure);
    router.get("/get-all-measures", verifyToken.verifyTokenAndAuth, measureController.handleGetAllMeasures);    
    router.put("/edit-measure", verifyToken.verifyTokenAndAuth, measureController.handleEditMeasure);
    router.delete("/delete-measure", verifyToken.verifyTokenAndAuth, measureController.handleDeleteMeasure);

    // Pay
    router.post("/create-new-pay", verifyToken.verifyTokenAndAuth, payController.handleCreateNewPay);
    router.get("/get-all-pays", verifyToken.verifyTokenAndAuth, payController.handleGetAllPays);    
    router.put("/edit-pay", verifyToken.verifyTokenAndAuth, payController.handleEditPay);
    router.delete("/delete-pay", verifyToken.verifyTokenAndAuth, payController.handleDeletePay);

    // Role
    router.post("/create-new-role", verifyToken.verifyTokenAndAuth, roleController.handleCreateNewRole);
    router.get("/get-all-roles", verifyToken.verifyTokenAndAuth, roleController.handleGetAllRoles);    
    router.put("/edit-role", verifyToken.verifyTokenAndAuth, roleController.handleEditRole);
    router.delete("/delete-role", verifyToken.verifyTokenAndAuth, roleController.handleDeleteRole);

    // Schedule
    router.post("/create-new-schedule", verifyToken.verifyTokenAndAuth, scheduleController.handleCreateNewSchedule);
    router.get("/get-all-schedules", verifyToken.verifyTokenAndAuth, scheduleController.handleGetAllSchedules);    
    router.put("/edit-schedule", verifyToken.verifyTokenAndAuth, scheduleController.handleEditSchedule);
    router.delete("/delete-schedule", verifyToken.verifyTokenAndAuth, scheduleController.handleDeleteSchedule);

    // Time_schedule
    router.post("/create-new-time_schedule", verifyToken.verifyTokenAndAuth, time_scheduleController.handleCreateNewTime_schedule);
    router.get("/get-all-time_schedules", verifyToken.verifyTokenAndAuth, time_scheduleController.handleGetAllTime_schedules);    
    router.put("/edit-time_schedule", verifyToken.verifyTokenAndAuth, time_scheduleController.handleEditTime_schedule);
    router.delete("/delete-time_schedule", verifyToken.verifyTokenAndAuth, time_scheduleController.handleDeleteTime_schedule);

    return app.use("/api", router);
};

module.exports = initWebRoute;