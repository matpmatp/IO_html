document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  const pathname = window.location.pathname;
  if (!pathname.includes('login.html') && !pathname.includes('index.html') && !pathname.includes('galeria.html') && !pathname.includes('kontakt.html') && !pathname.includes('regulamin.html')) {
    checkLogin();
  }

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
        const session = { login: user.login, role: user.role };
        sessionStorage.setItem('sessionUser', JSON.stringify(session));
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'dashboard.html';
      } else {
        document.getElementById('error').textContent = 'Błędne dane logowania';
      }
    });
  }

  const sessionInfo = document.getElementById('sessionInfo');
  if (sessionInfo) {
    const sessionData = sessionStorage.getItem('sessionUser');
    if (sessionData) {
      const user = JSON.parse(sessionData);

      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        sessionInfo.innerHTML = `
          Zalogowano jako <strong>${user.login}</strong> (${user.role})<br />
          <button id="goToPanel">Przejdź do panelu</button>
        `;
        document.getElementById('goToPanel').addEventListener('click', () => {
          window.location.href = 'dashboard.html';
        });
      } else {
        sessionInfo.textContent = `Zalogowany jako: ${user.login} (${user.role})`;
      }

      const rolePermissions = {
        student: ['dashboard', 'dodaj_wniosek', 'dodaj_oplate', 'usterki', 'index', 'galeria', 'regulamin', 'kontakt'],
        recepcja: ['dashboard', 'rejestracja', 'usterki', 'index', 'galeria', 'regulamin', 'kontakt'],
        admin: ['dashboard', 'rejestracja', 'dodaj_wniosek', 'dodaj_oplate', 'generuj_raport', 'komunikaty', 'index', 'galeria', 'regulamin', 'kontakt'],
        dbadmin: ['dashboard', 'generuj_raport', 'index', 'galeria', 'regulamin', 'kontakt']
      };

      document.querySelectorAll('nav ul li').forEach(li => {
        const href = li.querySelector('a')?.getAttribute('href');
        if (href) {
          const page = href.replace('.html', '');
          if (!rolePermissions[user.role].includes(page) && page !== 'login') {
            li.style.display = 'none';
          }
        }
      });
    } else {
      if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        sessionInfo.innerHTML = `<button id="loginBtn">Logowanie</button>`;
        document.getElementById('loginBtn').addEventListener('click', () => {
          window.location.href = 'login.html';
        });
      }
    }
  }

  const logoutLink = document.querySelector('a[href="login.html"]');
  if (logoutLink) {
    logoutLink.addEventListener('click', function (e) {
      e.preventDefault();
      sessionStorage.clear();
      window.location.href = 'login.html';
    });
  }

  const sessionData = sessionStorage.getItem('sessionUser');
  const loginContainer = document.getElementById('loginContainer');
  const userInfo = document.getElementById('userInfo');

  if (sessionData) {
    const user = JSON.parse(sessionData);
    if (loginContainer) loginContainer.style.display = 'none';
    if (userInfo) {
      userInfo.style.display = 'block';
      if (sessionInfo) {
        sessionInfo.textContent = `Zalogowano jako: ${user.login} (${user.role})`;
      }
    }
  } else {
    if (loginContainer) loginContainer.style.display = 'block';
    if (userInfo) userInfo.style.display = 'none';
  }



  const zoomBtn = document.getElementById('zoomBtn');
  const mapContainer = document.getElementById('map-container');
  if (zoomBtn && mapContainer) {
    let zoomed = false;
    zoomBtn.addEventListener('click', () => {
      if (!zoomed) {
        mapContainer.style.height = '600px';
        zoomBtn.textContent = 'Zmniejsz mapę';
      } else {
        mapContainer.style.height = '300px';
        zoomBtn.textContent = 'Powiększ mapę';
      }
      zoomed = !zoomed;
    });
  }

const wniosekForm = document.getElementById('wniosekForm');

console.log('Wynik szukania formularza o ID "wniosekForm":', wniosekForm);

if (wniosekForm) {
  wniosekForm.addEventListener('submit', async (e) => {
    console.log('Formularz został wysłany, funkcja wystartowała!');
    e.preventDefault();

    const formData = {
      // UWAGA: To ID wciąż jest wpisane na stałe.
      // Docelowo pobierzesz je z `sessionStorage` po zalogowaniu.
      idStudenta: 1,

      typ: 'Wniosek o miejsce w akademiku',

      dataZlozenia: new Date().toISOString().slice(0, 10)
    };

    console.log('Wysyłam do serwera tylko potrzebne dane:', formData);

    try {
      const response = await fetch('api/dodaj_wniosek.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert('Sukces! ' + result.message);
        wniosekForm.reset();
      } else {
        alert('Błąd: ' + result.message);
      }
    } catch (error) {
      console.error('Błąd komunikacji z serwerem:', error);
      alert('Wystąpił błąd sieci. Spróbuj ponownie.');
    }
  });
}

});

function checkLogin() {
  const session = sessionStorage.getItem('sessionUser');
  if (!session) {
    window.location.href = 'login.html';
  }
}
