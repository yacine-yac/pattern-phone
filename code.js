const cd121=document.getElementById('cd121'),
svg_cirlces=document.querySelectorAll('svg circle');
// let response_msg=document.getElementById('response_msg'); N
var tag_hr;
var state=false;
let shema=[],premession_cookie=false;
let center_circle={}; 
let cookie_array=document.cookie.split('=');
const type_sch=cd121.getAttribute('data-value');

// let mine_shema={}; N
const box=document.getElementById('box');
/** determined the center of each circle */ 
(function(){
  svg_cirlces.forEach((x,y)=>{
       bondi_position=x.parentElement.getBoundingClientRect();
      // console.log("circle"+y,bondi_position.top,"====================",bondi_position.left);
      center_circle[x.getAttribute('value')]=[
          bondi_position.height/2+bondi_position.top-x.parentElement.parentElement.getBoundingClientRect().top ,//-x.parentElement.parentElement.getBoundingClientRect().top-x.parentElement.parentElement.parentElement.getBoundingClientRect().top,   //bondi_position.top-document.getElementById('cd121').getBoundingClientRect(),//.top-x.parentElement.parentElement.getBoundingClientRect().top ,
          bondi_position.width/2+bondi_position.left-x.parentElement.parentElement.getBoundingClientRect().left //-x.parentElement.parentElement.getBoundingClientRect().left-x.parentElement.parentElement.parentElement.getBoundingClientRect().left //bondi_position.left-document.getElementById('cd121').getBoundingClientRect()//.left-x.parentElement.parentElement.getBoundingClientRect().left
      ];
  });
  // console.log(center_circle);
})(); 

 
/**
 *  Handle the active circle 
 * @param {*} circle The circle which will be active 
 * @returns void 
 */
function turnCircleActive(circle){  
  circle.classList.add("circle-active") ; 
}
/** Turn All circles inactive using svg_cirlces elements
 *  @return void
 */
function clearCircle(){
  Array.from(svg_cirlces,x=>{ 
    x.classList.replace("circle-active",'cirlce');
  });
}
/**
 * given the angle between point1 (y1,x1) and (y2,x2);
 * @param {*} y1 
 * @param {*} x1 
 * @param {*} y2 
 * @param {*} x2 
 * @returns 
 */
function geo(y1,x1,y2,x2){
  
   x_mouse=x1-x2;
   y_mouse=y1-y2; 
   if(x_mouse!==0){
     fraction=y_mouse/x_mouse;
   }else{

   }
  if(x_mouse>0 && y_mouse>0){
    angle=Math.atan(y_mouse/x_mouse)*180/Math.PI;
  }else if(x_mouse<0 && y_mouse==0){
    angle=180;
  }else if(x_mouse>0 && y_mouse==0){
    angle=0;
  }else if(x_mouse===0 && y_mouse==0){
     angle=0;  
  }else if(x_mouse===0 && y_mouse<0){
      angle=-90;
  }else if(x_mouse===0 && y_mouse>0){
    angle=90; 
  }else if(x_mouse>0 && y_mouse<0){
    angle=(Math.atan(y_mouse/x_mouse)*180/Math.PI);
  }else if(x_mouse<0 && y_mouse>0){
    angle=180+Math.atan(y_mouse/x_mouse)*180/Math.PI;
  }else if(x_mouse<0 && y_mouse<0){
    angle=180+Math.atan(y_mouse/x_mouse)*180/Math.PI;
  }  
  position_mouse=Math.sqrt(Math.pow(x_mouse,2)+Math.pow(y_mouse,2));
  return [angle,position_mouse];
}

/**
 * calcule the current Mouse position on the circle 
 * @param {*} element  represent the current circle 
 * @returns {top,left} it returns the position left and top
 */
function calculPosition(element){
  const top=element.parentElement.getBoundingClientRect().height/2+element.parentElement.getBoundingClientRect().top;
  const left=(element.parentElement.getBoundingClientRect().width/2+element.parentElement.getBoundingClientRect().left);
  return {top,left}
}


/**
 * take a suitable position for the line 
 * @param {HTMLElement} position  it's the position of line {left,top}
 * @param {number} angle   Direction of the ligne following the mouse 
 * @param {number} height  The height of the line 
 * @param {string} seg id of the line  
 * @return void 
 */
function linePosition(position,angle=0,height=0,seg){ 
  const {top,left}=position;
  Object.assign(document.getElementById(seg).style,{
        transform:`rotate(${angle}deg) `,
        width:`${height-5}px`,
        top:`${top}px`,
        left:`${left}px`
  }); 
}
function get_intersection(x,y){
  if(shema.length>0){
    a= (center_circle[shema[shema.length-1]][1]-y)/(center_circle[shema[shema.length-1]][0]-1);
    b= (center_circle[shema[shema.length-1]][1]-y);
  }
}

