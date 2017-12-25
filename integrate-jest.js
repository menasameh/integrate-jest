var exec = require('child_process').exec;

exec('npm install --save-dev jest babel-jest jest-react-native babel-preset-react-native react-test-renderer',
    function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);
        console.log('stderr: ' + stderr);
        if (error !== null) {
             console.log('exec error: ' + error);
        }
    });

fs = require('fs')
fs.readFile('package.json', 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	var file = JSON.parse(data);
	if(!file.scripts){ 
		file.scripts = {};
	}
	file.scripts.test = "jest";
	file.jest = {
		"preset": "jest-react-native"
	}
	fs.writeFile('package.json', JSON.stringify(file, null, 4), function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 
});

var testFile = `import 'react-native';
import React from 'react';

import renderer from 'react-test-renderer';

it('actually works', () => {
  expect(5).toBe(5);
});`;

var dir = './test';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

fs.writeFile('./test/app.test.js', testFile, function(err) {
	    if(err) {
	        return console.log(err);
	    }
	    console.log("The file was saved!");
	}); 

