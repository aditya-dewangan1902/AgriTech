module.exports = (sequelize, DataTypes) => {
  const PublishedPaper = sequelize.define('PublishedPaper', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    submissionId: { type: DataTypes.INTEGER, allowNull: false },
    doi: { type: DataTypes.STRING, allowNull: false, unique: true },
    volume: { type: DataTypes.INTEGER, allowNull: false },
    issue: { type: DataTypes.INTEGER, allowNull: false },
    publicationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    downloads: { type: DataTypes.INTEGER, defaultValue: 0 },
    pdfUrl: { type: DataTypes.STRING, allowNull: true }
  });
  return PublishedPaper;
};
