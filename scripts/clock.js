(() => {
const m=["January","February","March","April","May","June","July","August","September","October","November","December"];
const w=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
function f(t,d,txt){
return t.replace(/h|m|s|D|M|Y|W/g,x=>{
if(x==="h")return String(d.getHours()).padStart(2,"0");
if(x==="m")return String(d.getMinutes()).padStart(2,"0");
if(x==="s")return String(d.getSeconds()).padStart(2,"0");
if(x==="D")return String(d.getDate()).padStart(2,"0");
if(x==="M")return txt?m[d.getMonth()]:String(d.getMonth()+1).padStart(2,"0");
if(x==="Y")return d.getFullYear();
return txt?w[d.getDay()]:d.getDay();
});
}
function u(){
let d=new Date;
document.querySelectorAll("[clock-time],[clock-date]").forEach(e=>{
e.textContent=f(e.dataset.time||e.dataset.date,d,e.dataset.date);
});
}
u();
setInterval(u,100);
})();
