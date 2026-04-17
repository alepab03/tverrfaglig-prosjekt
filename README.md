# Prosjektoppgave 2INF og 2DEL - Nettside
Dette prosjektet er laget for en skoleoppgave. Oppgaven gikk ut på å lage en nettside for et adganssystem hvor det skulle være mulig å se og administrere adganger.
Vi løste oppgaven med å lage denne nettsiden hvor man kan se logg på adganger, og administrere brukere og adgangskort.

#### Teknologi brukt i prosjektet:
Frontend: Next.js med TypeScript og TailwingCSS, Axios  
Backend: Node.js med TypeScript, ts-node, Express, CORS, MySQL2, bcrypt, JSON Web Token, nodemon  
Database: MySQL på en Ubuntu server

### For å kjøre prosjektet på egen maskin:
#### !! Ha begge terminaler oppe og kjørende samtidig !!
#### Terminal 1:
  cd nettside  
  npm install  
  npm run dev  

#### Terminal 2:
  cd server  
  npm install  
  npm run dev 

#### Legg .env fil i "server" mappen før du kjører prosjektet. 

#### Innlogginger til nettsiden:
  
(admin tillatelser)  
Brukernavn: testbruker  
Passord: katta123  
  
(readOnly tillatelser)  
Brukernavn: testbruker2  
Passord: katta123
