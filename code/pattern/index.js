import { Line } from "../../main/line.js";
import Calcule from "../../main/calcule.js";
import { handlerMove,handlerStop } from "../handlers.js";
/**
 * occurs when the mouse stop moving  
 */
 

class Pattern{
    /**
     * 
     * @param {Circles} circles 
     * @param {Lines} lines 
     * @param {HTMLElement} divLocation 
     * @param {string} events 
     * @property {HTMLElement | null} currentTag It's refer to the current HTML element Targeted
     * @property {[number,number]} currentTagCoordinates return the current coordinates of the (mouse / touch)
     */
    constructor(circles,lines,divLocation,events){
        this.circles=circles;
        this.lines=lines;
        this.divLocation=divLocation;
        this.events=events;
        this.currentTag=null;
        this.currentTagCoordinates=null;
    }
    /**
     * 
     */
    start(){
        const currentalue=this.currentTag.getAttribute('value'); 
        this.circles.globalStatus=true;
        this.circles.turnCircleActive(currentalue); 
        this.lines.add(new Line(currentalue)); 
        this.lines.current.create();   
    }
    /**
     * declenched when the mouse start moving 
     * @return void
     */
    move(){
        const currentvalue =this.currentTag.getAttribute('value'); 
        if(this.currentTag.nodeName==="circle" && this.circles.circles[currentvalue].status===false){ 
                this.circles.turnCircleActive(currentvalue);   
                let p1=[this.circles.currentCircle["x"],this.circles.currentCircle["y"]];
                let p2=[this.circles.precendentCircle['x'],this.circles.precendentCircle["y"]];
                this.lines.current.calculPosition(this.circles.precendentCircle)
                            .setLinePosition(new Calcule(p1,p2));  
                this.lines.add(new Line(currentvalue)); 
                this.lines.current.create(); 
        }else{ 
            let p2=[
                this.circles.currentCircle["x"]+this.divLocation.getBoundingClientRect().left,
                this.circles.currentCircle['y']+this.divLocation.getBoundingClientRect().top
            ]; 
            this.lines.current.calculPosition(this.circles.currentCircle)
                            .setLinePosition(new Calcule(this.currentTagCoordinates,p2));
        }
    }
    /**
     * occurs when the (mouse/fingers) stop moving  
     */
    stop(){

        if(this.circles.globalStatus){   
            this.divLocation.removeEventListener(this.events.move,handlerMove); 
            setTimeout(()=>{
                      this.circles.turnCirclesOff();  
                      this.circles.globalStatus=false;
                      this.lines.clear(); 
                      this.divLocation.removeEventListener(this.events.start,handlerStop); 
            },400);  
        } 
    }
    setCurrentTag(currentTag){
            this.currentTag=currentTag;
            return this;
    }
    setCurrentTagCoordinates(x,y){ 
        this.currentTagCoordinates=[x,y];
    }
}

export default Pattern;