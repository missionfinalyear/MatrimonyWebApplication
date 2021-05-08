const express = require("express");
const app = express();
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const jwt = require('jsonwebtoken');
var multer = require('multer');
const path = require('path');


const con = mysql.createPool({
	host: "localhost",
	user: "root",
	password: "password",
	database: "finalyearproject",
});

app.use(express.json());

app.use(cors({
	origin : ["http://localhost:3000"],
	methods: ["GET","POST"],
	credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/',express.static('public'));
  app.use(
	session({
		key: "userId",
		secret: "matrimony",
		resave: false,
		saveUninitialized: false,
		cookie:{
			expires: 60 * 60 * 24,
		},
	})
  );

app.use('/public/upload', express.static(path.resolve(__dirname, './uploads')));

const verifyJWT = (req,res,next) =>{
	const token = req.headers["x-access-token"]
	if(!token){
		res.send("No token");
	} else{
		jwt.verify(token,"jwtSecret",(err,decoded) =>{
			if (err){
				res.json({auth: false, message:"failed to authenticate"});
			}else{
				req.userId = decoded.id;
				next();
			}
		});
	}
}


app.get("/isauth",verifyJWT,(req,res) =>{
    res.send("authenticated");
});


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
        		console.log("dk");
        		const id= results[0].userid
        		const token = jwt.sign({id}, "jwtSecret",{
        			expiresIn: 300,
        		})

        		con.query('SELECT * FROM finalyearproject.userinfo WHERE userid = ?',[results[0].userid],async function (error, result){
        			if (error){
        				return res.send(error);
        			}
        			else{
        			console.log(result);
        			console.log("kkkk");
        		}
        			res.json({status: "sucessfull",id:result, auth:true, token: token, userid:results[0].userid});
        		});
        		break; 
        	}
        else{
          res.json({status: "Username and password does not match", auth:false});
        }
      }
  }
      else{
        res.json({status: "Username does not exits",auth:false});
      }
    }
    });
    
});

app.post("/resetpass",(req,res) =>{
  const userName = req.body.userName;
  const passwordName = req.body.passwordName;
  con.query("UPDATE matrimony set userpassword = ? WHERE username = ?",[passwordName,userName],async function(error,result){
    if (error){
      res.send({status:"An error occurred!",auth:false})
    }
    else{
      res.send({status:"Password Changed Successfully!",auth:true})
    }
  })
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




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  })
  
var upload = multer({ storage: storage }).array('file')

app.post('/upload',function(req, res) {
    
    upload(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(600).json(err)
          // An unknown error occurred when uploading.
        } 
        //console.log(res);
        console.log(res.req.files.length);
        if(res.req.files.length==0){
          res.send("No document selected!");
        }else{

      const id = res.req.body.id;
    for (var i = res.req.files.length - 1; i >= 0; i--) {
      con.query("INSERT INTO userdocs (userid,doc) VALUES(?,?)",[id,res.req.files[i].filename],async  function(error,result){
          if(error){
           res.send("failed to upload");
          }else{
            console.log("Succfully uploaded")
            res.send("Succfully uploaded!!")
          }
        })
      
    }
    
  }
     // Everything went fine.
      });
});
var storage1 = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname )
    }
  })
  
var upload1 = multer({ storage: storage1 }).array('file')
app.post('/dp',function(req,res){
  upload1(req, res, function (err) {
     
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
          // A Multer error occurred when uploading.
        } else if (err) {
            return res.status(600).json(err)
          // An unknown error occurred when uploading.
        } 
       // console.log(res.req.files[0].filename);
        
        if(res.req.files.length==0){
          res.send("No profile photo selected!");
        }else{
          const dp = res.req.files[0].filename;
        const id = res.req.body.id;
        con.query('UPDATE userinfo set dp = ? WHERE userid = ?',[dp,id], async function(error, result){
        if (error){
        res.send(error);
        console.log(error);
      }else{
        res.send("Profile Picture Updated");
        console.log(result);
    }
  })
      }
})
});


app.get('/getprofiles',(req,res) => {
  const userid = req.headers["x-access-userid"]
  if(!userid){
    res.send("No Profile Found");
   }else{
  con.query('SELECT *,TIMESTAMPDIFF(YEAR,dob,CURDATE()) AS age FROM finalyearproject.userinfo WHERE userid NOT IN (?)',[userid],async function (error, results){
    if (error){
      res.send(error);
    }else{
      res.send(results);
      console.log(results);
    }
  });
  
}});

