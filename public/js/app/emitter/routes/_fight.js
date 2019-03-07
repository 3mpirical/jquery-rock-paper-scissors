import { VIEW } from "../../view";
import { MDL } from "../../model";
import { Emitter } from "../emitter";
import { elements } from "../../elements";
import anime from 'animejs';

///// DISPLAYS /////
const compMoveDisplay = () => {
    const moveText = (effectiveness) => {
        VIEW.DOM()
        .deleteContents(elements.bottomDisplay())
        .createFrag()
        .add("p", `${MDL.getCompSelection().name.toUpperCase()} used ${MDL.getCompMove().name}!`, "fight__move-text")
        .add("p", `${MDL.getCompMove().name} was ${effectiveness}`, "fight__move-text")
        .append(elements.bottomDisplay());
    };

    if(MDL.getCompMove().strength === MDL.selection.name) {
        moveText("super effective");
        MDL.selection.health -= MDL.getCompMove().power * 2;

    } else if(MDL.getCompMove().weakness === MDL.selection.name) {
        moveText("not very effective");
        MDL.selection.health -= Math.floor(MDL.getCompMove().power / 2);

    } else {
        moveText("effective");
        MDL.selection.health -= MDL.getCompMove().power;
    }

    anime.timeline()
    .add({
        targets: ".battle__comp-object",
        right: "35%",
        top: "20%",
        direction: "alternate",
        loop: 1,
        easing: "linear",
        duration: 200,
    })
    .add({
        targets: ".battle__comp-object",
        right: "7%",
        top: "7%",
        direction: "alternate",
        loop: 1,
        easing: "linear",
        duration: 200,
    })
    .add({
        targets: ".battle__user-health",
        value: MDL.selection.health,
        duration: 1000,
        easing: "linear",
    });

    // console.log(MDL.selection.health);
    if(MDL.checkCompWin(MDL.selection.health)) {
        setTimeout(() => {
            anime({
                targets: ".battle__user-object",
                bottom: "0%",
                opacity: 0,
                duration: 1300,
            })
            .finished.then(() => {
                VIEW.DOM()
                .deleteContents(elements.bottomDisplay())
                .createFrag()
                .add("p", `Ugh oh, your object fainted!`, "fight__move-text")
                .add("p", `You whited out...`, "fight__move-text")
                .append(elements.bottomDisplay());
                });

                setTimeout(() => {
                    VIEW.DOM()
                    .deleteContents(elements.display)
                    .create("div", null, "finished-game")
                    .append(elements.display);

                    anime({
                        targets: ".finished-game",
                        backgroundColor: "rgb(0,0,0)",
                        duration: 4000,
                    })
                    .finished.then(() => {
                        Emitter.emit("welcome");
                        elements.startButton().addEventListener("click", (event) => {
                            Emitter.emit("object-selection");
                        });
                    });
                }, 5000)
        }, 3000);
    } else {
        setTimeout(() => {
            Emitter.emit("user-turn");
        }, 3000);
    }
};


const userMoveDisplay = () => {

    const moveText = (effectiveness) => {
        VIEW.DOM()
        .deleteContents(elements.bottomDisplay())
        .createFrag()
        .add("p", `You used ${MDL.userMove.name}!`, "fight__move-text")
        .add("p", `${MDL.userMove.name} was ${effectiveness}`, "fight__move-text")
        .append(elements.bottomDisplay());
    };

    if(MDL.userMove.strength === MDL.getCompSelection().name) {
        moveText("super effective");
        MDL.getCompSelection().health -= MDL.userMove.power * 2;

    } else if(MDL.userMove.weakness === MDL.getCompSelection().name) {
        moveText("not very effective");
        MDL.getCompSelection().health -= Math.floor(MDL.userMove.power / 2);

    } else {
        moveText("effective");
        MDL.getCompSelection().health -= MDL.userMove.power;
    }

    anime.timeline()
    .add({
        targets: ".battle__user-object",
        left: "20%",
        bottom: "40%",
        direction: "alternate",
        loop: 1,
        easing: "linear",
        duration: 200,
    })
    .add({
        targets: ".battle__user-object",
        left: "2%",
        bottom: "25%",
        direction: "alternate",
        loop: 1,
        easing: "linear",
        duration: 200,
    })
    .add({
        targets: ".battle__comp-health",
        value: MDL.getCompSelection().health,
        duration: 1000,
        easing: "linear",
    });

    if(MDL.checkUserWin()) {
        setTimeout(() => {
            anime({
                targets: ".battle__comp-object",
                top: "40%",
                opacity: 0,
                duration: 1300,
            })
            .finished.then(() => {
                VIEW.DOM()
                .deleteContents(elements.bottomDisplay())
                .createFrag()
                .add("p", `${MDL.getCompSelection().name.toUpperCase()} fainted!`, "fight__move-text")
                .add("p", `You Win!`, "fight__move-text")
                .append(elements.bottomDisplay());

                setTimeout(() => {
                    VIEW.DOM()
                    .deleteContents(elements.display)
                    .create("div", null, "finished-game")
                    .append(elements.display);

                    anime({
                        targets: ".finished-game",
                        backgroundColor: "rgb(0,0,0)",
                        duration: 4000,
                    })
                    .finished.then(() => {
                        Emitter.emit("welcome");
                        elements.startButton().addEventListener("click", (event) => {
                            Emitter.emit("object-selection");
                        });
                    });
                }, 5000)
            });
        }, 3000);
        console.log("user wins!!!")
    } else {
        setTimeout(() => {
            compMoveDisplay();
        }, 3000);
    }

};



///// LISTENER /////
Emitter.add("object-fight", (event) => {
    userMoveDisplay();

});