function stop_function(last_hr,f_remove=how_function[type_sch]){ 
if(shema.length>0){   
  document.removeEventListener("mousemove",f_remove);
  document.removeEventListener("touchmove",f_remove);
 if(last_hr!=="circle" && tag_hr.length>0){ 
        tag_hr[0].remove();
  }
   setTimeout(()=>{
          clearCircle(); 
          Array.from(tag_hr).forEach((x)=>{x.remove()});
          shema=[];
          document.removeEventListener('mousedown',before_stop);
          document.removeEventListener('touchstart',before_stop);

  },400);  
} 
}
/**
 * create Line with id in the div #cd121
 * @param {string} id is the id of the line which is can be (x1,x2...x9)
 */
function hr_creation(id){
  let hr=`<hr id="${id}">`;  
  cd121.insertAdjacentHTML("afterbegin",hr);
}
 
let how_function={
  "w_line":function move_circule(t){
     if(t.target.nodeName==="circle"){ 
     
        if(shema.includes(t.target.getAttribute('value'))===false){ 
                shema.push(t.target.getAttribute('value'));
                turnCircleActive( t.target );//,true
                hr_creation(t.target.getAttribute('value'));
                document.documentElement.style.setProperty('--width',t.offsetX+"px");
        } 
    }
  },
  'line':function move_hr(t){  
    if(t.target.nodeName==="circle"){ 
      if(shema.includes(t.target.getAttribute('value'))===false){
         shema.push(t.target.getAttribute('value'));
         linePosition(calculPosition(...Array.from(svg_cirlces).filter(f=>f.getAttribute('value')==shema[shema.length-2]))
                          ,...geo(...center_circle[t.target.getAttribute('value')]
                          ,...center_circle[shema[shema.length-2]])
                          ,tag_hr[0].id); //tag_hr[0].className
         turnCircleActive(t.target);
         hr_creation(t.target.getAttribute('value'));
      } 
    }else{  
        linePosition(calculPosition(...Array.from(svg_cirlces).filter(f=>
        f.getAttribute('value')==shema[shema.length-1])),
        ...geo(t.clientY,t.clientX,center_circle[shema[shema.length-1]][0]+cd121.getBoundingClientRect().top,center_circle[shema[shema.length-1]][1]+cd121.getBoundingClientRect().left),
        tag_hr[0].id);
    }
  }
};
function before_stop(event){ stop_function(event.target.nodeName);}
function start(e){ 
    shema.push(this.getAttribute('value')); 
    tag_hr=document.getElementsByTagName('hr'); 
    turnCircleActive(this); //,true
    hr_creation(this.getAttribute('value')); 
    document.addEventListener('mousemove',how_function[type_sch]);
    document.addEventListener('mouseup',before_stop);


   // document.addEventListener('touchmove',how_function[type_sch]);



  //  document.addEventListener('touchmove',function(e){
   
  //  let t=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);
 
   
  //   if(t.nodeName==="circle"){ 
  //      // response_msg.textContent=  c+'cccmalki'+ t;
  //     if(shema.includes(t.getAttribute('value'))===false){
        
  //        shema.push(t.getAttribute('value'));
  //        linePosition(...Array.from(svg_cirlces).filter(f=>f.getAttribute('value')==shema[shema.length-2]),...geo(...center_circle[t.getAttribute('value')],...center_circle[shema[shema.length-2]]),tag_hr[0].className);
  //        turnCircleActive( t); // ,trueconsole.log('rrr',t.getAttribute('value'));
  //        hr_creation(t.getAttribute('value'));
  //     }else{ c++;
  //      // response_msg.textContent= c+t.target.nodeName;
  //     }
  //   }else{  
  //      linePosition(...Array.from(svg_cirlces).filter(f=>f.getAttribute('value')==shema[shema.length-1]),...geo(t.clientY,t.clientX,center_circle[shema[shema.length-1]][0]+cd121.getBoundingClientRect().top,center_circle[shema[shema.length-1]][1]+cd121.getBoundingClientRect().left),tag_hr[0].className);
  //   }
  
  //   });


   document.addEventListener('touchend',before_stop);
}

    
for(x=0;x<svg_cirlces.length;x++){  
   svg_cirlces[x].addEventListener('mousedown',start);
  //  svg_cirlces[x].addEventListener('touchstart',start);   
}

// var cd0=document.getElementsByClassName('cd0');
// var cd00=document.getElementsByClassName('cd00'); 
 