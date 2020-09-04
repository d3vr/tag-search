const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Construct query based on mode. value is from showInputBox.
	let buildQuery = ( mode, value ) => {
		let tags = value ? value.split(',') : [];
		let query = '';

		if(mode == 'all'){
			tags.forEach(tag => {
				query += `(?=.*${tag})`;
			});
		}else if(mode == 'some'){
			tags.forEach(tag => {
				query += `(?=.*${tag})|`;
			});

			query = query.substr(0, query.length-1);
		}

		return query;
	};

	// General tag command, takes mode param: some / all
	let findTags = mode => {
		vscode.window.showInputBox({
			placeHolder: 'Comma-separated tags'
		}).then(value => {
			// Abort search if no input is given
			if(!value){
				return true;
			}

			// Construct query string based on the mode: all / some
			let query = buildQuery(mode, value);

			// Limit search to basename if there's an open note
			let includes = vscode.window.activeTextEditor && vscode.window.activeTextEditor.document.fileName.includes('.') ? "${fileBasenameNoExtension}.*" : "";

			vscode.commands.executeCommand('search.action.openNewEditor', {
				query: query,
				regexp: true,
				triggerSearch: true,
				focusResults: true,
				includes: includes,
			});
		});
	};

	// Command to find all tags
	let findAllTags = vscode.commands.registerCommand('tag-search.findAllTags', function () {
		findTags('all');
	});

	// Command to find some tags
	let findSomeTags = vscode.commands.registerCommand('tag-search.findSomeTags', function () {
		findTags('some');
	});

	context.subscriptions.push(findAllTags);
	context.subscriptions.push(findSomeTags);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
