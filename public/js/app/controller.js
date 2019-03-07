import { elements } from "./elements";
import { MDL } from "./model";
import { VIEW } from "./view";
import { Emitter } from "./emitter/emitter";
import  "./emitter/mainRoutes";


///// Controller /////
const CTRL = (function(MDL, VIEW) {


    const initializeGame = () => {
        Emitter.emit("welcome");

        elements.startButton().addEventListener("click", (event) => {
            Emitter.emit("object-selection");
        });
    };
    return {
        initializeGame,
    };
} (MDL, VIEW) );


///// EXECUTION /////
CTRL.initializeGame();


