import { useState, useMemo } from "react";

/* ─── DESIGN SYSTEM ────────────────────────────────────────────── */
const DS = {
  blue900: "#0A2540", blue600: "#0B5FFF", blue100: "#DBEAFE", blue50: "#EFF6FF",
  cyan400: "#38BDF8", cyan50: "#ECFEFF",
  slate900: "#0F172A", slate700: "#334155", slate600: "#475569", slate500: "#64748B",
  slate400: "#94A3B8", slate300: "#CBD5E1", slate200: "#E2E8F0", slate100: "#F1F5F9", slate50: "#F8FAFC",
  alta:       { color: "#E5484D", bg: "#FEE2E2" },
  media:      { color: "#C2710C", bg: "#FEF3C7" },
  baja:       { color: "#0369A1", bg: "#E0F2FE" },
  descartada: { color: "#64748B", bg: "#F1F5F9" },
};
const font = "'Inter', system-ui, sans-serif";
const mono = "'JetBrains Mono', 'Fira Mono', monospace";

/* ─── LUCIDE ICONS ──────────────────────────────────────────────── */
const Icon = ({ name, size = 16, color = "currentColor", style: s = {} }) => {
  const p = {
    "shield-check": <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></>,
    "hard-drive": <><line x1="22" y1="12" x2="2" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" y1="16" x2="6.01" y2="16"/><line x1="10" y1="16" x2="10.01" y2="16"/></>,
    "mail": <><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></>,
    "file-text": <><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></>,
    "wifi": <><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></>,
    "scale": <><path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></>,
    "flag": <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    "fingerprint": <><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M17.29 21.02c.12-.6.43-2.3.5-3.02"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 17c1 .5 2.5 1 4 1"/><path d="M20 12a10 10 0 0 1-.32 2.58"/><path d="M7.11 14a10 10 0 0 1-.11-2 10 10 0 0 1 .5-3.09"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></>,
    "search": <><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></>,
    "terminal": <><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></>,
    "key-round": <><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></>,
    "arrow-up-down": <><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></>,
    "check-circle-2": <><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></>,
    "info": <><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></>,
    "chevron-down": <path d="m6 9 6 6 6-6"/>,
    "chevron-up": <path d="m18 15-6-6-6 6"/>,
    "bar-chart-2": <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></>,
    "folder-open": <><path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/></>,
    "layers": <><path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></>,
    "arrow-left": <><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></>,
    "git-compare": <><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><path d="M11 18H8a2 2 0 0 1-2-2V9"/></>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
      style={{ display:"inline-block", verticalAlign:"middle", flexShrink:0, ...s }}>
      {p[name]}
    </svg>
  );
};

/* ─── ISOTIPO SVG (manual de marca: tres barras + punto celeste) ── */
const Isotipo = ({ size = 32 }) => {
  const r = size * 0.22;
  const barW1 = size * 0.52, barW2 = size * 0.38, barW3 = size * 0.26;
  const barH  = size * 0.095;
  const gap   = size * 0.13;
  const x0    = (size - barW1) / 2;
  const y1    = size * 0.30;
  const y2    = y1 + barH + gap;
  const y3    = y2 + barH + gap;
  const dotR  = size * 0.07;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width={size} height={size} rx={r} fill="#0B5FFF"/>
      {/* barra 1 — ALTA */}
      <rect x={x0} y={y1} width={barW1} height={barH} rx={barH/2} fill="white"/>
      {/* punto celeste sobre barra 1 */}
      <circle cx={x0 + barW1 - dotR * 0.5} cy={y1 + barH / 2} r={dotR} fill="#38BDF8"/>
      {/* barra 2 — MEDIA */}
      <rect x={x0} y={y2} width={barW2} height={barH} rx={barH/2} fill="rgba(255,255,255,0.75)"/>
      {/* barra 3 — BAJA */}
      <rect x={x0} y={y3} width={barW3} height={barH} rx={barH/2} fill="rgba(255,255,255,0.45)"/>
    </svg>
  );
};

/* ─── DATA ──────────────────────────────────────────────────────── */
const CRITERIA = [
  { id:"relevancia",     label:"Relevancia probatoria",     icon:"scale",         desc:"Valor de la evidencia para probar el delito." },
  { id:"volatilidad",    label:"Volatilidad del dato",      icon:"arrow-up-down", desc:"Velocidad con que puede perderse o alterarse." },
  { id:"urgencia",       label:"Urgencia investigativa",    icon:"flag",          desc:"Prioridad operativa para obtenerla." },
  { id:"riesgo_perdida", label:"Riesgo de pérdida",         icon:"info",          desc:"Probabilidad de que desaparezca sin intervención." },
  { id:"complejidad",    label:"Complejidad técnica",       icon:"terminal",      desc:"Nivel de expertise requerido para recuperarla." },
  { id:"trazabilidad",   label:"Exigencia de trazabilidad", icon:"key-round",     desc:"Rigurosidad requerida en la cadena de custodia." },
];

