const model = require("../../../models");

module.exports = {
	// add data category
	create: async (req, res) => {
		try {
			const category = await model.category.create({
				name: req.body.name,
				description: req.body.description,
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Category created",
				data: category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// show all datas
	list: async (req, res) => {
		try {
			const categories = await model.category.findAll();

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Categories listed",
				data: categories,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// find data by Id
	findById: async (req, res) => {
		try {
			const category = await model.category.findOne({
				where: {
					id: req.params.id,
				},
			});

			// if id not found
			if (!category) throw new Error("Category doesn't exist");

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Category found",
				data: category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// update data
	update: async (req, res) => {
		try {
			const categoryId = req.params.id;

			const getCategory = await model.category.findOne({
				where: {
					id: categoryId,
				},
			});

			// if id not found
			if (!getCategory) throw new Error("Category doesn't exist");

			const name = req.body?.name || getCategory.name;
			const description =
				req.body?.description || getCategory.description;

			let category = await model.category.update(
				{
					name: name,
					description: description,
				},
				{
					where: {
						id: categoryId,
					},
				}
			);

			category = await model.category.findOne({
				where: { id: req.params.id },
			});

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Category successfully updated",
				data: category,
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},

	// delete data
	destroy: async (req, res) => {
		try {
			const categoryId = req.params.id;

			const getCategory = await model.category.findOne({
				where: {
					id: categoryId,
				},
			});

			if (!getCategory) throw new Error("Category doesn't exist");

			const category = await model.category.destroy({
				where: {
					id: req.params.id,
				},
			});

			// if id not found
			if (!category) throw new Error("Failed to delete category");

			return res.status(200).json({
				success: true,
				error: 0,
				message: "Category successfully deleted",
				// data: data, 	// gk perlu return data krn sudah dihapus
			});
		} catch (error) {
			return res.status(500).json({
				success: false,
				error: error,
				message: error.message,
				data: null,
			});
		}
	},
};
