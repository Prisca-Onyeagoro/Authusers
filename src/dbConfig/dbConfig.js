import mongoose from 'mongoose';

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL);
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('Mongodb is connected successfully');
    });
    connection.on('error', (err) => {
      console.log('Mongodb has encountered an error' + err);
      process.exit();
    });
  } catch (error) {
    console.log('something went wrong check connection');
    console.log(error);
  }
}
