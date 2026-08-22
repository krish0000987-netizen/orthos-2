/* ==========================================================================
   ORTHOS @ KRSNAA DIAGNOSTICS - DR. DHARM BEDWAL LANDING PAGE
   Interactive Web Application Logic (100% Mobile Optimized)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initDateDefaults();
  initConditionExplorer();
  initFaqAccordion();
  initAppointmentModal();
  initQuickBookingForm();
  initMobileNav();
  initScrollEffects();
});

/* 0. Setup Date Inputs with Smart Defaults */
function initDateDefaults() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const heroDate = document.getElementById('heroDateSelect');
  if (heroDate) {
    heroDate.min = new Date().toISOString().split('T')[0];
    heroDate.value = tomorrowStr;
  }

  const patientDate = document.getElementById('patientDate');
  if (patientDate) {
    patientDate.min = new Date().toISOString().split('T')[0];
    patientDate.value = tomorrowStr;
  }
}

/* 1. Condition & Symptom Explorer Tabs */
function initConditionExplorer() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const conditionPanels = document.querySelectorAll('.condition-panel');

  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCondition = btn.getAttribute('data-condition');

      tabBtns.forEach(b => b.classList.remove('active'));
      conditionPanels.forEach(p => p.style.display = 'none');

      btn.classList.add('active');
      const activePanel = document.getElementById(`condition-${targetCondition}`);
      if (activePanel) {
        activePanel.style.display = 'grid';
        activePanel.style.animation = 'fadeIn 0.4s ease';
      }
    });
  });
}

/* 2. FAQ Accordion Toggle */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(i => i.classList.remove('active'));

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* 3. Appointment Modal Logic */
function initAppointmentModal() {
  const modal = document.getElementById('appointmentModal');
  const openBtns = document.querySelectorAll('.trigger-booking-modal');
  const closeBtn = document.querySelector('.modal-close');
  const modalForm = document.getElementById('modalBookingForm');
  const modalSuccessMsg = document.getElementById('modalSuccessMsg');
  const navMenu = document.getElementById('navMenu');
  const navToggle = document.getElementById('navToggle');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      // Close mobile menu if open
      if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        if (navToggle) {
          navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      }
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('patientName')?.value || 'Valued Patient';
      const phone = document.getElementById('patientPhone')?.value || '+91 7410702413';
      const service = document.getElementById('patientService')?.value || 'Orthopaedic Consultation';
      const date = document.getElementById('patientDate')?.value || 'Selected Date';

      modalForm.style.display = 'none';
      if (modalSuccessMsg) {
        modalSuccessMsg.style.display = 'block';
        modalSuccessMsg.querySelector('.patient-confirmed-name').textContent = name;
        modalSuccessMsg.querySelector('.patient-confirmed-details').textContent = `${service} on ${date}`;
      }

      // WhatsApp direct message alert
      const waMsg = encodeURIComponent(`Hello Dr. Dharm Bedwal, I would like to confirm my OPD consultation booking:\n\nName: ${name}\nPhone: ${phone}\nService: ${service}\nPreferred Date: ${date}\n\nClinic: Orthos @ Krsnaa Diagnostics, Seawoods (W).`);
      const waBtn = document.getElementById('whatsappConfirmBtn');
      if (waBtn) {
        waBtn.href = `https://wa.me/917410702413?text=${waMsg}`;
      }
    });
  }
}

/* 4. Quick Hero Booking Form (Reserve Slot) */
function initQuickBookingForm() {
  const quickForm = document.getElementById('heroQuickForm');
  if (!quickForm) return;

  quickForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const service = document.getElementById('heroServiceSelect')?.value || 'Orthopaedic Consultation';
    const date = document.getElementById('heroDateSelect')?.value || 'Upcoming OPD Slot';
    const phone = document.getElementById('heroPhoneInput')?.value || '+91 7410702413';

    const modal = document.getElementById('appointmentModal');
    if (modal) {
      modal.classList.add('active');
      const modalForm = document.getElementById('modalBookingForm');
      const modalSuccessMsg = document.getElementById('modalSuccessMsg');

      // Pre-fill modal fields
      const pService = document.getElementById('patientService');
      const pDate = document.getElementById('patientDate');
      const pPhone = document.getElementById('patientPhone');
      if (pService) pService.value = service;
      if (pDate) pDate.value = date;
      if (pPhone) pPhone.value = phone;

      // Show instant confirmation wizard
      if (modalForm) modalForm.style.display = 'none';
      if (modalSuccessMsg) {
        modalSuccessMsg.style.display = 'block';
        const nameEl = modalSuccessMsg.querySelector('.patient-confirmed-name');
        const detailsEl = modalSuccessMsg.querySelector('.patient-confirmed-details');
        if (nameEl) nameEl.textContent = `Patient (${phone})`;
        if (detailsEl) detailsEl.textContent = `${service} on ${date}`;
      }

      // Prepare instant WhatsApp confirmation
      const waMsg = encodeURIComponent(`Hello Dr. Dharm Bedwal, I have reserved an OPD Consultation slot:\n\nPhone: ${phone}\nSpecialty: ${service}\nPreferred Date: ${date}\n\nClinic: Orthos @ Krsnaa Diagnostics, Shop 3-6, Om Nilkanth CHS, Seawoods (W), Navi Mumbai.`);
      const waBtn = document.getElementById('whatsappConfirmBtn');
      if (waBtn) {
        waBtn.href = `https://wa.me/917410702413?text=${waMsg}`;
      }
    }
  });
}

/* 5. Mobile Navigation Drawer */
function initMobileNav() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (!navToggle || !navMenu) return;

  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    navToggle.innerHTML = isActive ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  // Close menu when clicking on any navigation link
  const navLinks = navMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      if (navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    }
  });
}

/* 6. Scroll Effects */
function initScrollEffects() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)';
    } else {
      navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
    }
  });
}
