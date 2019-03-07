import { VIEW } from "../../view";
import { MDL } from "../../model";
import { Emitter } from "../emitter";
import { elements } from "../../elements";
import anime from 'animejs';

///// DISPLAYS /////
const selectionDisplay = () => {
    VIEW.DOM()
    .deleteContents(elements.display)
    .createFrag()
    // borders
    .add("div", null, "border")
    .add("div", null, "border", "outer")
    .add("div", null, "border","inner")
    .add("div", null, "menu-border-1")
    .add("div", null, "menu-border-2")
    // content
    .add("h2", "Select Your Object", "select__head")
    .addImg("../img/rock.svg", "select__rock")
    .addImg("../img/paper.svg", "select__paper")
    .addImg("../img/scissors.svg", "select__scissors")
    .add("p", "Each object has its own unique skills", "select__text")
    .add("p", "choose wisely", "select__text")
    .append(elements.display);

    anime.timeline()
    .add({
        targets: [".select__rock", ".select__paper", ".select__scissors"],
        opacity: 1,
        direction: "normal",
        delay: anime.stagger(400, {from: "center"}),   
    })
    .add({
        targets: ".select__text",
        opacity: 1,
    });
};


const afterSelection = () => {
    VIEW.DOM()
    .deleteContents(elements.display)
    .createFrag()
    // borders
    .add("div", null, "border")
    .add("div", null, "border", "outer")
    .add("div", null, "border","inner")
    .add("div", null, "menu-border-1")
    .add("div", null, "menu-border-2")
    // content
    .add("h2", `You Selected ${MDL.selection.name}!`, "select__head")
    .addImg(`../img/${MDL.selection.name}.svg`, "select__selection")
    .add("p", "But Wait...", "select__text")
    .add("p", "A Wild Object Has Appeared!", "select__text", "select__appeared")
    .add("div", null, "select__screen-transition")
    .append(elements.display);

    const opacityZero = {
        targets: ".select__screen-transition",
        opacity: 0,
        easing: "linear",
        duration: 750,
        delay: 0,
    };

    const opacityOne = {
        targets: ".select__screen-transition",
        opacity: 1,
        easing: "linear",
        duration: 750,
        delay: 0,
    };

    anime.timeline()
    .add({
        targets: ".select__text",
        opacity: 1,
        delay: anime.stagger(3000),
    })
    .add(opacityOne)
    .add(opacityZero)
    .add(opacityOne)
    .add(opacityZero)
    .add(opacityOne)
    .finished.then(() => {
        setTimeout(() => {
            elements.display.style.backgroundColor = "white";
            Emitter.emit("object-battle");
        }, 500);
    })
    // elements.display.style.backgroundColor = "white";
    // Emitter.emit("object-battle");
    ///// Delete the uncommented code above later
};



///// LISTENER /////
Emitter.add("object-selection", (event) => {

    selectionDisplay();

    elements.rockSelection().addEventListener("click", (event) => {
        MDL.selection = MDL.createRock();
        afterSelection();
    });
    elements.paperSelection().addEventListener("click", (event) => {
        MDL.selection = MDL.createPaper();
        afterSelection();
    });
    elements.scissorsSelection().addEventListener("click", (event) => {
        MDL.selection = MDL.createScissors();
        afterSelection();
    });

});