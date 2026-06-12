const lperfTipus = document.getElementById("lperfTipus");
const inclTipus = document.getElementById("inclTipus");

const alcada = document.getElementById("alcada");
const filesContainer = document.getElementById("filesContainer");
const addFilaBtn = document.getElementById("addFila");

// ---------------- MATES ----------------

function g2r(g) {
  return g * Math.PI / 180;
}

function r2g(r) {
  return r * 180 / Math.PI;
}

// ---------------- DADES ----------------

let files = [
  { incl: 26, pb: 0, pp: 0, L: 0, A: 0 }
];

// ---------------- H ----------------

function calcH() {
  const Ltipus = Number(lperfTipus.value);
  const Itipus = Number(inclTipus.value);

  const H = Ltipus * Math.cos(g2r(Itipus));

  alcada.textContent = H.toFixed(3);
  return H;
}

// ---------------- RENDER ----------------

function render() {
  filesContainer.innerHTML = "";

  files.forEach((f, i) => {
    const div = document.createElement("div");

    div.style.background = "#ffffff";
    div.style.padding = "15px";
    div.style.marginTop = "10px";
    div.style.borderRadius = "10px";

    div.innerHTML = `
      <h3>Fila ${i + 1}</h3>

      ${
        i === 0
          ? `
            <label>Inclinació (°)</label>
            <input type="number" class="incl" data-i="${i}" value="${f.incl}" step="0.1">
          `
          : `
            <label>Pedra boques</label>
            <input type="number" class="pb" data-i="${i}" value="${f.pb}" step="0.1">

            <label>Pedra peus</label>
            <input type="number" class="pp" data-i="${i}" value="${f.pp}" step="0.1">
          `
      }

      <p>Inclinació: <span class="inclOut" data-i="${i}">0</span> °</p>
      <p>Longitud perforació: <span class="L" data-i="${i}">0</span> m</p>
      <p>Avanç: <span class="A" data-i="${i}">0</span> m</p>

      <button class="del" data-i="${i}">🗑️ Eliminar</button>
    `;

    filesContainer.appendChild(div);
  });

  attachEvents();
}

// ---------------- EVENTS ----------------

function attachEvents() {

  document.querySelectorAll(".incl").forEach(el => {
    el.oninput = () => {
      files[el.dataset.i].incl = Number(el.value);
      calc();
    };
  });

  document.querySelectorAll(".pb").forEach(el => {
    el.oninput = () => {
      files[el.dataset.i].pb = Number(el.value);
      calc();
    };
  });

  document.querySelectorAll(".pp").forEach(el => {
    el.oninput = () => {
      files[el.dataset.i].pp = Number(el.value);
      calc();
    };
  });

  document.querySelectorAll(".del").forEach(el => {
    el.onclick = () => {
      files.splice(el.dataset.i, 1);
      render();
      calc();
    };
  });
}

// ---------------- CALC ----------------

function calc() {

  const H = calcH();

  let prevA = 0;

  for (let i = 0; i < files.length; i++) {

    let inclRad;

    if (i === 0) {
      inclRad = g2r(files[i].incl);
    } else {
      inclRad = Math.atan(
        (prevA + files[i].pb - files[i].pp) / H
      );
    }

    const L = H / Math.cos(inclRad);
    const A = L * Math.sin(inclRad);

    files[i].L = L;
    files[i].A = A;

    prevA = A;

    const Ls = document.querySelector(`.L[data-i="${i}"]`);
    const As = document.querySelector(`.A[data-i="${i}"]`);
    const Is = document.querySelector(`.inclOut[data-i="${i}"]`);

    if (Ls) Ls.textContent = L.toFixed(3);
    if (As) As.textContent = A.toFixed(3);

    if (Is) {
      Is.textContent = i === 0
        ? files[i].incl.toFixed(3)
        : r2g(inclRad).toFixed(3);
    }
  }
}

// ---------------- AFEGIR ----------------

addFilaBtn.addEventListener("click", () => {
  files.push({ incl: 0, pb: 0, pp: 0, L: 0, A: 0 });
  render();
  calc();
});

// ---------------- EVENTS TIPUS ----------------

lperfTipus.addEventListener("input", calc);
inclTipus.addEventListener("input", calc);

// ---------------- INIT ----------------

render();
calc();