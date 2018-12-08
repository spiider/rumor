module.exports = (sequelize, DataTypes) => {
  const View = sequelize.define('View', {
    viewValue: DataTypes.INTEGER,
  }, {
    tableName: 'views',
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

  View.associate = (models) => {
    models.View.belongsTo(models.Post);
  };

  return View;
};
