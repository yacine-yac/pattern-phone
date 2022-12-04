import Calcule from "./main/calcule.js";
import CircleList from "./main/circles.js";
import {Line,LineList} from "./main/line.js";
/**
 * events : 
 *     mousedown:The event occurs when the user presses a mouse button over an element
 *     mousemovel:The event occurs when the mouse start moving
 *     mouseup: The event occurs when a user releases a mouse button over an element
 */


const cd121=document.getElementById('cd121'),
circlesElement=document.querySelectorAll('svg circle'); 
const circles=new CircleList(circlesElement); 
const lines=new LineList(); 


/**
 * occurs when the mouse stop moving  
 */
function stop(){ 
      if(circles.globalStatus){   
          document.removeEventListener("mousemove",move); 
          setTimeout(()=>{
                    circles.turnCirclesOff();  
                    circles.globalStatus=false;
                    lines.clear();
                    document.removeEventListener('mousedown',stop); 
          },400);  
      } 
} 

/**
 * declenched when the mouse start moving
 * @param {MouseEvent} t event parameter 
 * @return void
 */
function move(t){ 
  const currentvalue =t.target.getAttribute('value');
  if(t.target.nodeName==="circle" && circles.circles[currentvalue].status===false){ 
          circles.turnCircleActive(currentvalue);   
          let p1=[circles.currentCircle["x"],circles.currentCircle["y"]];
          let p2=[circles.precendentCircle['x'],circles.precendentCircle["y"]];
          lines.current.calculPosition(circles.precendentCircle)
                       .setLinePosition(new Calcule(p1,p2));  
          lines.add(new Line(currentvalue)); 
          lines.current.create(); 
  }else{ 
        let p1=[t.clientX,t.clientY];   
        let p2=[circles.currentCircle["x"]+cd121.getBoundingClientRect().left,
        circles.currentCircle['y']+cd121.getBoundingClientRect().top]; 
         lines.current.calculPosition(circles.currentCircle)
                      .setLinePosition(new Calcule(p1,p2));
  }
}


function start(){  
  const currentalue=this.getAttribute('value'); 
    circles.globalStatus=true;
    circles.turnCircleActive(currentalue); 
    lines.add(new Line(currentalue)); 
    lines.current.create();
    document.addEventListener('mousemove',move); 
    document.addEventListener('mouseup',stop); 
}

    
for(let x=0;x<circlesElement.length;x++){  
   circlesElement[x].addEventListener('mousedown',start);   
}
 