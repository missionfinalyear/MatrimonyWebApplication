const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const con = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "finalyearproject",
});
//console.log(db);
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
	origin : ["http://localhost:3000"],
	methods: ["GET","POST"],
	credentials: true
}));
app.use(cookieParser());

app.use(
	session({
		key: "userId",
		secret: "matrimony",
		resave: false,
		saveUninitialized: false,
		cookie:{
			expires:60 * 60 * 1
		}
	}));


app.post("/insert",(req,res)=>{
	//const fullName = req.body.fullName;
	//const gender = req.body.gender;
	//const emailName = req.body.emailName;
	//const mobName = req.body.mobName;
	const userName = req.body.userName;
	const passwordName = req.body.passwordName;
	//const dateName = req.body.dateName;

	//con.connect(function(err) {
	//if(err){
	//	return res.send(err);
	//}	
	//const {name,gender,email,mobile,username,upassoword,dob} = req.query;

	var sqlInsert = "INSERT INTO matrimony (username,userpassword) VALUES (?, ?)";
	console.log("connected!");
	con.query(sqlInsert, [userName,passwordName],(err, result)=>{
		if(err) {
		 res.send(err);
		}
		else{

		res.send("connected.....");
		console.log("1 record inserted!");
	}
		console.log(err);
		});	
	//});	
});


app.post("/get",(req,res) =>{
	const userName = req.body.userName;
	const passwordName = req.body.passwordName;
	console.log("okkkk");
	con.query('SELECT * FROM finalyearproject.matrimony WHERE username = ?',[userName],async function (error, results){
    if (error) {
      return res.send(error);

    }else{
      if(results.length >0){
      
        while(results!=0){
        	if (passwordName==results[0].userpassword) {
        		req.session.user = results;
        		console.log(req.session.user);
        		res.send("sucessfull");
        	}
        else{
          res.send("Username and password does not match");
        }
      }
  }
      else{
        res.send("Username does not exits");
      }
    }
    });
});

app.post("/getadmin",(req,res) =>{
	const userName = req.body.userName;
	const passwordName = req.body.passwordName;
	console.log("okkkk");
	con.query('SELECT * FROM finalyearproject.adminlogin WHERE username = ?',[userName],async function (error, results){
    if (error) {
      return res.send(error);

    }else{
      if(results.length >0){
      
        while(results!=0){
        	if (passwordName==results[0].userpassword) {
        		req.session.user = results;
        		console.log(req.session.user);
        		res.send("sucessfull");
        	}
        else{
          res.send("Username and password does not match");
        }
      }
  }
      else{
        res.send("Username does not exits");
      }
    }
    });
});

app.listen(3001, () =>{
	console.log("running on port 3001");
}

);