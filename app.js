// importa librerias necesarias
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');

// IMPORTA RUTAS
// las rutas son los archivos que ejecutan la lógica en el servidor
// cuando un cliente hace una petición. Los archivos están guardados
// en el directorio `routes`
var index = require('./routes/index');
var users = require('./routes/users');
var gatos = require('./routes/gato');
var omeka = require('./routes/omeka');
var d3 = require('./routes/d3');
var items = require('./routes/items');
// **** PARA AGREGAR UNA NUEVA RUTA  ****
// descomente y cambie los valores de la siguiente línea
//var NOMBRE_RUTA = require('./routes/ARCHIVO_RUTA');

var app = express();

// Configura el motor de render de las vistas
// las vistas deben estar en el directorio `views`
app.set('views', path.join(__dirname, 'views'));
// utiliza Handlebars
// http://handlebarsjs.com/
app.set('view engine', 'hbs');

// registra un nuevo helper
// {{ifeq}}
hbs.registerHelper('ifeq', function(a,b,opts){
  if(a===b){
    return opts.fn(this);
  }
});


// configuraciones adicionales
// por ahora no tocar!!
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// INTEGRACION DE LAS RUTAS EN LA APLICACION
// ejecuta el codigo de JS cuando es llamado desde una URL por el cliente
app.use('/', index);
app.use('/hola', users);
app.use('/gatos', gatos);
app.use('/omeka', omeka);
app.use('/d3', d3);
app.use('/items',items);
// **** PARA AGREGAR UNA NUEVA RUTA  ****
// descomente y cambie los valores de la siguiente línea
// app.use('/DONDE?', NOMBRE_RUTA);


// Rutinas para la detectar errores e informarlos al cliente
// para tener más información del significado de los códigos entregados al cliente
// https://en.wikipedia.org/wiki/List_of_HTTP_status_codes
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
