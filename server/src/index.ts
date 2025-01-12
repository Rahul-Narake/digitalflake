import dotenv from 'dotenv';
import connectToDb from './db/index.js';
import { app } from './app.js';

dotenv.config();

connectToDb()
  .then(() => {
    app.on('error', (error) => {
      console.log('Error :' + error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started at port :${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log('MONGO DB CONNECTION FAILED !!' + error);
  });
