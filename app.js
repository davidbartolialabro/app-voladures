const lperfTipus = document.getElementById("lperfTipus");
const inclTipus = document.getElementById("inclTipus");
const inclFila1 = document.getElementById("inclFila1");

const alcada = document.getElementById("alcada");
const novaLperf = document.getElementById("novaLperf");
const avanc = document.getElementById("avanc");

const pedraBoques2 = document.getElementById("pedraBoques2");
const pedraPeus2 = document.getElementById("pedraPeus2");

const incl2 = document.getElementById("incl2");
const lperf2 = document.getElementById("lperf2");
const avanc2 = document.getElementById("avanc2");

function grausARadians(graus) {
  return graus * Math.PI / 180;
}

function radiansAGraus(rad) {
  return rad * 180 / Math.PI;
}

function calcular() {

  // -----------------------------
  // PARÀMETRES TIPUS
  // -----------------------------

  const Ltipus = Number(lperfTipus.value);
  const Itipus = Number(inclTipus.value);

  const radTipus = grausARadians(Itipus);

  // Alçada barrinada

  const H = Ltipus * Math.cos(radTipus);

  alcada.textContent = H.toFixed(3);

  // -----------------------------
  // PRIMERA FILA
  // -----------------------------

  const Ifila1 = Number(inclFila1.value);

  const radFila1 = grausARadians(Ifila1);

  // Longitud perforació

  const L1 = H / Math.cos(radFila1);

  // Avanç

  const A1 = L1 * Math.sin(radFila1);

  novaLperf.textContent = L1.toFixed(3);

  avanc.textContent = A1.toFixed(3);

  // -----------------------------
  // SEGONA FILA
  // -----------------------------

  const pb2 = Number(pedraBoques2.value);

  const pp2 = Number(pedraPeus2.value);

  // Inclinació

  const rad2 = Math.atan((A1 + pb2 - pp2) / H);

  const graus2 = radiansAGraus(rad2);

  // Longitud

  const L2 = H / Math.cos(rad2);

  // Avanç

  const A2 = L2 * Math.sin(rad2);

  // Mostrar

  incl2.textContent = graus2.toFixed(3);

  lperf2.textContent = L2.toFixed(3);

  avanc2.textContent = A2.toFixed(3);
}

// EVENTS

lperfTipus.addEventListener("input", calcular);

inclTipus.addEventListener("input", calcular);

inclFila1.addEventListener("input", calcular);

pedraBoques2.addEventListener("input", calcular);

pedraPeus2.addEventListener("input", calcular);

// iniciar

calcular();
