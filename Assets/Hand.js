#pragma strict

public class Hand {
	public var cards:Array = new Array();
	public function Hand(){
	
	}
	public function resetHand(cards:Array){this.cards = cards;}
	public function emptyHand(){
		var returnHand:Array = this.cards;
		this.cards = new Array();
		return returnHand;
	}
	public function unDraw() {
	    //for(var i:Card in this.cards){
        //    i.setDrawn(false);
		//}
	}

}