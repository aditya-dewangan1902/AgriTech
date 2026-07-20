module.exports = (sequelize, DataTypes) => {
  const SubmissionLog = sequelize.define('SubmissionLog', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    submissionId: { type: DataTypes.INTEGER, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return SubmissionLog;
};
