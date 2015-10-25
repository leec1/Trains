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
	    board = GameObject.Find("GameMaster");
	    var layRailsGO = board.AddComponent( Cards.LayRails.ToString() );
	    var stationExpansionGO = board.AddComponent(Cards.StationExpansion.ToString());
	    var normalTrainGO = board.AddComponent( Cards.NormalTrain.ToString());

	    var cobj = Instantiate( layRailsGO, new Vector3(0,0,10), Quaternion.identity);
	    var cd:CardDragger = cobj.GetComponent("CardDragger");
	    cd.location = "tableau";

	    cobj = Instantiate( stationExpansionGO, new Vector3(0,0,10), Quaternion.identity);
	    cd = cobj.GetComponent("CardDragger");
	    cd.location = "tableau";

	    cobj = Instantiate( normalTrainGO, new Vector3(0,0,10), Quaternion.identity);
	    cd = cobj.GetComponent("CardDragger");
        cd.location = "tableau";
        // Continue for all 'in play' cards
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