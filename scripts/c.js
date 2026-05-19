function r(l){const c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";let s="";for(let i=0;i<l;i++)s+=c[Math.floor(Math.random()*c.length)];return s}
function rc(n){for(const c of n.childNodes)c.nodeType===8?c.nodeValue=r(c.nodeValue.length):c.nodeType===1&&rc(c)}
document.addEventListener("DOMContentLoaded",()=>rc(document));
