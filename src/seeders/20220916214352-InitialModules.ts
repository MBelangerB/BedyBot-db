import { QueryInterface, DataTypes } from 'sequelize';
import { BedyAPIConst } from '../BedyAPIConst';

export async function up(queryInterface: QueryInterface) {
  return queryInterface.sequelize.transaction(async (t) => {
    await queryInterface.bulkInsert('API_Modules',
      [
        {
          moduleId: BedyAPIConst.ModuleGuid.GLOBAL,
          name: 'Global',
        },
        {
          moduleId: BedyAPIConst.ModuleGuid.TOURNAMENT,
          name: 'Tournament',
        },
        {
          moduleId: BedyAPIConst.ModuleGuid.ROLE,
          name: 'Role',
        },
      ], { transaction: t, });

  }); // End transaction
}


export async function down(queryInterface: QueryInterface) {
  return queryInterface.sequelize.transaction(async (transaction) => {
    return queryInterface.bulkDelete('API_Modules', { where: {} }, { transaction });
  });
}