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
// let response_msg=document.getElementById('response_msg'); N
var tag_hr;
let shema=[];

const circlesCenter=new CircleList(circlesElement).circles;  
const lines=new LineList();
console.log(lines);
// const type_sch=cd121.getAttribute('data-value');
const box=document.getElementById('box');


 
/**
 *  Handle the active circle 
 * @param {*} circle The circle which will be active 
 * @returns void 
 */
function turnCircleActive(circle){  
  circle.classList.add("circle-active"); 
}
/** Turn All circles inactive using circles elements
 *  @return void
 */
function clearCircle(){
  Array.from(circlesElement,x=>{ 
    x.classList.replace("circle-active",'cirlce');
  });
}


/**
 * calcule the current Mouse position on the circle 
 * @param {string} selector the current circle tag selector
 * @returns {top,left} it returns the position left and top
 */
// function calculPosition(selector){  
//   const element=document.querySelector(selector);
//   const top=element.parentElement.getBoundingClientRect().height/2+element.parentElement.getBoundingClientRect().top;
//   const left=(element.parentElement.getBoundingClientRect().width/2+element.parentElement.getBoundingClientRect().left);
//   return {top,left}
// }


/**
 * take a suitable position for the line 
 * @param {HTMLElement} position  it's the position of line {left,top}
 * @param {number} angle   Direction of the ligne following the mouse 
 * @param {number} height  The height of the line 
 * @param {string} seg id of the line  
 * @return void 
 */
// function linePosition(position,angle=0,height=0,seg){ 
//   const {top,left}=position;
//   Object.assign(document.getElementById(seg).style,{
//         transform:`rotate(${angle}deg)`,
//         width:`${height-5}px`,
//         top:`${top}px`,
//         left:`${left}px`
//   }); 
// }
// function get_intersection(x,y){ 
//   if(shema.length>0){
//     a= (circlesCenter[shema[shema.length-1]][1]-y)/(circlesCenter[shema[shema.length-1]][0]-1);
//     b= (circlesCenter[shema[shema.length-1]][1]-y);
//   }
// }
/**
 * occurs when the mouse stop moving 
 * @param {*} event event parameter 
 */
function stop(event){ 
      if(shema.length>0){   
          document.removeEventListener("mousemove",move);
            // document.removeEventListener("touchmove");
          if(event.target.nodeName!=="circle" && tag_hr.length>0){ 
                  tag_hr[0].remove();
          }
          setTimeout(()=>{
                    clearCircle(); 
                    Array.from(tag_hr).forEach((x)=>{x.remove()});
                    shema=[];
                    lines.clear();
                    document.removeEventListener('mousedown',stop);
                    // document.removeEventListener('touchstart',(event)=>stop(event.target.nodeName)); 
          },400);  
      } 
}
/**
 * create Line with id in the div #cd121
 * @param {string} id is the id of the line which is can be (x1,x2...x9)
 */
// function lineCreate(id){
//   let hr=`<hr id="${id}">`;  
//   cd121.insertAdjacentHTML("afterbegin",hr);
// }
 
// let how_function={
  // "w_line":function move_circule(t){
  //    if(t.target.nodeName==="circle"){ 
     
  //       if(shema.includes(t.target.getAttribute('value'))===false){ 
  //               shema.push(t.target.getAttribute('value'));
  //               turnCircleActive( t.target );//,true
  //               lineCreate(t.target.getAttribute('value'));
  //               document.documentElement.style.setProperty('--width',t.offsetX+"px");
  //       } 
  //   }
  // },
//   'line':function move_hr(t){  
//     if(t.target.nodeName==="circle"){ 
//       if(shema.includes(t.target.getAttribute('value'))===false){
//          shema.push(t.target.getAttribute('value'));
//          linePosition(calculPosition(...Array.from(circles).filter(f=>
//           f.getAttribute('value')==shema[shema.length-2])   )
//                           ,...defineAngle(...circlesCenter[t.target.getAttribute('value')]
//                           ,...circlesCenter[shema[shema.length-2]])
//                           ,tag_hr[0].id); //tag_hr[0].className
//          turnCircleActive(t.target);
//          lineCreate(t.target.getAttribute('value'));
//       } 
//     }else{  
//         linePosition(calculPosition(...Array.from(circles).filter(f=>
//         f.getAttribute('value')==shema[shema.length-1])),
//         ...defineAngle(t.clientY,t.clientX,circlesCenter[shema[shema.length-1]][0]+cd121.getBoundingClientRect().top,circlesCenter[shema[shema.length-1]][1]+cd121.getBoundingClientRect().left),
//         tag_hr[0].id);
//     }
//   }
// }; 
/**
 * declenched when the mouse start moving
 * @param {MouseEvent} t event parameter 
 * @return void
 */
