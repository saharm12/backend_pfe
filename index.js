const express = require('express'); 
const bodyparser = require('body-parser'); 
const usersRoute = require('./router/userRoutes'); // require permet de recuper une valeur exporter de fichier et l'utiliser ..
const app = express(); 
app.use(bodyparser.urlencoded({extended:'false'})); 

app.use('/users',usersRoute) ; 

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



app.listen(3000,()=>{
    console.log('server is running') ; 
}); 