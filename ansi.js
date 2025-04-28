ansible = document.getElementById("ansible");

fontSize = 15;
offX = 30;
offY = 50;
sizeX = 80;
sizeY = 24;

deffg = "rgb(30,75,255)";
defbg = "rgb(30,30,46)";
regbg = "rgb(24,24,37)";


ansible.style.fontSize = fontSize+"pt";
ansible.style.fontFamily = "FavFont, monospace";
//ansible.style.fontWeight = 'bold';

arr = Array.from({ length: sizeY }, () => Array(sizeX).fill(0));

async function setupGrid() {
    let html = "";
    
    // Create grid items
    for (let i = 0; i < sizeY; i++) {
        for (let j = 0; j < sizeX; j++) {
            html += "<div id=\"C"+i+","+j+"\" class=\"grid-cell\"></div>";
        }
    }
    
    ansible.innerHTML = html;

    ansible.style.display = "grid";
    ansible.style.gridTemplateColumns = `repeat(${sizeX}, min-content)`;
    ansible.style.gridTemplateRows = `repeat(${sizeY}, min-content)`;

    for (let i = 0; i < sizeY; i++) {
        for (let j = 0; j < sizeX; j++) {
            let cell = document.getElementById("C"+i+","+j);
            arr[i][j] = cell;

            cell.style.margin 			= 0;
            cell.style.padding 			= 0;
            cell.style.display 			= "flex"; 
            cell.style.height 			= (fontSize*1.3) + "px";
			cell.style.width 			= (fontSize*.6) + "px";
            cell.style.alignItems 		= "center";
            cell.style.justifyContent 	= "center";
            cell.style.whiteSpace 		= "pre";
            cell.style.backgroundColor	= defbg;
            
            cell.innerHTML = "a";
        }
    }
}


function containsAlphabet(str) {
    return /[a-zA-Z]/.test(str);
}

function printer(posX, posY, colbg, colfg, oup){
    for (let i = 0; i < oup.length; i++) {
        let x = Math.floor(posX)+i-1;
        let y = Math.floor(posY)-1;
        if (x < 0 || x > sizeX || y < 0 || y > sizeY){ 
			console.log({"posX": posX, "posY": posY}, {"x": x, "y": y});
			continue;
		}
        let obj = document.getElementById("C" + y + "," + x);
        if (!obj) continue;
        obj.style.color = colfg;
//		obj.style.backgroundColor = colbg;
        if (oup[i] < 'a' || oup[i] > 'Z') obj.style.backgroundColor = colbg;
//		if(oup[i] != ' ')
	        obj.innerHTML = oup[i];
//		else obj.innerHTML = '_';
    }
}

/*
/*
i = 0;
while(i<100){
	printer(i*20, 10, defbg, deffg, "█▀");
	i += 1;
}
*/
fetch('test.txt')
  .then(response => response.text())
  .then(async text => {
		tokens = text.split("\x1b");
		i=0;
		let posX = 0;
		let posY = 0;
		let colbg = defbg;
		let colfg = deffg;
		await setupGrid();
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
				//console.log(colbg,tokens[i]);
				printer(posX,posY, colbg, colfg, tokens[i]);
			}
			else{
				//console.log("i"+i+": "+tokens[i]);
			}
			i++;
		}
		//ansible.innerHTML=(text);
	})

