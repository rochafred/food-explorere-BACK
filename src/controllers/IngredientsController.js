const knex = require("../database/knex");
const AppError = require('../utils/AppError');

class IngredientsController {
  async create(request, response) {
    const { food_id, name } = request.body;

    const ingredientExists = await knex("ingredients")
      .where({ food_id, name })
      .first();

    if (ingredientExists) {
      throw new AppError("This ingredient already exist.");
    }

    const [ingredient_id] = await knex("ingredients").insert({
      food_id,
      name,
    });

    return response.status(201).json({ id: ingredient_id });
  }

  async index(request, response) {
    const ingredients = await knex("ingredients").groupBy("name");

    return response.json(ingredients);
  }
}

module.exports = IngredientsController;
