const conn = require('../config/dbConn'); 
const config = require('../config/config').secret ; 
const jwt = require('jsonwebtoken'); 

//Ajouter un jury 
module.exports.addJurie = (req,res)=>{
    nom_jury = req.body.nom_jury ; 
    prenom_jury  = req.body.prenom_jury ;
    profil_jury = req.body.profil_jury ;  
    
             
            conn.query('INSERT INTO `membre_jury`( `nom_jury`, `prenom_jury`, `profil_jury`) VALUES (?,?,?)',[nom_jury,prenom_jury,profil_jury], (err,rows)=>{
    
                if(err)
                {
                    console.log(err)
                }else 
    
                { console.log('roows',rows); 
                    res.json({'result':rows});
                }
            })
        }
    
        //modifier nom jury
        module.exports.changeom = (req, res)=>{
            const id_jury = req.params.id_jury ; 
           const nom_jury = req.body.nom_jury ; 
             conn.query('UPDATE user SET nom_jury = ? WHERE id_jury = ? ', [nom_jury,id_jury],(err,rows)=>{
         
                 if(err)
                 {
                     console.log(err)
                 } else 
                 {
                     res.json({'result':rows})
                 }
             })
         }

         //modifier prenom jury
        module.exports.changeprenom = (req, res)=>{
            const  id_jury = req.params.id_jury ; 
           const    prenom_jury = req.body.prenom_jury ; 
             conn.query('UPDATE user SET prenom_jury = ? WHERE id_jury = ? ', [prenom_jury,id_jury],(err,rows)=>{
         
                 if(err)
                 {
                     console.log(err)
                 } else 
                 {
                     res.json({'result':rows})
                 }
             })
         }


         //modifier profil jury
        module.exports.changeprofil = (req, res)=>{
            const  id_jury = req.params.id_jury ; 
           const    profil_jury = req.body.profil_jury ; 
             conn.query('UPDATE user SET profil_jury = ? WHERE id_jury = ? ', [profil_jury,id_jury],(err,rows)=>{
         
                 if(err)
                 {
                     console.log(err)
                 } else 
                 {
                     res.json({'result':rows})
                 }
             })
         }
        

    
         module.exports.updateColumn = (req, res)=>{
            const  id_jury = req.params.id_jury ; 
           const    value = req.body.value ; 
           const column = req.body.column ; 
           console.log(column); 
             conn.query('UPDATE membre_jury SET '+column+' = ? WHERE id_jury = ? ', [value,Number(id_jury)],(err,rows)=>{
         
                 if(err)
                 {
                     console.log(err)
                 } else 
                 {
                     res.json({'result':rows})
                 }
             })
         }
        