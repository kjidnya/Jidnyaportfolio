// Function for scroll-triggered animations
function addScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll, .slide-up-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));
}

// Function to handle the contact form submission
function handleContactForm() {
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        formStatus.textContent = 'Sending...';

        const formData = {
            from_name: form.elements['from_name'].value,
            last_name: form.elements['last_name'].value,
            reply_to: form.elements['reply_to'].value,
            contact_number: form.elements['contact_number'].value,
            message: form.elements['message'].value,
        };

        emailjs.send("service_wnb1wwb", "template_6opt6f3", formData)
            .then(function(response) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                form.reset();
                console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
                formStatus.textContent = 'Failed to send message. Please try again.';
                formStatus.style.color = 'red';
                console.log('FAILED...', error);
            });
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    addScrollAnimations();
    handleContactForm();
});