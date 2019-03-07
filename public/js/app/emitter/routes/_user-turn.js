import { VIEW } from "../../view";
import { MDL } from "../../model";
import { Emitter } from "../emitter";
import { elements } from "../../elements";
import anime from 'animejs';


///// DISPLAYS


///// LISTENER
Emitter.add("user-turn", (event) => {
    VIEW.DOM()
    .deleteContents(elements.bottomDisplay())
    .createFrag()
    .add("p", `${MDL.selection.moves.one.name}`, "button", "battle-btn", "battle-btn-one")
    .add("p", `${MDL.selection.moves.two.name}`, "button", "battle-btn", "battle-btn-two")
    .add("p", `${MDL.selection.moves.three.name}`, "button", "battle-btn", "battle-btn-three")
    .add("p", `${MDL.selection.moves.four.name}`, "button", "battle-btn", "battle-btn-four")
    .append(elements.bottomDisplay());

    elements.battleBtnOne().addEventListener("click", (event) => {
        MDL.userMove = MDL.selection.moves.one;
        MDL.genCompMove()
        Emitter.emit("object-fight");
    });
    elements.battleBtnTwo().addEventListener("click", (event) => {
        MDL.userMove = MDL.selection.moves.two;
        MDL.genCompMove()
        Emitter.emit("object-fight");
    });
    elements.battleBtnThree().addEventListener("click", (event) => {
        MDL.userMove = MDL.selection.moves.three;
        MDL.genCompMove()
        Emitter.emit("object-fight");
    });
    elements.battleBtnFour().addEventListener("click", (event) => {
        MDL.userMove = MDL.selection.moves.four;
        MDL.genCompMove()
        Emitter.emit("object-fight");
    });
});