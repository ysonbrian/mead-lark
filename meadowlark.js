const express = require('express');
const expressHandlebars = require('express-handlebars');
const fortune = require('./lib/fortune');
const handlers = require('./lib/handlers');

const app = express();

app.engine(
  'handlebars',
  expressHandlebars({
    defaultLayout: 'main',
  })
);

app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

// app.get('/', (req, res) => res.render('home'));
app.get('/', handlers.home);

// app.get('/about', (req, res) => {
//   res.render('about', { fortune: fortune.getFortune });
// });
app.get('/about', handlers.about);

app.use(express.static(__dirname + '/public'));

// app.use((req, res) => {
//   res.status(404);
//   res.render('404');
// });
app.use(handlers.notFound);

// app.use((err, req, res, next) => {
//   console.error(err.message);
//   res.status(500);
//   res.render('500');
// });
app.use(handlers.serverError);

// app.listen(port, () =>
//   console.log(
//     `Express started on http://localhost:${port}; ` +
//       `press Ctrl-C to terminate.`
//   )
// );

if (require.main === module) {
  app.listen(port, () => {
    console.log(
      `Express started on http://localhost:${port}` +
        '; press Ctrl-C to terminate.'
    );
  });
} else {
  module.exports = app;
}
