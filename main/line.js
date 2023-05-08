/**
 * How the line it will be draw 
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
        let hr=`<hr id=${this.id} >`;  
        cd121.insertAdjacentHTML("afterbegin",hr);
    }
   /**
    * Define the emplacement of the the line (position,angle,height)
    * @param {Calcule} calcule object handle hande the angle and height value
    */
    setLinePosition(calcule){  
        const angle= calcule.defineAngle();
        const height=calcule.defineDistance();  
        Object.assign(document.getElementById(this.id).style,{
              transform:`rotate(${angle}deg)`,
              width:`${height-5}px`,
              top:`${this.topPosition}px`,
              left:`${this.leftPosition}px`
        }); 
    }
    /**
     * get the start position of the line created
     * @param {Circle} circle provide circle tag   
     * @returns {Line} 
    */
    calculPosition(circle){ 
        this.topPosition=circle.element.parentElement.getBoundingClientRect().height/2+circle.element.parentElement.getBoundingClientRect().top;
        this.leftPosition=(circle.element.parentElement.getBoundingClientRect().width/2+circle.element.parentElement.getBoundingClientRect().left);
          return this;
    }
    /**
     * Remove the current circle from DOM 
     */ 
    remove(){
        document.getElementById(this.id).remove();
    }
} 
/**
 * 
 * @property {Circle | null} current the current circle which mouse pass on it 
 */
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
    /**
     * It turns the object in his initial state
     */
    clear(){ 
       this.Lines.forEach(x=>x.remove());
       this.Lines=[];
       this.current=null;
       this.length=0;
    } 
}

export  {Line,LineList};