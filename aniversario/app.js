/* ===== Ajustes generales ===== */
const START = new Date("2024-09-27T00:00:00");
const CREDS = { main: ["tita", "liendres"], cosas: ["mari", "cochina"] };
/* ============================= */
const $ = id => document.getElementById(id);
const norm = s => s.trim().toLowerCase();
const check = (k, u, p) => norm(u) === CREDS[k][0] && norm(p) === CREDS[k][1];
function guard(){ if (sessionStorage.getItem("ok") !== "1") location.replace("index.html"); }
function clock(){
  const t = () => {
    const s = Math.max(0, Math.floor((Date.now() - START) / 1000));
    $("cD").textContent = Math.floor(s / 86400).toLocaleString("es-MX");
    $("cH").textContent = Math.floor(s % 86400 / 3600);
    $("cM").textContent = Math.floor(s % 3600 / 60);
    $("cS").textContent = s % 60;
  };
  t(); setInterval(t, 1000);
}
const nn = i => String(i + 1).padStart(2, "0");
const ph = (base, i, alt) => `<div class="frame" data-file="images/${base}-${nn(i)}.jpg"><img src="images/${base}-${nn(i)}.jpg" alt="${alt}" onerror="this.remove()"></div>`;
function pols(el, list, base){
  el.innerHTML = list.map((c, i) => `<figure class="pol">${ph(base, i, c)}<figcaption>${c}</figcaption></figure>`).join("");
  zoom(el);
}
function frames(el, list, base){
  el.innerHTML = list.map((c, i) => `<figure class="fr"><div class="mat">${ph(base, i, c)}</div><figcaption>${c}</figcaption></figure>`).join("");
  zoom(el);
}
function zoom(root){
  const d = document.createElement("dialog");
  d.innerHTML = '<img alt=""><p></p>'; document.body.append(d);
  d.onclick = () => d.close();
  root.addEventListener("click", e => {
    const f = e.target.closest(".pol,.fr"), i = f && f.querySelector("img");
    if (!i) return;
    d.querySelector("img").src = i.src;
    d.querySelector("p").textContent = f.querySelector("figcaption").textContent;
    d.showModal();
  });
}
