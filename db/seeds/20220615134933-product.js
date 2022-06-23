"use strict";

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.bulkInsert(
			"products",
			[
				{
					id: 1,
					name: "product a",
					description: "desc of product a",
					price: 20000,
					image: "image.png",
					categoryId: 1,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
				{
					id: 2,
					name: "product b",
					description: "desc of product b",
					price: 50000,
					image: "image.png",
					categoryId: 2,
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete("products", null, {});
	},
};
