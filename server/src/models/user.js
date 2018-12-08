const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const saltRounds = process.env.SALT_ROUNDS || 10;
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    hashedPassword: DataTypes.STRING,
    firstName: DataTypes.STRING(40),
    lastName: DataTypes.STRING(40),
    picture: DataTypes.TEXT('long'),
    status: DataTypes.INTEGER,
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    getterMethods: {
      displayName() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    setterMethods: {
      password(password) {
        bcrypt.hash(password, saltRounds).then((hash) => {
          this.setDataValue('hashedPassword', hash);
        });
      },
    },
    classMethods: {
      findByEmail(email) {
        return User.find({ where: { email }, limit: 1 });
      },
    },
    instanceMethods: {
      async checkPassword(password) {
        return bcrypt.compare(password, this.hashedPassword);
      },
    },
  });

  User.associate = (models) => {
    models.User.hasMany(models.Post);
    User.belongsToMany(models.Post, { through: models.View, as: 'views' });
    User.belongsToMany(models.Post, { through: models.Vote, as: 'votes' });
  };

  return User;
};
