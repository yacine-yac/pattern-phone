/**
 * @property {mouse,touch}  type the event if is whith touch or mouse
 */
export default class PatternEvents{
    constructor(type="mouse"){ 
        this.type=type;
        this.start=type ==="mouse" ? "mousedown" :"touchstart" ;
        this.move=type ==="mouse" ? "mousemove" :"touchmove" ;
        this.end=type ==="mouse" ? "mouseup" :"touchend" ;
    }
}