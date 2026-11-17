(function (global) {
  var EM = global.EM = global.EM || {};
  var mq = global.matchMedia ? global.matchMedia("(pointer: coarse)") : null;
  EM.tactil = !!(mq && mq.matches);

  function marcar() {
    if (document.body) document.body.classList.toggle("tactil", EM.tactil);
  }

  function despertar() {
    var a = EM.audio && EM.audio.estado;
    if (a && a.ac && a.ac.state !== "running") {
      try { a.ac.resume(); } catch (e) {}
    }
  }

  document.addEventListener("DOMContentLoaded", marcar);
  document.addEventListener("visibilitychange", function () { if (!document.hidden) despertar(); });
  document.addEventListener("pointerdown", despertar, { passive: true });
  global.addEventListener("pageshow", despertar);
  ["gesturestart", "gesturechange", "gestureend"].forEach(function (n) {
    document.addEventListener(n, function (e) { e.preventDefault(); });
  });
  document.addEventListener("contextmenu", function (e) {
    if (EM.tactil) e.preventDefault();
  });
})(window);