const CASES = [
  {
    id:"caso1", titulo:"Fraude por phishing bancario", subtitulo:"Buenos Aires · 2023", icon:"mail",
    descripcion:"Una empresa de logística de Córdoba detecta que durante 3 semanas sus empleados recibieron correos de phishing que imitaban al banco corporativo. Cinco empleados ingresaron sus credenciales. Se detectaron transferencias no autorizadas por $4.2M ARS hacia cuentas fantasma.",
    categoria:"Delitos contra la propiedad — Estafas asistidas virtualmente", codigo_snic:"21_4 / 214",
    evidencias:[
      {id:"e1",nombre:"Correos electrónicos de phishing",tipo:"email",descripcion:"Emails con enlaces maliciosos, headers de origen, metadatos SMTP y archivos adjuntos sospechosos.",puntajes_sistema:{relevancia:5,volatilidad:4,urgencia:5,riesgo_perdida:4,complejidad:3,trazabilidad:5},justificacion:"Constituye la prueba directa del modus operandi. Los headers SMTP permiten rastrear la infraestructura atacante. Alta volatilidad porque los servidores de correo rotan logs."},
      {id:"e2",nombre:"Logs de autenticación del banco",tipo:"log",descripcion:"Registros de acceso al homebanking corporativo: IPs, timestamps, user-agents, intentos fallidos y exitosos.",puntajes_sistema:{relevancia:5,volatilidad:5,urgencia:5,riesgo_perdida:5,complejidad:2,trazabilidad:5},justificacion:"Evidencia crítica y altamente volátil. Los bancos conservan logs por períodos limitados. Requiere medida cautelar urgente para preservación."},
      {id:"e3",nombre:"Equipos de los empleados afectados",tipo:"hardware",descripcion:"PCs y laptops donde se ingresaron las credenciales. Posible presencia de keyloggers, malware o cookies de sesión robadas.",puntajes_sistema:{relevancia:4,volatilidad:3,urgencia:4,riesgo_perdida:3,complejidad:4,trazabilidad:5},justificacion:"Pueden contener artefactos forenses del ataque. Requiere imagen forense para preservar integridad. Complejidad técnica media-alta."},
      {id:"e4",nombre:"Registros de transferencias bancarias",tipo:"documento",descripcion:"Comprobantes de las transferencias fraudulentas, datos de cuentas destino, montos y entidades receptoras.",puntajes_sistema:{relevancia:5,volatilidad:2,urgencia:4,riesgo_perdida:2,complejidad:1,trazabilidad:4},justificacion:"Evidencia documental sólida para cuantificar el daño. Relativamente estable. Esencial para el delito patrimonial."},
      {id:"e5",nombre:"Servidores de phishing activos",tipo:"infraestructura",descripcion:"Dominios y servidores usados para alojar páginas falsas. Identificación de atacantes vía WHOIS y certificados.",puntajes_sistema:{relevancia:4,volatilidad:5,urgencia:5,riesgo_perdida:5,complejidad:5,trazabilidad:4},justificacion:"Máxima volatilidad: los atacantes suelen dar de baja la infraestructura en horas. Requiere actuación inmediata y cooperación internacional."},
    ],
  },
  {
    id:"caso2", titulo:"Ransomware en hospital público", subtitulo:"Rosario · 2024", icon:"hard-drive",
    descripcion:"El sistema informático del Hospital Regional de Rosario fue cifrado por ransomware. Se vieron afectados 1.200 historias clínicas, el sistema de turnos y equipos de diagnóstico. Los atacantes exigen 50 BTC. Los servicios de urgencias operaron en modo manual por 72 horas.",
    categoria:"Acceso ilegal a sistemas informáticos y daños informáticos", codigo_snic:"21_6 / 216",
    evidencias:[
      {id:"e1",nombre:"Imagen forense de servidores infectados",tipo:"hardware",descripcion:"Copia bit-a-bit de los servidores afectados: muestra del ransomware, vector de entrada, archivos cifrados e IOCs.",puntajes_sistema:{relevancia:5,volatilidad:3,urgencia:5,riesgo_perdida:4,complejidad:5,trazabilidad:5},justificacion:"Evidencia maestra del caso. Permite análisis de malware, identificación de la variante y posible atribución. Requiere laboratorio forense especializado."},
      {id:"e2",nombre:"Logs de red y firewall",tipo:"log",descripcion:"Tráfico previo al ataque, conexiones C2, exfiltración de datos y movimiento lateral.",puntajes_sistema:{relevancia:5,volatilidad:5,urgencia:5,riesgo_perdida:5,complejidad:4,trazabilidad:5},justificacion:"Crítico para reconstruir la cadena de ataque. Extremadamente volátil: los dispositivos de red sobrescriben logs continuamente."},
      {id:"e3",nombre:"Nota de rescate y wallet Bitcoin",tipo:"documento",descripcion:"Archivo de rescate, dirección Bitcoin e instrucciones de los atacantes.",puntajes_sistema:{relevancia:4,volatilidad:2,urgencia:3,riesgo_perdida:2,complejidad:3,trazabilidad:3},justificacion:"Permite identificar el grupo atacante y rastrear el wallet en blockchain. Relativamente estable. Útil para inteligencia criminal."},
      {id:"e4",nombre:"Historial de accesos al sistema de salud",tipo:"log",descripcion:"Registro de usuarios, privilegios, cambios de configuración y cuentas comprometidas previo al incidente.",puntajes_sistema:{relevancia:4,volatilidad:4,urgencia:4,riesgo_perdida:4,complejidad:3,trazabilidad:5},justificacion:"Permite identificar el punto de entrada y posibles cómplices internos. Protegido por normativa de datos de salud."},
      {id:"e5",nombre:"Comunicaciones de los atacantes",tipo:"comunicacion",descripcion:"Mensajes intercambiados vía el canal proporcionado, metadatos e idioma.",puntajes_sistema:{relevancia:3,volatilidad:4,urgencia:3,riesgo_perdida:4,complejidad:3,trazabilidad:3},justificacion:"Puede revelar características del atacante. Útil para perfil lingüístico y negociación táctica."},
      {id:"e6",nombre:"Backups y sistemas de recuperación",tipo:"infraestructura",descripcion:"Estado de los sistemas de respaldo antes del ataque: afectación, última fecha limpia e integridad.",puntajes_sistema:{relevancia:3,volatilidad:2,urgencia:4,riesgo_perdida:3,complejidad:2,trazabilidad:2},justificacion:"Fundamental para recuperación operativa. Menor prioridad forense pero alta urgencia institucional."},
    ],
  },
  {
    id:"caso3", titulo:"Grooming y explotación digital de menores", subtitulo:"Mendoza · 2024", icon:"fingerprint",
    descripcion:"La madre de una menor de 13 años denuncia que un adulto desconocido estableció contacto vía red social, solicitó imágenes de carácter sexual y amenazó con publicarlas. Conversaciones detectadas durante 4 meses. El sospechoso usaba perfiles falsos en al menos tres plataformas.",
    categoria:"Abusos sexuales — Otros delitos contra la integridad sexual", codigo_snic:"10, 11",
    evidencias:[
      {id:"e1",nombre:"Dispositivo móvil de la víctima",tipo:"hardware",descripcion:"Smartphone con conversaciones, imágenes y metadatos de las comunicaciones.",puntajes_sistema:{relevancia:5,volatilidad:4,urgencia:5,riesgo_perdida:4,complejidad:4,trazabilidad:5},justificacion:"Evidencia primaria. Contiene todo el historial del delito. Requiere extracción forense certificada. Sensibilidad extrema: protección de la víctima menor."},
      {id:"e2",nombre:"Cuentas y perfiles en redes sociales",tipo:"cuenta",descripcion:"Perfiles falsos del agresor: IP de registro, dispositivos vinculados e historial de actividad.",puntajes_sistema:{relevancia:5,volatilidad:5,urgencia:5,riesgo_perdida:5,complejidad:3,trazabilidad:4},justificacion:"Máxima urgencia: las plataformas eliminan datos de cuentas denunciadas en plazos muy cortos. Requiere medida cautelar inmediata con orden judicial."},
      {id:"e3",nombre:"Registros de IP y metadatos de mensajes",tipo:"log",descripcion:"IPs de conexión, timestamps, geolocalización aproximada y dispositivos usados por el agresor.",puntajes_sistema:{relevancia:5,volatilidad:5,urgencia:5,riesgo_perdida:5,complejidad:3,trazabilidad:5},justificacion:"Esencial para identificar al agresor. Dato altamente volátil según las políticas de retención de cada plataforma. Prioridad máxima."},
      {id:"e4",nombre:"Imágenes y archivos intercambiados",tipo:"contenido",descripcion:"Material intercambiado en el chat. Análisis de metadatos EXIF puede geolocalizar al agresor.",puntajes_sistema:{relevancia:5,volatilidad:3,urgencia:4,riesgo_perdida:3,complejidad:4,trazabilidad:5},justificacion:"Prueba directa del delito. Los metadatos EXIF pueden ser fundamentales para identificación. Manejo estrictamente confidencial."},
      {id:"e5",nombre:"Declaraciones de testigos digitales",tipo:"testimonio",descripcion:"Amigos de la víctima informados, posibles otras víctimas y capturas de pantalla aportadas por terceros.",puntajes_sistema:{relevancia:3,volatilidad:2,urgencia:3,riesgo_perdida:2,complejidad:1,trazabilidad:3},justificacion:"Complementa la evidencia técnica. Puede revelar patrón de victimización múltiple. Requiere protocolo de atención a víctimas."},
    ],
  },
];

