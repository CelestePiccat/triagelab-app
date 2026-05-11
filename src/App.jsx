import { useState, useMemo } from "react";

const CRITERIA = [
  { id: "relevancia", label: "Relevancia probatoria", icon: "⚖️", desc: "¿Qué tan relevante es esta evidencia para probar el delito?" },
  { id: "volatilidad", label: "Volatilidad del dato", icon: "💨", desc: "¿Con qué rapidez puede perderse o alterarse esta evidencia?" },
  { id: "urgencia", label: "Urgencia investigativa", icon: "🚨", desc: "¿Qué tan urgente es obtener esta evidencia para la investigación?" },
  { id: "riesgo_perdida", label: "Riesgo de pérdida", icon: "⚠️", desc: "¿Cuál es la probabilidad de que esta evidencia desaparezca?" },
  { id: "complejidad", label: "Complejidad técnica", icon: "🔧", desc: "¿Qué nivel de expertise técnico se requiere para recuperarla?" },
  { id: "trazabilidad", label: "Exigencia de trazabilidad", icon: "🔗", desc: "¿Qué tan estricta es la cadena de custodia requerida?" },
];

const CASES = [
  {
    id: "caso1",
    titulo: "Caso 1: Fraude por phishing bancario",
    subtitulo: "Buenos Aires · 2023",
    descripcion: "Una empresa de logística de Córdoba detecta que durante 3 semanas sus empleados recibieron correos de phishing que imitaban al banco corporativo. Cinco empleados ingresaron sus credenciales. Se detectaron transferencias no autorizadas por $4.2M ARS hacia cuentas fantasma. El sistema de facturación fue accedido sin autorización.",
    categoria: "Delitos contra la propiedad – Estafas y defraudaciones asistidas virtualmente",
    codigo_snic: "21_4 / 214",
    evidencias: [
      {
        id: "e1",
        nombre: "Correos electrónicos de phishing",
        tipo: "Email",
        descripcion: "Emails recibidos con enlaces maliciosos, headers de origen, metadatos SMTP y archivos adjuntos sospechosos.",
        puntajes_sistema: { relevancia: 5, volatilidad: 4, urgencia: 5, riesgo_perdida: 4, complejidad: 3, trazabilidad: 5 },
        justificacion: "Constituye la prueba directa del modus operandi. Los headers SMTP permiten rastrear la infraestructura atacante. Alta volatilidad porque los servidores de correo rotan logs.",
      },
      {
        id: "e2",
        nombre: "Logs de autenticación del banco",
        tipo: "Log de sistema",
        descripcion: "Registros de acceso al homebanking corporativo: IPs, timestamps, user-agents, intentos fallidos y exitosos.",
        puntajes_sistema: { relevancia: 5, volatilidad: 5, urgencia: 5, riesgo_perdida: 5, complejidad: 2, trazabilidad: 5 },
        justificacion: "Evidencia crítica y altamente volátil. Los bancos conservan logs por períodos limitados. Requiere medida cautelar urgente para preservación.",
      },
      {
        id: "e3",
        nombre: "Equipos de los empleados afectados",
        tipo: "Hardware",
        descripcion: "PCs y laptops donde se ingresaron las credenciales. Posible presencia de keyloggers, malware o cookies de sesión robadas.",
        puntajes_sistema: { relevancia: 4, volatilidad: 3, urgencia: 4, riesgo_perdida: 3, complejidad: 4, trazabilidad: 5 },
        justificacion: "Pueden contener artefactos forenses del ataque. Requiere imagen forense para preservar integridad. Complejidad técnica media-alta.",
      },
      {
        id: "e4",
        nombre: "Registros de transferencias bancarias",
        tipo: "Documento financiero",
        descripcion: "Comprobantes de las transferencias fraudulentas, datos de cuentas destino, montos, fechas y entidades receptoras.",
        puntajes_sistema: { relevancia: 5, volatilidad: 2, urgencia: 4, riesgo_perdida: 2, complejidad: 1, trazabilidad: 4 },
        justificacion: "Evidencia documental sólida para cuantificar el daño. Relativamente estable. Esencial para el delito patrimonial.",
      },
      {
        id: "e5",
        nombre: "Servidores de phishing activos",
        tipo: "Infraestructura digital",
        descripcion: "Dominios y servidores usados para alojar las páginas falsas. Posible identificación de atacantes a través de WHOIS, hosting y certificados.",
        puntajes_sistema: { relevancia: 4, volatilidad: 5, urgencia: 5, riesgo_perdida: 5, complejidad: 5, trazabilidad: 4 },
        justificacion: "Máxima volatilidad: los atacantes suelen dar de baja la infraestructura en horas. Requiere actuación inmediata y cooperación internacional.",
      },
    ],
  },
  {
    id: "caso2",
    titulo: "Caso 2: Ransomware en hospital público",
    subtitulo: "Rosario · 2024",
    descripcion: "El sistema informático del Hospital Regional de Rosario fue cifrado por ransomware. Se vieron afectados 1.200 historias clínicas, el sistema de turnos y equipos de diagnóstico conectados en red. Los atacantes exigen 50 BTC de rescate. Los servicios de urgencias debieron operar en modo manual por 72 horas.",
    categoria: "Acceso ilegal a sistemas informáticos y daños informáticos",
    codigo_snic: "21_6 / 216",
    evidencias: [
      {
        id: "e1",
        nombre: "Imagen forense de servidores infectados",
        tipo: "Hardware / Imagen forense",
        descripcion: "Copia bit-a-bit de los servidores afectados: muestra del ransomware, vector de entrada, archivos cifrados y posibles IOCs.",
        puntajes_sistema: { relevancia: 5, volatilidad: 3, urgencia: 5, riesgo_perdida: 4, complejidad: 5, trazabilidad: 5 },
        justificacion: "Evidencia maestra del caso. Permite análisis de malware, identificación de la variante y posible atribución. Requiere laboratorio forense especializado.",
      },
      {
        id: "e2",
        nombre: "Logs de red y firewall",
        tipo: "Log de sistema",
        descripcion: "Tráfico entrante/saliente previo al ataque, conexiones C2 (command & control), exfiltración de datos y movimiento lateral.",
        puntajes_sistema: { relevancia: 5, volatilidad: 5, urgencia: 5, riesgo_perdida: 5, complejidad: 4, trazabilidad: 5 },
        justificacion: "Crítico para reconstruir la cadena de ataque. Extremadamente volátil: los dispositivos de red sobrescriben logs continuamente. Actuación inmediata.",
      },
      {
        id: "e3",
        nombre: "Nota de rescate y wallet Bitcoin",
        tipo: "Documento digital",
        descripcion: "Archivo de rescate dejado por los atacantes, dirección Bitcoin, instrucciones y posible identificación del grupo criminal.",
        puntajes_sistema: { relevancia: 4, volatilidad: 2, urgencia: 3, riesgo_perdida: 2, complejidad: 3, trazabilidad: 3 },
        justificacion: "Permite identificar el grupo atacante y rastrear el wallet en blockchain. Relativamente estable. Útil para inteligencia criminal.",
      },
      {
        id: "e4",
        nombre: "Historial de accesos al sistema de salud",
        tipo: "Log de aplicación",
        descripcion: "Registro de usuarios, privilegios de acceso, cambios de configuración y cuentas comprometidas previo al incidente.",
        puntajes_sistema: { relevancia: 4, volatilidad: 4, urgencia: 4, riesgo_perdida: 4, complejidad: 3, trazabilidad: 5 },
        justificacion: "Permite identificar el punto de entrada y posibles cómplices internos. Protegido por normativa de datos de salud: cadena de custodia rigurosa.",
      },
      {
        id: "e5",
        nombre: "Comunicaciones de los atacantes",
        tipo: "Comunicación digital",
        descripcion: "Mensajes intercambiados con los atacantes a través del canal proporcionado, posibles metadatos, idioma y huella lingüística.",
        puntajes_sistema: { relevancia: 3, volatilidad: 4, urgencia: 3, riesgo_perdida: 4, complejidad: 3, trazabilidad: 3 },
        justificacion: "Puede revelar características del atacante. Útil para perfil lingüístico y negociación táctica. Moderada prioridad.",
      },
      {
        id: "e6",
        nombre: "Backups y sistemas de recuperación",
        tipo: "Infraestructura",
        descripcion: "Estado de los sistemas de respaldo antes del ataque: si fueron afectados, última fecha de backup limpio, integridad.",
        puntajes_sistema: { relevancia: 3, volatilidad: 2, urgencia: 4, riesgo_perdida: 3, complejidad: 2, trazabilidad: 2 },
        justificacion: "Fundamental para recuperación operativa. Menor prioridad forense pero alta urgencia institucional. Puede demostrar negligencia o buena práctica.",
      },
    ],
  },
  {
    id: "caso3",
    titulo: "Caso 3: Grooming y explotación digital de menores",
    subtitulo: "Mendoza · 2024",
    descripcion: "La madre de una menor de 13 años denuncia que un adulto desconocido estableció contacto a través de una red social, solicitó imágenes de carácter sexual y amenazó con publicarlas. Se detectaron conversaciones durante 4 meses. El sospechoso usaba perfiles falsos en al menos tres plataformas distintas.",
    categoria: "Abusos sexuales / Otros delitos contra la integridad sexual",
    codigo_snic: "10, 11",
    evidencias: [
      {
        id: "e1",
        nombre: "Dispositivo móvil de la víctima",
        tipo: "Hardware",
        descripcion: "Smartphone con todas las conversaciones, imágenes recibidas/enviadas, datos de contacto y metadatos de las comunicaciones.",
        puntajes_sistema: { relevancia: 5, volatilidad: 4, urgencia: 5, riesgo_perdida: 4, complejidad: 4, trazabilidad: 5 },
        justificacion: "Evidencia primaria. Contiene todo el historial del delito. Requiere extracción forense certificada. Sensibilidad extrema: protección de la víctima menor.",
      },
      {
        id: "e2",
        nombre: "Cuentas y perfiles en redes sociales",
        tipo: "Cuenta digital",
        descripcion: "Perfiles falsos usados por el agresor: IP de registro, dispositivos vinculados, historial de actividad y posibles vínculos con otras cuentas.",
        puntajes_sistema: { relevancia: 5, volatilidad: 5, urgencia: 5, riesgo_perdida: 5, complejidad: 3, trazabilidad: 4 },
        justificacion: "Máxima urgencia: las plataformas eliminan datos de cuentas denunciadas en plazos muy cortos. Requiere medida cautelar inmediata con orden judicial.",
      },
      {
        id: "e3",
        nombre: "Registros de IP y metadatos de mensajes",
        tipo: "Log de plataforma",
        descripcion: "IPs de conexión, timestamps, geolocalización aproximada y dispositivos usados por el agresor para contactar a la víctima.",
        puntajes_sistema: { relevancia: 5, volatilidad: 5, urgencia: 5, riesgo_perdida: 5, complejidad: 3, trazabilidad: 5 },
        justificacion: "Esencial para identificar al agresor. Dato altamente volátil según las políticas de retención de cada plataforma. Prioridad máxima.",
      },
      {
        id: "e4",
        nombre: "Imágenes y archivos intercambiados",
        tipo: "Contenido digital",
        descripcion: "Material intercambiado en el chat: imágenes, videos, documentos. Análisis de metadatos EXIF puede geolocalizar al agresor.",
        puntajes_sistema: { relevancia: 5, volatilidad: 3, urgencia: 4, riesgo_perdida: 3, complejidad: 4, trazabilidad: 5 },
        justificacion: "Prueba directa del delito. Los metadatos EXIF pueden ser fundamentales para identificación. Manejo estrictamente confidencial por protección de la víctima.",
      },
      {
        id: "e5",
        nombre: "Declaraciones de testigos digitales",
        tipo: "Testimonio",
        descripcion: "Amigos de la víctima que fueron informados, posibles otras víctimas identificadas y capturas de pantalla aportadas por terceros.",
        puntajes_sistema: { relevancia: 3, volatilidad: 2, urgencia: 3, riesgo_perdida: 2, complejidad: 1, trazabilidad: 3 },
        justificacion: "Complementa la evidencia técnica. Puede revelar patrón de victimización múltiple. Requiere protocolo de atención a víctimas para su obtención.",
      },
    ],
  },
];

