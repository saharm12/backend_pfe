const express = require('express'); //Imports the express module
const bodyparser = require('body-parser');
const jurieRoute = require('./router/juryRouter');

const cors = require('cors');
const usersRoute = require('./router/userRoutes'); // require permet de recuper une valeur exporter de fichier et l'utiliser ..
const speakersRouter = require('./router/speakersRouter');
const exposantRouter = require('./router/exposantRouter');

const app = express(); //Creates an instance of the express module
app.use(bodyparser.urlencoded({ extended: 'false' }));
app.use(bodyparser.json());
app.use(cors()); //for all routes
app.use('/users', usersRoute);
app.use('/jurie', jurieRoute);
app.use('/speaker', speakersRouter);
app.use('/exposant', exposantRouter)



app.get('/', (req, res) => {
        res.send("hello");
    })
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



app.listen(3000, () => {
    console.log('server is running');
});