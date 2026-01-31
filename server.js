const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

// ⬇️ WAJIB: panggil model
require("./models/Book");
require("./models/BorrowLog");

const PORT = process.env.PORT || 3000;

sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database sync failed:", error);
  });
