const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

app.get('/', (req, res) => res.send('API running'));

// Init Middlewares
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/users', require('./api/user/routes'));
app.use('/api/auth', require('./api/auth/routes'));
app.use('/api/profile', require('./api/profile/routes'));
app.use('/api/posts', require('./api/post/routes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
