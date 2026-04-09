// api/send-email.js
import { Resend } from 'resend';

// Inicializamos el cliente de Resend con la API Key
const resend = new Resend(process.env.RESEND_API_KEY);

// --- Plantilla de Email ---
// Personaliza aquí el contenido del email
const generarPlantillaEmail = (datos) => {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="UTF-8"></head>
    <body style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Nuevo Mensaje de Contacto</h2>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Teléfono:</strong> ${datos.telefono}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${datos.mensaje}</p>
      <hr />
      <p style="color: gray; font-size: 12px;">Este mensaje fue enviado desde tu página web.</p>
    </body>
    </html>
  `;
};
// --- Fin de la Plantilla ---

export default async function handler(req, res) {
  // 1. Configurar CORS (para permitir peticiones desde tu web)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 2. Responder inmediatamente a las peticiones preflight (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 3. Solo aceptar peticiones POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  // 4. Obtener los datos del formulario
  const { nombre, email,telefono ,mensaje } = req.body;

  // 5. Validaciones básicas
  if (!nombre || !email || !telefono || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos: nombre, email, teléfono o mensaje son requeridos' });
  }

  try {
    // 6. Enviar el email usando Resend
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: [process.env.TO_EMAIL],
      subject: `Nuevo contacto de ${nombre}`,
      html: generarPlantillaEmail({ nombre, email, telefono, mensaje }),
    });

    if (error) {
      console.error('Error de Resend:', error);
      return res.status(500).json({ error: 'No se pudo enviar el email' });
    }

    // 7. Respuesta exitosa
    console.log('Email enviado con éxito:', data);
    return res.status(200).json({ message: 'Email enviado exitosamente' });

  } catch (error) {
    console.error('Error inesperado:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}