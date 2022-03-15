const mongoose = require('mongoose');

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@clusters.6pzfk.mongodb.net/mern-project",
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    )
    .then(() => console.log('Connecting MongoDB'))
    .catch((err) => console.log('Fail to connect to MongoDB', err));