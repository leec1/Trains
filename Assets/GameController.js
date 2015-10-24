#pragma strict

public class GameController extends MonoBehaviour {
	private var players = new Array();
	private var numPlayers:int=1;
	public var currentPlayer:Player;
	private var currentPlayerIDX=0;
	private var board:GameObject;
	
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