ansible = document.getElementById("ansible");

fontSize = 15;
offX = 30;
offY = 50;

deffg = "rgb(30,75,255)";
defbg = "rgb(255, 75, 30)";

ansible.style.fontSize = fontSize+"pt";
tally = 0;

function printer(posX, posY, colbg, colfg, oup){
	ansible.innerHTML+="<span id=\"i"+tally+"\"> a </span>";
	obj = document.getElementById("i"+tally);
	obj.style.margin			= 0;
	obj.style.padding			= 0;
	obj.style.boxSizing			= "border-box";
	obj.style.display 			= "inline-block";
	obj.style.verticalAlign 	= "top";
	obj.style.lineHeight 		= "1";
	obj.style.width				= (fontSize / 2)*oup.length+6+"px";
	obj.style.height			= fontSize+ 6 +"px";
	obj.style.display 			= "flex";
	obj.style.alignItems 		= "center";
	obj.style.justifyContent 	= "center";
	obj.style.letterSpacing 	= "-2px";

	obj.style.position 			= "absolute";
	obj.style.left				= offX+posX*(fontSize/2)+"px";
	obj.style.top 				= offY+posY*fontSize+"px";
	obj.style.color 			= colfg;
	obj.style.backgroundColor 	= colbg;
	obj.innerHTML 				= oup;
	tally += 1;
}
/*
i = 0;
while(i<100){
	printer(i*20, 10, defbg, deffg, "█▀");
	i += 1;
}
*/
fetch('test.txt')
  .then(response => response.text())
  .then(text => {
		tokens = text.split("\x1b");
		i=0;
		let posX = 0;
		let posY = 0;
		let colbg = defbg;
		let colfg = deffg;
		while(i<tokens.length){
			if(!tokens[i]){i++; continue;}
			else if(tokens[i].includes("[0m")){
				posX = 0;
				posY = 0;
				colbg = defbg;
				colfg = deffg;
			}
			else if(tokens[i][0] == '[' && tokens[i][tokens[i].length-1] == 'H'){
				posY = tokens[i].substring(1, tokens[i].indexOf(';'));
				posX = tokens[i].substring(tokens[i].indexOf(';')+1, tokens[i].indexOf('H'));
				if(posX == 0) posX = 1;
			}
			else if(tokens[i].includes("[2J")){
				ansible.innerHTML = "";
				tally = 0;
			}
			else if(tokens[i][0] == '['){
				if(tokens[i].startsWith("[38;2;")){
					tokens[i] = tokens[i].substring(6);
					colfg = "rgb("+tokens[i].substring(0, tokens[i].indexOf(';'))+',';
					tokens[i] = tokens[i].substring(tokens[i].indexOf(';')+1);
					colfg+= tokens[i].substring(0, tokens[i].indexOf(';'))+',';
					tokens[i] = tokens[i].substring(tokens[i].indexOf(';')+1);
					colfg+= tokens[i].substring(0, tokens[i].indexOf(';'))+')';
					tokens[i] = tokens[i].substring(tokens[i].indexOf(';'));
				}
				if(tokens[i].startsWith(";48;2;")){
					tokens[i] = tokens[i].substring(6);
					colbg = "rgb("+tokens[i].substring(0, tokens[i].indexOf(';'))+',';
					tokens[i] = tokens[i].substring(tokens[i].indexOf(';')+1);
					colbg+= tokens[i].substring(0, tokens[i].indexOf(';'))+',';
					tokens[i] = tokens[i].substring(tokens[i].indexOf(';')+1);
					colbg+= tokens[i].substring(0, tokens[i].indexOf('m'))+')';
					tokens[i] = tokens[i].substring(tokens[i].indexOf('m')+1);
				}
				console.log(tokens[i]);
				printer(posX,posY, colbg, colfg, tokens[i]);
			}
			else{
				console.log("i"+i+": "+tokens[i]);
			}
			i++;
		}
		//ansible.innerHTML=(text);
	})

