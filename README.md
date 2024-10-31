# Treeningu Assistendi Rakendus

https://sanderprii.github.io/TreeningAssistent

Treeningu assistendi rakendus on veebipõhine treeningpäevik, kuhu saad lisada oma treeningud, jälgida edusamme ja saavutada oma treeningueesmärke. Rakendus on loodud HTML, CSS ja JavaScripti kasutades, et pakkuda kasutajasõbralikku liidest ja sujuvat kasutuskogemust.

## Funktsionaalsus

| Funktsionaalsus            | Staatus      | Kirjeldus                                                                   |
|----------------------------|--------------|-----------------------------------------------------------------------------|
| Kasutaja loomine           |:heavy_check_mark: | Kasutaja saab registreerida ja luua konto rakenduses.                       |
| Sisse logimine             |   :heavy_check_mark:  | Kasutaja saab registreeritud kasutajaga sisse logida.                       |
| Profiili pildi lisamine    |  :heavy_check_mark:  | Võimalus lisada profiili pilt                                               |
| Treeningute lisamine       |              | Võimalus lisada uusi treeninguid, sh kuupäev, tüüp ja kestus.               |
| Treeningute vaatamine      |        | Kõik treeningud kuvatakse kasutajale kronoloogilises järjekorras.           |
| Treeningute kustutamine    |        | Võimalus eemaldada lisatud treeninguid.                                     |
| Treeningute filtreerimine  |      | Treeninguid saab filtreerida kuupäeva, tüübi ja kestuse järgi.              |
| Statistika ja analüüs      |       | Kokkuvõtete ja statistika kuvamine kasutaja treeningutest.                  |
| Kohandatav disain          |       | Kasutajaliidese disain ja värvide kohandamine CSS-i abil.                   |
| Notifikatsioonid           |      | Meeldetuletused ja märguanded regulaarselt treenimiseks.                    |
| Andmete salvestamine pilve |      | Treeninguandmete pilvesalvestus, et võimaldada juurdepääs mitmelt seadmelt. |


## Tehnilised Nõuded

- Veebibrauser (näiteks Google Chrome, Firefox, Safari)
- HTML, CSS, JavaScript
- Node.js
- NPM (Node Package Manager)

## Projekti Struktuur

```
    ├── index.html
    ├── style.css
    ├── script.js
    ├── server.js
    └── README.md
```

## Paigaldusjuhend

1. Klooni projekt

```
   - git clone <https://github.com/sanderprii/TreeningAssistent>
   - cd treeningassistent
   - mkdir uploads
```
2. Paigalda sõltuvused
```
- npm init -y
- npm install express multer
```
3. Käivita server
```
- node server.js
```
Server töötab aadressil: http://localhost:3000

## Täiendavad märkused

- Profiilipilt salvestatakse serveri uploads kausta ja on kättesaadav aadressil /uploads/{failinimi}.
- Koodis kasutatav Multer pakett haldab üleslaaditud failide salvestamist.
- Serveris töötavad failid ja profiilipilt jäävad alles ka pärast lehe uuesti laadimist.