#pragma strict
public class Deck extends MonoBehaviour {

    enum DeckRole { Draw, Discard };

    private var instantiated=false;
    private var owner;
    private var deckRole;

    private var deck = new Array();

	function Update() {

	}

	function OnMouseDrag() {
    	var crd = GameObject.Find("Card");
    	if(!this.instantiated) {
       	 this.instantiated=true;
       	 Instantiate(crd,Camera.main.ScreenToWorldPoint(new Vector3(Input.mousePosition.x,Input.mousePosition.y,10.0f)), Quaternion.identity);
    	}
	}

	function OnMouseUp() {

	}

	function Start() {

	}

    public function getRole() {
        return this.deckRole;
    }

    public function setRole( newRole ) {
        // Add check to make sure this only happens ONCE
        if ( "discard" == newRole ) {
            this.deckRole = DeckRole.Discard;
        } else if ( "draw" == newRole ) {
            this.deckRole = DeckRole.Draw;
        } else {
            // um......
        }
    }

    public function draw() {
        var cardGO = GameObject.Find( deck.Pop() );
        return Instantiate( cardGO, new Vector3(0,0,10), Quaternion.identity);
    }

    public function addToTop( newCard ) {
        deck.Push( newCard );
    }

    public function shuffle() {
        // TODO: implement shuffle
    }

    public function replinishAndShuffle( discardDeck ) {
        this.deck = discardDeck;
        shuffle();
    }

    public function allCards ( ) {
        return deck;
    }

}