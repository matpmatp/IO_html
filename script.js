document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM załadowany, skrypt startuje.');

    // --- LOGIKA SESJI I UPRAWNIEŃ ---
    const sessionData = sessionStorage.getItem('sessionUser');
    if (sessionData) {
        const user = JSON.parse(sessionData);
        dostosujWidokPoZalogowaniu(user);
    } else {
        const pathname = window.location.pathname;
        const publicPages = ['/login.html', '/index.html', '/galeria.html', '/kontakt.html', '/regulamin.html'];
        const isPublic = publicPages.some(page => pathname.endsWith(page)) || pathname.endsWith('/');
        if (!isPublic) {
            window.location.href = 'login.html';
        }
    }

    // --- OBSŁUGA FORMULARZA LOGOWANIA ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        console.log('Znaleziono formularz logowania, dołączam listener.');
        loginForm.addEventListener('submit', handleLogin);
    }

    // --- OBSŁUGA FORMULARZA DODAWANIA WNIOSKU ---
    const wniosekForm = document.getElementById('wniosekForm');
    if (wniosekForm) {
        console.log('Znaleziono formularz dodawania wniosku, dołączam listener.');
        wniosekForm.addEventListener('submit', handleDodajWniosek);
    }

    // --- OBSŁUGA OKNA MODALNEGO DO EDYCJI ---
    const editModal = document.getElementById('editModal');
    if (editModal) {
        console.log('Znaleziono okno modalne, konfiguruję listenery.');
        const closeBtn = document.getElementById('closeBtn');
        const editForm = document.getElementById('editForm');

        closeBtn.onclick = () => { editModal.style.display = 'none'; };
        window.onclick = (event) => {
            if (event.target == editModal) {
                editModal.style.display = 'none';
            }
        };

        if (editForm) {
            console.log('Znaleziono formularz edycji, dołączam listener.');
            editForm.addEventListener('submit', handleAktualizujWniosek);
        }
    }

    // --- OBSŁUGA WYŚWIETLANIA LISTY WNIOSKÓW ---
    const listaWnioskow = document.getElementById('listaWnioskow');
    if (listaWnioskow) {
        console.log('Znaleziono listę wniosków, uruchamiam pobieranie danych.');
        pobierzIWyswietlWnioski();

        listaWnioskow.addEventListener('dblclick', async () => {
            const idWniosku = listaWnioskow.value;
            if (!idWniosku) return;
            console.log(`Podwójne kliknięcie na wniosek o ID: ${idWniosku}. Otwieram modal.`);
            openEditModal(idWniosku);
        });
    }


  // --- OBSŁUGA FORMULARZA DODAWANIA OPŁATY ---
  const oplatyForm = document.getElementById('oplatyForm');
  if (oplatyForm) {
      oplatyForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const formData = {
              idStudenta: document.getElementById('oplatyNrAlbumu').value,
              kwota: document.getElementById('oplatyKwota').value,
              opis: document.getElementById('oplatyOpis').value,
          };

          try {
              const response = await fetch('api/dodaj_oplate.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
              });
              const result = await response.json();
              if (!response.ok) throw new Error(result.message);

              alert('Sukces! ' + result.message);
              oplatyForm.reset();
              pobierzIWyswietlOplaty(); // Odśwież listę
          } catch (error) {
              alert('Błąd: ' + error.message);
          }
      });
  }

  // --- OBSŁUGA WYŚWIETLANIA LISTY OPŁAT ---

