document.addEventListener('DOMContentLoaded', () => {

  // --- OBSŁUGA LOGOWANIA ---
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const login = document.getElementById('login').value;
      const password = document.getElementById('password').value;
      const role = document.getElementById('role').value;

      const users = [
        { login: 'admin', password: 'admin123', role: 'admin' },
        { login: 'student', password: 'student123', role: 'student' },
        { login: 'recepcja', password: 'recepcja123', role: 'recepcja' },
        { login: 'dbadmin', password: 'db123', role: 'dbadmin' }
      ];

      const user = users.find(u => u.login === login && u.password === password && u.role === role);

      if (user) {
        const session = { login: user.login, role: user.role, id: 1 }; // UWAGA: Dodałem na stałe ID studenta dla testów
        sessionStorage.setItem('sessionUser', JSON.stringify(session));
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('error').textContent = 'Błędne dane logowania';
      }
    });
  }

  // --- SPRAWDZANIE SESJI I UPRAWNIEŃ ---
  const sessionData = sessionStorage.getItem('sessionUser');
  if (sessionData) {
    const user = JSON.parse(sessionData);

    // Wyświetlanie informacji o zalogowanym użytkowniku
    const sessionInfo = document.getElementById('sessionInfo');
    if (sessionInfo) {
      sessionInfo.textContent = `Zalogowany jako: ${user.login} (${user.role})`;
    }

    // Zarządzanie widocznością przycisków na stronie głównej
    const loginContainer = document.getElementById('loginContainer');
    const userInfo = document.getElementById('userInfo');
    if (loginContainer) loginContainer.style.display = 'none';
    if (userInfo) userInfo.style.display = 'block';

    // Ukrywanie niedozwolonych linków w nawigacji
    const rolePermissions = {
        student: ['dashboard', 'dodaj_wniosek', 'dodaj_oplate', 'usterki', 'index', 'galeria', 'regulamin', 'kontakt'],
        recepcja: ['dashboard', 'rejestracja', 'usterki', 'index', 'galeria', 'regulamin', 'kontakt'],
        admin: ['dashboard', 'rejestracja', 'dodaj_wniosek', 'dodaj_oplate', 'generuj_raport', 'komunikaty', 'index', 'galeria', 'regulamin', 'kontakt'],
        dbadmin: ['dashboard', 'generuj_raport', 'index', 'galeria', 'regulamin', 'kontakt']
    };
    document.querySelectorAll('nav ul li a').forEach(a => {
      const page = a.getAttribute('href').replace('.html', '');
      if (page !== 'login' && !rolePermissions[user.role].includes(page)) {
        a.parentElement.style.display = 'none';
      }
    });

  } else {
    // Sprawdzanie, czy strona wymaga logowania
    const pathname = window.location.pathname;
    const isPublicPage = ['/login.html', '/index.html', '/galeria.html', '/kontakt.html', '/regulamin.html'].some(page => pathname.endsWith(page));
    if (!isPublicPage && !pathname.endsWith('/')) {
        checkLogin();
    }
  }

  // --- OBSŁUGA WYLOGOWYWANIA ---
  const logoutLink = document.getElementById('logoutBtn');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  // --- OBSŁUGA FORMULARZA WNIOSKU ---
  const wniosekForm = document.getElementById('wniosekForm');
  if (wniosekForm) {
    wniosekForm.addEventListener('submit', async (e) => {
      console.log('JavaScript PRZEJĄŁ KONTROLĘ nad formularzem!');
      e.preventDefault();

      const sessionData = sessionStorage.getItem('sessionUser');
      if (!sessionData) {
          alert('Błąd: Sesja wygasła. Zaloguj się ponownie.');
          return;
      }
      const user = JSON.parse(sessionData);

      const formData = {
        idStudenta: 1, // Pobieramy ID studenta z sesji! // aktualnie jest to 1 w ramach testowych
        typ: 'Wniosek o miejsce w akademiku',
        dataZlozenia: new Date().toISOString().slice(0, 10)
      };

      console.log('Wysyłam do serwera:', formData);

      try {
        const response = await fetch('api/dodaj_wniosek.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (response.ok) {
          alert('Sukces! ' + result.message);
          wniosekForm.reset();
          // Opcjonalnie: odśwież listę wniosków po dodaniu nowego
          if (document.getElementById('listaWnioskow')) {
            pobierzIWyswietlWnioski();
          }
        } else {
          alert('Błąd: ' + result.message);
        }
      } catch (error) {
        console.error('Błąd komunikacji z serwerem:', error);
        alert('Wystąpił błąd sieci. Spróbuj ponownie.');
      }
    });
  }

  // --- OBSŁUGA WYŚWIETLANIA LISTY WNIOSKÓW ---
  const listaWnioskow = document.getElementById('listaWnioskow');
  if (listaWnioskow) {
    pobierzIWyswietlWnioski(); // Wywołujemy funkcję, aby załadować listę
  }
});

// --- FUNKCJE POMOCNICZE ---

function checkLogin() {
  if (!sessionStorage.getItem('sessionUser')) {
    window.location.href = 'login.html';
  }
}

async function pobierzIWyswietlWnioski() {
    const listaWnioskow = document.getElementById('listaWnioskow');
    if (!listaWnioskow) return; // Zabezpieczenie

    listaWnioskow.innerHTML = '<option>Ładowanie...</option>';
    try {
      const response = await fetch('api/pobierz_wnioski.php');
      const wnioski = await response.json();
      listaWnioskow.innerHTML = ''; // Wyczyść listę
      if (wnioski.length > 0) {
        wnioski.forEach(wniosek => {
          const opcja = document.createElement('option');
          opcja.value = wniosek.Id_wniosku;
          opcja.textContent = `Wniosek #${wniosek.Id_wniosku} - ${wniosek.Typ} (Status: ${wniosek.Przyjety ? 'Przyjęty' : 'Przetwarzany'})`;
          listaWnioskow.appendChild(opcja);
        });
      } else {
        listaWnioskow.innerHTML = '<option>-- Brak wniosków --</option>';
      }
    } catch (error) {
      console.error('Błąd pobierania wniosków:', error);
      listaWnioskow.innerHTML = '<option>-- Błąd ładowania danych --</option>';
    }
}