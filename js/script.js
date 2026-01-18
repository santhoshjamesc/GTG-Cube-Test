const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const searchToggle = document.getElementById("searchToggle");
const searchBar = document.getElementById("searchBar");
function toggleSubmenu(btn) {
  if (window.innerWidth > 768) return;
  btn.parentElement.classList.toggle("open");
}
hamburger?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  hamburger.classList.toggle("active");
  if (!isOpen) {
    document.querySelectorAll(".nav-link").forEach((btn) => {
      btn.parentElement.classList.remove("open");
    });
  }
});
nav?.querySelectorAll("a:not(.nav-link)").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    hamburger.classList.remove("active");
    document.querySelectorAll(".nav-link").forEach((btn) => {
      btn.parentElement.classList.remove("open");
    });
  })
);
document.querySelectorAll(".nav-link").forEach((btn) => {
  btn.addEventListener("click", () => toggleSubmenu(btn));
});
searchToggle?.addEventListener("click", () =>
  searchBar.classList.toggle("active")
);
(() => {
  const main = document.getElementById("mainImage");
  const thumbs = [...document.querySelectorAll("#thumbContainer img")];
  const prev = document.getElementById("prevBtn");
  const next = document.getElementById("nextBtn");
  const dots = [...document.querySelectorAll(".dot")];
  let index = 0;
  const update = () => {
    index = (index + thumbs.length) % thumbs.length;
    main.classList.add("fade-out");
    setTimeout(() => {
      main.src = thumbs[index].src;
      dots.forEach((d) => d.classList.remove("active"));
      dots[Math.floor(index / 4)]?.classList.add("active");
      main.classList.remove("fade-out");
    }, 300);
  };
  prev?.addEventListener("click", () => (--index, update()));
  next?.addEventListener("click", () => (++index, update()));
  thumbs.forEach((img, i) =>
    img.addEventListener("click", () => ((index = i), update()))
  );
  dots.forEach((_, i) =>
    _.addEventListener("click", () => ((index = i * 4), update()))
  );
})();
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("animate", entry.isIntersecting);
      entry.target.classList.toggle("in-view", entry.isIntersecting);
    });
  },
  { threshold: 0.3 }
);
[".gallery", ".product-card", ".collection-inner"].forEach((sel) =>
  document.querySelectorAll(sel).forEach((el) => io.observe(el))
);
const productCard = document.querySelector(".product-card");
if (productCard) {
  new IntersectionObserver(
    ([entry]) => {
      productCard.classList.toggle("animate-in", entry.isIntersecting);
      productCard.classList.toggle("animate-out", !entry.isIntersecting);
    },
    { threshold: 0.3 }
  ).observe(productCard);
}
document.querySelectorAll(".subscription").forEach((sub, i, all) => {
  const radio = sub.querySelector("input");
  const header = sub.querySelector(".subscription-header");
  const activate = () => {
    all.forEach((s) => {
      s.classList.remove("selected");
      s.style.maxHeight =
        s.querySelector(".subscription-header").offsetHeight + "px";
      s.querySelector("input").checked = false;
    });
    sub.classList.add("selected");
    radio.checked = true;
    sub.style.maxHeight = sub.scrollHeight + "px";
  };
  i === 0 && activate();
  header.addEventListener("click", activate);
  radio.addEventListener("change", activate);
});
document.querySelectorAll(".fragrance").forEach((f) => {
  const radio = f.querySelector("input");
  f.addEventListener("click", () => radio && (radio.checked = true));
});
document.querySelectorAll(".accordion-item").forEach((item) => {
  const header = item.querySelector(".accordion-header");
  const content = item.querySelector("p");
  const plus = header.querySelector(".plus");
  header.addEventListener("click", () => {
    const open = item.classList.toggle("active");
    content.style.maxHeight = open ? content.scrollHeight + "px" : null;
    plus.textContent = open ? "−" : "+";
    document.querySelectorAll(".accordion-item").forEach((i) => {
      if (i !== item) {
        i.classList.remove("active");
        i.querySelector("p").style.maxHeight = null;
        i.querySelector(".plus").textContent = "+";
      }
    });
  });
});
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      let c = 0;
      const t = +e.target.dataset.count;
      const run = () => {
        if (c <= t) {
          e.target.textContent = c++ + "%";
          requestAnimationFrame(run);
        }
      };
      run();
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".stat h3").forEach((el) => statObserver.observe(el));
if (innerWidth <= 900) {
  const products = ["GTG", "Arose", "Bella", "Daisies"];
  document
    .querySelectorAll(".comparison-table tbody tr")
    .forEach((row) =>
      row
        .querySelectorAll("td:not(.label)")
        .forEach((cell, i) => (cell.dataset.product = products[i]))
    );
}