const listaOplatContainer = document.getElementById('listaOplatContainer');
if (listaOplatContainer) {
    pobierzIWyswietlOplaty();

    listaOplatContainer.addEventListener('click', async (e) => {

        if (e.target.classList.contains('przycisk-usun')) {


            if (!confirm('Czy na pewno chcesz usunąć tę opłatę?')) {
                return;
            }


            const idDoUsuniecia = e.target.dataset.id;

            try {
                const response = await fetch('api/usun_oplate.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: idDoUsuniecia })
                });

                const result = await response.json();
                if (!response.ok) throw new Error(result.message);

                alert('Sukces! ' + result.message);
                pobierzIWyswietlOplaty();

            } catch (error) {
                alert('Błąd: ' + error.message);
                console.error("Błąd podczas usuwania opłaty:", error);
            }
        }
    });
}

  const usterkaForm = document.getElementById('usterkaForm');
  if (usterkaForm) {
      console.log('Znaleziono formularz usterek, dołączam listener.');

      usterkaForm.addEventListener('submit', async (e) => {
          e.preventDefault();
          console.log('Formularz usterki wysłany, funkcja startuje!');

          const formData = {
              nrPokoju: document.getElementById('usterkaNrPokoju').value,
              opis: document.getElementById('usterkaOpis').value,
          };

          try {
              const response = await fetch('api/dodaj_usterke.php', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(formData)
              });

              const result = await response.json();
              if (!response.ok) {
                  throw new Error(result.message || 'Nieznany błąd serwera');
              }

              alert('Sukces! ' + result.message);
              usterkaForm.reset();
              pobierzIWyswietlUsterki();

          } catch (error) {
              console.error('Błąd podczas dodawania usterki:', error);
              alert('Wystąpił błąd: ' + error.message);
          }
      });
  }

// --- OBSŁUGA WYŚWIETLANIA I USUWANIA USTEREK ---
const listaUsterekContainer = document.getElementById('listaUsterekContainer');
if (listaUsterekContainer) {
    pobierzIWyswietlUsterki();


    listaUsterekContainer.addEventListener('click', async (e) => {

        if (e.target.classList.contains('przycisk-usun-usterke')) {
            if (!confirm('Czy na pewno chcesz usunąć to zgłoszenie usterki?')) return;

            const idDoUsuniecia = e.target.dataset.id;
            try {
                const response = await fetch('api/usun_usterke.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: idDoUsuniecia })
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message);

                alert(result.message);
                pobierzIWyswietlUsterki();
            } catch (error) {
                alert('Błąd: ' + error.message);
            }
        }


        if (e.target.classList.contains('przycisk-edytuj-usterke')) {
            const idDoEdycji = e.target.dataset.id;
            openUsterkaEditModal(idDoEdycji);
        }
    });
}

const usterkaEditModal = document.getElementById('usterkaEditModal');
if (usterkaEditModal) {
    const closeBtn = document.getElementById('closeUsterkaModalBtn');
    const editForm = document.getElementById('usterkaEditForm');

    closeBtn.onclick = () => { usterkaEditModal.style.display = 'none'; };
    window.onclick = (event) => {
        if (event.target == usterkaEditModal) {
            usterkaEditModal.style.display = 'none';
        }
    };

    if (editForm) {
        editForm.addEventListener('submit', handleAktualizujUsterke);
    }
}

});

// =====================================================================
// ===                    FUNKCJE POMOCNICZE                       ===
// =====================================================================

function handleLogin(e) {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const users = [
        { login: 'admin', id: 99, password: 'admin123', role: 'admin' },
        { login: 'student', id: 1, password: 'student123', role: 'student' }
    ];
    const user = users.find(u => u.login === login && u.password === password && u.role === role);

    if (user) {
        const session = { login: user.login, role: user.role, id: user.id };
        sessionStorage.setItem('sessionUser', JSON.stringify(session));
        window.location.href = 'dashboard.html';
    } else {
        document.getElementById('error').textContent = 'Błędne dane logowania';
    }
}

