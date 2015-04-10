var fs = require('fs');
var http = require('http');
var server = http.createServer(function(q,r){
  r.end(fs.readFileSync('./index.html'));
});
var proxy = http.createServer(function(q,r){
  r.setHeader('Access-Control-Allow-Origin','*');
  var data = '';
  http.get('http://www.reddit.com/r/thebutton',function(rr){
    rr.on('data',function(d){
      console.log(d);
      data += d;
    });
    rr.on('end',function(){
      r.end(data);
    });
  });
});
console.log('server listening on 9000');
console.log('proxy listening on 9001');
server.listen(9000);
proxy.listen(9001);
