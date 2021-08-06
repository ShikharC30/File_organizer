#!/usr/bin/env node
let fs=require("fs");
let inputArr=process.argv.slice(2);

let option=[];
let files=[];

for(let i=0;i<inputArr.length;i++){
    let ch=inputArr[i].charAt(0);
    if(ch=="-"){
        option.push(inputArr[i]);
    }
    else{
        files.push(inputArr[i]);
    }
}

if(option.includes("-b") && option.includes("-n")){
    console.log("Either use -n or -b");
    return;
}

for(let i=0;i<files.length;i++){
    if(fs.existsSync(files[i])==false){
        console.log(`file ${files[i]} does not exists`);
        return;
    }
}





//readFiles:
let content="";
for(let i=0;i<files.length;i++){
   let buffer= fs.readFileSync(files[i]);
   content+=buffer+"\r\n";
}
// console.log(content);

content=content.split("\r\n");
// console.log(content);

let isSPresent=option.includes("-s");

if(isSPresent){
    for(let i=1;i<content.length;i++){
        if(content[i]==""&& content[i-1]==""){
            content[i]=null;
        }
        else if(content[i]=="" && content[i-1]==null){
            content[i]=null;
        }
    }

    let tempArr=[];
    for(let i=0;i<content.length;i++){
        if(content[i]!=null){
            tempArr.push(content[i]);
        }
    }
    content=tempArr;
    // content=content.join("\n");
}

let isNPresent=option.includes("-n");
if(isNPresent){
    for(let i=0;i<content.length;i++){
        content[i]=` ${i+1} ${content[i]}`;
    }
}


let isBPresent=option.includes("-b");
if(isBPresent){
    let count=1;
    for(let i=0;i<content.length;i++){
        if(content[i]!=""){
            content[i]=`${count} ${content[i]}`;
            count++;
        }
    }
}
content=content.join("\n");
console.log(content)
