# Caldes Connecta

El directori digital dels negocis de Caldes de Montbui. Un sol lloc on trobar restaurants, botigues, serveis i artesans del poble — per nom, per allò que necessites, o al mapa.

**Domini:** caldesconnecta.cat
**Estat:** MVP en fase de demo — sense negocis reals contactats encara, dades d'exemple.

---

## El concepte

Caldes de Montbui no té cap directori digital centralitzat dels seus negocis locals. Qui vol trobar un forn, una perruqueria o un electricista del poble depèn del boca-orella o de cercar-ho a Google sense cap garantia que la informació estigui actualitzada.

Caldes Connecta vol ser aquest punt de trobada: un directori senzill, ràpid i pensat per a mòbil, on qualsevol pugui:

- Cercar un negoci pel seu nom
- Cercar per allò que necessita ("brunch", "gelat artesà", "ceràmica"...) encara que no sàpiga el nom del negoci
- Veure'ls tots situats al mapa del poble
- Saber quins negocis estan contractant personal ara mateix

## A qui s'adreça

- **Veïns i visitants de Caldes de Montbui**, que fan servir el directori per trobar negocis del poble.
- **Negocis locals**, que hi apareixen amb la seva fitxa (horaris, contacte, ubicació) i, en un futur, la podran gestionar ells mateixos.

Segons el directori públic de l'Eix de la Riera de Caldes (AMERC), Caldes de Montbui té uns 490 negocis actius en comerç, hostaleria/restauració i serveis a les persones — i més del 60% no tenen cap presència web pròpia. Aquí és on Caldes Connecta té sentit.

## Estat actual del projecte

No hi ha backend: les dades són un fitxer estàtic amb 8 negocis reals de mostra (alguns amb webs fetes per nosaltres mateixos). L'app es divideix en dues rutes:

- **`/`** — landing de presentació: concepte, vídeo de presentació (pendent) i crida a explorar la demo.
- **`/demo`** — el directori interactiu funcional: pestanyes de Negocis / Productes / Mapa, filtres per categoria, cerca, fitxa de negoci.

L'enfocament actual és mostrar el concepte a negocis locals abans de construir tota la infraestructura (gestió de fitxes, pagaments, etc.), per validar interès real abans d'invertir-hi temps de desenvolupament.

## Identitat visual

### Paleta — "Terracota termal"

Inspirada en les teules i els banys romans de Caldes, en comptes d'una paleta genèrica d'estil SaaS.

| Rol | Color | Hex |
|---|---|---|
| Primari (accent, botons, actiu) | Terracota | `#C1622E` |
| Primari clar (hover suau) | Terracota clar | `#E3946A` |
| Primari fosc (hover/actiu) | Terracota fosc | `#96471F` |
| Accent secundari (destacats suaus) | Préssec clar | `#F0C9A8` |
| Suport / neutre fosc | Verd pedra | `#3D4A3A` |
| Suport / neutre clar | Verd pedra clar | `#6B7A63` |
| Fons de pàgina | Crema/sorra | `#F6F1E9` |
| Superfície (cards, modals) | Blanc càlid | `#FFFDF8` |
| Superfície alternativa | Crema fosc | `#EFE7D8` |
| Text principal | Gairebé negre càlid | `#2B2620` |
| Text secundari | Marró-gris | `#6B6255` |
| Vora | Sorra clar | `#E4D9C5` |
| Senyal "contracta" | Verd oliva | `#4A5D3A` |

Un sol accent principal (terracota) per a tot allò interactiu i de marca; el verd s'utilitza només com a senyal puntual (badge "contracta ara"), no com a segon accent competint amb el primer.

### Tipografia

- **Titulars / marca:** [Bebas Neue](https://fonts.google.com/specimen/Bebas+Neue) — condensada, majúscules, amb caràcter.
- **Cos de text:** [Roboto](https://fonts.google.com/specimen/Roboto) — neutra i molt llegible en interfície densa.

### Logotip

`public/logo.svg` — wordmark "CALDES CONNECTA" amb una corba en degradat terracota que acaba en un cursor de clic, representant la idea de "connectar-hi amb un sol clic". És un disseny de treball, pensat per evolucionar amb l'ajuda d'un dissenyador/agent de branding.

## Stack tècnic

- **Next.js 16** (App Router, export estàtic) + **React 19**
- **Tailwind CSS 4**
- **Leaflet / react-leaflet** per al mapa
- **Lucide** per a iconografia (provisional — candidat a substituir per un set més propi)
- Desplegament estàtic a **Netlify** (`next build` → `/out`)

## Full de ruta

1. Vídeo de presentació (Higgsfield) com a *placeholder* de la web, per mostrar el concepte als negocis abans que la plataforma estigui operativa.
2. Contactar negocis locals (llista prioritzada de negocis sense web pròpia) per validar interès.
3. Amb els primers compromisos, construir el mínim viable real: gestió de fitxes, possiblement backend/CMS.
4. Llançament oficial a caldesconnecta.cat quan hi hagi contingut i negocis reals suficients.

## Què busquem d'un col·laborador de branding/disseny

- Revisió i evolució del logotip actual (concepte "un clic" en terracota).
- Sistema d'identitat coherent: paleta, tipografia i to de veu per a materials d'outreach (vídeo, landing, fitxes de negoci).
- Mirada crítica sobre si "terracota termal" és la direcció correcta o si hi ha una identitat més forta per a un poble termal de tradició catalana.

---

## Desenvolupament local

```bash
npm install
npm run dev
```

Obre [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # genera l'export estàtic a /out
```
