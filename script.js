// =========================================================
// Archivo: script.js
// Estudiante: Sneider Stalin Villamar Peñafiel
// Asignatura: Aplicaciones Web - Unidad 1 (UPS)
// =========================================================

function iniciarSitio() {
  // ---------------------------------------------------------
  // INTERACCIÓN 1: Menú adaptable para pantallas móviles
  // ---------------------------------------------------------
  const botonMenu = document.getElementById('boton-menu');
  const menuNavegacion = document.getElementById('menu-navegacion');

  if (botonMenu && menuNavegacion) {
    botonMenu.addEventListener('click', function () {
      menuNavegacion.classList.toggle('activo');

      const estaAbierto = menuNavegacion.classList.contains('activo');
      botonMenu.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
    });
  }

  // ---------------------------------------------------------
  // INTERACCIÓN 2: Filtro sencillo de tutorías por categoría
  // ---------------------------------------------------------
  const botonesFiltro = document.querySelectorAll('.btn-filtro');
  const tarjetas = document.querySelectorAll('.tarjeta-materia');
  const textoContador = document.getElementById('contador-materias');

  botonesFiltro.forEach(function (boton) {
    boton.addEventListener('click', function () {
      const categoriaElegida = boton.getAttribute('data-categoria');
      let cantidadVisibles = 0;

      // Marcar el botón activo
      botonesFiltro.forEach(function (b) {
        b.classList.remove('seleccionado');
      });
      boton.classList.add('seleccionado');

      // Mostrar u ocultar las tarjetas según la categoría
      tarjetas.forEach(function (tarjeta) {
        const categoriaTarjeta = tarjeta.getAttribute('data-categoria');

        if (categoriaElegida === 'todas' || categoriaTarjeta === categoriaElegida) {
          tarjeta.style.display = 'block';
          cantidadVisibles = cantidadVisibles + 1;
        } else {
          tarjeta.style.display = 'none';
        }
      });

      if (textoContador) {
        textoContador.textContent = 'Mostrando ' + cantidadVisibles + ' tutorías disponibles.';
      }
    });
  });

  // ---------------------------------------------------------
  // INTERACCIÓN 3: Validación sencilla y accesible del formulario
  // ---------------------------------------------------------
  const formulario = document.getElementById('formulario-tutoria');
  const cajaMensaje = document.getElementById('mensaje-estado');

  if (formulario) {
    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault(); // Evita que la página se recargue

      const campoNombre = document.getElementById('nombre');
      const campoCorreo = document.getElementById('correo');
      const campoMateria = document.getElementById('materia');

      const nombre = campoNombre.value.trim();
      const correo = campoCorreo.value.trim();
      const materia = campoMateria.value;

      // Comprobación básica de campos vacíos o correo sin @
      if (nombre.length < 3) {
        cajaMensaje.textContent = 'Error: Por favor escribe tu nombre y apellido (mínimo 3 letras).';
        cajaMensaje.className = 'mensaje-formulario error';
        campoNombre.focus();
        return;
      }

      if (!correo.includes('@') || !correo.includes('.')) {
        cajaMensaje.textContent = 'Error: Ingresa un correo institucional válido (ejemplo: alumno@est.ups.edu.ec).';
        cajaMensaje.className = 'mensaje-formulario error';
        campoCorreo.focus();
        return;
      }

      if (materia === '') {
        cajaMensaje.textContent = 'Error: Selecciona la materia en la que deseas recibir tutoría.';
        cajaMensaje.className = 'mensaje-formulario error';
        campoMateria.focus();
        return;
      }

      // Si todo está correcto, mostramos mensaje de éxito
      cajaMensaje.textContent = '¡Registro exitoso! Gracias ' + nombre + ', te hemos inscrito en la tutoría de ' + materia + '.';
      cajaMensaje.className = 'mensaje-formulario exito';
      formulario.reset();
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarSitio);
} else {
  iniciarSitio();
}
