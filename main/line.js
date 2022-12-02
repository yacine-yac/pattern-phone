/**
 * How the line it will be dry 
 * @property {string} id it represent the id of line (unique)
 * @property {number} leftPosition the left position of the line
 * @property {number} rightPosition the right position of the line
 */

class Line{ 

    constructor(id){
        this.id=id;
        this.leftPosition=null;
        this.topPosition =null;
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
    linePosition(angle=0,height=0,seg){ 
        // const {top,left}=position;
        Object.assign(document.getElementById(seg).style,{
              transform:`rotate(${angle}deg)`,
              width:`${height-5}px`,
              top:`${this.topPosition}px`,
              left:`${this.leftPosition}px`
        }); 
    }
    /**
     * get the start position of the line created
     * @param {*} selector 
     * @returns 
    */
    calculPosition(selector){  
        const element=document.querySelector(selector);
        this.topPosition=element.parentElement.getBoundingClientRect().height/2+element.parentElement.getBoundingClientRect().top;
        this.leftPosition=(element.parentElement.getBoundingClientRect().width/2+element.parentElement.getBoundingClientRect().left);
        return this;
    } 
} 

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
    clear(){
       this.Lines=[];
       this.current=null;
       this.length=0;
    } 
}

export  {Line,LineList};