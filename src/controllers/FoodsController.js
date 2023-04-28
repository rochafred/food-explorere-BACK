const knex = require("../database/knex");
const AppError = require('../utils/AppError')
const DiskStorage = require("../providers/DiskStorage")
const sqliteConnection = require("../database/sqlite");


class FoodsController {
  async create(request, response) {
    const { category, name, price, description, ingredients } = request.body;
    const database = await sqliteConnection()
    const checkIfFoodExists = await database.get("SELECT * FROM foods WHERE name = (?)", [name])

    if(checkIfFoodExists){
     alert('plate already exists')
     return
    }     

    const foodFilename = request.file.filename;
    const diskStorage = new DiskStorage()
    const filename = await diskStorage.saveFile(foodFilename)

     await knex("foods").insert({ 
      picture: filename,
      category,
      name,
      price,
      description
  });

    const [food] = await knex("foods").select("id").where({name})
    const idFood = food.id

    const ingredientInsert = ingredients.map((ingred) => {
      return{
        food_id: idFood,
        name : ingred
      }})
      await knex('ingredients').insert(ingredientInsert)

    return response.status(201).json();
  }

  async show(request, response) {
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();
    const ingredients = await knex("ingredients").where({ food_id: id}).orderBy("name");

    return response.json({
      ...food,
      ingredients
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("foods").where({ id }).delete();

    return response.json();
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let foods;

    if(ingredients) {

      const filterIngredients = ingredients.split(',').map(tag => tag.trim());

      foods = await knex("ingredients")
        .select([
          "foods.id",
          "foods.name",
        ])
        .whereLike("foods.name", `%${name}%`)
        .whereIn("name", filterIngredients) 
        .innerJoin("foods", "foods.id", "ingredients.food_id")
        .orderBy("foods.name")
    } else {
      foods = await knex("foods")
      .whereLike("name", `%${name}%`)
    }

    const foodsIngredients = await knex("ingredients");
    const foodsWithIngredients = foods.map(food => {
      const foodIngredient = foodsIngredients.filter(ingredient => ingredient.food_id === food.id);

      return {
        ...food,
        ingredients: foodIngredient
      }
    })

    return response.json(foodsWithIngredients);
  }

  async update(request, response) {
    const { category, name, price, description, ingredients } = request.body;
    const { id } = request.params;

    const food = await knex("foods").where({ id }).first();

    if(!food){
      throw new AppError("O prato que você está tentando editar não existe!");
    }

    food.category = category ?? food.category;
    food.name = name ?? food.name;
    food.price = price ?? food.price;
    food.description = description ?? food.description;

    await knex("foods").where({ id }).update(food);
    await knex("foods").where({ id }).update("updated_at", knex.fn.now());

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        food_id: id,
        name : ingredient
      }
    })

    await knex("ingredients").where({ food_id: id}).delete();
    await knex("ingredients").where({ food_id: id}).insert(ingredientsInsert);

    return response.status(202).json('Prato atualizado com sucesso')
  }
}

module.exports = FoodsController;