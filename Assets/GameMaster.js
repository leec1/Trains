#pragma strict

public class GameMaster extends MonoBehaviour {
    // TODO: Expand to the remainder of the standard deck
    enum Cards { LayRails, StationExpansion, NormalTrain };

	private var players = new Array();
	private var numPlayers:int=1;
	public var currentPlayer:Player;
	private var currentPlayerIDX=0;
	private var board:GameObject;

    // TODO: Make this configurable at RunTime
    private var defaultStartingDeck = new Array (
        Cards.LayRails,
        Cards.LayRails,
        Cards.StationExpansion,
        Cards.NormalTrain,
        Cards.NormalTrain,
        Cards.NormalTrain,
        Cards.NormalTrain,
        Cards.NormalTrain,
        Cards.NormalTrain,
        Cards.NormalTrain
    );

    function Start () {
        // Choose Non-Default Tableau Cards
        var cardsInGame = new Array();
        cardsInGame.Push( Cards.LayRails );
        cardsInGame.Push( Cards.StationExpansion );
        cardsInGame.Push( Cards.NormalTrain );

        board = GameObject.Find("GameMaster");

        generateCardComponents( cardsInGame );

    }

    private function generateCardComponents( cards:Array ) {

        for ( var card : Cards in cards ) {
            var gameObject;
            switch ( card ) {
                case Cards.LayRails:
                    gameObject = board.AddComponent.<LayRails>();
                    break;
                case Cards.StationExpansion:
                    gameObject = board.AddComponent.<StationExpansion>();
                    break;
                case Cards.NormalTrain:
                    gameObject = board.AddComponent.<NormalTrain>();
                    break;
                default:
                    print ( "Invalid Card Type" );
                    break;
            }
            // TODO: Change the Vector Location based on the index
            var obj:GameObject = Instantiate( gameObject, new Vector3(0,0,10), Quaternion.identity);
            var cd:CardDragger = obj.GetComponent("CardDragger");
            cd.location = "tableau";

        }
	}

	function Update () {
    	if (Input.GetMouseButtonDown(0)) {
       	 moveCard();
    	}
	}
	function moveCard() {
    	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
    	var hit = Physics2D.Raycast (ray.origin, ray.direction, Mathf.Infinity);
    	if(hit) {
       	 var cd:CardDragger = hit.collider.gameObject.GetComponent("CardDragger");
       	 cd.updatePosition();
    	}
	}
	public function getCurrentPlayer() {
		return this.currentPlayer;
	}
	public function updatePlayer() {
	    this.currentPlayerIDX = ( this.currentPlayerIDX + 1 ) % numPlayers;
		this.currentPlayer = this.players[this.currentPlayerIDX];
	}
	
	function Awake():void
    {
		for(var i=0;i<this.numPlayers;i++){
			var playerObject = GameObject.Find("Player");
			var instantiated = Instantiate(playerObject, new Vector3(0, 0, 0), Quaternion.identity);
			var newPlayer = instantiated.AddComponent(Player);
			newPlayer.createStartingDeck( defaultStartingDeck );
			this.players.Push(newPlayer);
		}
		    this.currentPlayer = this.players[0];
    }
   
}