const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) =>{
    res.statusCode = 200;
    res.setHeader('Content-type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will get all the information of Leaders!');
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('Put operation in not allowed here');
})
.post((req,res,next) => {
    res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);
})
.delete((req,res,next) => {
    res.end('Will delete all the leaders!');
});

leaderRouter.route('/:leaderId')
.get((req,res,next) => {
    res.end('Will send details of the leader: ' + req.params.leaderId +' to you!');
})
.put((req,res,next) => {
    res.write('Updating the leader: ' + req.params.leaderId + '\n');
    res.end('Will update the leader: ' + req.body.name + 
    ' with details: ' + req.body.description);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'+ req.params.leaderId);
})
.delete((req,res,next) => {
    res.end('Deleting leader: ' + req.params.leaderId);
});

module.exports = leaderRouter;