const { Router } = require("express");

const multer = require('multer');
const uploadConfig = require('../configs/upload');
const upload = multer(uploadConfig.MULTER);

const FoodsController = require("../controllers/FoodsController");
const FoodPictureController = require("../controllers/FoodPictureController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const foodsRoutes = Router();

const foodsController = new FoodsController();
const foodPictureController = new FoodPictureController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/", upload.single("picture"), foodsController.create);
foodsRoutes.put("/:id", upload.single("picture"), foodsController.update);
foodsRoutes.patch("/picture/:id", upload.single("picture"), foodPictureController.update);
foodsRoutes.delete("/:id", foodsController.delete);
foodsRoutes.get("/:id", foodsController.show);
foodsRoutes.get("/", foodsController.index);

module.exports = foodsRoutes;