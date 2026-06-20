/* =========================================================
   Resmiye Serbest — CV Sitesi · script.js
   Koyu/açık tema geçişi (kalıcı tercih) + küçük yardımcılar
   ========================================================= */
(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");
  var STORAGE_KEY = "cv-theme";
  var mql = window.matchMedia("(prefers-color-scheme: dark)");

  /* 1) Başlangıç teması: kayıtlı tercih > sistem tercihi > açık */
  function getInitialTheme() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return mql.matches ? "dark" : "light";
  }

  /* 2) Temayı uygula ve düğme etiketini güncelle */
  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "Açık temaya geç" : "Koyu temaya geç"
      );
    }
  }

  applyTheme(getInitialTheme());

  /* 3) Düğmeye tıklayınca temayı değiştir ve kaydet */
  if (toggle) {
    toggle.addEventListener("click", function () {
      var current = root.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* 4) Kullanıcı manuel seçim yapmadıysa sistem temasını izle */
  function onSystemChange(e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  }

  if (typeof mql.addEventListener === "function") {
    mql.addEventListener("change", onSystemChange);
  } else if (typeof mql.addListener === "function") {
    mql.addListener(onSystemChange); /* eski tarayıcı uyumu */
  }

  /* 5) Footer yılını otomatik güncelle */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* 6) Teklif Talebi formu — e-posta taslağı olarak gönder (mailto) */
  var form = document.getElementById("quote-form");
  var status = document.getElementById("quote-status");
  var TARGET_EMAIL = "rsmyserbest@gmail.com";

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var service = form.service.value;
      var details = form.details.value.trim();

      var subject = "Teklif Talebi — " + service;
      var body =
        "Ad Soyad: " + name + "\n" +
        "E-posta: " + email + "\n" +
        "Hizmet Kategorisi: " + service + "\n\n" +
        "Proje Detayları:\n" + details + "\n";

      var mailto =
        "mailto:" + TARGET_EMAIL +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      window.location.href = mailto;

      if (status) {
        status.textContent =
          "Teşekkürler " + name + "! E-posta uygulamanız taslakla açılıyor.";
      }
      form.reset();
    });
  }

  /* 7) Ziyaretçi sayacı — Abacus (ücretsiz, anahtarsız, CORS açık)
     Element ID'leri: kapsül = #visit-counter, sayı = #visit-count
     countapi.xyz kapandığı için Abacus kullanılıyor; yedek olarak CounterAPI. */
  var counterWrap = document.getElementById("visit-counter");
  var counterOut = document.getElementById("visit-count");

  if (counterWrap && counterOut && "fetch" in window) {
    /* Sırayla denenecek sayaç servisleri (ilki başarısız olursa diğerine geçilir) */
    var COUNTER_ENDPOINTS = [
      "https://abacus.jasoncameron.dev/hit/resmiyeserbest-cv/site-visits",
      "https://api.counterapi.dev/v1/resmiyeserbest-cv/site-visits/up"
    ];

    /* Servislerin döndürdüğü farklı JSON biçimlerinden sayıyı güvenle ayıkla */
    function extractCount(data) {
      if (!data) return null;
      if (typeof data.value === "number") return data.value; /* Abacus */
      if (typeof data.count === "number") return data.count; /* CounterAPI */
      if (data.data && typeof data.data.count === "number") return data.data.count;
      return null;
    }

    /* Rozet her koşulda görünür kalır; yalnızca sayı metni güncellenir */
    function showCount(count) {
      counterOut.textContent = Number(count).toLocaleString("tr-TR");
    }

    /* Endpoint listesini sırayla dene; biri çalışırsa dur */
    function tryEndpoint(index) {
      if (index >= COUNTER_ENDPOINTS.length) {
        return; /* hiçbir servis yanıt vermezse "…" yükleniyor durumu kalır */
      }
      fetch(COUNTER_ENDPOINTS[index], { cache: "no-store" })
        .then(function (res) {
          if (!res.ok) throw new Error("HTTP " + res.status);
          return res.json();
        })
        .then(function (data) {
          var count = extractCount(data);
          if (count == null) throw new Error("Sayı çözümlenemedi");
          showCount(count);
        })
        .catch(function () {
          tryEndpoint(index + 1); /* sonraki servisi dene */
        });
    }

    tryEndpoint(0);
  }
})();
