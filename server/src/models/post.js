module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    content: DataTypes.TEXT,
    type: DataTypes.ENUM('news', 'post'),
    votes: DataTypes.BIGINT,
    status: DataTypes.INTEGER,
  }, {
    tableName: 'posts',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    getterMethods: {
    },
    setterMethods: {
    },
    classMethods: {
    },
    instanceMethods: {
    },
  });

  Post.associate = (models) => {
    models.Post.belongsTo(models.User, {
      onDelete: 'CASCADE',
      foreignKey: {
        allowNull: false,
      },
    });
    models.Post.hasMany(models.View, {
      onDelete: 'CASCADE',
    });
    Post.belongsToMany(models.User, {
      through: models.View,
      as: 'views',
    });
    Post.hasOne(models.View, { as: 'userView' });
    models.Post.hasMany(models.Vote, {
      onDelete: 'CASCADE',
    });
    Post.belongsToMany(models.User, {
      through: models.Vote,
      as: 'total_votes',
    });
    Post.hasOne(models.Vote, { as: 'userVote' });
  };

  return Post;
};
