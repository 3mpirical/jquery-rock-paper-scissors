import { elements } from "./elements";
import { MDL } from "./model";

const VIEW = (function(MDL) {

    const DOM = (node) => {
        //// This function clears the contents of an element
        //// (Think resetting a display)
        const deleteContents = (node) => {
            node.innerHTML = "";
            return DOM();
        };

        //// These three functions create a document fragment 
        //// and then adds elements to the fragment until 
        //// it is appended with the append function below.
        const createFrag = () => {
            let node = document.createDocumentFragment();
            return DOM(node);
        };

        const add = (element, text, ...nodeClass) => {
            let fragNode = document.createElement(element);
            if(text) fragNode.textContent = text;
            [...nodeClass].forEach((item) => {
                fragNode.classList.add(item);
            });
            node.appendChild(fragNode);
            return DOM(node);
        }
        const addImg = (src, ...nodeClass) => {
            let fragNode = document.createElement("img");
            [...nodeClass].forEach((item) => {
                fragNode.classList.add(item);
            });
            fragNode.setAttribute("src", src);
            node.appendChild(fragNode);
            return DOM(node);
        }

        //// These two functions are for creating singluar elements an images
        const create = (element, text, ...nodeClass) => {
            let node = document.createElement(element);
            if(text) node.textContent = text;
            [...nodeClass].forEach((item) => {
                node.classList.add(item);
            });
            return DOM(node);
        };

        const createImg = (src, ...nodeClass) => {
            let node = document.createElement("img");
            [...nodeClass].forEach((item) => {
                node.classList.add(item);
            });
            node.setAttribute("src", src);
            return DOM(node);
        };

        //// this function appends the ndoe or document fragment to the DOM
        const append = (parentNode) => {
            parentNode.appendChild(node);
            return DOM();
        };

        return {
            deleteContents,
            createFrag,
            add,
            addImg,
            create,
            createImg,
            append
        };
    };




    return {
        DOM,
    };
} (MDL) );


export { VIEW };