const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/signup.html");
    console.log("Server is running")
})

app.post("/", function(req, res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const emailId = req.body.email;

    const data = {
        members:[
            {
                email_address: emailId,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url ="https://us13.api.mailchimp.com/3.0/lists/501112abe0";
    const options = {
        method:"POST",
        auth:"tanisha03:49282131a22c7fab79810fb2859ff236-us13"
    }
    const request = https.request(url, options, function(response){
       response.on("data", function(data){
        console.log(JSON.parse(data));
       })
    })

    if (response.status === 200){
        res.sendFile(__dirname+"/success.html");
    }
    else{
        res.sendFile(__dirname+"/failure.html");
    }

    request.write(jsonData);
    request.end();
})

app.post("/failure.html", function(req, res){
    res.redirect("/");
})

app.listen(port.env.PORT || 3000, function(){
    console.log("Server running on port 3000");
})


//api key 49282131a22c7fab79810fb2859ff236-us13
//audience id: 501112abe0