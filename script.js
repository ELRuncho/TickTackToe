function move(id){
	var slot=document.querySelector(':root'),color='red';
	slot.style.setProperty('--back', color);
	document.getElementById(id).className='usedSlot';
}
