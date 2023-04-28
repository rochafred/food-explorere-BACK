const { hash, compare } = require("bcrypt");
const AppError = require("../utils/AppError.js");
const sqliteConnection = require("../database/sqlite");
const knex = require('../database/knex')

class UsersController {
  async create(request, response) {
    const { name, email, password } = request.body;

    const [checkIfUserExists] = await knex('users').select().where({email})

    if(checkIfUserExists) {
      throw new AppError("E-mail already in use!");
    }

    const hashedPassword = await hash(password, 8);

    const database = await sqliteConnection();
    await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashedPassword]);

    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id

    const database = await sqliteConnection();
    const user = await database.get("SELECT id, name, email, password FROM users WHERE email = ?", [email]);

    if(!user){
      throw new AppError("User not found!");
    }

    const ifEmailAlreadyExists = await database.get("SELECT * FROM users WHERE email = (?)", [email]);

    if(ifEmailAlreadyExists && ifEmailAlreadyExists.id !== user.id){
      throw new AppError("E-mail already in use!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password){
      throw new AppError("Please inform your old password to create a new one.");
    }

    if(password && old_password){
      const checkOldPassword = await compare(old_password, user.password);
      if(!checkOldPassword){
        throw new AppError("Old password does not match");
      }

      user.password = await hash(password, 8);
    }

    await database.run(`
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, user_id]
      );

      return response.json();
  }
}

module.exports = UsersController;


