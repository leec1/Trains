#pragma strict

public class Gameobject extends MonoBehaviour {
	private var players = new Array();
	private var numPlayers:int=1;
	public var currentPlayer:Player;
	private var currentPlayerIDX=0;
	private var board:GameObject;
	function Start () {
    	for(var i=0;i<4;i++) {
        	var crd = GameObject.Find("Card");
        	var cobj = Instantiate(crd, new Vector3(0,0,10), Quaternion.identity);
        	var cd:CardDragger = cobj.GetComponent("CardDragger");
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
		if(this.currentPlayerIDX < numPlayers-1) {
			this.currentPlayerIDX+=1;
		} else {
			this.currentPlayerIDX=0;
		}
		this.currentPlayer = this.players[this.currentPlayerIDX];
	}
	
	function Awake():void
    {
		for(var i=0;i<this.numPlayers;i++){
			var playerObject = GameObject.Find("Player");
			var instantiated = Instantiate(playerObject, new Vector3(0, 0, 0), Quaternion.identity);
			var newPlayer = instantiated.AddComponent(Player);
			this.players.Push(newPlayer);
		}
		    this.currentPlayer = this.players[0];
    }
   
}