ansible = document.getElementById("ansible");

fontSize = 20;
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
	obj.style.left				= offX+posX*fontSize+"px";
	obj.style.top 				= offY+posY*fontSize+"px";
	obj.style.color 			= colfg;
	obj.style.backgroundColor 	= colbg;
	obj.innerHTML 				= oup;
	tally += 1;
}

i = 0;
while(i<100){
	printer(i*20, 10, defbg, deffg, "█▀");
	i += 1;
}

fetch('test.txt')
  .then(response => response.text())
  .then(text => console.log(text))

