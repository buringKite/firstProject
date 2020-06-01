module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    });

  Post.associate = (models) => {
    Post.belongsTo(models.author, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Post;
};
