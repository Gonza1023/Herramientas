fetch("chatbot/faq.json")
  .then(res => res.json())
  .then(respuestas => {
    const chatContainer = document.getElementById("chat-messages");
    const input = document.getElementById("chat-input");

    function agregarMensaje(texto, emisor) {
      const mensaje = document.createElement("div");
      mensaje.className = "chat-message " + emisor;
      mensaje.textContent = texto;
      chatContainer.appendChild(mensaje);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    document.getElementById("chat-form").addEventListener("submit", function (e) {
      e.preventDefault();
    const texto = input.value.trim();
if (!texto) return;

agregarMensaje("Tú: " + texto, "usuario");

const clave = texto.toLowerCase();

let respuesta = "No entendí eso. ¿Podés preguntar de otra forma?";

if (clave === "/preguntas") {
  respuesta = respuestas["/preguntas"];
} else {
  Object.keys(respuestas).forEach(p => {
    if (clave.includes(p)) {
      respuesta = respuestas[p];
    }
  });
}

setTimeout(() => {
  agregarMensaje("IA: " + respuesta, "bot");
}, 500);

input.value = "";

    });

    document.getElementById("chat-toggle").addEventListener("click", () => {
      document.getElementById("chatbot").classList.toggle("activo");
    });
  });

