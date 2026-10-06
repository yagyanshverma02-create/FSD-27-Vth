function f1(){
    return new promise((resolve,reject))
    setTimeout(()=>{
        console.log("Hi");
        resolve();
    },2000)
}
function f2(){
    return new promise((resolve,reject))
    setTimeout(()=>{
        console.log("ABES");
        resolve();
    },4000)
}
async function test(){
    try{
        await.f1();
        await.f2();
    }
    catch (err){
        console.log("ERROR",err);
    }
}
test();