const express = require('express');
const app = express();

const my_todos = [
  { id: 1, desc: 'task one'},
  { id: 2, desc: 'task two' },
]

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({
  extended: true
}));

app.get('/', (req, res) => {
  res.render('todos default', {
    title: 'My To Do list',
    todos: my_todos
  });
});

app.post('/add', (req, res) => {
  console.log(req.body)
  const newTodo = {
    id: 5,
    desc: req.body.description
  }
  my_todos.push(newTodo)
  res.end()
})

app.get('/todos', (req, res) => {
  res.render('todos default', {
    title: 'My To Do List',
    todos: my_todos
  });
});

const server = app.listen(7000, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});