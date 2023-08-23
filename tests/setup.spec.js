process.env.NODE_ENV = "test";
process.env.DB_NAME = "bedybot_mochaTest";

console.info(process.env.NODE_ENV);
// const { sequelize, models } = require('../src/BedyContext');
// const { before } = require('mocha');

// const { sequelize } = require('../models'); // Importez votre instance de Sequelize
// const { sequelize } = require('../src/dbSchema');

// Avant chaque test
// beforeEach(async () => {
// //  await sequelize.sync({ force: true }); // Synchronisez les modèles avec la base de données
// });

// // Après chaque test
// afterEach(async () => {
// //  await sequelize.drop(); // Supprimez les tables de la base de données
// });

// before(async () => {
//     let data = models;
//     resetDatabase();
//     // data.array.forEach(element => {
//     //     console.log(element);
//     // });
// //     console.log('before');
// //   //  await sequelize.sync({ force: true }); // Synchronisez les modèles avec la base de données
// });

// async function resetDatabase() {
//     await sequelize.sync({ force: true });
//     console.log('All tables have been reinitialized!');
// }

// // Après chaque test
// after(() => {
//   console.log('after');
//   //  await sequelize.drop(); // Supprimez les tables de la base de données
// });
