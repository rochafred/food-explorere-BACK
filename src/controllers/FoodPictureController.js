const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");



class FoodPictureController {
  async update(request, response) {
    const  id  = request.params.id;
    const pictureFilename = request.file?.filename 

    const diskStorage = new DiskStorage();

    const food = await knex("foods").where({ id }).first();

    if(!food) {
      throw new AppError("O prato que você deseja editar não existe.", 401);
    }

    if(food.picture) {
      await diskStorage.deleteFile(food.picture);
    }
    const filename = await diskStorage.saveFile(pictureFilename);
    
    food.picture = filename;

    await knex("foods").update(food).where({ id });

    return response.json(food);
  }
}

module.exports = FoodPictureController;