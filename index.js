const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const router = require('./routes/product_router');

const PORT = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use((req, res,next) => {
    next()
} );
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    // res.render('error');
    res.json({
        message: err.message,
        error: err
      })
})


app.listen(PORT,() => {
    console.log('listening on port '+PORT)
});

app.use('/products',router);



