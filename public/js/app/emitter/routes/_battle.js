import { VIEW } from "../../view";
import { MDL } from "../../model";
import { Emitter } from "../emitter";
import { elements } from "../../elements";
import anime from 'animejs';

///// DISPLAYS /////
const battleDisplay = () => {
    VIEW.DOM()
    .deleteContents(elements.display)
    .createFrag()
    // borders
    .add("div", null, "border")
    .add("div", null, "border", "outer")
    .add("div", null, "border","inner")
    .add("div", null, "menu-border-1")
    .add("div", null, "menu-border-2")
    // contents
    .add("div", null, "bottom-display")
    .add("div", null, "bottom-clearfix")
    .add("progress", null, "battle__user-health")
    .add("progress", null, "battle__comp-health")
    .add("p", "Health", "battle__user-health-label")
    .add("p", "Health", "battle__comp-health-label")
    .addImg(`../img/${MDL.selection.name}.svg`, "battle__user-object")
    .addImg(`../img/${MDL.getCompSelection().name}.svg`, "battle__comp-object")
    .append(elements.display);

    VIEW.DOM()
    .create("p", `${MDL.getCompSelection().name.toUpperCase()} has appeared!`, "battle__appeared")
    .append(elements.bottomDisplay());

    if(MDL.selection.name === "scissors") {
        document.querySelector(".battle__user-object").style.transform = "rotate(110deg)";
    }

    document.querySelector(".battle__user-health").setAttribute("max", 100);
    document.querySelector(".battle__comp-health").setAttribute("max", 100);
    
    anime.timeline()
    .add({
        targets: ".battle__user-health",
        opacity: 1,
        duration: 0,
        delay: 2000,
    })
    .add({
        targets: ".battle__user-health",
        value: 100,
        duration: 1000,
        easing: "linear",
    });

    anime.timeline()
    .add({
        targets: ".battle__comp-health",
        opacity: 1,
        duration: 0,
        delay: 2000,
    })
    .add({
        targets: ".battle__comp-health",
        value: 100,
        duration: 1000,
        easing: "linear",
    })

    anime({
        targets: [".border", ".menu-border-1", ".menu-border-2"],
        borderColor: "rgb(0,0,0)",
        zIndex: 15,
        duration: 0,
    });

    anime({
        targets: ".battle__user-object",
        left: "2%",
        easing: "linear",
        duration: 2000,
    });

    anime({
        targets: ".battle__comp-object",
        right: "7%",
        easing: "linear",
        duration: 2000,
    })
    .finished.then(() => {
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
};


///// LISTENER /////
Emitter.add("object-battle", (event) => {
    MDL.genCompSelection();
    battleDisplay();
});