/**
 * define circle top and left position 
 *  @param circleSize represent the svg parent of circle size and position
 *  @param outArea   represent the the outdoor area of svg circle position
 */
class Circle{
    constructor(element,circleSize,outArea){ 
        this.element=element;
        this.x=null;
        this.y=null;
        this.status=false;
        this.calculateCenter(circleSize,outArea)
    }
    /**
     *  Calculate the center coordinates of the circle
     * @param {number} circleSize 
     * @param {number} outArea 
     * @returns void 
     */
    calculateCenter(circleSize,outArea){ 
        this.x=circleSize.width/2+ circleSize.left-outArea.left;
        this.y=circleSize.height/2+ circleSize.top-outArea.top;
    }
    
    /**
     *  Turn the circle Active by adding class style (circle-active)
     * @returns void 
    */
    turnCircleActive(){
            this.status=true;  
            this.element.classList.add("circle-active"); 
    } 
}

class CircleList{
    constructor(elements){ 
        this.elements=elements;
        this.circles={};
        this.setCirclesCenter();
    }
    setCirclesCenter(){
        this.elements.forEach((x)=>{
            //circle size with his svg tag (parent element)
           const circleSize=x.parentElement.getBoundingClientRect(); 
           const outArea=x.parentElement.parentElement.getBoundingClientRect(); 
           this.circles[x.getAttribute('value')]=new Circle(x,circleSize,outArea);
        });
    }
    /**
     * return a circle 
     * @param {x1,x2...x9} index circle index 
     * @returns 
     */
    getCircle(index){
        return     this.circles[index] ?? null;
    } 
    /** Turn All Active circles into inactive status and style  
      *  @return void
    */
    turnCirclesOff(){ 
        Object.entries(this.circles).map(x=>{
            x[1].status ===true
              && (
                x[1].element.classList.replace("circle-active",'cirlce'),
                x[1].status=false);
        });
    }
}

export default CircleList;