app.get('/documents',(req,res) =>{
  con.query('SELECT * FROM userdocs',(error,result) =>{
    if (error) {
      console.log(error);
      res.send("oops something went wrong");
    }else{
      console.log(result);
      res.send(result);
    }
  })
})

app.get('/myprofile',(req,res) => {
   const userid = req.headers["x-access-userid"]
   if(!userid){
    res.send("No Profile Found");
   }else{
    con.query('SELECT *,TIMESTAMPDIFF(YEAR,dob,CURDATE()) AS age FROM finalyearproject.userinfo WHERE userid = ?',[userid],async function (error, result){
      if (error){
        res.send(error);
      }else{
        res.send(result);
        console.log(result);
      }
      
    }
      
      )
   }

});

app.get('/getuser',(req,res) => {
  const user_id = req.headers["x-access-userid"];
  console.log(user_id);
  if(!user_id){
    res.send("No User Exist");
  }else{
    con.query('SELECT *,TIMESTAMPDIFF(YEAR,dob,CURDATE()) AS age FROM finalyearproject.userinfo WHERE userid = ?',[user_id],async function (error, result){
    if(error){
      res.send(error);
    }  else{
      res.send(result);
      console.log(result);
    }

  }
  )
}
});

app.get('/getmappeduser',(req,res) => {
  const user_id = req.headers["x-access-userid"];
  console.log(user_id);
  if(!user_id){
    res.send("No User Exist");
  }else{
    con.query('SELECT *,TIMESTAMPDIFF(YEAR,dob,CURDATE()) AS age FROM finalyearproject.userinfo WHERE userid IN ( Select mapped_id from finalyearproject.usermapping where userid = ?  )',[user_id],async function (error, result){
    if(error){
      res.send(error);
    }  else{
      res.send(result);
      console.log(result);
    }

  }
  )
}
});

app.get('/adminviewusers',(req,res) =>{
  con.query('SELECT userid , username FROM finalyearproject.userinfo',async function (error, result){
    if (error){
      res.send(error);
    }else{
      res.send(result);
    }
  })
});

const io = require('socket.io')(5000, {
  cors: {
    origin: "*",
  }
});

io.on('connection', socket => {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('send-message', ({ recipients, text }) => {
    recipients.forEach(recipient => {
      const newRecipients = recipients.filter(r => r !== recipient)
      newRecipients.push(id)
      socket.broadcast.to(recipient).emit('receive-message', {
        recipients: newRecipients, sender: id, text
      })
    })
  })
})

app.post('/savechat',(req,res) =>{
  const from = req.body.from 
  const to = req.body.to 
  const mesg = req.body.mesg
  console.log(from);
  console.log(to);
  console.log(mesg);
  var sqlInsert = "INSERT INTO userchats (mesgfrom,mesgto,mesg) VALUES (?, ?, ?)";
  con.query(sqlInsert,[from,to,mesg],async function (error, result){
    if (error){
      res.send(error);
      console.log(error);
    }else{
      res.send("Message Saved");
      console.log(result);
    }
  })
});

app.post('/savechatid',(req,res) =>{
  const id = req.body.id
  const userid = req.body.userid
  console.log(id);
   console.log(userid);
  con.query('UPDATE userinfo set chatid = ? WHERE userid = ?',[id,userid], async function(error, result){
    if (error){
      res.send(error);
      console.log(error);
    }else{
      res.send("Chat ID saved");
      console.log(result);
    }
  })

});

app.post('/mapping',(req,res) =>{
  const id = req.body.id
  const userid = req.body.userid
  console.log(id);
   console.log(userid);
  con.query("SELECT * FROM usermapping WHERE userid =? and mapped_id =?",[id,userid],async function(error,result){
    if (error){
      res.send(error);
    }else if(result.length==0){
      con.query('INSERT INTO usermapping(userid,mapped_id,result) VALUES(?,?,?)',[id,userid,1], async function(error, results){
    if (error){
      res.send(error);
      console.log(error);
    }else{
      res.send("User Mapped");
      console.log(results);
    }
  })

}else{
  res.send("Already Mapped")}
  ;
    })
  }) 

app.post('/premium',(req,res) =>{
  const ispremium = req.body.isPremium
  const userid =req.body.id
  console.log(ispremium);
 
  var sqlpremiumInsert = "UPDATE userinfo set ispremium = ? WHERE userid = ?";
  console.log("connected!");
  con.query(sqlpremiumInsert,[ispremium,userid],async function (error, result){
    if (error){
      res.send(error);
      console.log(error);
    }else{
      res.send("Congratulations!! You are now a Premium User.");
      console.log(result);
    }
  })
});
  

app.listen(3001, () =>{
	console.log("running on port 3001");
}

);