const sqliteConnection = require('../../sqlite');

const {createUsers,createAdmin} = require('./createUsers');


async function migrationsRun() {
  const schemas = [
    createUsers,
    createAdmin,

  ].join('');

  sqliteConnection()
  .then(db => db.exec(schemas))
  .catch( error => console.error(error));
}

module.exports = migrationsRun;