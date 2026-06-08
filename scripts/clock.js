!function(){
function u(){
let d=new Date;
document.querySelectorAll("[data-clock]").forEach(e=>{
e.textContent=e.dataset.clock
.replace(/h/g,String(d.getHours()).padStart(2,"0"))
.replace(/m/g,String(d.getMinutes()).padStart(2,"0"))
.replace(/s/g,String(d.getSeconds()).padStart(2,"0"))
.replace(/D/g,String(d.getDate()).padStart(2,"0"))
.replace(/M/g,String(d.getMonth()+1).padStart(2,"0"))
.replace(/Y/g,d.getFullYear())
})
}
u();
setInterval(u,1e3)
}();
