#pragma strict
public var location:String;
function Update() {
}

function updatePosition() {
    Debug.Log('here');
    if(this.location =="tableau") {
        this.location = "discard";
        transform.position = new Vector3(-1.06,-4.03,0);
        this.GetComponent(SpriteRenderer).sortingLayerName="TopOfDiscard";
    }
}