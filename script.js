/* =========================================================
   TEMPLATE ADVOCACIA — ESCRITÓRIO — JavaScript
   ========================================================= */

/* ---- CONFIGURAÇÃO POR CLIENTE ---- */
const CONFIG = {
  whatsapp: "5511900000000",            // DDI + DDD + número (só dígitos)
  mensagem: "Olá! Gostaria de falar com um advogado.",
  tempoCarrossel: 6000
};
const wpp = (txt) => `https://api.whatsapp.com/send?phone=${CONFIG.whatsapp}&text=${encodeURIComponent(txt)}`;

/* Links de WhatsApp */
document.querySelectorAll("[data-wpp]").forEach(el => { el.href = wpp(CONFIG.mensagem); el.target = "_blank"; el.rel = "noopener"; });

/* Menu mobile */
const burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", () => { burger.classList.toggle("open"); menu.classList.toggle("open"); });
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { burger.classList.remove("open"); menu.classList.remove("open"); }));

/* Sombra no header ao rolar */
const header = document.getElementById("header");
addEventListener("scroll", () => header.classList.toggle("scrolled", scrollY > 30), { passive: true });

/* Animação de entrada ao rolar */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); } }), { threshold: .15 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

/* Contadores animados dos indicadores (data-count) */
const co = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target, end = +el.dataset.count, step = Math.max(1, end / 60); let n = 0;
  const t = setInterval(() => { n = Math.min(end, n + step); el.textContent = Math.floor(n); if (n >= end) clearInterval(t); }, 25);
  co.unobserve(el);
}));
document.querySelectorAll("[data-count]").forEach(el => co.observe(el));

/* Abas Missão / Visão / Valores */
document.querySelectorAll(".tabs__nav button").forEach(btn => btn.addEventListener("click", () => {
  document.querySelectorAll(".tabs__nav button, .tab-panel").forEach(x => x.classList.remove("active"));
  btn.classList.add("active"); document.getElementById(btn.dataset.tab).classList.add("active");
}));

/* Carrossel de depoimentos */
const slides = document.querySelectorAll(".slide"), dots = document.getElementById("dots"); let atual = 0, timer;
slides.forEach((_, i) => { const b = document.createElement("button"); b.setAttribute("aria-label", "Depoimento " + (i + 1)); b.onclick = () => { ir(i); reiniciar(); }; dots.appendChild(b); });
function ir(i) { atual = i; slides.forEach((s, k) => s.classList.toggle("active", k === i)); dots.querySelectorAll("button").forEach((b, k) => b.classList.toggle("active", k === i)); }
function reiniciar() { clearInterval(timer); timer = setInterval(() => ir((atual + 1) % slides.length), CONFIG.tempoCarrossel); }
ir(0); reiniciar();

/* Formulário: monta a mensagem e abre o WhatsApp
   (para enviar por e-mail, troque por um serviço como Formspree) */
document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  window.open(wpp(`Olá! Meu nome é ${f.get("nome")} (${f.get("email")}).\n${f.get("msg")}`), "_blank", "noopener");
  e.target.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
