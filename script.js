document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdown = document.querySelector('.dropdown');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    if (dropdownToggle && dropdown) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    }

    const donateBtn = document.getElementById('donateBtn');
    const donationModal = document.getElementById('donationModal');
    const modalClose = document.querySelector('.modal-close');

    if (donateBtn && donationModal) {
        donateBtn.addEventListener('click', function(e) {
            e.preventDefault();
            donationModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    if (modalClose && donationModal) {
        modalClose.addEventListener('click', function() {
            donationModal.classList.remove('active');
            document.body.style.overflow = '';
        });

        donationModal.addEventListener('click', function(e) {
            if (e.target === donationModal) {
                donationModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    const donationForm = document.getElementById('donationForm');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your interest in donating! Payment processing will be integrated soon.');
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
});
