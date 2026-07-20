const { Sequelize, DataTypes } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

let sequelize;
if (process.env.DATABASE_URL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Required for platforms like Render/Heroku
      }
    },
    logging: false
  });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite'),
    logging: false
  });
}

const User = require('./User')(sequelize, DataTypes);
const Submission = require('./Submission')(sequelize, DataTypes);
const PublishedPaper = require('./PublishedPaper')(sequelize, DataTypes);
const Revision = require('./Revision')(sequelize, DataTypes);
const Comment = require('./Comment')(sequelize, DataTypes);
const SubmissionLog = require('./SubmissionLog')(sequelize, DataTypes);

// Relationships
User.hasMany(Submission, { foreignKey: 'authorId' });
Submission.belongsTo(User, { foreignKey: 'authorId', as: 'author' });

Submission.hasOne(PublishedPaper, { foreignKey: 'submissionId' });
PublishedPaper.belongsTo(Submission, { foreignKey: 'submissionId' });

Submission.hasMany(Revision, { foreignKey: 'submissionId', as: 'revisions' });
Revision.belongsTo(Submission, { foreignKey: 'submissionId' });

Submission.hasMany(Comment, { foreignKey: 'submissionId', as: 'comments' });
Comment.belongsTo(Submission, { foreignKey: 'submissionId' });

Submission.hasMany(SubmissionLog, { foreignKey: 'submissionId', as: 'logs' });
SubmissionLog.belongsTo(Submission, { foreignKey: 'submissionId' });

module.exports = {
  sequelize,
  User,
  Submission,
  PublishedPaper,
  Revision,
  Comment,
  SubmissionLog
};
