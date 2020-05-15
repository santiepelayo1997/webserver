const express = require('express');
const apiRouter = require('./routes')
const app = express();

app.use(express.json())

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