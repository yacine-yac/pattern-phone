import { Line } from "../../main/line.js";
import Calcule from "../../main/calcule.js";
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
     */
    constructor(circles,lines,divLocation,events){
        this.circles=circles;
        this.lines=lines;
        this.divLocation=divLocation;
        this.events=events;
    }
    /**
     * 
     */
    start(e){ //console.log(e.target.getAttribute('value'))
        const currentalue=e.target.getAttribute('value'); 
        this.circles.globalStatus=true;
        this.circles.turnCircleActive(currentalue); 
        this.lines.add(new Line(currentalue)); 
        this.lines.current.create();  console.log("eee",this.lines);
        document.addEventListener(this.events.move,(t)=>this.move(t.target)); 
        // document.addEventListener(this.events.end,()=>this.stop()); 
    }
    /**
     * declenched when the mouse start moving
     * @param {MouseEvent} t event parameter 
     * @return void
     */
    move(currentItem){//console.log(currentItem);
        const currentvalue =currentItem.getAttribute('value');
        if(currentItem.nodeName==="circle" && this.circles.circles[currentvalue].status===false){ 
                this.circles.turnCircleActive(currentvalue);   
                let p1=[this.circles.currentCircle["x"],this.circles.currentCircle["y"]];
                let p2=[this.circles.precendentCircle['x'],this.circles.precendentCircle["y"]];
                this.lines.current.calculPosition(this.circles.precendentCircle)
                            .setLinePosition(new Calcule(p1,p2));  
                this.lines.add(new Line(currentvalue)); 
                this.lines.current.create(); 
        }else{ 
            let p1=[currentItem.clientX,currentItem.clientY];   
            let p2=[this.circles.currentCircle["x"]+this.divLocation.getBoundingClientRect().left,
            this.circles.currentCircle['y']+this.divLocation.getBoundingClientRect().top]; 
            console.log(currentItem.clientX);
                this.lines.current.calculPosition(this.circles.currentCircle)
                            .setLinePosition(new Calcule(p1,p2));
        }
    }
    /**
     * occurs when the (mouse/fingers) stop moving  
     */
    stop(){

        if(this.circles.globalStatus){   
            document.removeEventListener(this.events.move,(t)=>this.move(t)); 
            setTimeout(()=>{
                      this.circles.turnCirclesOff();  
                      this.circles.globalStatus=false;
                      this.lines.clear();
                      document.removeEventListener(this.events.start,()=>this.stop()); 
            },400);  
        } 
    }
}

export default Pattern;