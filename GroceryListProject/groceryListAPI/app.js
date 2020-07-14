var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var debug = require('debug')
const db = require('./pool');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const foodRouter = require('./routes/food');

var app = express();

app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/food', foodRouter);


// app.route('/query')

//   .get((req, res, next) => {
//     db.query('SELECT * FROM groceries', (error, results, fields) => {
//       if (error) return next(new Error(`Unable to fetch contacts ${error.message}`));
//       console.log(results);
//       res.send(results);


//     });

//   })
//   .post((req, res, next) => {

//     db.query(`INSERT INTO groceries(name,aisle)
//                   VALUES(?, ?)`,
//       [req.body.name, req.body.aisle],
//       (error, result) => {
//         if (error) return next(new Error(`Unable to add item ${error.message}`));
//         if (!result.affectedRows) return next(new Error(`Unable to add item`));

//         const item = {
//           name: req.body.name,
//           aisle: req.body.aisle,
//           id: result.insertId
//         };
//         res.status(201).send(item);
//       }
//     );
//   });




// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
