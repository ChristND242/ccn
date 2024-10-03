$(function() {

    $('.navbar-toggle').click(function() {
        $(this).toggleClass('act');
            if($(this).hasClass('act')) {
                $('.main-menu').addClass('act');
            }
            else {
                $('.main-menu').removeClass('act');
            }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(document).on('click', '.page-scroll a', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1000, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.site-header',
        offset: 10
    });

	/* Progress bar */
    var $section = $('.section-skills');
    function loadDaBars() {
	    $('.progress .progress-bar').progressbar({
	        transition_delay: 500
	    });
    }
    
    $(document).bind('scroll', function(ev) {
        var scrollOffset = $(document).scrollTop();
        var containerOffset = $section.offset().top - window.innerHeight;
        if (scrollOffset > containerOffset) {
            loadDaBars();
            // unbind event not to load scrolsl again
            $(document).unbind('scroll');
        }
    });

    /* Counters  */
    if ($(".section-counters .start").length>0) {
        $(".section-counters .start").each(function() {
            var stat_item = $(this),
            offset = stat_item.offset().top;
            $(window).scroll(function() {
                if($(window).scrollTop() > (offset - 1000) && !(stat_item.hasClass('counting'))) {
                    stat_item.addClass('counting');
                    stat_item.countTo();
                }
            });
        });
    };

	// another custom callback for counting to infinity
	$('#infinity').data('countToOptions', {
		onComplete: function (value) {
		  count.call(this, {
		    from: value,
		    to: value + 1
		  });
		}
	});

	$('#infinity').each(count);

	function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

    // Navigation overlay
    var s = skrollr.init({
            forceHeight: false,
            smoothScrolling: false,
            mobileDeceleration: 0.004,
            mobileCheck: function() {
                //hack - forces mobile version to be off
                return false;
            }
    });
    
});



// Preloader Functionality
document.addEventListener("DOMContentLoaded", function() {
    const progressBar = document.querySelector('.progress-bar');
    const loadingPercentage = document.getElementById('loading-percentage');
    let percentage = 0;

    // Simulate loading progress
    const interval = setInterval(() => {
        if (percentage < 100) {
            percentage++;
            loadingPercentage.textContent = percentage + '%';
            progressBar.style.width = percentage + '%';
        } else {
            clearInterval(interval);
            // Show main content after loading is complete
            setTimeout(() => {
                document.getElementById('preloader').style.display = 'none';
                document.getElementById('main-content').style.display = 'block';
            }, 500);
        }
    }, 50);
});

$(document).ready(function() {
    var target = $(".hero");
    if (target.length) { // Check if the element exists
        var offset = target.offset().top;
        // Your logic using the offset
    } else {
        console.warn("Element .hero not found.");
    }
});


// EmailJs

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with publicKey
    emailjs.init({
      publicKey: "OJlE0WrG1_Lzuyxzb", // actual public key from EmailJS
    });

    // Utility function to show feedback
    function showFeedback(form, message, isSuccess) {
      const feedback = document.createElement('div');
      feedback.className = isSuccess ? 'alert alert-success' : 'alert alert-danger';
      feedback.innerText = message;
      form.prepend(feedback);

      // Remove feedback after 5 seconds
      setTimeout(() => {
        feedback.remove();
      }, 5000);
    }

    // Utility function to validate phone number
    function validatePhone(phone) {
      const phonePattern = /^[0-9]{10,15}$/;
      return phonePattern.test(phone);
    }

    // Handle "Contact-Nous" Form Submission
    const contactForm = document.querySelector('#contact_nous_form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Custom validation
            const name = document.querySelector('#contact-name').value.trim();
            const email = document.querySelector('#contact-email').value.trim();
            const message = document.querySelector('#contact-message').value.trim();
            let isValid = true;

            if (name === '') {
                isValid = false;
                contactForm.querySelector('#contact-name').classList.add('is-invalid');
            } else {
                contactForm.querySelector('#contact-name').classList.remove('is-invalid');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                contactForm.querySelector('#contact-email').classList.add('is-invalid');
            } else {
                contactForm.querySelector('#contact-email').classList.remove('is-invalid');
            }

            if (message === '') {
                isValid = false;
                contactForm.querySelector('#contact-message').classList.add('is-invalid');
            } else {
                contactForm.querySelector('#contact-message').classList.remove('is-invalid');
            }

            if (!isValid) {
                showFeedback(contactForm, 'Veuillez corriger les erreurs dans le formulaire.', false);
                return;
            }

            // Send the form using EmailJS
            emailjs.sendForm('service_d5ri69p', 'template_p1ipl4f', this)
                .then(function(response) {
                    showFeedback(contactForm, 'Message envoyé avec succès! Nous vous contacterons bientôt.', true);
                    contactForm.reset();
                }, function(error) {
                    showFeedback(contactForm, 'Erreur lors de l\'envoi du message, veuillez réessayer.', false);
                });
        });
    }

    // Handle "Adhesion" Form Submission
    const adhesionForm = document.querySelector('#adhesion_form');
    if (adhesionForm) {
        adhesionForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent page reload

            // Custom validation
            const firstName = document.querySelector('#adhesion-first-name').value.trim();
            const lastName = document.querySelector('#adhesion-last-name').value.trim();
            const email = document.querySelector('#adhesion-email').value.trim();
            const phone = document.querySelector('#adhesion-phone').value.trim();
            const city = document.querySelector('#adhesion-city').value.trim();
            const country = document.querySelector('#adhesion-country').value.trim();
            const status = document.querySelector('#adhesion-status').value;
            const reason = document.querySelector('#adhesion-reason').value.trim();
            let isValid = true;

            // Validate each field and show errors
            if (firstName === '') {
                isValid = false;
                adhesionForm.querySelector('#adhesion-first-name').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-first-name').classList.remove('is-invalid');
            }

            if (lastName === '') {
                isValid = false;
                adhesionForm.querySelector('#adhesion-last-name').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-last-name').classList.remove('is-invalid');
            }

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                isValid = false;
                adhesionForm.querySelector('#adhesion-email').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-email').classList.remove('is-invalid');
            }

            if (!validatePhone(phone)) {
                isValid = false;
                adhesionForm.querySelector('#adhesion-phone').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-phone').classList.remove('is-invalid');
            }

            if (city === '') {
                isValid = false;
                adhesionForm.querySelector('#adhesion-city').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-city').classList.remove('is-invalid');
            }

            if (country === '') {
                isValid = false;
                adhesionForm.querySelector('#adhesion-country').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-country').classList.remove('is-invalid');
            }

            if (!status) {
                isValid = false;
                adhesionForm.querySelector('#adhesion-status').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-status').classList.remove('is-invalid');
            }

            if (reason === '') {
                isValid = false;
                adhesionForm.querySelector('#adhesion-reason').classList.add('is-invalid');
            } else {
                adhesionForm.querySelector('#adhesion-reason').classList.remove('is-invalid');
            }

            // If form is not valid, stop further execution
            if (!isValid) {
                showFeedback(adhesionForm, 'Veuillez corriger les erreurs dans le formulaire.', false);
                return;
            }

            // Send the form using EmailJS
            emailjs.sendForm('service_d5ri69p', 'template_p2jvjv4', this)
                .then(function(response) {
                    showFeedback(adhesionForm, 'Demande envoyée avec succès! Nous vous contacterons bientôt.', true);
                    adhesionForm.reset();
                }, function(error) {
                    showFeedback(adhesionForm, 'Erreur lors de l\'envoi de la demande, veuillez réessayer.', false);
                });
        });
    }
});



