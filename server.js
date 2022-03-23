// Dependencies
var express = require('express');
var app = express();
const PORT=process.env.PORT || 5000;

app.use(express.json());

app.use(require('./routes/routes'));

app.listen(PORT,()=>{
	console.log("Server is running on",PORT);
})