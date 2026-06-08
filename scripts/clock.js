(()=>{
const m=["January","February","March","April","May","June","July","August","September","October","November","December"];
function u(){
let d=new Date;
document.querySelectorAll("[data-clock],[data-date]").forEach(e=>{
let f=e.dataset.clock||e.dataset.date;
e.textContent=f
.replace(/h/g,String(d.getHours()).padStart(2,"0"))
.replace(/m/g,String(d.getMinutes()).padStart(2,"0"))
.replace(/s/g,String(d.getSeconds()).padStart(2,"0"))
.replace(/D/g,String(d.getDate()).padStart(2,"0"))
.replace(/M/g,e.dataset.date?m[d.getMonth()]:String(d.getMonth()+1).padStart(2,"0"))
.replace(/Y/g,d.getFullYear());
});
}
u();
setInterval(u,100);
})();
