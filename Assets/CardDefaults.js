#pragma strict
public class CardDefaults extends MonoBehaviour {
	public var cards= new Hashtable();
	
	function Awake():void {
		var tex =  new Texture2D(750, 1050);
		this.cards["normaltrain"]= new Array(1,0,'Normal Train',Resources.Load("card_images/normaltrain") as Texture2D);
		this.cards["layrails"]= new Array(1,0,'Lay Rails',Resources.Load("card_images/layrails") as Texture2D);
		this.cards["stationexpansion"]= new Array(1,0,'Station Expansion',Resources.Load("card_images/stationexpansion") as Texture2D);
	}
	function Update() {}
	
	public function getById(type:String) {
	    var cardProp:Array = this.cards[type];
		var builtCard:Card = this.buildCard(cardProp);
		return builtCard;
	}
	public function getStartingDeck() {
		var startingCount:Array = [7,2,1];
		var localCards = new Array();
		var count:int;
		var startingCards = new Array('normaltrain','layrails','stationexpansion');
		for(var x=0;x<3;x++) {
			count = startingCount[x];
			var type:String = startingCards[x];
			for(var i=0;i<count;i++){
				var nc:Card = this.getById(type);
				localCards.push(nc);
			}
		}
		return localCards;
	}
	public function buildCard(cardProp:Array) {
	
		var card:Card = new Card(cardProp[2],cardProp[0],cardProp[1],cardProp[3]);
		return card;
	
	}

}