import { VIEW } from "../../view";
import { Emitter } from "../emitter";
import { elements } from "../../elements";


Emitter.add("welcome", (event) => {

    VIEW.DOM()
    .deleteContents(elements.display)
    .createFrag(elements.display)
    // borders
    .add("div", null, "border")
    .add("div", null, "border", "outer")
    .add("div", null, "border","inner")
    .add("div", null, "menu-border-1")
    .add("div", null, "menu-border-2")
    // content
    .add("h1", "Welcome to Rock, Paper, Scissors", "welcome__title")
    .add("p", "Would you like to play a game?", "welcome__question")
    .add("button", "Yes", "button", "start-game")
    .add("button", "No", "button", "end-game")
    .append(elements.display);

    elements.display.style.backgroundColor = "rgb(0,0,0)";

});