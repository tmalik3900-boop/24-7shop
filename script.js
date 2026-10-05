const WA="923337400125";
const products=[
 {id:1,name:"iPhone 13 Pro Max Display",cat:"Displays",price:81000,emoji:"📱"},
 {id:2,name:"iPhone 11 Battery",cat:"Batteries",price:6500,emoji:"🔋"},
 {id:3,name:"20W Fast Charger",cat:"Charging",price:2200,emoji:"⚡"},
 {id:4,name:"Type-C Fast Charging Cable",cat:"Accessories",price:950,emoji:"🔌"},
 {id:5,name:"iPhone 15 Pro Max Display",cat:"Displays",price:85000,emoji:"📱"},
 {id:6,name:"Universal Phone Speaker",cat:"Parts",price:700,emoji:"🔊"},
 {id:7,name:"USB-C Charging Port",cat:"Parts",price:450,emoji:"🔧"},
 {id:8,name:"Wireless Earbuds",cat:"Accessories",price:2800,emoji:"🎧"}
];
let cart=[],category="All";
function money(n){return "Rs. "+n.toLocaleString("en-PK")}
function render(){
 const q=(document.getElementById("search").value||"").toLowerCase();
 const list=products.filter(p=>(category==="All"||p.cat===category)&&p.name.toLowerCase().includes(q));
 document.getElementById("resultText").textContent=list.length+" products";
 document.getElementById("productsGrid").innerHTML=list.map(p=>`<article class="card"><div class="pic">${p.emoji}</div><div class="cardBody"><span class="tag">${p.cat}</span><h3>${p.name}</h3><div class="price">${money(p.price)}</div><button class="add" onclick="add(${p.id})">Add to Cart</button></div></article>`).join("")||"<p>No products found.</p>";
 document.getElementById("cartCount").textContent=cart.reduce((a,i)=>a+i.qty,0);
}
function add(id){let x=cart.find(i=>i.id===id);x?x.qty++:cart.push({id,qty:1});render();openCart()}
function openCart(){document.getElementById("overlay").classList.add("open");renderCart()}
function closeCart(e){if(!e||e.target.id==="overlay")document.getElementById("overlay").classList.remove("open")}
function renderCart(){
 const el=document.getElementById("cartItems");
 el.innerHTML=cart.length?cart.map(i=>{let p=products.find(x=>x.id===i.id);return `<div class="item"><div class="emoji">${p.emoji}</div><div class="itemMain"><b>${p.name}</b><div>${money(p.price)} × ${i.qty}</div><div class="qty"><button onclick="change(${i.id},-1)">−</button> ${i.qty} <button onclick="change(${i.id},1)">+</button></div></div></div>`}).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent=money(cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0));
}
function change(id,d){let x=cart.find(i=>i.id===id);if(!x)return;x.qty+=d;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);render();renderCart()}
function checkout(){
 if(!cart.length)return alert("Your cart is empty.");
 const lines=cart.map(i=>{let p=products.find(x=>x.id===i.id);return `${p.name} x${i.qty} - ${money(p.price*i.qty)}`}).join("\n");
 const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
 window.open(`https://wa.me/${WA}?text=${encodeURIComponent("Assalam-o-Alaikum, I want to order:\n"+lines+"\nTotal: "+money(total)+"\n\nPlease confirm availability and delivery.")}`,"_blank");
}
function setCategory(c){category=c;render()}
function filterProducts(){render();document.getElementById("products").scrollIntoView({behavior:"smooth"})}
document.getElementById("search").addEventListener("input",render);render();