const DataTypes = require("sequelize");
const sequelize = require("../config/db.js"); // your Sequelize connection
const User = require("./User.js");

const Message = sequelize.define(
  "Message",
  {
    senderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    receiverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    text: {
      type: DataTypes.STRING(2000),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true, // same as mongoose timestamps
    tableName: "messages",
  }
);

// Associations
User.hasMany(Message, { foreignKey: "senderId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "receiverId", as: "receivedMessages" });

Message.belongsTo(User, { foreignKey: "senderId", as: "sender" });
Message.belongsTo(User, { foreignKey: "receiverId", as: "receiver" });

module.exports = Message;
