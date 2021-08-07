const cd121=document.getElementById('cd121'),
svg_cirlces=document.querySelectorAll('svg circle');
let response_msg=document.getElementById('response_msg');
var tag_hr;
var state=false;
let shema=[],premession_cookie=false;
let center_circle={}; 
let cookie_array=document.cookie.split('=');
const type_sch=cd121.getAttribute('data-value');

let mine_shema={};
(function get_center(){
  svg_cirlces.forEach((x)=>{
       bondi_position=x.parentElement.getBoundingClientRect();
       center_circle[x.getAttribute('value')]=[
       bondi_position.height/2+bondi_position.top-x.parentElement.parentElement.getBoundingClientRect().top ,
       bondi_position.width/2+bondi_position.left-x.parentElement.parentElement.getBoundingClientRect().left
       ];
  });
})(); 
let css={
  true:["white","10px","rgb(251, 76, 7)"],
  false:["aliceblue",'2px',"rgb(49, 71, 78)"]
}
function circle_css(css_variavle,choice){  
  css_variavle.forEach((x)=>{
            x.style.stroke=css[choice][0];
            x.style.strokeWidth=css[choice][1];
            x.style.fill=css[choice][2];
            x.style.transition="0.3s ease";
  }); 
 // console.log(arguments);
  if(choice===true){ hr_creation(css_variavle[0].getAttribute('value'));}
 
}
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
function manipulation_css(element,angle=0,hr_length=0,seg){
  document.getElementsByClassName(seg)[0].style.transform=`rotate(${Math.round(angle)}deg)`;
  document.getElementsByClassName(seg)[0].style.width=`${hr_length-5}px`;
  document.getElementsByClassName(seg)[0].style.top=element.parentElement.getBoundingClientRect().height/2+element.parentElement.getBoundingClientRect().top-element.parentElement.parentElement.getBoundingClientRect().top+"px";
  document.getElementsByClassName(seg)[0].style.left=(element.parentElement.getBoundingClientRect().width/2+element.parentElement.getBoundingClientRect().left-element.parentElement.parentElement.getBoundingClientRect().left)+"px";
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
 if(last_hr!=="circle" && tag_hr.length>0){ 
        tag_hr[0].remove();
  }
   setTimeout(()=>{ 
           circle_css(Array.from(svg_cirlces).filter(x=>shema.includes(x.getAttribute('value'))),false);
           Array.from(tag_hr).forEach((x)=>{x.remove()});
           shema=[];
          document.removeEventListener('mousedown',before_stop);

  },400);  
} 
}
function hr_creation(seg){
  let hr=`<hr class="${seg}">`;  
  cd121.insertAdjacentHTML("afterbegin",hr);
}
let how_function={
  "w_line":function move_circule(t){
     if(t.target.nodeName==="circle"){ 
     
        if(shema.includes(t.target.getAttribute('value'))===false){ 
                shema.push(t.target.getAttribute('value'));
                circle_css([t.target],true);
                document.documentElement.style.setProperty('--width',t.offsetX+"px");
        } 
    }
  },
  'line':function move_hr(t){
    if(t.target.nodeName==="circle"){
      if(shema.includes(t.target.getAttribute('value'))===false){  
         shema.push(t.target.getAttribute('value'));
         manipulation_css(...Array.from(svg_cirlces).filter(f=>f.getAttribute('value')==shema[shema.length-2]),...geo(...center_circle[t.target.getAttribute('value')],...center_circle[shema[shema.length-2]]),tag_hr[0].className);
         circle_css([t.target],true); 
      }
    }else{  
       manipulation_css(...Array.from(svg_cirlces).filter(f=>f.getAttribute('value')==shema[shema.length-1]),...geo(t.clientY,t.clientX,center_circle[shema[shema.length-1]][0]+cd121.getBoundingClientRect().top,center_circle[shema[shema.length-1]][1]+cd121.getBoundingClientRect().left),tag_hr[0].className);
    }
  }
};
function before_stop(event){stop_function(event.target.nodeName);}
for(x=0;x<svg_cirlces.length;x++){  
   svg_cirlces[x].addEventListener('mousedown',function(e){
      
    shema.push(this.getAttribute('value')); 
    tag_hr=document.getElementsByTagName('hr');
    circle_css([this],true);
    document.addEventListener('mousemove',how_function[type_sch]);
    document.addEventListener('mouseup',before_stop);
   });   
}
var cd0=document.getElementsByClassName('cd0');
var cd00=document.getElementsByClassName('cd00');
 