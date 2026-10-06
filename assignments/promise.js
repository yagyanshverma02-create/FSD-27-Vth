 function f1(){
    return new promise((resolve,reject))
    setTimeout(()=>{
        console.log("Hi");
    },2000)
}
function f2(){
    return new promise((resolve,reject))
    setTimeout(()=>{
        console.log("ABES");
        resolve();
    },4000)

}
f1.then(f2)
  .catch(err){
        console.log("ERROR",err);
    }