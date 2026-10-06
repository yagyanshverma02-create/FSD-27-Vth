function sum(a,b){
    return a + b;
}
function sumwithmsg(clbk,msg){
const result=clbk(20,30);
const finalresult="Hi"+ " " + msg + " " + "your score is" + " " + result;
console.log(finalresult);
}
sumwithmsg(sum,"mr rupak");
