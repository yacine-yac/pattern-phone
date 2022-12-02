class Line{ 

    constructor(id){
        this.id=id;
    }
    /**
     * Create line by hr tag
     * @param {*} id 
     */
   
    create(){ 
        let hr=`<hr id="${this.id}">`;  
        cd121.insertAdjacentHTML("afterbegin",hr);
    }
   /**
    * Define the emplacement of the the line (position,angle,height)
    * @param {*} position 
    * @param {*} angle 
    * @param {*} height 
    * @param {*} seg 
    */
    linePosition(position,angle=0,height=0,seg){ 
        const {top,left}=position;
        Object.assign(document.getElementById(seg).style,{
              transform:`rotate(${angle}deg)`,
              width:`${height-5}px`,
              top:`${top}px`,
              left:`${left}px`
        }); 
    }
    /**
     * get the start position of the line created
     * @param {*} selector 
     * @returns 
    */
    calculPosition(selector){  
        const element=document.querySelector(selector);
        const top=element.parentElement.getBoundingClientRect().height/2+element.parentElement.getBoundingClientRect().top;
        const left=(element.parentElement.getBoundingClientRect().width/2+element.parentElement.getBoundingClientRect().left);
        return {top,left}
    }
    // static call(){
    //     return   Line.obj ==null ? new Line() : Line.obj;
    // }  
}
// console.log(Line.call());

class LineList{
    constructor(){
       this.Lines=[];
       this.current=null;
       this.length=0; 
    }
    add(line){
         this.Lines.push(line);
         this.current=line;
         this.length++;
    }
    getCurrentLine(){
        return this.current;
    }
}

export  {Line,LineList};