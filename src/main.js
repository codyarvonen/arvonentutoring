import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 2. Subject Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const offeringCards = document.querySelectorAll('.offering-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.getAttribute('data-filter');

      offeringCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 3. Subject Selection buttons pre-filling contact form
  const selectSubjectBtns = document.querySelectorAll('.select-subject-btn');
  const subjectInput = document.getElementById('form-subject');

  selectSubjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subjectName = btn.getAttribute('data-subject');
      if (subjectInput && subjectName) {
        subjectInput.value = subjectName;
        subjectInput.focus();
      }
    });
  });

  // 4. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isCurrentlyActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(i => {
          i.classList.remove('active');
          const btn = i.querySelector('.faq-question');
          if (btn) btn.setAttribute('aria-expanded', 'false');
        });

        // Toggle clicked item
        if (!isCurrentlyActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 5. Contact Form Handler (Mailto generator & validation)
  const contactForm = document.getElementById('tutoring-contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const email = document.getElementById('form-email').value.trim();
      const level = document.getElementById('form-level').value;
      const format = document.getElementById('form-format').value;
      const subject = document.getElementById('form-subject').value.trim();
      const message = document.getElementById('form-message').value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.className = 'form-status-msg error';
          formStatus.innerText = 'Please fill out all required fields.';
        }
        return;
      }

      // Construct mailto link for direct client launch
      const emailRecipient = 'cja3342@utexas.edu'; // Placeholder email ready for user updates
      const mailSubject = encodeURIComponent(`Tutoring Inquiry: ${subject} (${name})`);
      const mailBody = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nStudent Level: ${level}\nFormat Preference: ${format}\nSubject: ${subject}\n\nMessage / Goals:\n${message}\n\n---\nSent from Tutoring Website Contact Form`
      );

      const mailtoUrl = `mailto:${emailRecipient}?subject=${mailSubject}&body=${mailBody}`;

      if (formStatus) {
        formStatus.className = 'form-status-msg success';
        formStatus.innerHTML = `<strong>Thank you, ${name}!</strong> Opening your email client to dispatch inquiry... If your email app does not open automatically, <a href="${mailtoUrl}">click here to send email</a>.`;
      }

      // Trigger mailto link
      window.location.href = mailtoUrl;
    });
  }

  // 6. Footer Year Update
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
