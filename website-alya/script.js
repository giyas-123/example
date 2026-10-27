
/* ========================================
   WEBSITE ALYA ♡
   Foto, animasi, kejutan, surat, dan musik
======================================== */


/* ===== 1. KENANGAN FIRST DATE ===== */

const tombolFoto = document.getElementById("bukaFoto");
const kenangan = document.getElementById("kenangan");

if (tombolFoto && kenangan) {
  tombolFoto.addEventListener("click", function () {
    kenangan.classList.toggle("tersembunyi");

    if (kenangan.classList.contains("tersembunyi")) {
      tombolFoto.textContent = "Buka kenangan first date kita ♡";
    } else {
      tombolFoto.textContent = "Tutup kenangan ♡";

      kenangan.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  });
}


/* ===== 2. HATI MELAYANG ===== */

function buatHati() {
  const hati = document.createElement("span");

  hati.className = "hati-baru";
  hati.textContent = ["💗", "💕", "💖", "♡", "💘"][
    Math.floor(Math.random() * 5)
  ];

  hati.style.left = Math.random() * 95 + "vw";
  hati.style.fontSize = (12 + Math.random() * 18) + "px";
  hati.style.animationDuration = (6 + Math.random() * 4) + "s";

  document.body.appendChild(hati);

  setTimeout(() => {
    hati.remove();
  }, 11000);
}

// Hati muncul sesekali, lalu berhenti.
let penghitungHati = 0;

const intervalHati = setInterval(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    clearInterval(intervalHati);
    return;
  }

  buatHati();
  penghitungHati++;

  if (penghitungHati >= 12) {
    clearInterval(intervalHati);
  }
}, 1100);


/* ===== 3. KEJUTAN RAHASIA ===== */

const tombolKejutan = document.getElementById("tombolKejutan");
const pesanRahasia = document.getElementById("pesanRahasia");

if (tombolKejutan && pesanRahasia) {
  tombolKejutan.addEventListener("click", function () {
    pesanRahasia.hidden = !pesanRahasia.hidden;

    if (pesanRahasia.hidden) {
      tombolKejutan.textContent = "Ada kejutan kecil buat kamu 🎁";
    } else {
      tombolKejutan.textContent = "Tutup kejutan ♡";

      buatHati();
      buatHati();
      buatHati();
    }
  });
}


/* ===== 4. EFEK MOUSE DAN SCROLL ===== */

document.addEventListener("DOMContentLoaded", function () {
  // Cahaya mengikuti mouse
  document.addEventListener("mousemove", function (event) {
    document.documentElement.style.setProperty(
      "--mouse-x",
      event.clientX + "px"
    );

    document.documentElement.style.setProperty(
      "--mouse-y",
      event.clientY + "px"
    );
  });

  // Efek muncul saat bagian website terlihat
  const bagian = document.querySelectorAll(
    "section, .surat, .kartu, .foto-frame"
  );

  bagian.forEach(function (elemen) {
    elemen.classList.add("reveal-alya");
  });

  if ("IntersectionObserver" in window) {
    const pengamat = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("terlihat");
          pengamat.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    bagian.forEach(function (elemen) {
      pengamat.observe(elemen);
    });
  } else {
    bagian.forEach(function (elemen) {
      elemen.classList.add("terlihat");
    });
  }

  // Popup untuk memperbesar foto
  const foto = document.querySelectorAll(
    'img[src*="alya-utama"], img[src*="first-date"]'
  );

  if (foto.length > 0) {
    const popup = document.createElement("div");

    popup.className = "popup-foto-alya";
    popup.innerHTML = `
      <button class="popup-tutup-alya"
              aria-label="Tutup foto"
              type="button">&times;</button>
      <img src="" alt="Foto kenangan ALYA">
    `;

    document.body.appendChild(popup);

    const gambarPopup = popup.querySelector("img");
    const tombolTutup = popup.querySelector("button");

    foto.forEach(function (gambar) {
      gambar.classList.add("foto-zoom");

      gambar.addEventListener("click", function () {
        gambarPopup.src = gambar.src;
        gambarPopup.alt = gambar.alt || "Foto kenangan ALYA";
        popup.classList.add("aktif");
      });
    });

    function tutupPopup() {
      popup.classList.remove("aktif");
    }

    tombolTutup.addEventListener("click", tutupPopup);

    popup.addEventListener("click", function (event) {
      if (event.target === popup) {
        tutupPopup();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        tutupPopup();
      }
    });
  }
});


/* ===== 5. SURAT RAHASIA ===== */

document.addEventListener("DOMContentLoaded", function () {
  const tombolSurat = document.getElementById("tombolSurat");
  const amplop = document.getElementById("amplop");

  if (!tombolSurat || !amplop) {
    return;
  }

  tombolSurat.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    amplop.classList.toggle("terbuka");

    if (amplop.classList.contains("terbuka")) {
      tombolSurat.textContent = "💗 Tutup surat";
    } else {
      tombolSurat.textContent = "💌 Buka surat rahasia";
    }
  });
});

/* ===== PEMUTAR MUSIK ALYA ===== */

const musikAlya = document.getElementById("musikAlya");
const tombolMusik = document.getElementById("tombolMusik");

if (musikAlya && tombolMusik) {
  let sedangMemproses = false;

  tombolMusik.addEventListener("click", async function () {
    if (sedangMemproses) return;

    if (!musikAlya.paused) {
      musikAlya.pause();
      return;
    }

    sedangMemproses = true;
    tombolMusik.textContent = "Memuat musik...";

    try {
      // Minta browser memutar audio.
      const prosesPutar = musikAlya.play();

      // Batasi waktu tunggu agar tombol tidak menggantung.
      let batasWaktu;

      try {
        await Promise.race([
          prosesPutar,
          new Promise((_, reject) => {
            batasWaktu = setTimeout(
              () => reject(new Error("Waktu tunggu audio habis")),
              8000
            );
          })
        ]);
      } finally {
        clearTimeout(batasWaktu);
      }

      tombolMusik.textContent = "♫ Musik Menyala ♡";
      tombolMusik.classList.add("sedang-putar");

    } catch (error) {
      console.error("Detail error musik:", error.name, error.message);

      tombolMusik.textContent = "Coba Putar Musik Lagi ♡";

    } finally {
      sedangMemproses = false;
    }
  });

  musikAlya.addEventListener("playing", function () {
    tombolMusik.textContent = "♫ Musik Menyala ♡";
    tombolMusik.classList.add("sedang-putar");
  });

  musikAlya.addEventListener("pause", function () {
    tombolMusik.textContent = "♫ Putar Musik ♡";
    tombolMusik.classList.remove("sedang-putar");
  });

  musikAlya.addEventListener("error", function () {
    console.error(
      "Audio gagal dimuat. Kode error:",
      musikAlya.error?.code
    );

    tombolMusik.textContent = "File Musik Tidak Terbaca ⚠️";
  });

} else {
  console.error("Tombol musik atau elemen audio tidak ditemukan.");
}


