let mn=document.querySelector('#nvb-menu');

async function ovrlShow(){
	let wn = document.querySelector('.overlay');
	if (wn.style.display=="block"){
		setTimeout(function(){;}, 500);
		if (await wn.animate({opacity: '0.0'}, 200).finished) {wn.style.opacity='0.0';wn.style.display = "";}
		console.log(document.querySelector(".nav-btn").replaceChildren(lll));
		
	}
	else {
		wn.style.display = "block";
		if (await wn.animate({opacity: '0.5'}, 200).finished) {wn.style.opacity='0.5';}
		console.log(document.querySelector(".nav-btn").replaceChildren(x));
		
	}
}


let x =document.createElement('div');
x.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"  viewBox="0 0 50 50"> <path d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z"></path>';
let lll= document.createElement('div');
lll.innerHTML = '<span class="icon-bar" style="background-color: black; float: right ;"></span> <span class="icon-bar" style="background-color: black;	float: right ;"></span> <span class="icon-bar" style="background-color: black;	float: right ;"></span>'
