const mongoose = require('mongoose');

class DatabaseManager {

  constructor() {
    mongoose.Promise = global.Promise;
  }

  async connect() {
    const mongoUrl = process.env.MONGO_URL;

    try {
      this.db = await mongoose.connect(mongoUrl);
      console.log(`Database connection is established. MONGO URL is ${mongoUrl}`);

      return this.db;
    } catch (error) {
      console.warn(`Failed to establish database connection. MONGO URL ${mongoUrl}`);
      console.error(error);

      throw error;
    }
  }

}

module.exports = new DatabaseManager();