#pragma strict
public class Player extends MonoBehaviour {
	private var id;
	private var vp:int=0;
	private var railsRemaining:int = 20;
	private var color:Color;
	private var deck:Deck;
	private var hand:Hand;
	private var discard:Deck;
	private var deckObject:GameObject;
	private var cardDefaults:CardDefaults;
    private var cardsCreatedThisTurn = new Array();
	private var turnState = "finished";
	private var dobj:GameObject;
	function Start () {
	    this.dobj = GameObject.Find("PlayerDeck");
		this.id = GetInstanceID();
		this.cardDefaults = GameObject.Find("GameController").GetComponent(CardDefaults);
		var startDeck = this.cardDefaults.getStartingDeck();
		this.hand = new Hand();
//		this.discard = new Deck(new Array(),0,0);
	}
	
	public function getId() {
		return this.id;
	}
	
	private function isTurn(gameController:GameController) {
		var currentPlayer = gameController.getCurrentPlayer();
		if (currentPlayer.getId() != this.id) {
			return false;
		}
		return true;
	}
	private function dealCards(gameController:GameController, location){
	        //var dealtCards:Array = this.deck.deal(5, this.discard, location);
//			this.hand.resetHand(dealtCards);
	}
    private function removeCardInstances(){
        for(var key in this.cardsCreatedThisTurn){
            Destroy(key);
        }
        this.cardsCreatedThisTurn=new Array();
    }
	private function cleanUp(gameController:GameController) {
	    //this.hand.unDraw();
		//this.discard.addToDeck(this.hand.emptyHand(), "discard");
		//this.discard.addToDeck(this.playArea.empty());
		//this.removeCardInstances();
		gameController.updatePlayer();
	}
	
	private function showCards(gameController:GameController) {
	    
	    //this.dobj.GetComponent(SpriteRenderer).sprite = deck.sprite;
//	    this.deckObject = Instantiate(this.dobj, new Vector3(deck.xPos, deck.yPos, 0), Quaternion.identity);
	    //this.cardsCreatedThisTurn.Push(this.deckObject);
		var deck:Array = this.getHand().cards;
		var xPos = -250;
		var yPos = -100;
		/*for(var i=0;i<deck.length;i++){
		    var card:Card = deck[i];
			var sprite:Texture2D = card.getSprite();
			var cobj:GameObject = GameObject.Find("Card");
			if(!card.getDrawn()){
			    var cob=Instantiate(cobj, new Vector3(xPos, yPos, 0), Quaternion.identity);
			    this.cardsCreatedThisTurn.Push(cob);
				cob.GetComponent(SpriteRenderer).sprite = Sprite.Create(sprite,new Rect(0,0,750,1050),new Vector2(0,0),30);
				xPos+=20;
				card.setDrawn(true);
			}
		}*/
		return;
	}
	private function doTurn(gameController:GameController) {
		return;
	}
	private function doTurnState(gameController:GameController) {
	    var state = this.turnState;
	    if(state=="finished") {
	        this.cleanUp(gameController);
	        this.turnState = "deal";
	    }else if(state == "deal") {
	        this.dealCards(gameController, "hand");
	        this.showCards(gameController);
	        this.turnState="doTurn";
	    }else if(state=="doTurn") {   
	        this.doTurn(gameController);
	    }
	}
	function OnGUI() {
	    if (GUI.Button(Rect(10,600,75,30),"End Turn"))
	        this.turnState="finished";
	}
	function Update () {
		var gameController:GameController = GameObject.Find("GameController").GetComponent(GameController);
		
		if(!this.isTurn(gameController)){
			return;
		}
		this.doTurnState(gameController);
	}
	
	public function getVp() {
		return this.vp;
	}
	public function getRailsRemaining() {
		return this.railsRemaining;
	}
	public function getHand() {
		return this.hand;
	}
	public function getDiscard() {
		return this.discard;
	}
	public function getDeck() {
		return this.deck;
	}
	
}