async function handleDodajWniosek(e) {
    e.preventDefault();
    console.log('Funkcja handleDodajWniosek WYSTARTOWAŁA!');
    const sessionData = sessionStorage.getItem('sessionUser');
    if (!sessionData) { return alert('Sesja wygasła, zaloguj się ponownie.'); }
    const user = JSON.parse(sessionData);

    const formData = {
        idStudenta: user.id,
        typ: 'Wniosek o miejsce w akademiku',
        dataZlozenia: new Date().toISOString().slice(0, 10)
    };

    try {
        const response = await fetch('api/dodaj_wniosek.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        alert('Sukces! ' + result.message);
        document.getElementById('wniosekForm').reset();
        pobierzIWyswietlWnioski();
    } catch (error) {
        console.error('Błąd w handleDodajWniosek:', error);
        alert('Wystąpił błąd: ' + error.message);
    }
}

async function handleAktualizujWniosek(e) {
    e.preventDefault();
    console.log('Funkcja handleAktualizujWniosek WYSTARTOWAŁA!');
    const komunikatEdycji = document.getElementById('komunikatEdycji');

    const daneDoWyslania = {
        idWniosku: document.getElementById('idWniosku').value,
        typ: document.getElementById('typWniosku').value,
        status: document.getElementById('statusWniosku').value
    };

    try {
        const response = await fetch('api/aktualizuj_wniosek.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(daneDoWyslania)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);

        komunikatEdycji.textContent = result.message;
        komunikatEdycji.style.color = 'lightgreen';
        pobierzIWyswietlWnioski();
    } catch (error) {
        console.error('Błąd w handleAktualizujWniosek:', error);
        komunikatEdycji.textContent = 'Błąd: ' + error.message;
        komunikatEdycji.style.color = 'red';
    }
}

async function pobierzIWyswietlWnioski() {
    const listaWnioskow = document.getElementById('listaWnioskow');
    if (!listaWnioskow) return;

    listaWnioskow.innerHTML = '<option>Ładowanie...</option>';
    try {
        const response = await fetch('api/pobierz_wnioski.php');
        const wnioski = await response.json();
        if (!response.ok) throw new Error(wnioski.message);

        listaWnioskow.innerHTML = '';
        if (wnioski.length > 0) {
            wnioski.forEach(wniosek => {
                const opcja = document.createElement('option');
                opcja.value = wniosek.Id_wniosku;

                let statusText = 'Nieokreślony';
                if (wniosek.Przyjety == 1) {
                    statusText = 'Przyjęty';
                } else if (wniosek.Odrzucony == 1) {
                    statusText = 'Odrzucony';
                } else if (wniosek.Wstrzymany == 1) {
                    statusText = 'Wstrzymany';
                } else if (wniosek.Przetwarzany == 1) {
                    statusText = 'Przetwarzany';
                }

                opcja.textContent = `Wniosek #${wniosek.Id_wniosku} - ${wniosek.Typ} (Status: ${statusText})`;

                listaWnioskow.appendChild(opcja);
            });
        } else {
            listaWnioskow.innerHTML = '<option>-- Brak wniosków --</option>';
        }
    } catch (error) {
        console.error('Błąd w pobierzIWyswietlWnioski:', error);
        listaWnioskow.innerHTML = `<option>-- Błąd ładowania: ${error.message} --</option>`;
    }
}

async function openEditModal(idWniosku) {
    const editModal = document.getElementById('editModal');
    try {
        const response = await fetch(`api/pobierz_jeden_wniosek.php?id=${idWniosku}`);
        const dane = await response.json();
        if (!response.ok) throw new Error(dane.message);

        document.getElementById('idWniosku').value = dane.Id_wniosku;
        document.getElementById('typWniosku').value = dane.Typ;
        if (dane.Przyjety == 1) document.getElementById('statusWniosku').value = 'przyjety';
        else document.getElementById('statusWniosku').value = 'przetwarzany';

        editModal.style.display = 'block';
    } catch (error) {
        console.error('Błąd w openEditModal:', error);
        alert('Nie udało się załadować danych do edycji: ' + error.message);
    }
}

function dostosujWidokPoZalogowaniu(user) {
    const sessionInfo = document.getElementById('sessionInfo');
    if (sessionInfo) {
      sessionInfo.textContent = `Zalogowany jako: ${user.login} (${user.role})`;
    }
}

async function pobierzIWyswietlUsterki() {
    if (!listaUsterekContainer) return;
    listaUsterekContainer.innerHTML = '<p>Ładowanie listy usterek...</p>';
    try {
        const response = await fetch('api/pobierz_usterki.php');
        const usterki = await response.json();
        if (!response.ok) throw new Error(usterki.message);

        if (usterki.length === 0) {
            listaUsterekContainer.innerHTML = '<p>Brak zgłoszonych usterek.</p>';
            return;
        }

        let tableHTML = `<table border="1" style="width:100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>Data Zgłoszenia</th>
                    <th>Pokój</th>
                    <th>Opis</th>
                    <th>Status</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody>`;

        usterki.forEach(usterka => {
            let statusText = 'Nieznany';
            if (usterka.Naprawiona == 1) statusText = 'Naprawiona';
            else if (usterka.W_naprawie == 1) statusText = 'W naprawie';
            else if (usterka.Zgloszona == 1) statusText = 'Zgłoszona';

            tableHTML += `
                <tr>
                    <td>${usterka.DataZgloszenia}</td>
                    <td>${usterka.Nr_pokoju}</td>
                    <td>${usterka.Opis}</td>
                    <td>${statusText}</td>
                    <td>
                        <button class="przycisk-edytuj-usterke" data-id="${usterka.Id_usterki}">Edytuj</button>
                        <button class="przycisk-usun-usterke" data-id="${usterka.Id_usterki}">Usuń</button>
                    </td>
                </tr>
            `;
        });

        tableHTML += '</tbody></table>';
        listaUsterekContainer.innerHTML = tableHTML;

    } catch (error) {
        listaUsterekContainer.innerHTML = `<p style="color:red;">Błąd ładowania usterek: ${error.message}</p>`;
    }
}


  async function pobierzIWyswietlOplaty() {
      if (!listaOplatContainer) return;
      listaOplatContainer.innerHTML = '<p>Ładowanie listy opłat...</p>';
      try {
          const response = await fetch('api/pobierz_oplaty.php');
          const oplaty = await response.json();
          if (!response.ok) throw new Error(oplaty.message);

          if (oplaty.length === 0) {
              listaOplatContainer.innerHTML = '<p>Brak opłat do wyświetlenia.</p>';
              return;
          }

          let tableHTML = `<table border="1" style="width:100%; border-collapse: collapse;">
              <thead>
                  <tr>
                      <th>Data</th>
                      <th>Student</th>
                      <th>Opis</th>
                      <th>Kwota</th>
                      <th>Akcja</th>
                  </tr>
              </thead>
              <tbody>`;

          oplaty.forEach(oplata => {
              tableHTML += `
                  <tr>
                      <td>${oplata.Data}</td>
                      <td>${oplata.Imie} ${oplata.Nazwisko}</td>
                      <td>${oplata.Opis}</td>
                      <td>${Number(oplata.Wartosc).toFixed(2)} zł</td>
                      <td>
                          <button class="przycisk-usun" data-id="${oplata.Id_oplaty}">Usuń</button>
                      </td>
                  </tr>
              `;
          });

          tableHTML += '</tbody></table>';
          listaOplatContainer.innerHTML = tableHTML;

      } catch (error) {
          listaOplatContainer.innerHTML = `<p style="color:red;">Błąd ładowania opłat: ${error.message}</p>`;
      }
  }

/**
 * Otwiera okno modalne i wypełnia je danymi konkretnej usterki.
 * @param {number} id - ID usterki do edycji.
 */
async function openUsterkaEditModal(id) {
    const modal = document.getElementById('usterkaEditModal');
    if (!modal) {
        console.error('Nie znaleziono okna modalnego o ID: usterkaEditModal');
        return;
    }

    try {
        const response = await fetch(`api/pobierz_jedna_usterke.php?id=${id}`);
        const dane = await response.json();
        if (!response.ok) throw new Error(dane.message);

        document.getElementById('usterkaEditId').value = dane.Id_usterki;
        document.getElementById('usterkaEditOpis').value = dane.Opis;

        let aktualnyStatus = 'zgloszona';
        if (dane.Naprawiona == 1) aktualnyStatus = 'naprawiona';
        else if (dane.W_naprawie == 1) aktualnyStatus = 'w_naprawie';
        document.getElementById('usterkaEditStatus').value = aktualnyStatus;

        modal.style.display = 'block';

    } catch (error) {
        alert('Błąd ładowania danych usterki: ' + error.message);
    }
}

/**
 * Obsługuje wysłanie formularza edycji usterki.
 * @param {Event} e - Obiekt zdarzenia 'submit'.
 */
async function handleAktualizujUsterke(e) {
    e.preventDefault();
    const komunikat = document.getElementById('komunikatEdycjiUsterki');
    const modal = document.getElementById('usterkaEditModal');

    const formData = {
        idUsterki: document.getElementById('usterkaEditId').value,
        opis: document.getElementById('usterkaEditOpis').value,
        status: document.getElementById('usterkaEditStatus').value,
    };

    try {
        const response = await fetch('api/aktualizuj_usterke.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.message);


        komunikat.textContent = result.message;
        komunikat.style.color = 'lightgreen';
        setTimeout(() => {
            modal.style.display = 'none';
            komunikat.textContent = '';
        }, 1500);

        pobierzIWyswietlUsterki();

    } catch (error) {
        komunikat.textContent = 'Błąd: ' + error.message;
        komunikat.style.color = 'red';
    }
}