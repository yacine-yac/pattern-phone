/**
 * @class
 * @property {mouse | touch}  type  the event if is whith touch or mouse
 */
export default class PatternEvents{
    /**
     * 
     * @param {mouse | touch}  type   type the event if is whith touch or mouse
     */
    constructor(){ 
        this.type="mouse";
        this.start= "mousedown";
        this.move= "mousemove";
        this.end=  "mouseup";
    }
    /**This method will set type value property base on the type of device (mobile or desktop) */
    setType(){
        const phoneDevices= /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
        console.log(phoneDevices.test(navigator.userAgent))
        if(phoneDevices.test(navigator.userAgent)){
            //Phone 
            this.type='touch';
        }else{
            //Desktop
            this.type="mouse";
        }
        return this
    }
    /**
     * set Events base on the type of events (touch or mouse)
     */
    setEvents(){
        this.start=this.type ==="mouse" ? "mousedown" :"touchstart" ;
        this.move=this.type ==="mouse" ? "mousemove" :"touchmove" ;
        this.end=this.type ==="mouse" ? "mouseup" :"touchend" ;
    }
}