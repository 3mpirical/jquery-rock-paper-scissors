

class Emitter extends EventTarget{
    static add(event, callback){
        addEventListener(event, callback);
    }
    static emit(event){
        const eventObj = new Event(event);
        dispatchEvent(eventObj);
    }
};



export { Emitter };


