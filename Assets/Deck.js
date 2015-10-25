#pragma strict
public class Deck extends MonoBehaviour {
	private var instantiated=false;
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
}
public class DeckObject {


}