#pragma strict

public class Card {
	public var sprite:Texture2D;
	public var card_name;
	public var cost:int;
	public var card_value:int;
	public function Card(card_name, cost:int, card_value:int, sprite:Texture2D) {
		this.card_name = card_name;
		this.cost = cost;
		this.card_value = card_value;
		this.sprite = sprite;
	}
	public function getCost() { return this.cost;}
	public function getCardValue() { return this.card_value;}
	public function getCardName() { return this.card_name;}
	public function getSprite() { return this.sprite;}
}