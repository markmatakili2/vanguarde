document.addEventListener('DOMContentLoaded', function() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 2000);
    }

    const heroSlides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    function nextSlide() {
        if (heroSlides.length > 0) {
            heroSlides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % heroSlides.length;
            heroSlides[currentSlide].classList.add('active');
        }
    }

    if (heroSlides.length > 0) {
        heroSlides[0].classList.add('active');
        setInterval(nextSlide, 5000);
    }

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });

    const statItems = document.querySelectorAll('.stat-item');
    statItems.forEach(item => {
        observer.observe(item);
    });

    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };

        updateCounter();
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target.querySelector('.stat-number');
                if (numberElement && numberElement.textContent === '0') {
                    animateCounter(numberElement);
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.stat-item').forEach(item => {
        counterObserver.observe(item);
    });

    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Thank you for subscribing with ${email}! We'll keep you updated.`);
            this.reset();
        });
    });

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

    const donateTriggers = document.querySelectorAll('.donate-trigger');
    donateTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            if (paymentModal) {
                paymentModal.classList.add('show');
            }
        });
    });

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

    // Stripe Payment Handler
    let stripe, elements, cardElement;

    function initializeStripe() {
        if (window.location.pathname.includes('phillanthropy.html')) {
            const stripePublishableKey = 'pk_live_51234567890123456789'; // Replace with actual key
            stripe = Stripe(stripePublishableKey);
            elements = stripe.elements();
            cardElement = elements.create('card');
        }
    }

    const stripeForm = document.getElementById('stripe-form');
    if (stripeForm) {
        stripeForm.addEventListener('shown', initializeStripe);

        const stripeSubmitBtn = document.getElementById('stripe-submit');
        if (stripeSubmitBtn) {
            stripeSubmitBtn.addEventListener('click', async function(e) {
                e.preventDefault();

                const amount = parseFloat(document.getElementById('stripe-amount').value);
                const email = document.getElementById('stripe-email').value;
                const name = document.getElementById('stripe-name').value;

                if (!amount || !email || !name) {
                    alert('Please fill in all fields');
                    return;
                }

                stripeSubmitBtn.disabled = true;
                stripeSubmitBtn.textContent = 'Processing...';

                try {
                    const supabaseUrl = 'https://lnvbrimljganqdhfdotl.supabase.co';
                    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxudmJyaW1samdhbnFkaGZkb3RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA5OTgwNzYsImV4cCI6MjA3NjU3NDA3Nn0.m2eIgVh0ZqJbmw18tSpjYWPgkbfnu3UV3RbAlSi_vTo';
                    const apiUrl = `${supabaseUrl}/functions/v1/create-payment-intent`;

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${supabaseKey}`,
                        },
                        body: JSON.stringify({
                            amount: Math.round(amount * 100),
                            currency: 'usd',
                            donorName: name,
                            donorEmail: email,
                        }),
                    });

                    const { clientSecret, error } = await response.json();

                    if (error) {
                        alert(`Payment error: ${error}`);
                        stripeSubmitBtn.disabled = false;
                        stripeSubmitBtn.textContent = 'Donate via Stripe';
                        return;
                    }

                    // Mount card element for payment
                    if (cardElement) {
                        cardElement.mount('#card-element');
                    }

                    // Confirm payment with Stripe
                    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
                        payment_method: {
                            card: cardElement,
                            billing_details: {
                                name: name,
                                email: email
                            }
                        }
                    });

                    if (confirmError) {
                        alert(`Payment failed: ${confirmError.message}`);
                    } else if (paymentIntent.status === 'succeeded') {
                        alert(`✅ Thank you for your donation!\n\nTransaction ID: ${paymentIntent.id}\n\nYour support means the world to us.`);
                        paymentModal.classList.remove('show');
                        resetPaymentModal();
                    }
                } catch (error) {
                    console.error('Stripe error:', error);
                    alert('Payment processing failed. Please try again.');
                } finally {
                    stripeSubmitBtn.disabled = false;
                    stripeSubmitBtn.textContent = 'Donate via Stripe';
                }
            });
        }
    }
});
