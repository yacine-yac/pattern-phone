/**
 * handle calcule operations of Angle and distance between two pointes 
 * @property {[number,number]} firstPoint point with (x,y)
 * @property {[number,number]} secondPoint point with (x,y)
 */
class Calcule{
  constructor(firstPoint,secondPoint){
     this.firstPoint=firstPoint;
     this.secondPoint=secondPoint;
  }
 /**
 * Determine the distance between origin point and mouse coordinates 
 * @returns {number}  distance which is the line Height
 */ 
    defineDistance(){
        const [x1,y1]=this.firstPoint;
        const [x2,y2]=this.secondPoint;
        const xLength=x1-x2;
        const yLength=y1-y2; 
        return Math.sqrt(xLength**2+yLength**2); 
    }

    /**
 * Determine the angle between line vector in the init state and the vector moved by mouse 
 * @returns {number} the Angle for Line
 */
    defineAngle(){
        const [x1,y1]=this.firstPoint;
        const [x2,y2]=this.secondPoint;
        const xLength=x1-x2;
        const yLength=y1-y2;  
        return (xLength< 0 || xLength<0 && yLength<0)
                    ?  180+Math.atan(yLength/xLength)*180/Math.PI
                    :  Math.atan(yLength/xLength)*180/Math.PI; 
    }


}

export default Calcule;