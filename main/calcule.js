/**
 * handle calcule operations of Angle and distance between two pointes 
 */
class Calcule{
  constructor(firstPoint,secondPoint){
     this.firstPoint=firstPoint;
     this.secondPoint=secondPoint;
  }
 /**
 * Determine the distance between origin point and mouse coordinates
 * @param {[number,number]} start  orgine point (on circle) (y1,x1)
 * @param {[number,number]} end    mouse coordinates        (y2,y1); 
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
 * @param {[number,number]} this.firstPoint  orgine point (on circle) (y1,x1)
 * @param {[number,number]} this.secondPoint    mouse coordinates        (y2,y1); 
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