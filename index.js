const express = require('express');
const passport = require('./Passport');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcrypt');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: '12345',
  resave: true,
  saveUninitialized: true,
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Sample user database (This is just a sample database)
const users = [];

// User registration
app.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if the username already exists in the database
    const existingUser = users.find(user => user.username === username);
    if (existingUser) {
      return res.status(400).json({ error: 'Bu kullanıcı adı zaten kullanılıyor.' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new user to the database
    users.push({ username, password: hashedPassword });

    res.status(201).json({ message: 'Kayıt başarılı' });
  } catch (error) {
    res.status(500).json({ error: 'Kayıt sırasında bir hata oluştu' });
  }
});

// User login
app.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true,
}));

app.get('/', (req, res) => {
  res.send('Ana Sayfa');
});

// Login page
app.get('/login', (req, res) => {
  res.send('Login Sayfası');
});

// User dashboard
app.get('/dashboard', (req, res) => {
  if (req.isAuthenticated()) {
    res.send('Kullanıcı Paneli');
  } else {
    res.redirect('/login');
  }
});

// Define the port
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server çalışıyor: http://localhost:${port}`);
});
