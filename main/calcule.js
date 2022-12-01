/**
 * handle calcule operations of Angle and distance between two pointes 
 */
class Calcule{
  constructor(point1,point2){
     this.point1=point1;
     this.point1=point2;
  }
 /**
 * Determine the distance between origin point and mouse coordinates
 * @param {[number,number]} start  orgine point (on circle) (y1,x1)
 * @param {[number,number]} end    mouse coordinates        (y2,y1); 
 * @returns {number}  distance which is the line Height
 */ 
    defineDistance(start,end){
        const [x1,y1]=start;
        const [x2,y2]=end;
        const xLength=x1-x2;
        const yLength=y1-y2; 
        return Math.sqrt(xLength**2+yLength**2); 
    }

    /**
 * Determine the angle between line vector in the init state and the vector moved by mouse
 * @param {[number,number]} start  orgine point (on circle) (y1,x1)
 * @param {[number,number]} end    mouse coordinates        (y2,y1); 
 * @returns {number} the Angle for Line
 */
    defineAngle(start,end){
        const [y1,x1]=start;
        const [y2,x2]=end;
        const xLength=x1-x2;
        const yLength=y1-y2; 
    
        if(xLength>0 && yLength>0){
            angle=Math.atan(yLength/xLength)*180/Math.PI;
        }else if(xLength<0 && yLength==0){
            angle=180;
        }else if(xLength>0 && yLength==0){
            angle=0;
        }else if(xLength===0 && yLength==0){
            angle=0;  
        }else if(xLength===0 && yLength<0){
            angle=-90;
        }else if(xLength===0 && yLength>0){
            angle=90; 
        }else if(xLength>0 && yLength<0){
            angle=(Math.atan(yLength/xLength)*180/Math.PI);
        }else if(xLength<0 && yLength>0){
            angle=180+Math.atan(yLength/xLength)*180/Math.PI;
        }else if(xLength<0 && yLength<0){
            angle=180+Math.atan(yLength/xLength)*180/Math.PI;
        }   
        return angle;
    }


}

export default Calcule;