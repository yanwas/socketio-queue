var app = require('http').createServer(handler),
  url = require('url'),
	io = require('socket.io').listen(app),
	fs = require('fs'),
	antrian = 0,
	loket = 1,
	status = "NO"
	
app.listen(80);

function handler (req, res) {
  var _get = url.parse(req.url, true).pathname;
  console.log(_get);
  fs.readFile(__dirname + _get,
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	
	console.log('Antrian terakhir:', antrian); 

	socket.emit('data', antrian);
	socket.emit('status', status);
	socket.emit('counter', loket);

	socket.on('berita', function (data) {
		console.log('Perintah :', data);
		if (data = 'tambah'){ 
			antrian = ++antrian;
			io.sockets.emit('data', antrian);
		};
		console.log('Antrian Terakhir:', antrian);
	});

	
	socket.on('panggil', function(data){
		io.sockets.emit('status',"YES");
		io.sockets.emit('counter',data);
	});
	
});
