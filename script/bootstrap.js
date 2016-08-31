// Must be executed from same folder README is located
var prompt = require('prompt'),
	bfm = require('./bootstrapFileManager');

prompt.colors = false;
prompt.message = '';
prompt.delimiter = '';
prompt.start();

var config = {
	properties: {
		responsibleUsername: {
			pattern: /^[a-zA-Z0-9]+$/,
			message: 'Username must contain only alphanumeric characters.',
			description: 'Responsible Username:',
			required: true
		},
		responsibleFullName: {
			pattern: /^([a-zA-Z]+[ ]?){2,13}$/g,
			message: 'Responsible full name must contain only letters.',
			description: 'Responsible Full Name:',
			required: true
		},
		projectName: {
			pattern: /^[a-zA-Z\-]+$/,
			message: 'Name must be only letters or dashes.',
			description: 'Projects name:',
			required: true
		},
		projectDescription: {
			description: 'Projects description:',
			required: false
		}
	}
};

console.log('\nWelcome to the bootstrap script.');
console.log('\nPlease enter the following data.\n');

prompt.get(config, function (err, result) {

	if (err) {
		console.log('\nError found. Operation ' + err.message + '.');
	} else {
		bfm.initReadme(result.responsibleUsername, result.responsibleFullName, result.projectName, result.projectDescription);
		bfm.initPackage(result.responsibleFullName, result.projectName, result.projectDescription);
		bfm.initAngularModule(result.projectName);
		bfm.removeScripts();
	}

});
