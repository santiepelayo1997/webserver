const express = require('express');
const apiRouter = require('./routes')
const app = express();

// calling body-parser to handle the Request Object from POST requests
var bodyParser = require('body-parser');
// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', apiRouter);

app.use((req, res, next) => {
     var err = new Error('Page not Found');
     err.status = 404;
     next(err);
})

app.use((err,req,next)=>{
     res.status(err.status || 500);
     res.send(err.message)
})

app.listen(process.env.PORT || '3000', () => {
     console.log(`Server is running on port: ${process.env.PORT || '3000'}`);
});