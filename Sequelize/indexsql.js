const sequelize = require('sequelize');
const db = new sequelize('emo', 'root', '', {
    host:'localhost',
    dialect: 'mysql',
});

db.authenticate()
    .then( ( ) => {
        console.log('connection has been establised successfully');
    })
    .catch( (err) => {
        console.error('unable to connect to the database: ',err);
    });

//model
const student = db.define("student",{
    id:{
        type: sequelize.INTEGER,
        autoIncrement: true, 
        primaryKey: true,
    },
    name:{
        type: sequelize.STRING,
        allowNull: false
    },
    city:{
        type: sequelize.STRING,
        allowNull: false
    },
    email:{
        type: sequelize.STRING,
        allowNull : false,
        unique: true
    }
});

// // sync
student.sync( {alter:true})
    .then( () => {
        console.log('student table created successfully');
    })
    .catch( (err) => {
        console.error('unable to create table: ',err);
    });

//insert data
student.create( {
    name: "Hardik",
    city: "Halvad",
    email: "songrahardik@gmail.com"
})
.then( (student) => {
    console.log('data inserted successfully',student);
})
.catch( (err) => {
    console.error('unable to insert data: ',err);
});