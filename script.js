var initialBoard;
var huPlayer = 'X';
var com = 'O';
const winers=[
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
];
var modal   = document.getElementById('modal');
var cross   = document.getElementsByClassName('cross')[0];
var circle  = document.getElementsByClassName('circle')[0];
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
	huPlayer='O';
	com='X';
	modal.style.display="none";

}

const slots=document.querySelectorAll('.slot');
startGame();

function startGame(){
	document.querySelector(".winModal").style.display="none";
	initialBoard=Array.from(Array(9).keys());
	for(var i=0;i<slots.length;i++){
		slots[i].innerText='';
		slots[i].className='slot';
		slots[i].addEventListener('click',turnClick,false);
	}
}

function declareWiner(who){
	document.querySelector(".winModal").style.display = "block";
	document.querySelector(".winModal .Content").innerText = who;
}

function emptySlots(){
	return initialBoard.filter(s=>typeof s=='number');
}

function noOneWins(){
	if (emptySlots().length==0){
		for (var i=0; slots.leng;i++) {
			slots[i].style.backgroundColor="green";
			slots[i].removeEventListener('click', turnClick, false);
		}
		declareWiner("You all LOOSE!");
		return true;
	}
	return false;
}

function bestSlot(){
	/*minimax(initialBoard, com).index;*/
	var availSpots=emptySlots();
	var max = availSpots.length - 1;
	var s = Math.floor(Math.random() * max);
	return emptySlots()[s];
}

function turnClick(slot){
	if (typeof initialBoard[slot.target.id]=='number') {
		turn(slot.target.id, huPlayer);
		if (!noOneWins()) turn(bestSlot(), com);
	}	
}

function turn(slotId, player){
	initialBoard[slotId]=player;
	document.getElementById(slotId).innerText=player;
	if(player==huPlayer){
		document.getElementById(slotId).className='usedSlot1';
	}else{
		document.getElementById(slotId).className='usedSlot2';
	}
	let win = verifyWin(initialBoard,player);
	if (win) gameOver(win)
}

function verifyWin(board, player){
	let plays = board.reduce((a,e,i) => 
		(e === player) ? a.concat(i) : a,[]);
	let victory = null;
	for (let [index, win] of winers.entries()) {
		if(win.every(elem => plays.indexOf(elem) > -1)){
			victory={index: index, player: player};
			break;
		}
	}
	return victory;
}

function gameOver(win){
	for (var i=0;i<slots.length;i++) {
		slots[i].removeEventListener('click', turnClick, false);
	}
	declareWiner(win.player==huPlayer ? "You Win." : "Skynet Wins.")
}

/*function minimax(newBoard, player){
	var availSpots=emptySlots();
	
	if (verifyWin(newBoard, huPlayer)){
		return {score: -10};
	}else if(verifyWin(newBoard, com)){
		return {score: 10};
	}else if(availSpots.length === 0){
		return {score: 0};
	}
	
	var moves=[];

	for (var i=0; i < availSpots.length; i++) {
		var move={};
		move.index = newBoard[availSpots[i]];
		newBoard[availSpots[i]] = player;

		if (player == com) {
			var	result = minimax(newBoard, huPlayer);
			move.score = result.score;	
		} else {
			var result = minimax(newBoard, com);
			move.score = result.score;
			
		}
		newBoard[availSpots[i]] = move.index;

		moves.push(move);
	}

	var bestMove;
	if (player === com) {
		var bestScore = -10000;
		for (var i = 0 ; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}else{
		var bestScore = 10000;
		for (var i = 0;i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score;
				bestMove = i;
			}
		}
	}
	console.log(bestMove);
	return moves[bestMove];

}*/
