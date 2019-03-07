
class Move {
    constructor(name, power, weakness, strength){
        this.name = name;
        this.power = power;
        this.weakness = weakness;
        this.strength = strength;
    }
}

class Material {
    constructor(name, ...moves) {
        this.name = name;
        this.health = 100;
        this.moves = {};
        this.moves.one = moves[0];
        this.moves.two = moves[1];
        this.moves.three = moves[2];
        this.moves.four = moves[3];
    }
}

///// MOVES
const moveThrow = new Move("throw", 25, "paper", "scissors");
const drop = new Move("drop", 10, "paper", "scissors");
const grind = new Move("grind", 15, "paper", "scissors");
const bang = new Move("bang", 20, "paper", "scissors");

const cover = new Move("cover", 20, "scissors", "rock");
const fan = new Move("fan", 10, "scissors", "rock");
const airplane = new Move("airplane", 25, "scissors", "rock");
const toss = new Move("toss", 15, "scissors", "rock");

const cut = new Move("cut", 15, "rock", "paper");
const stab = new Move("stab", 20, "rock", "paper");
const slash = new Move("slash", 25, "rock", "paper");
const poke = new Move("poke", 10, "rock", "paper");


const MDL = (function() {
    
    let selection = null;
    let compSelection = null;
    let userMove = null;
    let compMove = null;


    const checkUserWin = () => {
        if(compSelection.health <= 0) return true;
    };

    const checkCompWin = (health) => {
        if(health <= 0) return true;
    };
    
    const createRock = () => {
        return new Material("rock", moveThrow, drop, grind, bang);
    };
    
    const createPaper = () => {
        return new Material("paper", cover, fan, airplane, toss);
    }
    
    const createScissors = () => {
        return new Material("scissors", cut, stab, slash, poke);
    }
    
    const getCompSelection = () => {
        return compSelection;
    };

    const genCompSelection = () => {
        compSelection = [createRock(), createPaper(), createScissors()][Math.floor(Math.random() * 3)];
    };
    
    const resetCompSelection = () => {
        compSelection = null;
    };
    
    const genCompMove = () => {
        let move = ["one", "two", "three", "four"][Math.floor(Math.random() * 4)];
        compMove = compSelection.moves[move];
    };

    const getCompMove = () => {
        return compMove;
    };

    return {
        selection,
        compSelection,
        userMove,
        compMove,

        checkUserWin,
        checkCompWin,

        createRock,
        createPaper,
        createScissors,

        getCompSelection,
        genCompSelection,
        resetCompSelection,

        genCompMove,
        getCompMove,
    };
} () );



export { MDL };