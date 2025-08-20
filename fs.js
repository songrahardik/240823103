

const add =require("./add.js");
import add from "./add.js";
console.log(add(10,11));
console.log(add(1,5));


const path=require("path");

console.log("Directory name:",__dirname);

console.log(path.basename(__dirname+"/myfile.txt"));

console.log("Full path:",path.resolve(__dirname,"myfile.txt"));

const moment =require("moment");

console.log("Date and Time:",moment().format("DD-MM-YYYY HH:MM:SS"));


const fs=require("fs");

// fs.writeFile("myfile.txt","Hello mca",(err)=>{
    // if(err) throw err;
    // console.log("file saved");
// })

// fs.readFile("myfile.txt","utf8",(err,data)=>{
    // if(err) throw err;
    // console.log("File content:",data);
// })

