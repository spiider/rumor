module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    voteValue: DataTypes.INTEGER,
  }, {
    tableName: 'votes',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',

    getterMethods: {
    },
    setterMethods: {
    },
  });

  Vote.associate = (models) => {
    models.Vote.belongsTo(models.Post);
  };

  return Vote;
};
