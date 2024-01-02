import { DataTypes, Sequelize } from "sequelize";
require("dotenv").config();

const PG_URI = process.env.PG_URI!;
const sequelize = new Sequelize(PG_URI);
const userModel = async () => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      mail_address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      client: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("now"),
      },
    },
    {
      tableName: "users",
    }
  );
  await User.sync({ alter: true });
  console.log("🍟The table for the User model was just (re)created!");

  console.log(`🍟${User === sequelize.models.User}`);
  const adam = await User.create({
    name: "אדם",
    address: "שדרות גן-עדן 2",
    mail_address: "firstadam@7.com",
    phone_number: "555-1234",
    password: "eatenapple",
    client: true,
  });
  console.log(`🍟${adam instanceof User}`);
  console.log(`🍟${adam}`);
};
userModel();
// const test = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// };
// test();
