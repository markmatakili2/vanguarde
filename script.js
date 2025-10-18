document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('nav');
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('show');
        });
    }

    if (dropdownToggle) {
        dropdownToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });
    }

    document.addEventListener('click', function(e) {
        if (dropdownMenu && !e.target.closest('.dropdown')) {
            dropdownMenu.classList.remove('show');
        }
    });

    const donateBtn = document.getElementById('donate-btn');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close-modal');
    const paymentOptions = document.querySelectorAll('.payment-option');
    const paymentForms = document.querySelectorAll('.payment-form');
    const backBtns = document.querySelectorAll('.back-btn');

    if (donateBtn) {
        donateBtn.addEventListener('click', function() {
            paymentModal.classList.add('show');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', function() {
            paymentModal.classList.remove('show');
            resetPaymentModal();
        });
    }

    paymentModal?.addEventListener('click', function(e) {
        if (e.target === paymentModal) {
            paymentModal.classList.remove('show');
            resetPaymentModal();
        }
    });

    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            const paymentType = this.dataset.payment;

            document.querySelector('.payment-options').style.display = 'none';

            paymentForms.forEach(form => {
                form.classList.remove('active');
            });

            document.getElementById(`${paymentType}-form`).classList.add('active');
        });
    });

    backBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            resetPaymentModal();
        });
    });

    const mastercardForm = document.getElementById('mastercard-submit');
    const paypalForm = document.getElementById('paypal-submit');
    const mpesaForm = document.getElementById('mpesa-submit');

    if (mastercardForm) {
        mastercardForm.addEventListener('click', function(e) {
            e.preventDefault();
            const amount = document.getElementById('mastercard-amount').value;
            const cardNumber = document.getElementById('card-number').value;
            const cardName = document.getElementById('card-name').value;
            const expiry = document.getElementById('card-expiry').value;
            const cvv = document.getElementById('card-cvv').value;

            if (amount && cardNumber && cardName && expiry && cvv) {
                alert(`Processing Mastercard payment of $${amount}`);
                paymentModal.classList.remove('show');
                resetPaymentModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    if (paypalForm) {
        paypalForm.addEventListener('click', function(e) {
            e.preventDefault();
            const amount = document.getElementById('paypal-amount').value;
            const email = document.getElementById('paypal-email').value;

            if (amount && email) {
                alert(`Redirecting to PayPal to process payment of $${amount}`);
                paymentModal.classList.remove('show');
                resetPaymentModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    if (mpesaForm) {
        mpesaForm.addEventListener('click', function(e) {
            e.preventDefault();
            const amount = document.getElementById('mpesa-amount').value;
            const phone = document.getElementById('mpesa-phone').value;
            const name = document.getElementById('mpesa-name').value;

            if (amount && phone && name) {
                alert(`Sending STK push to ${phone} for KES ${amount}`);
                paymentModal.classList.remove('show');
                resetPaymentModal();
            } else {
                alert('Please fill in all fields');
            }
        });
    }

    function resetPaymentModal() {
        document.querySelector('.payment-options').style.display = 'grid';
        paymentForms.forEach(form => {
            form.classList.remove('active');
            form.querySelectorAll('input').forEach(input => input.value = '');
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});
