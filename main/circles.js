/**
 * define circle top and left position 
 *  @param circleSize represent the svg parent of circle size and position
 *  @param outArea   represent the the outdoor area of svg circle position
 */

class Circle{
    constructor(circleSize,outArea){ 
        this.x=null;
        this.y=null;
        this.calculateCenter(circleSize,outArea)
    }
    calculateCenter(circleSize,outArea){ 
        this.x=circleSize.width/2+ circleSize.left-outArea.left;
        this.y=circleSize.height/2+ circleSize.top-outArea.top;
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
        //    this.circles.push(new Circle(circleSize,outArea));
           this.circles[x.getAttribute('value')]=new Circle(circleSize,outArea);
        });
    }
    getCircle(index){
        return index===this.circles.length ?  this.circles[index] :null;
    }
    getAll(){
        return this.circles;
    }
}

export default CircleList;