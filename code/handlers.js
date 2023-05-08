import { event } from "./code.js";
import { drawPattern } from "./code.js";

/** Event handlers for  (start,move,stop) events
 * nbr: in the event (touchmove) we will not be able to target the current element 
 * It's just target the element where the (touchstart) event occured 
 */
function handlerMove(e) {
    const startEvent=event.type==="mouse" ? e : e.touches[0]; 
    const currentTag=event.type==="mouse" ? e.target : document.elementFromPoint(startEvent.clientX,startEvent.clientY) ;

    /** Set the current element to drawPattern with his coordinates */
    drawPattern.setCurrentTag(currentTag).setCurrentTagCoordinates(startEvent.clientX,startEvent.clientY);
    drawPattern.move(e);
} 


function handlerStop(){drawPattern.stop()}

export {handlerMove,handlerStop};