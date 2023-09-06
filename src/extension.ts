// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import {LookBook} from './lookBook/lookBook';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  let lookBook: LookBook|undefined;

	let enable = vscode.commands.registerCommand('enable.lookBook', () => {
    if(lookBook === undefined){
      lookBook = new LookBook('lookBook');
      context.subscriptions.push(lookBook.getStatusBarItem());
    }
		vscode.window.showInformationMessage('Enable lookBook!!!');
    lookBook.setText('开始阅读');
    lookBook.show();
	});
  
	let disable = vscode.commands.registerCommand('disable.lookBook', () => {
		vscode.window.showInformationMessage('Disable lookBook!!!');
    if(lookBook !== undefined){
      lookBook.hide();
      context.subscriptions.splice(context.subscriptions.indexOf(lookBook.getStatusBarItem(),1));
    }
    lookBook = undefined;
	});
	let upLine = vscode.commands.registerCommand('lookBook.upLine', () => {
    if(lookBook !== undefined){
      lookBook.show();
      lookBook.toPerLine();
    }
	});

	let downLine = vscode.commands.registerCommand('lookBook.downLine', () => {
    if(lookBook !== undefined){
      lookBook.show();
      lookBook.toNextLine();
    }
	});

	context.subscriptions.push(enable);
	context.subscriptions.push(disable);
	context.subscriptions.push(upLine);
	context.subscriptions.push(downLine);
}

// This method is called when your extension is deactivated
export function deactivate() {}
