#pragma strict

public class LayRails extends MonoBehaviour implements Card {
    private var spriteURL = "card_images/layrails";
    private var sprite:Texture2D;
    private var card_name = "Lay Rails";
    private var cost:int = 1;
    private var card_value:int = 0;

    public function Card( ) { }

    public function getCost() : int { return this.cost;}
    public function getCardValue() : int { return this.card_value;}
    public function getCardName() : String { return this.card_name;}
    public function getSprite() : Texture2D { return this.sprite;}
    public function playCard() {}

}