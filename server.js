const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API running'));

// Init Middlewares
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./api/user/router'));
app.use('/api/auth', require('./api/auth/router'));
app.use('/api/profile', require('./api/profile/router'));
app.use('/api/posts', require('./api/post/router'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
