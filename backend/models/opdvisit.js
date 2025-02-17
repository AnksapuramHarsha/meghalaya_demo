'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OPDVisit extends Model {
    static associate(models) {
      OPDVisit.belongsTo(models.Patient, { foreignKey: 'patient_id' });
    }
  }

  OPDVisit.init(
    {
      patient_id: DataTypes.INTEGER,
      doctor_name: DataTypes.STRING,
      symptoms: DataTypes.TEXT,
      diagnosis: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'OPDVisit',
      tableName: 'opd_visits',
      underscored: false, // ✅ Fixes timestamp issue
    }
  );

  return OPDVisit;
};
