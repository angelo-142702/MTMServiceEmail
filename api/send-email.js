const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

// Tu correo donde recibirás los mensajes
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || "tu@empresa.com";
const COMPANY_NAME = "MTM Services HVAC";
const FRONTEND_URL = "https://gestion-de-frio.vercel.app";

// Plantilla HTML moderna para el correo
function buildEmailHtml({ nombre, telefono, correo, mensaje }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nuevo Contacto</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#0a2540 0%,#1a4a7a 60%,#00aaff 100%);border-radius:16px 16px 0 0;padding:40px 40px 32px;text-align:center;">
              <div style="display:inline-block;background:rgba(255,255,255,0.12);border:1.5px solid rgba(255,255,255,0.25);border-radius:50%;width:64px;height:64px;line-height:64px;font-size:32px;margin-bottom:16px;">
                ❄️
              </div>
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
                ${COMPANY_NAME}
              </h1>
              <p style="margin:8px 0 0;color:rgba(255,255,255,0.75);font-size:14px;letter-spacing:0.5px;text-transform:uppercase;">
                Nuevo mensaje de contacto
              </p>
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="background:#ffffff;padding:40px;">

              <p style="margin:0 0 24px;color:#4a5568;font-size:15px;line-height:1.6;">
                Has recibido una nueva consulta desde el formulario de contacto de tu sitio web. Aquí están los detalles:
              </p>

              <!-- INFO CARD: NOMBRE -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#f7fafc;border-left:4px solid #00aaff;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#00aaff;text-transform:uppercase;letter-spacing:1px;">Nombre</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#1a202c;">${nombre}</p>
                  </td>
                </tr>
              </table>

              <!-- INFO CARD: TELÉFONO -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#f7fafc;border-left:4px solid #0a2540;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#0a2540;text-transform:uppercase;letter-spacing:1px;">Teléfono</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#1a202c;">
                      <a href="tel:${telefono}" style="color:#1a202c;text-decoration:none;">${telefono}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- INFO CARD: CORREO -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
                <tr>
                  <td style="background:#f7fafc;border-left:4px solid #00aaff;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#00aaff;text-transform:uppercase;letter-spacing:1px;">Correo electrónico</p>
                    <p style="margin:0;font-size:16px;font-weight:600;color:#1a202c;">
                      <a href="mailto:${correo}" style="color:#00aaff;text-decoration:none;">${correo}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- MENSAJE -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background:#f7fafc;border-left:4px solid #0a2540;border-radius:0 8px 8px 0;padding:16px 20px;">
                    <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#0a2540;text-transform:uppercase;letter-spacing:1px;">Mensaje</p>
                    <p style="margin:0;font-size:15px;color:#4a5568;line-height:1.7;white-space:pre-wrap;">${mensaje}</p>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${correo}?subject=Re: Tu consulta en ${COMPANY_NAME}"
                       style="display:inline-block;background:linear-gradient(135deg,#0a2540,#1a4a7a);color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 36px;border-radius:8px;letter-spacing:0.3px;">
                      Responder a ${nombre}
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#1a202c;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0 0 8px;color:rgba(255,255,255,0.5);font-size:12px;">
                Este correo fue generado automáticamente desde
              </p>
              <a href="${FRONTEND_URL}" style="color:#00aaff;text-decoration:none;font-size:13px;font-weight:600;">
                ${FRONTEND_URL}
              </a>
              <p style="margin:12px 0 0;color:rgba(255,255,255,0.3);font-size:11px;">
                © ${new Date().getFullYear()} ${COMPANY_NAME}. Todos los derechos reservados.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Plantilla de confirmación al cliente
function buildConfirmationHtml({ nombre }) {
  return `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background-color:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <tr>
            <td style="background:linear-gradient(135deg,#0a2540 0%,#1a4a7a 60%,#00aaff 100%);border-radius:16px 16px 0 0;padding:40px;text-align:center;">
              <div style="font-size:48px;margin-bottom:16px;">❄️</div>
              <h1 style="margin:0;color:#fff;font-size:24px;font-weight:700;">¡Gracias, ${nombre}!</h1>
              <p style="margin:10px 0 0;color:rgba(255,255,255,0.8);font-size:15px;">Hemos recibido tu mensaje</p>
            </td>
          </tr>
          <tr>
            <td style="background:#ffffff;padding:40px;text-align:center;">
              <p style="color:#4a5568;font-size:15px;line-height:1.7;margin:0 0 24px;">
                Nuestro equipo de <strong>${COMPANY_NAME}</strong> revisará tu consulta y te contactará a la brevedad posible. Nos comprometemos a responderte en un plazo máximo de <strong>24 horas hábiles</strong>.
              </p>
              <a href="${FRONTEND_URL}" style="display:inline-block;background:linear-gradient(135deg,#0a2540,#1a4a7a);color:#fff;text-decoration:none;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;">
                Volver al sitio web
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#1a202c;border-radius:0 0 16px 16px;padding:20px 40px;text-align:center;">
              <p style="margin:0;color:rgba(255,255,255,0.4);font-size:11px;">
                © ${new Date().getFullYear()} ${COMPANY_NAME} — <a href="${FRONTEND_URL}" style="color:#00aaff;text-decoration:none;">${FRONTEND_URL}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

module.exports = async function handler(req, res) {
  // ── CORS ──────────────────────────────────────────────────────────────────
  const allowedOrigins = [
    "https://gestion-de-frio.vercel.app",
    "http://localhost:3000",
    "http://localhost:5173",
  ];

  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Vary", "Origin");

  // Preflight
  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  // ── VALIDACIÓN ────────────────────────────────────────────────────────────
  const { nombre, telefono, correo, mensaje } = req.body || {};

  const missing = [];
  if (!nombre?.trim()) missing.push("nombre");
  if (!telefono?.trim()) missing.push("telefono");
  if (!correo?.trim()) missing.push("correo");
  if (!mensaje?.trim()) missing.push("mensaje");

  if (missing.length > 0) {
    return res.status(400).json({
      error: "Campos requeridos faltantes",
      campos: missing,
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    return res.status(400).json({ error: "Correo electrónico inválido" });
  }

  // ── ENVÍO ─────────────────────────────────────────────────────────────────
  try {
    // 1) Notificación interna a la empresa
    await resend.emails.send({
      from: `${COMPANY_NAME} <onboarding@resend.dev>`,
      to: [RECIPIENT_EMAIL],
      replyTo: correo,
      subject: `📩 Nuevo contacto de ${nombre} — ${COMPANY_NAME}`,
      html: buildEmailHtml({ nombre, telefono, correo, mensaje }),
    });

    // 2) Confirmación automática al cliente
    await resend.emails.send({
      from: `${COMPANY_NAME} <onboarding@resend.dev>`,
      to: [correo],
      subject: `✅ Recibimos tu mensaje — ${COMPANY_NAME}`,
      html: buildConfirmationHtml({ nombre }),
    });

    return res.status(200).json({
      success: true,
      message: "Mensaje enviado correctamente",
    });
  } catch (error) {
    console.error("Error Resend:", error);
    return res.status(500).json({
      error: "Error al enviar el correo. Intenta de nuevo más tarde.",
    });
  }
};