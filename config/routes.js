const express = require("express");
const controllers = require("../app/controllers");
const middlewares = require("../app/middleware");

// Some dependencies for api documenations
const YAML = require("yamljs");
const swaggerUI = require("swagger-ui-express");
const apiDocs = YAML.load("./api-doc.yaml");

// const appRouter = express.Router();
const apiRouter = express.Router();

/** Mount GET / handler */
appRouter.get("/", controllers.main.index);

appRouter.get("/category/list", controllers.api.v1.categoryController.list)
appRouter.get("/category/list/:id", controllers.api.v1.categoryController.findById)
appRouter.post("/category/create", controllers.api.v1.categoryController.create)
appRouter.put("/category/update", controllers.api.v1.categoryController.update)
appRouter.delete("/category/delete/:id", controllers.api.v1.categoryController.destroy)
/** 
 * Implement Product API
/**
 * API DOCUMENTATION
 * using Swagger UI
 */
apiRouter.use("/api/documentation", swaggerUI.serve, swaggerUI.setup(apiDocs));

/**
 * CATEGORY API
 */
apiRouter.get("/api/category/list", controllers.api.v1.categoryController.list);
apiRouter.get(
	"/api/category/:id",
	controllers.api.v1.categoryController.findById
);
apiRouter.post(
	"/api/category/create",
	controllers.api.v1.categoryController.create
);
apiRouter.put(
	"/api/category/update/:id",
	controllers.api.v1.categoryController.update
);
apiRouter.delete(
	"/api/category/delete/:id",
	controllers.api.v1.categoryController.destroy
);

/**
 * PRODUCT API
 */

// Product List
apiRouter.get("/api/product/list", controllers.api.v1.productController.list);
// Show a product by id
apiRouter.get(
	"/api/product/:id",
	controllers.api.v1.productController.findById
);
// Show a product by name
apiRouter.get(
	"/api/product/name/:name",
	controllers.api.v1.productController.findByName
);
// Show a product by category
apiRouter.get(
	"/api/product/by-category/:categoryId",
	controllers.api.v1.productController.findByCategory
);
// Create a new product
apiRouter.post(
	"/api/product/create",
	controllers.api.v1.productController.create
);
// Update a product
apiRouter.put(
	"/api/product/update/:id",
	controllers.api.v1.productController.update
);
// Delete a product
apiRouter.delete(
	"/api/product/delete/:id",
	controllers.api.v1.productController.destroy
);

/**
 * USER API
 */
apiRouter.post(
	"/api/user/register",
	controllers.api.v1.userController.register
);
apiRouter.post("/api/user/login", controllers.api.v1.userController.login);
apiRouter.put(
	"/api/user/update/:id",
	middlewares.checkToken,
	controllers.api.v1.userController.update
);
apiRouter.delete(
	"/api/user/delete/:id",
	middlewares.checkToken,
	controllers.api.v1.userController.destroy
);

module.exports = apiRouter;
