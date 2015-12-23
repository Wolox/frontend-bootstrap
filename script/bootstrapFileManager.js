var fs = require('fs');

module.exports.initReadme = function (responsibleUername, responsibleFullName, projectName, projectDescription) {

	var readme = 'README.md';

	fs.readFile(readme, 'utf8', function (err, data) {

		if (err) {
			return console.log(err);
		}

		var index;
		var result = data.replace(/Sebastian Balay/g, responsibleFullName)
			.replace(/sbalay/g, responsibleUername);

		result = result.toString();
		result = result.split('\n');
		
		result[0] = projectName;
		result[3] = projectDescription;

		index = result.indexOf('## Contributing');
		result.splice(index, 8);

		index = result.indexOf('## License');
		result = result.splice(0, index - 1)

		result = result.join('\n');
		
		fs.writeFile(readme, result, 'utf8', function (err) {
			if (err) return console.log(err);
		});
	});

}