const tipoLabel = { email:"Correo electrónico", log:"Log de sistema", hardware:"Dispositivo / hardware", documento:"Documento digital", infraestructura:"Infraestructura", comunicacion:"Comunicación", cuenta:"Cuenta digital", contenido:"Contenido digital", testimonio:"Testimonio" };

/* ─── HELPERS ───────────────────────────────────────────────────── */
const calcScore = (p) => { const v=Object.values(p); return v.reduce((a,b)=>a+b,0)/v.length; };
const calcComp  = (p) => ((p.complejidad+p.trazabilidad)/2).toFixed(1);
const nivel = (score) => {
  if (score>=4.2) return { label:"ALTA",       ...DS.alta };
  if (score>=3.4) return { label:"MEDIA",      ...DS.media };
  if (score>=2.5) return { label:"BAJA",       ...DS.baja };
  return              { label:"DESCARTADA", ...DS.descartada };
};

/* ─── CHIP ──────────────────────────────────────────────────────── */
const Chip = ({ score }) => {
  const n = nivel(score);
  return <span style={{ display:"inline-block", padding:"2px 10px", borderRadius:999, background:n.bg, color:n.color, fontFamily:font, fontSize:11, fontWeight:600, letterSpacing:"0.06em" }}>{n.label}</span>;
};

