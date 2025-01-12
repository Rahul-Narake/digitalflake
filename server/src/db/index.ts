import mongoose from 'mongoose';

const connectToDb = async () => {
  try {
    const connectionInstanse = await mongoose.connect(
      `${process.env.DB_URL}/${process.env.DB_NAME}`
    );
    console.log(
      `\n Mongo DB Connected!! DB HOST: ${connectionInstanse.connection.host}`
    );
  } catch (error) {
    console.log(`Mongo Connection Error :${error}`);
    process.exit(1);
  }
};

export default connectToDb;