function move(t){
  const calcule=new Calcule();  
  if(t.target.nodeName==="circle"){
         
        if(shema.includes(t.target.getAttribute('value'))===false){ 
          shema.push(t.target.getAttribute('value')); 
          //tempororay
          let p1=[ 
             circlesCenter[t.target.getAttribute('value')]['x'],
              circlesCenter[t.target.getAttribute('value')]['y']
           ];
          let p2=[circlesCenter[shema[shema.length-2]]["x"],
           circlesCenter[shema[shema.length-2]]["y"]
                   
           ]; 
          lines.current
               .calculPosition(`circle[value=${shema[shema.length-2]}]`)
               .linePosition( calcule.defineAngle(p1,p2),  
                              calcule.defineDistance(p1,p2),    
                              tag_hr[0].id
                            );  
          turnCircleActive(t.target); 
          lines.add(new Line(t.target.getAttribute('value'))); 
        } 
  }else{ 
        let p1=[t.clientX,t.clientY];
        let p2=[
           circlesCenter[shema[shema.length-1]]["x"]+cd121.getBoundingClientRect().left,
           circlesCenter[shema[shema.length-1]]["y"]+cd121.getBoundingClientRect().top
        ]; 
         lines.current
               .calculPosition(`circle[value=${shema[shema.length-1]}]`)
               .linePosition(
                  calcule.defineAngle(p1,p2),
                  calcule.defineDistance(p1,p2),
                  tag_hr[0].id
                );
  }
}


function start(e){ 
    shema.push(this.getAttribute('value')); 
    tag_hr=document.getElementsByTagName('hr'); 
    turnCircleActive(this);  
    lines.add(new Line(this.getAttribute('value'))); 
    lines.current.create();
    document.addEventListener('mousemove',move);//how_function[type_sch]
    document.addEventListener('mouseup',stop);


   // document.addEventListener('touchmove',how_function[type_sch]);



  //  document.addEventListener('touchmove',function(e){
   
  //  let t=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
 
   
  //   if(t.nodeName==="circle"){ 
  //      // response_msg.textContent=  c+'cccmalki'+ t;
  //     if(shema.includes(t.getAttribute('value'))===false){
        
  //        shema.push(t.getAttribute('value'));
  //        linePosition(...Array.from(circles).filter(f=>f.getAttribute('value')==shema[shema.length-2]),...defineAngle(...circlesCenter[t.getAttribute('value')],...circlesCenter[shema[shema.length-2]]),tag_hr[0].className);
  //        turnCircleActive( t); // ,trueconsole.log('rrr',t.getAttribute('value'));
  //        lineCreate(t.getAttribute('value'));
  //     }else{ c++;
  //      // response_msg.textContent= c+t.target.nodeName;
  //     }
  //   }else{  
  //      linePosition(...Array.from(circles).filter(f=>f.getAttribute('value')==shema[shema.length-1]),...defineAngle(t.clientY,t.clientX,circlesCenter[shema[shema.length-1]][0]+cd121.getBoundingClientRect().top,circlesCenter[shema[shema.length-1]][1]+cd121.getBoundingClientRect().left),tag_hr[0].className);
  //   }
  
  //   });


  //  document.addEventListener('touchend',before_stop);
}

    
for(let x=0;x<circlesElement.length;x++){  
   circlesElement[x].addEventListener('mousedown',start);
  //  circles[x].addEventListener('touchstart',start);   
}

// var cd0=document.getElementsByClassName('cd0');
// var cd00=document.getElementsByClassName('cd00'); 
 