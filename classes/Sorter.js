
import sleep from './Util.js'
import {SortList} from './Util.js'

export class Sorter{

    setArray = (array) =>{
        this.array = array;
    }

    render = (a,b,c) => {} 

    bubbleSort = async () => {
        try {
            for (let i = 0; i < this.array.length; i++) {

                for(let j = 0; j < this.array.length-i; j++){
                    if( this.array[i] && this.array[j+1] && this.array[j].value > this.array[j+1].value){
                        const aux = this.array[j];
                        this.array[j] = this.array[j+1];
                        this.array[j+1] = aux;
                    }
                    await sleep(10);
                    this.render(this.array, [i], [j+1]);
                }
            }
        } catch (error) {
            console.log("oi");
            return;
        }
        this.render(this.array);
    } 

    insertionSort = async () => {
        try {
            for (let i = 0; i < this.array.length; i++) {
                const key = this.array[i]; 
                let j = i - 1; 
    
                while (j >= 0 && this.array[j].value > key.value) { 
                    this.array[j + 1] = this.array[j]; 
                    j = j - 1; 
                    await sleep(10);
                    this.render(this.array, i, j);
                }
                this.array[j + 1] = key; 
            }
        } catch (error) {
            return;
        }
        this.render(this.array);
    }

    quickSort = async () => {
        try {
            const quick = async (array, lo, hi) => {
                if(lo < hi){
                    let p = await particiona(array, lo, hi)
                    quick(array, lo, p - 1)
                    quick(array, p + 1, hi)
                }
            }
            const particiona = async (array, lo, hi) => {
                let pivot = array[hi];
                let i = lo;
                for (let j = lo; j <= hi; j++) {
                    if(array[j].value < pivot.value){
                        const aux = this.array[i];
                        this.array[i] = this.array[j];
                        this.array[j] = aux;
                        i++;
                    }
                    await sleep(10);
                    this.render(this.array, i, j);
                }
                
                const aux = this.array[i];
                this.array[i] = this.array[hi];
                this.array[hi] = aux;
                await sleep(10);
                this.render(this.array, i, hi);
                return i
            }
            await quick(this.array, 0, this.array.length-1);
        } catch (error) {
            return;
        }
        this.render(this.array);
    }
}

export default class SorterController extends Sorter{
    constructor(div, sort, array){
        super();
        this.element = div;
        switch(sort){
            case SortList.bubble:
                this.typeInExec = "Bubble Sort";
                this.sort = this.bubbleSort;
                break;
            case SortList.insertion:
                this.typeInExec = "Insertion Sort";
                this.sort = this.insertionSort;
                break;
            case SortList.quick:
                this.typeInExec = "Quick Sort";
                this.sort = this.quickSort;
                break;
        }
        this.array = array;
        this.initialRender();
    }

    cancel = () => {
        this.array = null;
    }

    initialRender = async () => {
        const h = this.element.height();
        const w = this.element.width();
        const colSize = 100*(w/this.array.length);
        const unitHSize = h/Math.max(...(this.array.map((a)=>a.value)));
        this.element.append(`<h4 class="" style="color:white;position: absolute;">${this.typeInExec}</h4>`);
        // console.log({h,w,colSize,unitHSize});
        this.array.map((item,i) => {
            this.element.append(`<div val="${item.id}" class="bar-item bg-primary" style="order:${i}; height: ${unitHSize*item.value}px;width: ${colSize}%;"></div>`);
        });
    } 

    render = async (lista, componenteAtual = -1, comparedElement = -1) => {
        // console.log(lista);
        // const h = this.element.height();
        // const w = this.element.width();
        // const colSize = 100*(w/lista.length);
        // const unitHSize = h/Math.max(...lista);

        // // this.element.empty();
        // // this.element.append(`<h4 class="" style="color:white;position: absolute;">${this.typeInExec}</h4>`);
        // // $("#bar-item").map((i,item)=>{
        // //     $()
        // // });
        // console.log(this.typeInExec, lista);
        
        lista.map((item,i) => {
            this.element.children(`.bar-item[val=${item.id}]`).css({"order": i});
        //     // this.element.append(`<div order="" class="${componenteAtual==i?"bg-danger": comparedElement == i?"bg-success" :"bg-primary"}" style="height: ${unitHSize*item}px;width: ${colSize}%;"></div>`);
        });

    }
    
}