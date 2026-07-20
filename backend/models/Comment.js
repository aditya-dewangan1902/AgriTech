module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    submissionId: { type: DataTypes.INTEGER, allowNull: false },
    revisionId: { type: DataTypes.STRING, allowNull: true }, // Links a comment to a specific revision versionName like 'rev_0'
    authorName: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.ENUM('editor', 'reviewer', 'admin'), allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false },
    avatar: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  });
  return Comment;
};
