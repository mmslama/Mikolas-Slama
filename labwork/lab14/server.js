const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;
const url = require('url');
const path = require('path');
const fileSystem = require('fs');

const mimeTypes = {
	".html": "text/html",
	".jpeg": "image/jpeg",
	".jpg": "image/jpg",
	".png": "image/png",
	".js": "text/javascript",
	".css": "text/css",
}


function httpHandler(request, response){
	let urlObject = url.parse(request.url);
	let uri = urlObject.pathname;
	let fileName = path.join(process.cwd(), uri);
	console.log("Loading" + uri);

	let stats;
	try{
		stats = fileSystem.lstatSync(fileName);
		if(stats.isFile()){
			serveFile(response, fileName);
		}
		else if(stats.isDirectory()){
			serverIndex(response);
		}
		else{
			serveError();
		}
	}catch(e){
		fileNotFound(response);
	}
}

function serveError(response){
	response.writeHead(500, {'Content-type': 'text/plain'});
	response.write('500 Internal Error\n');
	response.end();
}

function serverIndex(response){
	response.writeHead(302, {'Location': 'index.html'});
	response.end();
}

function serveFile(response, fileName){
	let fileExtension = path.extname(fileName);
	let mimeType = mimeTypes[fileExtension];
	response.writeHead(200, {'Content-type': mimeType});
	let fileStream = fileSystem.createReadStream(fileName);
	fileStream.pipe(response);
}

function fileNotFound(response){
	response.writeHead(404, {'Content-type': 'text/plain'});
	response.write('404 Not Found\n');
	response.end();
}

function serverMessage(){
	console.log(`Server running at http://${hostname}:${port}/`);
}

const server = http.createServer(httpHandler);
server.listen(port, hostname, serverMessage);