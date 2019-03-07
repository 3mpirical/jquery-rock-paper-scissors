
const elements = {
    display: document.querySelector(".game-display"),
    startButton: () => document.querySelector(".start-game"),
    stopButton: () => document.querySelector(".end-game"),

    rockSelection: () => document.querySelector(".select__rock"),
    paperSelection: () => document.querySelector(".select__paper"),
    scissorsSelection: () => document.querySelector(".select__scissors"),

    bottomDisplay: () => document.querySelector(".bottom-display"),

    battleBtnOne: () => document.querySelector(".battle-btn-one"),
    battleBtnTwo: () => document.querySelector(".battle-btn-two"),
    battleBtnThree: () => document.querySelector(".battle-btn-three"),
    battleBtnFour: () => document.querySelector(".battle-btn-four"),
};

export { elements };