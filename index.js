const http=require('http');
const PORT="8080";
const app=require('./connect');

const server=http.createServer(app);
server.listen(PORT,()=>{
 console.log(`the server is listen in the port ${PORT} `);
})



