import { StatusBarItem } from "vscode";
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as readline from 'readline';

export class LookBook{
  statusBarItem:StatusBarItem;
  readLine:number;
  readFileUrl:string;
  testLineArr:Array<string>;

  constructor(id: string){
    this.statusBarItem = vscode.window.createStatusBarItem(id,vscode.StatusBarAlignment.Right,1);
    this.testLineArr=[];
    this.readLine=0;
    const fileUrlInConfig = vscode.workspace.getConfiguration().get('lookBookPlugin.fileUrl');
    if(typeof fileUrlInConfig !== 'string' || fileUrlInConfig === 'none'){
      vscode.window.showErrorMessage("txt文件路径不符合规范！");
      this.readFileUrl = 'none';
    }else{
      this.readFileUrl= fileUrlInConfig;
    }
    try{
      const rl = readline.createInterface({
        input: fs.createReadStream(this.readFileUrl),
      });
      
      rl.on('line', (line) => {
        this.testLineArr.push(line);
      });
      
      rl.on('close', () => {
        vscode.window.showInformationMessage('内容读取完成！');
      });
    }catch(e){
      vscode.window.showInformationMessage('txt文1件路径不符合规范！');
    }
  }

  show(){
    this.statusBarItem.show();
  }
  
  hide(){
    this.statusBarItem.hide();
  }

  getStatusBarItem():StatusBarItem {
    return this.statusBarItem;
  }

  setText(text:string){
    this.statusBarItem.text = text;
  }

  toNextLine(){
    if(this.readLine >= this.testLineArr.length){
      this.statusBarItem.text = '完结';
    }
    this.statusBarItem.text = this.testLineArr[this.readLine++];
  }
  
  toPerLine(){
    if(this.readLine <= 0){
      this.statusBarItem.text = '开始阅读';
    }
    this.statusBarItem.text = this.testLineArr[--this.readLine];
  }

}
