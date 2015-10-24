#pragma strict

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
