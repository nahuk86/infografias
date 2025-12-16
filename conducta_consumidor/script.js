let activeStep = 0;

const steps = [
  {
    id: 0,
    title: "1. El Disparador (Trigger)",
    icon: { name: "alert-triangle", color: "#eab308" }, // yellow-500
    description: "¿Qué motiva al propietario a buscar una solución?",
    details: [
      { label: "Urgencia", text: "El huésped llega a las 2 AM y no hay nadie para recibirlo." },
      { label: "Falla Informal", text: "El encargado del edificio ya no quiere/puede guardar las llaves." },
      { label: "Inseguridad", text: "Miedo a copias de llaves no autorizadas tras una mala experiencia." }
    ]
  },
  {
    id: 1,
    title: "2. La Comparación de Opciones",
    icon: { name: "search", color: "#3b82f6" }, // blue-500
    description: "El dilema: ¿Gratis/Barato vs. Profesional?",
    comparison: true
  },
  {
    id: 2,
    title: "3. Barreras y Miedos",
    icon: { name: "lock", color: "#ef4444" }, // red-500
    description: "¿Qué frena la contratación de la App?",
    details: [
      { label: "Tecnología", text: "'¿Y si se corta la luz o el WiFi y el huésped queda afuera?'" },
      { label: "Confianza", text: "'¿Quiénes son estos 'Hosts Locales'? ¿Son empleados o extraños?'" },
      { label: "Costo Percibido", text: "'Es más caro que darle una propina al portero.'" }
    ]
  },
  {
    id: 3,
    title: "4. Factores de Decisión Final",
    icon: { name: "thumbs-up", color: "#22c55e" }, // green-500
    description: "¿Qué inclina la balanza hacia Alfred?",
    details: [
      { label: "Trazabilidad", text: "Saber exactamente quién entró y a qué hora (Log digital)." },
      { label: "Independencia", text: "No 'deber favores' a vecinos o familiares." },
      { label: "Profesionalismo", text: "Seguro y factura (Compliance fiscal)." }
    ]
  }
];

const $steps = document.getElementById("steps");
const $panel = document.getElementById("panel");

function iconHTML(name, color, size = 22) {
  // Lucide usa <i data-lucide="..."></i>
  // El color se aplica con style (stroke)
  return `<i data-lucide="${name}" style="width:${size}px;height:${size}px;stroke:${color};"></i>`;
}

function renderSteps() {
  $steps.innerHTML = steps
    .map((s, idx) => {
      const isActive = idx === activeStep;
      return `
        <button class="step-btn ${isActive ? "is-active" : ""}" data-idx="${idx}">
          <div class="step-btn__iconWrap">
            ${iconHTML(s.icon.name, isActive ? "#ffffff" : s.icon.color, 20)}
          </div>
          <div class="step-btn__meta">
            <h3>${s.title}</h3>
            <p>Click para ver detalles</p>
          </div>
          <div class="step-btn__chev">
            ${iconHTML("arrow-right", isActive ? "#ffffff" : "#cbd5e1", 18)}
          </div>
        </button>
      `;
    })
    .join("");

  // bind clicks
  [...$steps.querySelectorAll(".step-btn")].forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.idx);
      if (idx === activeStep) return;
      activeStep = idx;
      render();
    });
  });
}

function renderPanel() {
  const step = steps[activeStep];

  const headIcon = `
    <div class="panel__headIcon">
      ${iconHTML(step.icon.name, step.icon.color, 28)}
    </div>
  `;

  let bodyHTML = "";

  if (step.comparison) {
    bodyHTML = `
      <div class="compare fadeIn">
        <!-- Informal -->
        <div class="compare-col red">
          <div class="compare-col__head">
            <h3>Opción Informal</h3>
            ${iconHTML("x-circle", "#f87171", 22)}
          </div>
          <div class="stack">
            <div class="kv">
              <span class="label">Proveedor</span>
              <span class="value">Portero, Vecino, Amigo.</span>
            </div>
            <div class="kv">
              <span class="label">Costo</span>
              <span class="value">Propina / Favor personal.</span>
            </div>
            <div class="kv">
              <span class="label">Confianza</span>
              <span class="value">Alta en la persona, <span class="bold">Baja en el proceso</span> (si se duerme, falla).</span>
            </div>
            <div class="kv">
              <span class="label">Riesgo</span>
              <span class="value">Sin seguro, sin registro de llaves.</span>
            </div>
          </div>
        </div>

        <!-- Alfred -->
        <div class="compare-col green">
          <div class="compare-col__head">
            <h3>Opción App (Alfred)</h3>
            ${iconHTML("shield-check", "#22c55e", 22)}
          </div>
          <div class="stack">
            <div class="kv">
              <span class="label">Proveedor</span>
              <span class="value">Host Verificado + IoT.</span>
            </div>
            <div class="kv">
              <span class="label">Costo</span>
              <span class="value">Suscripción mensual (predecible).</span>
            </div>
            <div class="kv">
              <span class="label">Confianza</span>
              <span class="value">Basada en <span class="bold">SLA y Marca</span>. Respaldo corporativo.</span>
            </div>
            <div class="kv">
              <span class="label">Beneficio</span>
              <span class="value">Seguro incluido, Trazabilidad digital.</span>
            </div>
          </div>
        </div>
      </div>
    `;
  } else {
    bodyHTML = `
      <div class="details fadeIn">
        ${(step.details || [])
          .map(
            (d) => `
              <div class="detail-card">
                <h4>${d.label}</h4>
                <p>${d.text}</p>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  $panel.innerHTML = `
    <div class="panel__bg"></div>
    <div class="panel__content">
      <div class="panel__head">
        ${headIcon}
        <div>
          <h2>${step.title}</h2>
          <p>${step.description}</p>
        </div>
      </div>
      <div class="panel__body">
        ${bodyHTML}
      </div>
    </div>
  `;
}

function render() {
  renderSteps();
  renderPanel();

  // Re-render lucide icons (porque inyectamos HTML dinámico)
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", render);
