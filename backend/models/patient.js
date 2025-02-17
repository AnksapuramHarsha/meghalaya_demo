'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    static associate(models) {
      Patient.hasMany(models.OPDVisit, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
      Patient.hasMany(models.Prescription, { foreignKey: 'patient_id', onDelete: 'CASCADE' });
    }
  }

  Patient.init(
    {
      name: { type: DataTypes.STRING, allowNull: false },
      abha_number: { type: DataTypes.STRING, unique: true, allowNull: false },
      gender: { type: DataTypes.STRING, allowNull: false },
      dob: { type: DataTypes.DATEONLY, allowNull: false },
      phone: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: true },
      address: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: 'Patient',
      tableName: 'patients',
      timestamps: false, // ✅ Prevents Sequelize from adding timestamps
    }
  );

  return Patient;
};
