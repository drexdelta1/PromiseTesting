// Here, trying to read from file, using promise , 
// and then write into another file using promise
// once, ReadPromise is resolved, Calling WritePromise . 

const fs = require('fs');

const genDelFilePromise = function(filePath){
	return new Promise ( (resolve , reject)=>{
		fs.unlink(filePath , (err)=>{
			if(err){
				console.log('failed to delete file' , filePath);
			}else{
				console.log('successfully delete file' , filePath);
			}
			return resolve();
		});
	});
}

const genFilePromise = (filePath,data)=>{

	// this function creates promise, 
	// which creates files and writes random integer in it.
	// and ALWAYS resolves the promise, no matter what
	return new Promise ((resolve,reject)=>{
		let Buffer  = '';
		if(data === null)
			for(let i = 0 ; i < 10 ; i++){
				Buffer += Math.random();
				Buffer += '\n';
			}
		else{
			Buffer = data;
		}
		console.log('generating file ' , filePath);
		fs.writeFile(filePath,Buffer, (err)=>{
			if(err)
				console.log('fialed to write data into file ' , filePath);
			else
				console.log(' written buffer into file ' , filePath);
			return resolve();
		});
	});
}

const genReadFilePromise = (sourceFilePath)=>{
	return new Promise ((resolve , reject)=>{
		fs.readFile(sourceFilePath , (err,data)=>{
			if(err){
				console.log('err in reading file ' , sourceFilePath);
				data = null;
			}
			else{
				console.log(' successfully read file ' , sourceFilePath);
			}
			return resolve(data);
		});
	});
}

const genWriteBufferPromise = (filePath , buffer)=>{
	return new Promise ((resolve , reject) =>{
		fs.writeFile(filePath , buffer , (err)=>{
			if(err){
				console.log('error in writing file ' , filePath);
			}else{
				console.log(' written in file ' , filePath);
			}
			return resolve();
		})
	});
}

var delArr = [];
const mainPath = '/Users/neerpatel/Desktop/';
for(let i = 0 ; i < 10 ; i++){
	delArr.push(genDelFilePromise(mainPath + i + '.txt'));
}


// need to return this as well, for good practice . 
Promise.all(delArr).then( (resArr) =>{
	var genFileArr = [];
	for(let i = 0 ; i < 10 ; i++){
		genFileArr.push(genFilePromise(mainPath + i + '.txt' , null));
	}
	return Promise.all(genFileArr);
}).then((resArr)=>{
	var readFileArr = [];
	for(let i = 0 ; i < 10 ; i++){
		readFileArr.push(genReadFilePromise(mainPath + i + '.txt'));
	}
	return Promise.all(readFileArr);
}).then((BufferArr)=>{
	var writeBufferArr = [];
	for(let i = 0 ; i < 10 ; i++){
		writeBufferArr.push(genWriteBufferPromise(mainPath+'copy'+i+'.txt' , BufferArr[i]));
	}
	return Promise.all(writeBufferArr);
}).then((resArr)=>{
	console.log('successfully done the process , all files are generated');
}).catch(()=>{
	console.log('we never come here');
});



