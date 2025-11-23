let selectedShow = '';
let selectedDate = '20 декабря 2023';
let selectedTime = '18:00';

// Navigation between sections
function showSection(sectionId) {
    document.querySelectorAll('section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Show selection
function selectShow(card, showName) {
    document.querySelectorAll('.show-card').forEach(card => {
        card.classList.remove('selected');
    });
    card.classList.add('selected');
    selectedShow = showName;
    document.getElementById('show-select').value = showName;
    
    // Auto-navigate to booking page
    setTimeout(() => showSection('booking-page'), 500);
}

// Calendar navigation
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.calendar-nav').forEach(button => {
        button.addEventListener('click', function() {
            alert('Навигация по месяцам будет реализована здесь');
        });
    });

    // Date selection
    document.querySelectorAll('.calendar-day:not(.header)').forEach(day => {
        day.addEventListener('click', function() {
            if (this.textContent !== '') {
                document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
                this.classList.add('selected');
                selectedDate = this.textContent + ' декабря 2023';
            }
        });
    });

    // Time selection
    document.querySelectorAll('.time-option').forEach(time => {
        time.addEventListener('click', function() {
            document.querySelectorAll('.time-option').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            selectedTime = this.textContent;
        });
    });

    // Show selection change
    document.getElementById('show-select').addEventListener('change', function() {
        selectedShow = this.value;
    });
});

// Booking function
function bookTicket() {
    const show = document.getElementById('show-select').value;
    const ticketCount = document.getElementById('ticket-count').value;
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;

    // Basic validation
    if (!show || !name || !email || !phone) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    if (!validateEmail(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }

    // Update confirmation details
    document.getElementById('confirm-show').textContent = show;
    document.getElementById('confirm-date').textContent = selectedDate;
    document.getElementById('confirm-time').textContent = selectedTime;
    document.getElementById('confirm-tickets').textContent = ticketCount;
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-phone').textContent = phone;
    document.getElementById('booking-number').textContent = 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // Show confirmation
    showSection('confirmation-page');
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Print ticket
function printTicket() {
    window.print();
}

// Initialize - show main page by default
document.addEventListener('DOMContentLoaded', function() {
    showSection('main-page');
});

let currentMonth = 11; // Декабрь (0-11)
let currentYear = 2023;

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    updateCalendar();
}

function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    updateCalendar();
}

function updateCalendar() {
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    // Обновляем заголовок
    document.querySelector('.calendar-header strong').textContent = 
        `${monthNames[currentMonth]} ${currentYear}`;
    
    // Здесь будет логика отрисовки дней месяца
    renderCalendarDays();
}

// Booking function
function bookTicket() {
    const show = document.getElementById('show-select').value;
    const ticketCount = document.getElementById('ticket-count').value;
    const name = document.getElementById('customer-name').value;
    const email = document.getElementById('customer-email').value;
    const phone = document.getElementById('customer-phone').value;

    // Basic validation
    if (!show || !name || !email || !phone) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    if (!validateEmail(email)) {
        alert('Пожалуйста, введите корректный email адрес');
        return;
    }

    // Update modal details
    document.getElementById('modal-show').textContent = show;
    document.getElementById('modal-date').textContent = selectedDate;
    document.getElementById('modal-time').textContent = selectedTime;
    document.getElementById('modal-tickets').textContent = ticketCount;

    // Show modal
    showModal();

    // Также обновляем детали на странице подтверждения (если нужно)
    updateConfirmationDetails(show, ticketCount, name, email, phone);
}

// Modal functions
function showModal() {
    document.getElementById('successModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    // После закрытия модального окна можно перейти на страницу подтверждения
    showSection('confirmation-page');
}

// Update confirmation page details
function updateConfirmationDetails(show, ticketCount, name, email, phone) {
    document.getElementById('confirm-show').textContent = show;
    document.getElementById('confirm-date').textContent = selectedDate;
    document.getElementById('confirm-time').textContent = selectedTime;
    document.getElementById('confirm-tickets').textContent = ticketCount;
    document.getElementById('confirm-name').textContent = name;
    document.getElementById('confirm-email').textContent = email;
    document.getElementById('confirm-phone').textContent = phone;
    document.getElementById('booking-number').textContent = 'BK-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('successModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});