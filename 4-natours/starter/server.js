const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

const local = process.env.DATABASE_LOCAL;
// .connect(DB, {
async function connectToDB() {
  try {
    await mongoose.connect(local, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log('success connecting to mongodb local');
  } catch (err) {
    console.error(err);
  }
}

connectToDB();
// const { PORT } = process.env.PORT;

app.listen(3000, () => {
  console.log(`App running on port ${3000}`);
});
