const express = require('express'); //Imports the express module
const bodyparser = require('body-parser');
const jurieRoute = require('./router/juryRouter');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const usersRoute = require('./router/userRoutes'); // require permet de recuper une valeur exporter de fichier et l'utiliser ..
const speakersRouter = require('./router/speakersRouter');
const exposantRouter = require('./router/exposantRouter');
const candidatRouter = require('./router/candidatRouter');
const participantRouter = require('./router/participantRouter');
const laureatsRouter = require('./router/laureatsRouter');
const programmeRouter = require('./router/programmeRouter');
const documentRouter = require('./router/documentRouter');
const categorieRouter = require('./router/categorieRouter')
const satisfactionRouter = require('./router/satisfactionRouter');
const app = express(); //Creates an instance of the express module
const server = require('http').createServer(app);
const io = require('socket.io')(server);
/*app.use(function(req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});*/
app.use(bodyparser.urlencoded({ extended: 'false' }));
app.use(bodyparser.json());

app.use(cors()); //for all routes
app.use('/users', usersRoute);
app.use('/jurie', jurieRoute);
app.use('/speaker', speakersRouter);
app.use('/exposant', exposantRouter);
app.use('/candidat', candidatRouter);
app.use('/participant', participantRouter);
app.use('/laureats', laureatsRouter);
app.use('/programme', programmeRouter);
app.use('/document', documentRouter);
app.use('/categorie', categorieRouter);
app.use('/satisfaction', satisfactionRouter);

app.use('/uploads', express.static(process.cwd() + '/uploads'))
app.get('/', (req, res) => {
    res.send("hello");
});
io.on('connection', (socket) => {

    socket.on('disconnect', function() {
        io.emit('users-changed', { user: socket.nickname, event: 'left' });
    });

    socket.on('set-nickname', (nickname) => {
        socket.nickname = nickname;
        io.emit('users-changed', { user: nickname, event: 'joined' });
    });

    socket.on('add-message', (message) => {
        io.emit('message', { text: message.text, from: socket.nickname, created: new Date() });
    });
});

/*var users=['user 1','user 2' , 'user3', 'user 4'] ; 

app.get('/hello',(req,res)=>{

    res.json({'message':'hello World '})
}); 

app.get('/users',(req,res)=>{

    res.json({'users':users}); 
}); 
app.get('/users/:id',(req,res)=>{
    const id = req.params.id ; 
    res.json({'users':users[id]}); 
    
}); 


app.post('/adduser',(req,res)=>{

    const newUser = req.body.user ; 
    users.push(newUser); 
    res.json({'users':users}); 
})


app.delete('/delete/:id',(req,res)=>{

   const userId = req.params.id ; 
    let newAarray = []; 
   for(var i = 0; i<users.length;i++) 
   {
        if(i!=userId)
        {
            newAarray.push(users[i]); 
        }
   }
   users=newAarray; 
    res.json({'users':users}); 
})*/


/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));*/

/*app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});*/



server.listen(3000, () => {
    console.log('server is running');
});