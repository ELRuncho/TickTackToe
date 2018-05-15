
var player1 = '', player2 = '' , turn = true;
var modal   = document.getElementById('modal');
var cross   = document.getElementsByClassName('cross')[0];
var circle  = document.getElementsByClassName('circle')[0];
var slot    = document.getElementsByClassName('slot');

cross.onclick=function(){
	var player1=document.querySelector(':root'), player2=document.querySelector(':root');
	player1.style.setProperty('--back1','#ff3333');
	player2.style.setProperty('--back2','#0073e6');
	modal.style.display="none";
}

circle.onclick=function(){
	var player1=document.querySelector(':root'), player2=document.querySelector(':root');
	player1.style.setProperty('--back1','#0073e6');
	player2.style.setProperty('--back2','#ff3333');
	modal.style.display="none";
}

function move(id,player){
	if(player=='player1'){
		document.getElementById(id).className='usedSlot1';
	}else if(player=='player2'){
		document.getElementById(id).className='usedSlot2';
	}
	console.log(id)
	console.log(player);
}

for (var i=0;i < slot.length ; i++) {
	slot[i].addEventListener('click',function(){
		if(turn){
			move(this.id,'player1')
		}else{
			move(this.id,'player2')
		}
		turn= !turn;
	});
}
