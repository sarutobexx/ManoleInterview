const express = require('express');
const cors = require('cors');

const app = express();

var corsOprtion = {
  origin: 'http://localhost:3000',
};

//connection db

const db = require('express');
const Role = db.role;

db.mongoose
  .connect('mongodb://$dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(function () {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error("Error connecting');", err);
    process.exit();
  });

function initial() {
  Role.estimatededeDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log(err, 'error saving');
        } else {
          console.log('Role created');
        }
      });

      new Role({
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log(err, 'error saving');
        } else {
          console.log('Role created');
        }
      });
    }
  });
}
initial();

app.use(cors(corsOprtion));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'Hello' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});


