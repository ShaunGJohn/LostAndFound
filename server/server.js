/*const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
app.use('/uploads', express.static('uploads'));


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

// DB Connection
sequelize.sync().then(() => {
  console.log('MySQL DB Connected');
}).catch(err => console.log('DB Error:', err));

app.use('/api/auth', require('./routes/authRoutes'));

app.use('/api/items', require('./routes/itemRoutes'));


app.use('/uploads', express.static('uploads'));


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

*/

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express(); // ✅ define app first

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // ✅ Now this is valid

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

// DB
sequelize.sync().then(() => {
  console.log('MySQL DB Connected');
}).catch(err => console.log('DB Error:', err));

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
