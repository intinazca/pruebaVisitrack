'use strict'
var app = require('./express/app');

//conexión a la db
var mongose = require('mongoose'); //usamos mongose para la conexion con nuestra db de mongo
var port = 3700;

app.get("/", (req,res) =>{
    res.send("Api ok");
})

const dbuser = '5Mnp26S9UVDg9cT4';

mongose.Promise = global.Promise;
mongose.connect(`mongodb+srv://visitrack_user:${dbuser}@cluster0.d47wmdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then((()=>{
    console.log("-----conxión exitosa----");
    //creamos el servidor
    app.listen(port, ()=>{ console.log("servidor de express Ok: 3700");});
 
})).catch(err=>{
    console.log(err);
});