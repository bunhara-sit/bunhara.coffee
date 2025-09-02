
// Bunhara static menu with Instagram ordering
const PRODUCTS = [
  { id: "spanish-latte", name: "سبانش لاتيه", cat: "coffee", sizes: [{label:"الصغير", price:0.500}, {label:"الكبير", price:0.700}] },
  { id: "saffron-latte", name: "زعفران لاتيه", cat: "coffee", sizes: [{label:"الصغير", price:0.600}, {label:"الكبير", price:0.800}] },
  { id: "rose-latte", name: "روز لاتيه", cat: "coffee", sizes: [{label:"الصغير", price:0.600}, {label:"الكبير", price:0.800}] },
  { id: "mojito", name: "الموهيتو", cat: "drink", sizes: [{label:"الصغير", price:0.600}, {label:"الكبير", price:0.800}] },
  { id: "kheshkhesh", name: "الخشخش", cat: "dessert", sizes: [{label:"حجم واحد", price:1.800}] },
  { id: "tiramisu", name: "التراميسو", cat: "dessert", sizes: [{label:"حجم واحد", price:2.300}] }
];

const grid = document.getElementById("grid");
const search = document.getElementById("searchInput");
const chips = document.querySelectorAll(".chip");
const note = document.getElementById("orderNote");
const igBtn = document.getElementById("igBtn");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function render(products){
  grid.innerHTML = "";
  products.forEach(p => {
    const card = document.createElement("article");
    card.className = "card";
    const title = document.createElement("div");
    title.className = "title";
    const h3 = document.createElement("h3");
    h3.textContent = p.name;
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = p.cat === "coffee" ? "قهوة" : p.cat === "drink" ? "مشروب" : "حلويات";
    title.append(h3, badge);

    const sizes = document.createElement("div");
    sizes.className = "size";
    p.sizes.forEach(s => {
      const span = document.createElement("span");
      span.innerHTML = `${s.label}: <b>${s.price.toFixed(3)} OMR</b>`;
      sizes.append(span);
    });

    const addBtn = document.createElement("button");
    addBtn.className = "ghost";
    addBtn.textContent = "إضافة للملاحظة";
    addBtn.addEventListener("click", () => {
      const line = `${p.name} — ${p.sizes.map(s=>`${s.label} ${s.price.toFixed(3)} OMR`).join(" / ")}`;
      note.value = (note.value ? note.value + "\\n" : "") + line;
      note.focus();
    });

    card.append(title, sizes, addBtn);
    grid.append(card);
  });
}

function filter(cat="all", q=""){
  q = q.trim();
  let list = PRODUCTS.filter(p => {
    const matchCat = (cat==="all") || p.cat===cat;
    const matchQ = !q || p.name.includes(q);
    return matchCat && matchQ;
  });
  render(list);
}

chips.forEach(ch => ch.addEventListener("click", () => {
  chips.forEach(c=>c.classList.remove("active"));
  ch.classList.add("active");
  filter(ch.dataset.cat, search.value);
}));

search.addEventListener("input", () => {
  const active = document.querySelector(".chip.active")?.dataset.cat || "all";
  filter(active, search.value);
});

// Initialize
filter();

// Instagram button—no phone number used
igBtn.addEventListener("click", () => {
  // nothing special needed; CTA opens instagram profile in new tab
});
