// ioSchemat.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <vector>
int main()
{
    std::vector<std::string> test;
    std::cout << "Hello World!\n";
}
class User {
public:
    std::string imie;
    std::string nazwisko;

    //metody
    bool zaloguj(std::string login, std::string hasło);
    bool wyloguj();
};



class Student:public User {
public:
    int id_studenta;
    std::string uczelnia;
    int nr_pokoju;
    enum wyposazenie{klucz, koldra, poduszka, poszwa, poszewka, prześcieradło, kabel_internetowy, pilot, koc};

    //metody
     void zglosUsterke(std::string opis, char* filepath);
     bool zaplac(int id_studenta, int kwota, std::string opis);
     void zlozWiosek(std::string imie, std::string nazwisko, std::string uczelnia, std::string date1, std::string data2);

};

class Pokoj {
public:
    int nr_pokoju;
    int typ_pokoju;
    enum status{zdany, gotowy_do_zdania, z_usterka, wolny, zajety};
    int placa;

    //metody
    bool dodajStudenta(int id_studenta);
    bool usunStudenta(int id_studenta);
    bool zmienStatus(enum status1, enum status2);
};


class Pracownik:public User { //po tym dziedziczy Admin, Zarządca DB, Usługi i Recepcja
    int id_pracownika;

    //metody
    bool generujRaport(int rodzaj);
};
class Recepcja:public Pracownik {
public:
    //metody
    bool odwiedziny(Pokoj pokoj, Student student);
    void wydajWyposażenie(Student student);
    void zdawaniePokoju(Pokoj pokoj, Student student);
};
class admin:public Pracownik{
public:
    //metody
    bool przetworzWniosek();//stworzyć klase wniosek
    bool zarejestrujStudenta(User toBeStudent);
    void zdawaniePokoju(Pokoj pokoj, Student student);
};
class uslugi:public Pracownik{
public:
    void kontrolaPokoju(Pokoj pokoj);

};
class konserwator:public uslugi{
public:
   void przyjmijUsterke(Usterka usterka);
   bool zmienStatusUsterki(Usterka usterka, int nowyStatus); //wywołanie wywoła metode w usterce co zmieni jej status na przekazany 
   bool zdawaniePokojuKonserwacha(Pokoj pokoj);
         
};
class sprzatanie :public uslugi {
public:
    void sprzataj();//iks de de mots zjadacz czasu
    bool zdawaniePokojuSprzatanie(Pokoj pokoj);

};






class Opłata {
    int id_oplaty;
    int wartosc;
    int id_studenta;
    std::string opis;
    std::string dataWykonania;

    //metody
    bool wykonajOplate();
};
class Usterka {
    int id_uslugi;
    std::string opis;
    enum statusUsterki{zgloszona, w_naprawie, naprawiona};
    std::string dataZgloszenia;
    std::string dataRozpoczecia;
    std::string dataZakonczenia;
    int id_pokoju;

    //metody
    bool zmienStatus(enum status1, enum status2);
};



class Raport {
    int id_pracownika;
    int id_raportu;
    std::string dataWystawienia;
    enum okers{miesiac, semestr, pol_roku, rok};
    
    //metody
    bool stworzRaport(); //wywoływane przez pracownik::generujRaport() potem przez przekazany argument wywoła metode dla wybranego typu raportu(jeden z tych poniżej)
};
class raportKonserwacyjny :public Raport {
public:
    std::string opis;
};
class raportFinansowy : public Raport {
public:
    int wydatki;
    int nalezlnosci;
    int wplaty;
};
class raportSzkod : public Raport {
public:
    std::vector<Usterka> usterki;
};
class raportZamieszkania: public Raport{
public:
    std::vector<Pokoj>statusZamieszkania;
};
