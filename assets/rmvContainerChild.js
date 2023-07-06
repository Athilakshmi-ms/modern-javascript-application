// Removing all child elements from Container before creating new set of elements.

/*const rmvContainerChild = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
export default rmvContainerChild;*/ 
//if you export like this
//import like ..>  'import rmvCointainerChild from "./assets/rmvCointainerChild.js" 'like this

export const rmvContainerChild = (container) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}
//if you export like this
//import like ..>  'import {rmvCointainerChild} from "./assets/rmvCointainerChild.js" 'like this
