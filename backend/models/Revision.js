module.exports = (sequelize, DataTypes) => {
  const Revision = sequelize.define('Revision', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    submissionId: { type: DataTypes.INTEGER, allowNull: false },
    versionName: { type: DataTypes.STRING, allowNull: false }, // e.g., 'rev_0', 'rev_1'
    fileName: { type: DataTypes.STRING, allowNull: false },
    fileUrl: { type: DataTypes.STRING, allowNull: true },
    uploadedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Revision;
};
