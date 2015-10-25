#pragma strict
public class Player extends MonoBehaviour {

    public enum PlayerState { NotActive, Draw, Play, CleanUp };

	private var id;
	private var vp:int=0;
	private var railsRemaining:int = 20;
	private var color:Color;

	private var deck:Deck;
    private var discard:Deck;
	private var hand:Hand;

    private var cardsCreatedThisTurn = new Array();
	private var turnState:PlayerState = PlayerState.NotActive;
	private var dobj:GameObject;

	function Start () {
	    this.deck= new Deck();
	    this.deck.setRole( "draw" );

	    this.discard = new Deck();
	    this.discard.setRole( "discard" );

	    this.id = GetInstanceID();
		this.hand = new Hand();
	}
	
    public function createStartingDeck( cards:Array ) {
        // Force to only happen once
        for ( var newCard : GameMaster.Cards in cards ) {
            this.deck.addToTop( newCard );
        }
        this.deck.shuffle();
    }

	public function getId() {
		return this.id;
	}
	
	private function isTurn(gameController:GameMaster) {
		var currentPlayer = gameController.getCurrentPlayer();
		if (currentPlayer.getId() != this.id) {
			return false;
		}
		return true;
	}
	private function dealCards(gameController:GameMaster, location){
	        //var dealtCards:Array = this.deck.deal(5, this.discard, location);
//			this.hand.resetHand(dealtCards);
	}
    private function removeCardInstances(){
        for(var key in this.cardsCreatedThisTurn){
            Destroy(key);
        }
        this.cardsCreatedThisTurn=new Array();
    }
	private function cleanUp(gameController:GameMaster) {
	    //this.hand.unDraw();
		//this.discard.addToDeck(this.hand.emptyHand(), "discard");
		//this.discard.addToDeck(this.playArea.empty());
		//this.removeCardInstances();
		gameController.updatePlayer();
	}
	
	private function showCards(gameController:GameMaster) {
	    
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
	private function doTurn(gameController:GameMaster) {
		return;
	}
	private function doTurnState(gameController:GameMaster) {
	    var state = this.turnState;
	    switch ( state ) {
	        case this.PlayerState.NotActive:
                // umm.....
	        case this.PlayerState.Draw:
	            this.dealCards(gameController, "hand");
	            this.showCards(gameController);
	            this.turnState = PlayerState.Play;
	            break;
	        case this.PlayerState.Play:
	            this.doTurn(gameController);
	            this.turnState = PlayerState.CleanUp;
	            break;
	        case this.PlayerState.CleanUp:
	            this.cleanUp(gameController);
	            this.turnState = PlayerState.NotActive;
	            break;
	        default:
                // um......
	            break;
	    }
	}
	function OnGUI() {
	    if (GUI.Button(Rect(10,600,75,30),"End Turn"))
	        this.turnState=PlayerState.CleanUp;
	}
	function Update () {
		var gameController:GameMaster = GameObject.Find("GameMaster").GetComponent(GameMaster);
		
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
    public function getCurrentState() {
        return this.turnState;
	}
	
}