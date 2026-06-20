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

  /* 7) Ziyaretçi sayacı — toplam (localStorage) + anlık aktif (simülasyon) */

  /* 7a) Toplam ziyaret: her açılışta localStorage ile 1 artır */
  var counterOut = document.getElementById("visit-count");
  if (counterOut) {
    var VISIT_KEY = "cv-visit-count";
    var total = 1;
    try {
      var stored = parseInt(localStorage.getItem(VISIT_KEY), 10);
      total = (isNaN(stored) ? 0 : stored) + 1;
      localStorage.setItem(VISIT_KEY, String(total));
    } catch (e) {
      total = 1; /* localStorage kapalıysa en az 1 göster */
    }
    counterOut.textContent = total.toLocaleString("tr-TR");
  }

  /* 7b) Anlık aktif ziyaretçi: 1–3 arasında rastgele canlı değişim */
  var activeOut = document.getElementById("active-count");
  if (activeOut) {
    function updateActive() {
      var n = 1 + Math.floor(Math.random() * 3); /* 1, 2 veya 3 */
      activeOut.textContent = n;
      var nextDelay = 3000 + Math.random() * 4000; /* 3–7 sn sonra tekrar */
      window.setTimeout(updateActive, nextDelay);
    }
    updateActive();
  }
})();
