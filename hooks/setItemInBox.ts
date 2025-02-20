
const setItemInBox = (array:any[],number:number) => {
    let newArry=[]
    const bigNumber=array.length/number % 2==0 ? array.length/number : Math.ceil(array.length/number)
    let count=0
    for (let i = 0; i < bigNumber; i++) {
        if(array[count]){
            count=count+number
            newArry.push({drop:array.slice(i*number,count)}) 
        }
        else{
            newArry.push({drop:array.slice(count-number,array?.length)})
        }
    }
    return newArry
}

export default setItemInBox