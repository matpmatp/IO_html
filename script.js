document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');

  if (!window.location.pathname.includes('login.html')) {
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

  if (document.getElementById('sessionInfo')) {
    const sessionData = sessionStorage.getItem('sessionUser');
    if (sessionData) {
      const user = JSON.parse(sessionData);
      document.getElementById('sessionInfo').textContent = `Zalogowany jako: ${user.login} (${user.role})`;

      const rolePermissions = {
        student: ['dashboard', 'dodaj_wniosek', 'dodaj_oplate', 'usterki'],
        recepcja: ['dashboard', 'rejestracja', 'usterki'],
        admin: ['dashboard', 'rejestracja', 'dodaj_wniosek', 'dodaj_oplate', 'generuj_raport', 'komunikaty'],
        dbadmin: ['dashboard', 'generuj_raport']
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
});

function checkLogin() {
  const session = sessionStorage.getItem('sessionUser');
  if (!session) {
    window.location.href = 'login.html';
  }
}