/* ─── SLIDER ────────────────────────────────────────────────────── */
const Slider = ({ valor, onChange }) => (
  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
    <input type="range" min={1} max={5} step={1} value={valor} onChange={e=>onChange(Number(e.target.value))}
      style={{ flex:1, accentColor:DS.blue600 }} />
    <span style={{ minWidth:26, height:26, borderRadius:7, background:valor>=4?DS.blue900:valor>=3?DS.blue600:DS.slate400, color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:700, fontSize:12, fontFamily:mono }}>{valor}</span>
  </div>
);

/* ─── EVIDENCIA CARD ────────────────────────────────────────────── */
function EvidCard({ ev, pu, onChange, compare, open, onToggle }) {
  const su = calcScore(pu), ss = calcScore(ev.puntajes_sistema);
  return (
    <div style={{ border:`1px solid ${DS.slate200}`, borderRadius:12, marginBottom:10, background:"#fff", overflow:"hidden", boxShadow:"0 1px 3px rgba(10,37,64,0.05)" }}>
      <div onClick={onToggle} style={{ padding:"13px 16px", cursor:"pointer", display:"flex", alignItems:"flex-start", gap:12, background:open?DS.slate50:"#fff", borderBottom:open?`1px solid ${DS.slate200}`:"none" }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap", marginBottom:4 }}>
            <span style={{ fontFamily:font, fontWeight:600, fontSize:14, color:DS.blue900 }}>{ev.nombre}</span>
            <span style={{ fontFamily:mono, fontSize:10, padding:"1px 6px", borderRadius:4, background:DS.slate100, color:DS.slate500 }}>{tipoLabel[ev.tipo]||ev.tipo}</span>
            <Chip score={su} />
          </div>
          <p style={{ margin:0, fontSize:12, color:DS.slate500, fontFamily:font, lineHeight:1.5 }}>{ev.descripcion}</p>
        </div>
        <Icon name={open?"chevron-up":"chevron-down"} size={15} color={DS.slate400} style={{ marginTop:2 }} />
      </div>

      {open && (
        <div style={{ padding:"16px 18px" }}>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:16 }}>
            {CRITERIA.map(c => (
              <div key={c.id}>
                <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:2 }}>
                  <Icon name={c.icon} size={12} color={DS.blue600} />
                  <span style={{ fontSize:10, fontWeight:600, color:DS.slate600, fontFamily:font, letterSpacing:"0.05em", textTransform:"uppercase" }}>{c.label}</span>
                </div>
                <p style={{ margin:"0 0 5px", fontSize:11, color:DS.slate400, fontFamily:font }}>{c.desc}</p>
                <Slider valor={pu[c.id]} onChange={v=>onChange(c.id,v)} />
                {compare && (
                  <div style={{ fontSize:10, color:DS.slate400, marginTop:3, fontFamily:mono }}>
                    Sistema: <strong style={{ color:DS.blue600 }}>{ev.puntajes_sistema[c.id]}</strong>
                    {pu[c.id]!==ev.puntajes_sistema[c.id] && <span style={{ color:pu[c.id]>ev.puntajes_sistema[c.id]?DS.alta.color:DS.media.color, marginLeft:3 }}>({pu[c.id]>ev.puntajes_sistema[c.id]?"+":""}{pu[c.id]-ev.puntajes_sistema[c.id]})</span>}
                  </div>
                )}
              </div>
            ))}
          </div>
          {compare && (
            <div style={{ marginTop:16, padding:"12px 14px", background:DS.blue50, borderRadius:8, borderLeft:`3px solid ${DS.blue600}` }}>
              <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
                <Icon name="check-circle-2" size={13} color={DS.blue600} />
                <span style={{ fontSize:10, fontWeight:600, color:DS.blue900, fontFamily:font, letterSpacing:"0.05em", textTransform:"uppercase" }}>Justificación del sistema</span>
              </div>
              <p style={{ margin:"0 0 8px", fontSize:13, color:DS.slate700, fontFamily:font, lineHeight:1.6 }}>{ev.justificacion}</p>
              <div style={{ display:"flex", gap:16, fontSize:11, fontFamily:mono, flexWrap:"wrap" }}>
                <span>Tu score: <strong style={{ color:nivel(su).color }}>{su.toFixed(2)}</strong></span>
                <span>Sistema: <strong style={{ color:nivel(ss).color }}>{ss.toFixed(2)}</strong></span>
                <span>Dif: <strong>{su-ss>0?"+":""}{(su-ss).toFixed(2)}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ─── RESULTADOS ────────────────────────────────────────────────── */
function Resultados({ caso, pu }) {
  const rank  = useMemo(()=>caso.evidencias.map(e=>({...e,su:calcScore(pu[e.id]),ss:calcScore(e.puntajes_sistema),comp:calcComp(pu[e.id])})).sort((a,b)=>b.su-a.su),[caso,pu]);
  const rankS = useMemo(()=>[...caso.evidencias].map(e=>({...e,score:calcScore(e.puntajes_sistema)})).sort((a,b)=>b.score-a.score),[caso]);
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))", gap:14, marginBottom:20 }}>
        {[{title:"Tu priorización",items:rank.map(e=>({n:e.nombre,s:e.su})),ac:DS.blue900},{title:"Priorización sugerida",items:rankS.map(e=>({n:e.nombre,s:e.score})),ac:DS.blue600}].map(col=>(
          <div key={col.title} style={{ background:DS.slate50, border:`1px solid ${DS.slate200}`, borderRadius:10, padding:"14px 16px" }}>
            <div style={{ fontSize:10, fontWeight:600, color:DS.slate500, marginBottom:12, letterSpacing:"0.08em", textTransform:"uppercase", fontFamily:font }}>{col.title}</div>
            {col.items.map((e,i)=>(
              <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:9 }}>
                <span style={{ width:20, height:20, borderRadius:"50%", background:i===0?col.ac:DS.slate200, color:i===0?"#fff":DS.slate500, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, flexShrink:0, fontFamily:mono }}>{i+1}</span>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:12, fontWeight:600, color:DS.blue900, fontFamily:font, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{e.n}</div>
                  <div style={{ fontSize:10, color:DS.slate400, fontFamily:mono }}>score {e.s.toFixed(2)}</div>
                </div>
                <Chip score={e.s} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ background:"#fff", border:`1px solid ${DS.slate200}`, borderRadius:12, overflow:"hidden" }}>
        <div style={{ padding:"11px 16px", background:DS.blue900, display:"flex", alignItems:"center", gap:7 }}>
          <Icon name="bar-chart-2" size={14} color="rgba(255,255,255,0.6)" />
          <span style={{ color:"#fff", fontWeight:600, fontSize:13, fontFamily:font }}>Detalle técnico por evidencia</span>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12, fontFamily:font }}>
            <thead>
              <tr style={{ background:DS.slate50 }}>
                {["Evidencia","Prioridad","Complejidad técnica","Score propio","Score sistema"].map(h=>(
                  <th key={h} style={{ padding:"9px 13px", textAlign:h==="Evidencia"?"left":"center", color:DS.slate500, fontWeight:600, fontSize:10, letterSpacing:"0.05em", textTransform:"uppercase", borderBottom:`1px solid ${DS.slate200}` }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rank.map((e,i)=>(
                <tr key={e.id} style={{ borderTop:`1px solid ${DS.slate100}`, background:i%2===0?"#fff":DS.slate50 }}>
                  <td style={{ padding:"9px 13px", fontWeight:600, color:DS.blue900 }}>{e.nombre}</td>
                  <td style={{ padding:"9px 13px", textAlign:"center" }}><Chip score={e.su} /></td>
                  <td style={{ padding:"9px 13px", textAlign:"center" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:5 }}>
                      <div style={{ width:52, height:4, borderRadius:3, background:DS.slate200, overflow:"hidden" }}>
                        <div style={{ width:`${(Number(e.comp)/5)*100}%`, height:"100%", background:DS.blue600, borderRadius:3 }} />
                      </div>
                      <span style={{ color:DS.slate700, fontFamily:mono, fontSize:11 }}>{e.comp}</span>
                    </div>
                  </td>
                  <td style={{ padding:"9px 13px", textAlign:"center", fontWeight:700, color:nivel(e.su).color, fontFamily:mono }}>{e.su.toFixed(2)}</td>
                  <td style={{ padding:"9px 13px", textAlign:"center", color:DS.slate400, fontFamily:mono }}>{e.ss.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function TriageLab() {
  const [pantalla, setPantalla] = useState("inicio");
  const [caso, setCaso]         = useState(null);
  const [puntajes, setPuntajes] = useState({});
  const [expandidos, setExp]    = useState({});
  const [compare, setCompare]   = useState(false);

  const iniciar = (c) => {
    const p={};
    c.evidencias.forEach(e=>{p[e.id]={};CRITERIA.forEach(cr=>{p[e.id][cr.id]=3;});});
    setPuntajes(p); setExp({}); setCompare(false); setCaso(c); setPantalla("triage");
  };
  const handleChange = (eid,cid,v) => setPuntajes(prev=>({...prev,[eid]:{...prev[eid],[cid]:v}}));
  const toggleExp    = (id) => setExp(prev=>({...prev,[id]:!prev[id]}));
  const expandAll    = () => { const a={}; caso.evidencias.forEach(e=>a[e.id]=true); setExp(a); };

  const totalSliders  = caso?caso.evidencias.length*CRITERIA.length:0;
  const completados   = caso?Object.values(puntajes).reduce((s,ep)=>s+Object.keys(ep).length,0):0;
  const progreso      = totalSliders>0?Math.round((completados/totalSliders)*100):0;

  const btnPrimary  = { padding:"9px 20px", borderRadius:8, border:"none", background:DS.blue600, color:"#fff", cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:font, display:"flex", alignItems:"center", gap:6 };
  const btnSecondary= { padding:"9px 18px", borderRadius:8, border:`1px solid ${DS.slate200}`, background:"#fff", color:DS.slate600, cursor:"pointer", fontSize:13, fontFamily:font, display:"flex", alignItems:"center", gap:6 };
  const btnOutline  = { padding:"9px 18px", borderRadius:8, border:`1px solid ${DS.blue600}`, background:"#fff", color:DS.blue600, cursor:"pointer", fontSize:13, fontWeight:600, fontFamily:font, display:"flex", alignItems:"center", gap:6 };

  return (
    <div style={{ fontFamily:font, background:DS.slate50, minHeight:"100vh", width:"100%", overflowX:"hidden" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap'); * { box-sizing: border-box; }`}</style>

      {/* HEADER */}
      <header style={{ background:DS.blue900, padding:"0 20px", display:"flex", alignItems:"center", justifyContent:"space-between", height:54, position:"sticky", top:0, zIndex:100, width:"100%", boxSizing:"border-box" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <Isotipo size={32} />
          <span style={{ color:"#fff", fontWeight:400, fontSize:15, letterSpacing:"-0.01em" }}>
            Triage<strong style={{ fontWeight:700 }}>Lab</strong>
          </span>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:11, display:"none" }} className="hide-mobile">Evidencia Digital · Priorización Forense</span>
        </div>
        {pantalla!=="inicio" && (
          <button onClick={()=>{setPantalla("inicio");setCaso(null);}} style={{ display:"flex", alignItems:"center", gap:5, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.14)", color:"rgba(255,255,255,0.75)", padding:"5px 12px", borderRadius:7, cursor:"pointer", fontSize:12, fontFamily:font }}>
            <Icon name="arrow-left" size={12} color="rgba(255,255,255,0.75)" /> Inicio
          </button>
        )}
      </header>

      <main style={{ maxWidth:860, margin:"0 auto", padding:"22px 13px" }}>

        {/* ── INICIO ── */}
        {pantalla==="inicio" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:32 }}>
              <div style={{ marginBottom:14 }}><Isotipo size={72} /></div>
              <h1 style={{ fontSize:28, fontWeight:400, color:DS.blue900, margin:"0 0 8px", letterSpacing:"-0.02em" }}>
                Triage<strong style={{ fontWeight:800 }}>Lab</strong>
              </h1>
              <p style={{ fontSize:15, color:DS.slate500, maxWidth:460, margin:"0 auto 12px", lineHeight:1.65 }}>Simulador de priorización de evidencia digital en casos de cibercrimen</p>
              <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:DS.cyan50, color:DS.blue600, padding:"3px 12px", borderRadius:999, fontSize:11, fontWeight:600, letterSpacing:"0.03em", border:`1px solid ${DS.cyan400}44` }}>
                <Icon name="info" size={11} color={DS.blue600} /> Herramienta educativa · SNIC Argentina 2000–2024
              </span>
            </div>

            <div style={{ background:"#fff", border:`1px solid ${DS.slate200}`, borderRadius:14, padding:"22px 24px", marginBottom:24 }}>
              <h2 style={{ fontSize:15, color:DS.blue900, fontWeight:700, margin:"0 0 8px" }}>Qué es TriageLab</h2>
              <p style={{ color:DS.slate500, lineHeight:1.75, fontSize:13, marginBottom:18 }}>
                Simulador educativo de <strong style={{ color:DS.slate700 }}>triage de evidencia digital</strong> para investigadores, operadores judiciales y estudiantes de ciberseguridad forense. Permite practicar la valoración y priorización de evidencias en escenarios reales de cibercrimen.
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
                {[{num:"6",label:"Criterios de valoración",icon:"scale"},{num:"3",label:"Casos de cibercrimen",icon:"folder-open"},{num:"16",label:"Evidencias digitales",icon:"layers"}].map(item=>(
                  <div key={item.num} style={{ background:DS.slate50, border:`1px solid ${DS.slate200}`, borderRadius:10, padding:"12px 10px", textAlign:"center" }}>
                    <Icon name={item.icon} size={18} color={DS.blue600} style={{ display:"block", margin:"0 auto 6px" }} />
                    <div style={{ fontSize:24, fontWeight:800, color:DS.blue900, fontFamily:mono, lineHeight:1 }}>{item.num}</div>
                    <div style={{ fontSize:11, color:DS.slate500, marginTop:3 }}>{item.label}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize:10, fontWeight:600, color:DS.slate500, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Criterios de valoración</div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:8 }}>
                {CRITERIA.map(c=>(
                  <div key={c.id} style={{ display:"flex", gap:7, alignItems:"flex-start" }}>
                    <Icon name={c.icon} size={13} color={DS.blue600} style={{ marginTop:2, flexShrink:0 }} />
                    <div>
                      <div style={{ fontSize:12, fontWeight:600, color:DS.slate700 }}>{c.label}</div>
                      <div style={{ fontSize:11, color:DS.slate400, lineHeight:1.4 }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ fontSize:10, fontWeight:600, color:DS.slate500, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Seleccionar caso</div>
            <div style={{ display:"grid", gap:10 }}>
              {CASES.map(c=>(
                <div key={c.id} onClick={()=>iniciar(c)}
                  style={{ background:"#fff", border:`1px solid ${DS.slate200}`, borderRadius:13, padding:"18px 20px", cursor:"pointer", display:"flex", flexDirection:"column", gap:12 }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=DS.blue600;e.currentTarget.style.boxShadow=`0 4px 14px rgba(11,95,255,0.09)`;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=DS.slate200;e.currentTarget.style.boxShadow="none";}}>
                  <div>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
                      <div style={{ width:26, height:26, borderRadius:7, background:DS.blue50, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Icon name={c.icon} size={13} color={DS.blue600} />
                      </div>
                      <span style={{ fontSize:14, fontWeight:700, color:DS.blue900 }}>{c.titulo}</span>
                      <span style={{ fontSize:10, padding:"1px 7px", borderRadius:5, background:DS.slate100, color:DS.slate500, fontFamily:mono }}>{c.subtitulo}</span>
                    </div>
                    <p style={{ margin:"0 0 8px", fontSize:13, color:DS.slate500, lineHeight:1.6 }}>{c.descripcion}</p>
                    <div style={{ display:"flex", gap:5, flexWrap:"wrap" }}>
                      <span style={{ fontSize:10, padding:"1px 7px", borderRadius:4, background:DS.blue50, color:DS.blue600, fontFamily:mono, fontWeight:500 }}>SNIC {c.codigo_snic}</span>
                      <span style={{ fontSize:10, padding:"1px 7px", borderRadius:4, background:DS.slate100, color:DS.slate500, fontFamily:mono }}>{c.evidencias.length} evidencias</span>
                    </div>
                  </div>
                  <div style={{ background:DS.blue600, color:"#fff", padding:"9px 16px", borderRadius:8, fontSize:13, fontWeight:600, textAlign:"center", fontFamily:font }}>
                    Iniciar triage
                  </div>
                </div>
              ))}
            </div>
            <p style={{ marginTop:20, fontSize:11, color:DS.slate400, textAlign:"center", lineHeight:1.6 }}>
              Los casos son ficticios y de uso exclusivamente educativo. Datos estadísticos basados en el Sistema Nacional de Información Criminal (SNIC) — Argentina, 2000–2024.
            </p>
          </div>
        )}

        {/* ── TRIAGE ── */}
        {pantalla==="triage" && caso && (
          <div>
            <div style={{ background:"#fff", border:`1px solid ${DS.slate200}`, borderRadius:13, padding:"18px 20px", marginBottom:16 }}>
              <div style={{ display:"flex", gap:5, marginBottom:7, flexWrap:"wrap" }}>
                <span style={{ fontSize:10, padding:"1px 7px", borderRadius:4, background:DS.blue50, color:DS.blue600, fontFamily:mono, fontWeight:500 }}>SNIC {caso.codigo_snic}</span>
                <span style={{ fontSize:10, padding:"1px 7px", borderRadius:4, background:DS.slate100, color:DS.slate500, fontFamily:mono }}>{caso.subtitulo}</span>
              </div>
              <h2 style={{ fontSize:18, fontWeight:700, color:DS.blue900, margin:"0 0 5px" }}>{caso.titulo}</h2>
              <p style={{ margin:"0 0 12px", fontSize:13, color:DS.slate500, lineHeight:1.65 }}>{caso.descripcion}</p>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ flex:1, background:DS.slate200, borderRadius:999, height:5, overflow:"hidden" }}>
                  <div style={{ width:`${progreso}%`, height:"100%", background:DS.blue600, borderRadius:999, transition:"width 0.3s" }} />
                </div>
                <span style={{ fontSize:10, color:DS.slate500, fontFamily:mono, whiteSpace:"nowrap" }}>{progreso}% valorado</span>
              </div>
            </div>

            <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
              <button onClick={expandAll} style={btnSecondary}><Icon name="chevron-down" size={13} /> Expandir todo</button>
              <button onClick={()=>setExp({})} style={btnSecondary}><Icon name="chevron-up" size={13} /> Colapsar todo</button>
              <div style={{ flex:1 }} />
              <button onClick={()=>setPantalla("resultados")} style={btnPrimary}>Ver resultados <Icon name="bar-chart-2" size={14} color="#fff" /></button>
            </div>

            {caso.evidencias.map(ev=>(
              <EvidCard key={ev.id} ev={ev} pu={puntajes[ev.id]||{}} onChange={(cid,v)=>handleChange(ev.id,cid,v)} compare={compare} open={!!expandidos[ev.id]} onToggle={()=>toggleExp(ev.id)} />
            ))}

            <div style={{ display:"flex", justifyContent:"flex-end", marginTop:14 }}>
              <button onClick={()=>setPantalla("resultados")} style={{ ...btnPrimary, background:DS.blue900, padding:"10px 26px", fontSize:14 }}>Calcular priorización</button>
            </div>
          </div>
        )}

        {/* ── RESULTADOS ── */}
        {pantalla==="resultados" && caso && (
          <div>
            <div style={{ background:DS.blue900, borderRadius:13, padding:"20px 22px", marginBottom:20, color:"#fff" }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,0.45)", marginBottom:3, letterSpacing:"0.1em", textTransform:"uppercase" }}>Resultados del triage</div>
              <h2 style={{ fontSize:19, fontWeight:700, margin:"0 0 3px" }}>{caso.titulo}</h2>
              <p style={{ margin:0, fontSize:12, color:"rgba(255,255,255,0.55)" }}>{caso.categoria}</p>
            </div>

            <Resultados caso={caso} pu={puntajes} />

            <div style={{ display:"flex", gap:9, marginTop:20, flexWrap:"wrap" }}>
              <button onClick={()=>{setCompare(true);setPantalla("triage");expandAll&&expandAll();const a={};caso.evidencias.forEach(e=>a[e.id]=true);setExp(a);}} style={btnOutline}>
                <Icon name="git-compare" size={14} color={DS.blue600} /> Comparar con el sistema
              </button>
              <button onClick={()=>setPantalla("inicio")} style={btnSecondary}>
                <Icon name="arrow-left" size={13} /> Elegir otro caso
              </button>
            </div>

            <div style={{ marginTop:24, padding:"13px 16px", background:"#fff", border:`1px solid ${DS.slate200}`, borderRadius:9, fontSize:11, color:DS.slate400, lineHeight:1.65 }}>
              <strong style={{ color:DS.slate600 }}>Nota metodológica.</strong> Los puntajes del sistema fueron calibrados considerando jurisprudencia argentina, estándares RFC 3227 y normativa procesal penal vigente. Los casos se basan en categorías del Sistema Nacional de Información Criminal (SNIC).
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
