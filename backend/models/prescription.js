'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Prescription extends Model {
    static associate(models) {
      Prescription.belongsTo(models.Patient, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
      Prescription.belongsTo(models.OPDVisit, { foreignKey: 'opd_id', onDelete: 'CASCADE' });
    }
  }

  Prescription.init(
    {
      patient_id: { type: DataTypes.INTEGER, allowNull: false },
      opd_id: { type: DataTypes.INTEGER, allowNull: false },
      medication: { type: DataTypes.STRING, allowNull: false },
      dosage: { type: DataTypes.STRING, allowNull: false },
      frequency: { type: DataTypes.STRING, allowNull: false },
      duration: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: 'Prescription',
      tableName: 'prescriptions', // ✅ Ensure lowercase table name
      underscored: false, // ✅ Converts timestamps to `created_at` and `updated_at`
    }
  );

  return Prescription;
};
