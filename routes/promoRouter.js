const express = require('express');
const bodyParser = require('body-parser');

const promoRouter = express.Router();

promoRouter.use(bodyParser.json());

promoRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send the all promotions to you!');
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation will not work here');
})
.post((req,res,next) => {
    res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Will delete all the promtion!');
});

promoRouter.route('/:promoId')
.get((req,res,next) => {
    res.end('Will send details of the promtion: ' + req.params.promoId +' to you!');
})
.put((req,res,next) => {
    res.write('Updating the promotion: ' + req.params.promoId + '\n');
    res.end('Will update the promotion: ' + req.body.name + 
        ' with details: ' + req.body.description);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /promotions/'+ req.params.promoId);
})
.delete((req,res,next) => {
    res.end('Deleting promotion: ' + req.params.promoId);
});

module.exports = promoRouter;