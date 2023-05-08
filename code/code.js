import Calcule from "../main/calcule.js";
import CircleList from "../main/circles.js";
import {Line,LineList} from "../main/line.js";
import PatternEvents from "./Pattern/events.js";
import Pattern from "./Pattern/index.js";
import { handlerMove,handlerStop } from "./handlers.js";

/**
 * events : 
 *     mousedown / touchstart:The event occurs when the user presses a mouse button over an element
 *     mousemovel / touchmove:The event occurs when the mouse start moving
 *     mouseup  / touchend: The event occurs when a user releases a mouse button over an element
 */


const cd121=document.getElementById('cd121'),
circlesElement=document.querySelectorAll('svg circle'); 

/** init objects  */
const circles=new CircleList(circlesElement); 
const lines=new LineList(); 
const event=new PatternEvents("mouse");
event.setType().setEvents();
const drawPattern=new Pattern(circles,lines,cd121,event); 


/** add events listener */
for(let x=0;x<circlesElement.length;x++){  
  circlesElement[x].addEventListener(event.start,(e)=>{  
                      drawPattern.setCurrentTag(e.target).setCurrentTagCoordinates();
                      drawPattern.start();
                      cd121.addEventListener(event.move,handlerMove); 
                      cd121.addEventListener(event.end,handlerStop); 
  });   
}

export {event,drawPattern};