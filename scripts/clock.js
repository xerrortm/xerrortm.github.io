(()=>{
const m=["January","February","March","April","May","June","July","August","September","October","November","December"];
const w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function f(t,d,e){
return t.replace(/h|m|s|D|M|Y|Wn|W/g,x=>(
x==="h"?String(d.getHours()).padStart(2,"0"):
x==="m"?String(d.getMinutes()).padStart(2,"0"):
x==="s"?String(d.getSeconds()).padStart(2,"0"):
x==="D"?String(d.getDate()).padStart(2,"0"):
x==="M"?e?m[d.getMonth()]:String(d.getMonth()+1).padStart(2,"0"):
x==="Y"?d.getFullYear():
x==="Wn"?d.getDay():
w[d.getDay()]
));
}
function u(){
let d=new Date;
document.querySelectorAll("[data-clock],[data-date]").forEach(e=>{
e.textContent=f(
e.dataset.clock||e.dataset.date,
d,
e.dataset.date
);
});
}
u();
setInterval(u,1000);
})();
