(()=>{
const M="January February March April May June July August September October November December".split(" "),
W="Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" ");
function f(t,d,x,y,h=d.getHours()){
return t.replace(/h|m|s|D|M|Y|W|A/g,a=>
a=="h"?String(y==12?h%12||12:h).padStart(2,"0"):
a=="m"?String(d.getMinutes()).padStart(2,"0"):
a=="s"?String(d.getSeconds()).padStart(2,"0"):
a=="D"?String(d.getDate()).padStart(2,"0"):
a=="M"?x?M[d.getMonth()]:String(d.getMonth()+1).padStart(2,"0"):
a=="Y"?d.getFullYear():
a=="A"?h<12?"AM":"PM":
x?W[d.getDay()]:d.getDay()
);
}
function u(){
document.querySelectorAll("[clock-time],[clock-date]").forEach(e=>{
let d=new Date,
z=e.getAttribute("clock-zone"),
y=e.getAttribute("clock-type")||24;
z!=null&&!isNaN(z)&&(
d=new Date(d.getTime()+(+z+d.getTimezoneOffset()/60)*36e5)
);
y!=12&&y!=24&&(
console.error("Invalid clock type:",y),
y=24
);
e.textContent=f(
e.getAttribute("clock-time")||e.getAttribute("clock-date"),
d,
e.hasAttribute("clock-date"),
y
);
});
}
u();
setInterval(u,1e3);
})();
