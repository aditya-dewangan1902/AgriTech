module.exports = (sequelize, DataTypes) => {
  const Submission = sequelize.define('Submission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: true },
    abstract: { type: DataTypes.TEXT, allowNull: true },
    keywords: { type: DataTypes.STRING, allowNull: true },
    status: { 
      type: DataTypes.ENUM('Under Review', 'Major Revision', 'Minor Revision', 'Accepted', 'Published', 'Rejected'), 
      defaultValue: 'Under Review' 
    },
    submissionDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    authorId: { type: DataTypes.INTEGER, allowNull: false },
    manuscriptFile: { type: DataTypes.STRING, allowNull: true },
    reviewerComments: { type: DataTypes.TEXT, allowNull: true }
  });
  return Submission;
};
