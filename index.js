const express= require("express");
var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var handlebars = require('express-handlebars');
const session = require('express-session');
const config = require('./lib/config.js');
const Security = require('./lib/Security');
var app = express();
app.locals.locale = config.locale;
var indexRouter = require('./routes/index');
app.use(cookieParser());


var oneDay = 24 * 60 * 60 * 1000;

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: oneDay ,
  secure: false,
  httpOnly: false },
  unset: 'keep',
  name: '__session',
  genid: function() {
      return Security.generateId();
  },
}));

require('dotenv').config();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, './views'));

app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      section: function(name, options){
      if(!this._sections) this._sections = {};
      this._sections[name] = options.fn(this);
      return null;
      },
      json: function (context) { 					
        return JSON.stringify(context); 				
      },
      jsonet: function (context) { 					
        return encodeURIComponent(JSON.stringify(context));				
      },
      dtherd: function (value) { 		
        var dtval=value.split("_")[2].substring(0, 8);	
        dtval = dtval.slice(0, 2) + "-" + dtval.slice(2);	
        dtval = dtval.slice(0, 5) + "-" + dtval.slice(5);		
        return dtval;				
      },
      mony: function (value) { 					
        return "Ksh "+String(value).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$&,'); 				
      },
      jpars: function (context) { 	
          
          if (context) {
            var obj = JSON.parse(context);
            var sobj=obj[0];
              
            return sobj; 
        }else{
            return "";
        }        				
      },
      jprs: function (context) { 	  
          if (context){
            var robj = JSON.parse(context);
            return robj; 
        }else{
            return "";
        }
      },
      eachRow: function (count) {
      var cnt=parseInt(count);
      var result = '';
      for (var i = 0; i < cnt; i +=1) {
          result += "<i class=\"fa fa-star\"></i>";
      }
      return result;
    },
    ifEquals: function (arg1, arg2, options) {
      return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  },
    rawhelper: function(options) {
      return options.fn();
    },
    inc: function (value) {
      return parseInt(value) + 1;
  },
  dateTransform: function (value) {
    const timeStamp = value.replace(/\,/g,'');
    const dateFormat= new Date(parseInt(timeStamp, 10));
    //  timeStamp=dateFormat.getDate()+
    //        "/"+(dateFormat.getMonth()+1)+
    //        "/"+dateFormat.getFullYear()+
    //        " "+dateFormat.getHours()+
    //        ":"+dateFormat.getMinutes()+
    //        ":"+dateFormat.getSeconds();

    return dateFormat.toLocaleString();
},
  getTotal: function (arg1, arg2) {
    return arg1+arg2;
  },
  activ: function (value) {
      if(value===1){
        return "active";
      }else{
        return value;
      }
    }
  }
}));

app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('/public'));
app.use(express.static('/public/css'));
app.use(express.static('/public/fonts'));
app.use(express.static('/public/images'));
app.use(express.static('/public/js'));

app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
// exports.app = functions.https.onRequest(app);