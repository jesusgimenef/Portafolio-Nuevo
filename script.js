const themeToggleButton = document.getElementById('theme-toggle');
const menuToggleButton = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

// Función para aplicar el tema guardado
const applyTheme = (theme) => {
    if (theme === 'dark') {
        body.classList.add('dark-mode');
    } else {
        body.classList.remove('dark-mode');
    }
};

// Revisa si hay un tema guardado en localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    applyTheme(savedTheme);
} else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
}

// Toggle del tema
themeToggleButton.addEventListener('click', () => {
    let newTheme;
    if (body.classList.contains('dark-mode')) {
        body.classList.remove('dark-mode');
        newTheme = 'light';
    } else {
        body.classList.add('dark-mode');
        newTheme = 'dark';
    }
    // Guarda la preferencia del usuario
    localStorage.setItem('theme', newTheme);
});

// Toggle del menú móvil
menuToggleButton.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

// Cerrar menú al hacer click en un enlace
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
    });
});

// Cerrar menú al hacer click fuera de él
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !menuToggleButton.contains(e.target)) {
        navMenu.classList.remove('show');
    }
});

// Efecto de blur dinámico en el header al hacer scroll
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Aumentar el blur basado en la cantidad de scroll
    const blurAmount = Math.min(scrollTop / 10, 20); // Máximo 20px de blur
    const opacity = Math.max(0.7, 1 - (scrollTop / 500)); // Mínimo 0.7 de opacidad
    
    if (body.classList.contains('dark-mode')) {
        header.style.background = `rgba(17, 24, 39, ${opacity})`;
    } else {
        header.style.background = `rgba(255, 255, 255, ${opacity})`;
    }
    
    header.style.backdropFilter = `blur(${10 + blurAmount}px)`;
    header.style.webkitBackdropFilter = `blur(${10 + blurAmount}px)`;
    
    lastScrollTop = scrollTop;
});

// Funcionalidad del formulario de contacto
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombre = document.getElementById('nombre').value;
            const email = document.getElementById('email').value;
            const mensaje = document.getElementById('mensaje').value;
            
            const subject = `Mensaje de contacto de ${nombre}`;
            const body = `Nombre: ${nombre}%0D%0AEmail: ${email}%0D%0A%0D%0AMensaje:%0D%0A${mensaje}`;
            
            const mailtoLink = `mailto:jesus.fg2630@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
            
            window.location.href = mailtoLink;
          
            contactForm.reset();
        });
    }
});