const NIVEL_PRIORIDAD = (score) => {
  if (score >= 4.2) return { label: "CRÍTICA", color: "#C0392B", bg: "#FADBD8" };
  if (score >= 3.4) return { label: "ALTA", color: "#E67E22", bg: "#FDEBD0" };
  if (score >= 2.5) return { label: "MEDIA", color: "#2980B9", bg: "#D6EAF8" };
  return { label: "BAJA", color: "#27AE60", bg: "#D5F5E3" };
};

const calcularScore = (puntajes) => {
  const vals = Object.values(puntajes);
  return vals.reduce((a, b) => a + b, 0) / vals.length;
};

const calcularComplejidadTecnica = (puntajes) => {
  return ((puntajes.complejidad + puntajes.trazabilidad) / 2).toFixed(1);
};

function ScoreSlider({ valor, onChange, disabled }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={valor}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        style={{ flex: 1, accentColor: "#1a3a5c" }}
      />
      <span style={{
        minWidth: 28,
        height: 28,
        borderRadius: 6,
        background: valor >= 4 ? "#1a3a5c" : valor >= 3 ? "#2980B9" : "#95a5a6",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: 14,
      }}>{valor}</span>
    </div>
  );
}

function EvidenciaCard({ evidencia, puntajesUsuario, onPuntajeChange, mostrarComparacion, isExpanded, onToggle }) {
  const scoreUsuario = calcularScore(puntajesUsuario);
  const scoreSistema = calcularScore(evidencia.puntajes_sistema);
  const nivelU = NIVEL_PRIORIDAD(scoreUsuario);
  const nivelS = NIVEL_PRIORIDAD(scoreSistema);

  return (
    <div style={{
      border: "1px solid #dce3ea",
      borderRadius: 12,
      marginBottom: 16,
      background: "#fff",
      overflow: "hidden",
      boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
    }}>
      <div
        onClick={onToggle}
        style={{
          padding: "14px 20px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: isExpanded ? "#f0f4f8" : "#fff",
          borderBottom: isExpanded ? "1px solid #dce3ea" : "none",
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: "#1a3a5c" }}>{evidencia.nombre}</span>
            <span style={{
              fontSize: 11,
              padding: "2px 8px",
              borderRadius: 20,
              background: "#e8f0fe",
              color: "#1a56db",
              fontWeight: 500,
            }}>{evidencia.tipo}</span>
            <span style={{
              fontSize: 11,
              padding: "2px 10px",
              borderRadius: 20,
              background: nivelU.bg,
              color: nivelU.color,
              fontWeight: 700,
              letterSpacing: 0.5,
            }}>{nivelU.label}</span>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 13, color: "#5a6a7a" }}>{evidencia.descripcion}</p>
        </div>
        <div style={{ marginLeft: 16, fontSize: 20, color: "#5a6a7a" }}>{isExpanded ? "▲" : "▼"}</div>
      </div>

      {isExpanded && (
        <div style={{ padding: "20px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {CRITERIA.map((c) => (
              <div key={c.id}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#34495e", marginBottom: 4 }}>
                  {c.icon} {c.label}
                </div>
                <div style={{ fontSize: 11, color: "#7f8c8d", marginBottom: 6 }}>{c.desc}</div>
                <ScoreSlider
                  valor={puntajesUsuario[c.id]}
                  onChange={(v) => onPuntajeChange(c.id, v)}
                />
                {mostrarComparacion && (
                  <div style={{ fontSize: 11, color: "#7f8c8d", marginTop: 3 }}>
                    Sistema sugiere: <strong style={{ color: "#1a3a5c" }}>{evidencia.puntajes_sistema[c.id]}</strong>
                    {puntajesUsuario[c.id] !== evidencia.puntajes_sistema[c.id] && (
                      <span style={{ color: puntajesUsuario[c.id] > evidencia.puntajes_sistema[c.id] ? "#E67E22" : "#8e44ad", marginLeft: 4 }}>
                        ({puntajesUsuario[c.id] > evidencia.puntajes_sistema[c.id] ? "+" : ""}{puntajesUsuario[c.id] - evidencia.puntajes_sistema[c.id]})
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {mostrarComparacion && (
            <div style={{
              marginTop: 20,
              padding: "14px 16px",
              background: "#f8f9fb",
              borderRadius: 8,
              borderLeft: "3px solid #1a3a5c",
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#1a3a5c", marginBottom: 6 }}>
                📋 Justificación del sistema
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#2c3e50", lineHeight: 1.6 }}>{evidencia.justificacion}</p>
              <div style={{ marginTop: 10, display: "flex", gap: 20, fontSize: 12 }}>
                <span>Tu score promedio: <strong style={{ color: nivelU.color }}>{scoreUsuario.toFixed(2)}</strong></span>
                <span>Score sistema: <strong style={{ color: nivelS.color }}>{scoreSistema.toFixed(2)}</strong></span>
                <span>Diferencia: <strong>{(scoreUsuario - scoreSistema).toFixed(2)}</strong></span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResultadosPanel({ caso, puntajesUsuario }) {
  const ranking = useMemo(() => {
    return caso.evidencias
      .map((e) => ({
        ...e,
        scoreUsuario: calcularScore(puntajesUsuario[e.id]),
        scoreSistema: calcularScore(e.puntajes_sistema),
        compTecnica: calcularComplejidadTecnica(puntajesUsuario[e.id]),
      }))
      .sort((a, b) => b.scoreUsuario - a.scoreUsuario);
  }, [caso, puntajesUsuario]);

  const rankingSistema = useMemo(() => {
    return [...caso.evidencias]
      .map((e) => ({ ...e, score: calcularScore(e.puntajes_sistema) }))
      .sort((a, b) => b.score - a.score);
  }, [caso]);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 28 }}>
        <div style={{ background: "#f0f4f8", borderRadius: 10, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#5a6a7a", marginBottom: 12, letterSpacing: 1 }}>
            TU PRIORIZACIÓN
          </div>
          {ranking.map((e, i) => {
            const nivel = NIVEL_PRIORIDAD(e.scoreUsuario);
            return (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i === 0 ? "#1a3a5c" : "#cdd6df",
                  color: i === 0 ? "#fff" : "#5a6a7a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a3a5c" }}>{e.nombre}</div>
                  <div style={{ fontSize: 11, color: "#7f8c8d" }}>Score: {e.scoreUsuario.toFixed(2)}</div>
                </div>
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 20,
                  background: nivel.bg, color: nivel.color, fontWeight: 700,
                }}>{nivel.label}</span>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#f0f4f8", borderRadius: 10, padding: "18px 20px" }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: "#5a6a7a", marginBottom: 12, letterSpacing: 1 }}>
            PRIORIZACIÓN SUGERIDA
          </div>
          {rankingSistema.map((e, i) => {
            const nivel = NIVEL_PRIORIDAD(e.score);
            return (
              <div key={e.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  background: i === 0 ? "#2980B9" : "#cdd6df",
                  color: i === 0 ? "#fff" : "#5a6a7a",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 700,
                }}>{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#1a3a5c" }}>{e.nombre}</div>
                  <div style={{ fontSize: 11, color: "#7f8c8d" }}>Score: {e.score.toFixed(2)}</div>
                </div>
                <span style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 20,
                  background: nivel.bg, color: nivel.color, fontWeight: 700,
                }}>{nivel.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ background: "#fff", border: "1px solid #dce3ea", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", background: "#1a3a5c" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Detalle técnico por evidencia</span>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: "#f0f4f8" }}>
              <th style={{ padding: "10px 16px", textAlign: "left", color: "#5a6a7a", fontWeight: 600 }}>Evidencia</th>
              <th style={{ padding: "10px 16px", textAlign: "center", color: "#5a6a7a", fontWeight: 600 }}>Prioridad</th>
              <th style={{ padding: "10px 16px", textAlign: "center", color: "#5a6a7a", fontWeight: 600 }}>Complejidad técnica</th>
              <th style={{ padding: "10px 16px", textAlign: "center", color: "#5a6a7a", fontWeight: 600 }}>Score usuario</th>
              <th style={{ padding: "10px 16px", textAlign: "center", color: "#5a6a7a", fontWeight: 600 }}>Score sistema</th>
            </tr>
          </thead>
          <tbody>
            {ranking.map((e, i) => {
              const nivel = NIVEL_PRIORIDAD(e.scoreUsuario);
              return (
                <tr key={e.id} style={{ borderTop: "1px solid #f0f4f8", background: i % 2 === 0 ? "#fff" : "#fafbfc" }}>
                  <td style={{ padding: "10px 16px", fontWeight: 600, color: "#1a3a5c" }}>{e.nombre}</td>
                  <td style={{ padding: "10px 16px", textAlign: "center" }}>
                    <span style={{
                      fontSize: 11, padding: "2px 10px", borderRadius: 20,
                      background: nivel.bg, color: nivel.color, fontWeight: 700,
                    }}>{nivel.label}</span>
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                      <div style={{ width: 60, height: 6, borderRadius: 3, background: "#e0e6ed", overflow: "hidden" }}>
                        <div style={{
                          width: `${(Number(e.compTecnica) / 5) * 100}%`,
                          height: "100%",
                          background: "#1a3a5c",
                          borderRadius: 3,
                        }} />
                      </div>
                      <span style={{ color: "#1a3a5c", fontWeight: 600 }}>{e.compTecnica}</span>
                    </div>
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "center", fontWeight: 700, color: nivel.color }}>
                    {e.scoreUsuario.toFixed(2)}
                  </td>
                  <td style={{ padding: "10px 16px", textAlign: "center", color: "#5a6a7a" }}>
                    {e.scoreSistema.toFixed(2)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function TriageLab() {
  const [pantalla, setPantalla] = useState("inicio");
  const [casoSeleccionado, setCasoSeleccionado] = useState(null);
  const [puntajes, setPuntajes] = useState({});
  const [expandidos, setExpandidos] = useState({});
  const [mostrarResultados, setMostrarResultados] = useState(false);
  const [mostrarComparacion, setMostrarComparacion] = useState(false);

  const iniciarCaso = (caso) => {
    const puntajesIniciales = {};
    caso.evidencias.forEach((e) => {
      puntajesIniciales[e.id] = {};
      CRITERIA.forEach((c) => {
        puntajesIniciales[e.id][c.id] = 3;
      });
    });
    setPuntajes(puntajesIniciales);
    setExpandidos({});
    setMostrarResultados(false);
    setMostrarComparacion(false);
    setCasoSeleccionado(caso);
    setPantalla("triage");
  };

  const handlePuntajeChange = (evidenciaId, criterioId, valor) => {
    setPuntajes((prev) => ({
      ...prev,
      [evidenciaId]: { ...prev[evidenciaId], [criterioId]: valor },
    }));
  };

  const toggleExpandido = (id) => {
    setExpandidos((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalSliders = casoSeleccionado ? casoSeleccionado.evidencias.length * CRITERIA.length : 0;
  const completados = casoSeleccionado
    ? Object.values(puntajes).reduce((sum, ep) => sum + Object.keys(ep).length, 0)
    : 0;
  const progreso = totalSliders > 0 ? Math.round((completados / totalSliders) * 100) : 0;

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#f5f7fa",
      minHeight: "100vh",
    }}>
      {/* Header */}
      <div style={{
        background: "#1a3a5c",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: 60,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 20,
          }}>🔬</div>
          <div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18, letterSpacing: 1 }}>TriageLab</span>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, marginLeft: 8 }}>Evidencia Digital · Priorización Forense</span>
          </div>
        </div>
        {pantalla !== "inicio" && (
          <button
            onClick={() => { setPantalla("inicio"); setCasoSeleccionado(null); }}
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#fff",
              padding: "6px 16px",
              borderRadius: 6,
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            ← Volver al inicio
          </button>
        )}
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
        {/* ======================== PANTALLA INICIO ======================== */}
        {pantalla === "inicio" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
              <h1 style={{ fontSize: 36, fontWeight: 700, color: "#1a3a5c", margin: "0 0 8px" }}>TriageLab</h1>
              <p style={{ fontSize: 18, color: "#5a6a7a", maxWidth: 560, margin: "0 auto 16px" }}>
                Simulador de priorización de evidencia digital en casos de cibercrimen
              </p>
              <div style={{
                display: "inline-block",
                background: "#e8f0fe",
                color: "#1a3a5c",
                padding: "4px 14px",
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: 0.5,
              }}>
                Herramienta educativa · Basada en datos SNIC Argentina 2000–2024
              </div>
            </div>

            <div style={{
              background: "#fff",
              border: "1px solid #dce3ea",
              borderRadius: 14,
              padding: "28px 32px",
              marginBottom: 36,
            }}>
              <h2 style={{ fontSize: 18, color: "#1a3a5c", fontWeight: 700, marginBottom: 16 }}>¿Qué es TriageLab?</h2>
              <p style={{ color: "#2c3e50", lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>
                TriageLab es un simulador educativo de <strong>triage de evidencia digital</strong> para investigadores,
                operadores judiciales y estudiantes de ciberseguridad forense. Permite practicar la valoración y priorización
                de evidencias en escenarios reales de cibercrimen.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
                {[
                  { num: "6", label: "Criterios de valoración", icon: "📊" },
                  { num: "3", label: "Casos de cibercrimen", icon: "🗂️" },
                  { num: "16", label: "Evidencias digitales", icon: "🧩" },
                ].map((item) => (
                  <div key={item.num} style={{
                    background: "#f0f4f8",
                    borderRadius: 10,
                    padding: "16px",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>{item.icon}</div>
                    <div style={{ fontSize: 28, fontWeight: 700, color: "#1a3a5c" }}>{item.num}</div>
                    <div style={{ fontSize: 12, color: "#5a6a7a" }}>{item.label}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a3a5c", marginBottom: 12 }}>Criterios de valoración</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
                  {CRITERIA.map((c) => (
                    <div key={c.id} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ fontSize: 16 }}>{c.icon}</span>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#1a3a5c" }}>{c.label}</div>
                        <div style={{ fontSize: 11, color: "#7f8c8d" }}>{c.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a3a5c", marginBottom: 20 }}>Seleccionar caso</h2>
            <div style={{ display: "grid", gap: 16 }}>
              {CASES.map((caso) => (
                <div
                  key={caso.id}
                  onClick={() => iniciarCaso(caso)}
                  style={{
                    background: "#fff",
                    border: "1px solid #dce3ea",
                    borderRadius: 14,
                    padding: "24px 28px",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    alignItems: "center",
                    gap: 20,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#1a3a5c"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(26,58,92,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#dce3ea"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 18, fontWeight: 700, color: "#1a3a5c" }}>{caso.titulo}</span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#f0f4f8", color: "#5a6a7a" }}>
                        {caso.subtitulo}
                      </span>
                    </div>
                    <p style={{ margin: "0 0 10px", fontSize: 14, color: "#5a6a7a", lineHeight: 1.6 }}>{caso.descripcion}</p>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#e8f0fe", color: "#1a56db" }}>
                        SNIC: {caso.codigo_snic}
                      </span>
                      <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#f0f4f8", color: "#5a6a7a" }}>
                        {caso.evidencias.length} evidencias
                      </span>
                    </div>
                  </div>
                  <div style={{
                    background: "#1a3a5c",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: 8,
                    fontSize: 14,
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}>
                    Iniciar triage →
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 32,
              padding: "14px 20px",
              background: "#fff",
              border: "1px solid #dce3ea",
              borderRadius: 10,
              fontSize: 12,
              color: "#7f8c8d",
              textAlign: "center",
            }}>
              Los casos son ficticios y de uso educativo. Datos estadísticos basados en el Sistema Nacional de Información Criminal (SNIC) — Argentina, 2000–2024.
            </div>
          </div>
        )}

        {/* ======================== PANTALLA TRIAGE ======================== */}
        {pantalla === "triage" && casoSeleccionado && (
          <div>
            <div style={{
              background: "#fff",
              border: "1px solid #dce3ea",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 24,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#e8f0fe", color: "#1a56db", fontWeight: 600 }}>
                      SNIC {casoSeleccionado.codigo_snic}
                    </span>
                    <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 20, background: "#f0f4f8", color: "#5a6a7a" }}>
                      {casoSeleccionado.subtitulo}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1a3a5c", margin: "0 0 8px" }}>{casoSeleccionado.titulo}</h2>
                  <p style={{ margin: 0, fontSize: 14, color: "#5a6a7a", lineHeight: 1.7 }}>{casoSeleccionado.descripcion}</p>
                </div>
              </div>

              <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ flex: 1, background: "#f0f4f8", borderRadius: 8, height: 8, overflow: "hidden" }}>
                  <div style={{
                    width: `${progreso}%`,
                    height: "100%",
                    background: "#1a3a5c",
                    borderRadius: 8,
                    transition: "width 0.3s",
                  }} />
                </div>
                <span style={{ fontSize: 12, color: "#5a6a7a", whiteSpace: "nowrap" }}>
                  {progreso}% valorado
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  const allExpanded = {};
                  casoSeleccionado.evidencias.forEach((e) => { allExpanded[e.id] = true; });
                  setExpandidos(allExpanded);
                }}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid #dce3ea",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#1a3a5c",
                }}
              >
                ▼ Expandir todo
              </button>
              <button
                onClick={() => setExpandidos({})}
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  border: "1px solid #dce3ea",
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 13,
                  color: "#1a3a5c",
                }}
              >
                ▲ Colapsar todo
              </button>
              <div style={{ flex: 1 }} />
              <button
                onClick={() => {
                  setMostrarResultados(true);
                  setPantalla("resultados");
                }}
                style={{
                  padding: "10px 24px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1a3a5c",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                Ver resultados →
              </button>
            </div>

            {casoSeleccionado.evidencias.map((ev) => (
              <EvidenciaCard
                key={ev.id}
                evidencia={ev}
                puntajesUsuario={puntajes[ev.id] || {}}
                onPuntajeChange={(criterioId, valor) => handlePuntajeChange(ev.id, criterioId, valor)}
                mostrarComparacion={mostrarComparacion}
                isExpanded={!!expandidos[ev.id]}
                onToggle={() => toggleExpandido(ev.id)}
              />
            ))}

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
              <button
                onClick={() => {
                  setMostrarResultados(true);
                  setPantalla("resultados");
                }}
                style={{
                  padding: "12px 32px",
                  borderRadius: 8,
                  border: "none",
                  background: "#1a3a5c",
                  color: "#fff",
                  cursor: "pointer",
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                Calcular priorización →
              </button>
            </div>
          </div>
        )}

        {/* ======================== PANTALLA RESULTADOS ======================== */}
        {pantalla === "resultados" && casoSeleccionado && (
          <div>
            <div style={{
              background: "#1a3a5c",
              borderRadius: 14,
              padding: "24px 28px",
              marginBottom: 28,
              color: "#fff",
            }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 6, letterSpacing: 1 }}>
                RESULTADOS DEL TRIAGE
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{casoSeleccionado.titulo}</h2>
              <p style={{ margin: 0, fontSize: 13, color: "rgba(255,255,255,0.7)" }}>{casoSeleccionado.categoria}</p>
            </div>

            <ResultadosPanel caso={casoSeleccionado} puntajesUsuario={puntajes} />

            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setMostrarComparacion(true);
                  setPantalla("triage");
                  const allExpanded = {};
                  casoSeleccionado.evidencias.forEach((e) => { allExpanded[e.id] = true; });
                  setExpandidos(allExpanded);
                }}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "1px solid #1a3a5c",
                  background: "#fff",
                  color: "#1a3a5c",
                  cursor: "pointer",
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                🔍 Comparar con el sistema
              </button>
              <button
                onClick={() => setPantalla("inicio")}
                style={{
                  padding: "10px 20px",
                  borderRadius: 8,
                  border: "1px solid #dce3ea",
                  background: "#fff",
                  color: "#5a6a7a",
                  cursor: "pointer",
                  fontSize: 14,
                }}
              >
                ← Elegir otro caso
              </button>
            </div>

            <div style={{
              marginTop: 32,
              padding: "16px 20px",
              background: "#fff",
              border: "1px solid #dce3ea",
              borderRadius: 10,
              fontSize: 12,
              color: "#7f8c8d",
            }}>
              <strong style={{ color: "#1a3a5c" }}>Nota metodológica:</strong> Los puntajes del sistema fueron calibrados por analistas forenses considerando jurisprudencia argentina, estándares RFC 3227 y normativa procesal penal vigente. Los casos se basan en categorías del SNIC (Sistema Nacional de Información Criminal).
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
