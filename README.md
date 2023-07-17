# IT-Network-projekt (Základní  - Evidence pojištěnců (zjednodušená verze))

![Uvod](https://github.com/Dvorak-Tom/IT-Network-projekt/assets/116516503/501760cf-22b8-429c-a9b9-156a4e4b9d4e)

-  [Popis aplikace](#popis-aplikace)
-  [Stránka registrace - funkce](#stránka-registrace---funkce)
-  [Editace pojištěnců - funkce](#editace-pojištěnců---funkce)


# Popis aplikace
Webová aplikace **InsuraApp** slouží pro ukládání informací o pojišťovaných osobách. Data o pojištěních se ukládají v kolekci v paměti prohlížeče. Aplikace vypisuje uložená data do tabulky. Je responzivní. 

:floppy_disk:**CSS:** 
-  `style.css:` základní styl všech stránek - navigace, footer, fonty... 
-  `buttons.css:` vzhled tlačítek
-  `registrace.css:` tabulka, registrační pole 
-  `detail.css:` info/editační podstránka jednotlivých pojištěnců 

:floppy_disk:**HTML:** 
-  `index.html:` úvodní stránka s registračním formulářem a tabulkou
-  `buttons.css:` tlačítka mají své styly v 
-  `detailPojistence.html:` info/editační stránka jednotlivých pojištěnců v 
-  `about.html:` stránka s informacema o aplikaci

:floppy_disk:**JavaScript:** 
-  `RegPojistence.js` obsahuje třídu pro s metodamy na ovládání úvodní stránky
-  `obsluha.js` pomocné funkce pro regPojistence
-  `DetailPojistence.js` obsahuje třídu pro podstránku s informacemi a editorem
-  `obsluhaUlozite.js` Kód na zapisování a načítání z LocalStorage
-  `testovaciData.json` soubor s daty pěti pojištěnců pro zkušební import.



Vyzkoušejte:
InsuraApp DEMO 👉 **[ZDE](https://main--rococo-cupcake-b3eada.netlify.app/)** 👈



# Stránka registrace - funkce
![Zakladni-funkce](https://github.com/Dvorak-Tom/IT-Network-projekt/assets/116516503/0b1cb891-115a-42a1-b4d8-efbec9f882d1)
**JS kód** k této stránce je převážně v **RegPojistence.js** a v **obsluhaReg.js**
1. Při otevření aplikace nebudou žádní pojištěnci zobrazeni. Po kliknutí na **"disketu"** si můžete nahrát zkušební data z JSON **"testovaciData.json"**
2. Ve čtvrtém sloupci jsou dvě ovládací tlačítka pro smazání řádku tlačítko **"Smaž"** a otevření vlastní stránky každého z pojištěnců s detaily o pojištění a možností editace tlačítko **"Edituj"**. Při mazání se aplikace dotáže zda chcete pojištěnce opravdu smazat. 
3. Tlačítko pro vytisknutí tabulky.
4. Každý datový sloupec se může kliknutím řadit vzestupně a při druhém kliknutí sestupně.
5. Pole pro vkládání:
    - **Jména a příjmení** automaticky přepisují první písmeno na velké.
    - **Věku** bere pouze čísla a to maximálně 130.
    - **Telefonního čísla** pouze čísla do 999999999.
    - Pokud zůstane jedno z polí nevyplněné vypíše se **chybová hláška**.


![chyba](https://github.com/Dvorak-Tom/IT-Network-projekt/assets/116516503/c03117c6-8810-4d76-87f2-7b38ece3991b)


# Editace pojištěnců - funkce
Po kliknutí na jedno z tlačítek **"Edituj"** na úvodní stránce se na nové stránce otevře náhled na všechny uložené informace o pojištěnci.

![info-nahled](https://github.com/Dvorak-Tom/IT-Network-projekt/assets/116516503/129e5b0b-7571-46a9-b700-cf004a28640b)

Kliknutím na **"Editace"** spustíte editor uložených informací.

Je možné ke každému pojištěnci přidat **poznámku** a **druh pojištění**. Poznámka i druh pojištění rozšíří vlastnosti objektu a uloží je také do paměti prohlížeče.
![Editor-funkce](https://github.com/Dvorak-Tom/IT-Network-projekt/assets/116516503/55fe5a3c-f6d3-4d94-9c88-02a1b4a011ac)


