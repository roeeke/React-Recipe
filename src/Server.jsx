const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 8000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/users', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  const user = {
    username,
    password, 
  };

  const db = router.db;
  db.get('users').push(user).write();

  return res.status(201).json({ message: 'User registered successfully.' });
});

server.post('/login', (req, res) => {
  const { username, password } = req.body;
  const db = router.db;
  const user = db.get('users').find({ username }).value();

  if (!user) {
    return res.status(401).json({ error: 'User not found.' });
  }

  if (user.password === password) {
    return res.status(200).json({ message: 'Login successful.' });
  } else {
    return res.status(401).json({ error: 'Incorrect password.' });
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
