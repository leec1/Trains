#pragma strict

public interface Card {

	function getCost () : int;
    function getCardValue () : int;
    function getCardName () : String;
    function getSprite() : Texture2D;
    function playCard();
}