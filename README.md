# Calculateur de moyenne MyGES
Calculateur de moyenne et de gains d'ECTS pour MyGES (Intranet du groupe GES)

![Exemple de moyenne sur MyGES](https://i.imgur.com/T8dv3Hu.png)

---

## Comment utiliser le script ?
### Extension chrome
Vous pouvez utiliser ce script depuis une extension chrome qui se chargera de lancer automatiquement le code lors de la visualisation des notes sur la page https://www.myges.fr/student/marks.

Pour installer l'extension sur chrome il faut :  
  - Cloner ce dépôt n'importe où sur votre ordinateur
  - Aller dans le menu de chrome (les 3 petits points à droite)
  - Aller dans l'onglet "Plus d'outils" puis dans "Extensions"
  - Dans l'onglet Extensions :
    - Activer le mode développeur
    - Cliquer sur "Chargez l'extension non empaquetée"
    - Sélectionner le dossier "Chrome Extension" contenu dans le projet précédemment cloné

Et voilà! L'extension vous permet, en plus de calculer votre moyenne automatiquement, d'accéder à la page des notes en cliquant sur l'icône de l'extension.

### Tampermonkey

#### Automatique

Tampermonkey est nativement prévu pour réagir aux fichiers se terminants par ".user.js", le lien ci-dessous devrait vous emmener sur la page d'installation du script sur Tampermonkey :  
https://github.com/QuantumSheep/MyGes-MarkCalculator/raw/master/tampermonkey_mgmc.user.js

Si cette méthode ne fonctionne pas, je vous invite à utiliser la méthode manuelle.

#### Manuelle

Bien évidemment, il est possible d'utiliser Tampermonkey pour charger ce script automatiquement, pour cela vous avez besoin de [TamperMonker](https://tampermonkey.net/) (On aurait pu s'en douter).

Ensuite il vous suffit de cliquer sur l'icone de Tampermonkey puis de cliquer sur "Dashboard". Une fois dans le panneau d'administration de vos scripts, vous devez aller dans l'onglet "Utilities" et dans la partie "URL", entrez le lien suivant:

```
https://github.com/QuantumSheep/MyGes-MarkCalculator/raw/master/tampermonkey_mgmc.user.js
```

Puis cliquez sur "Install".

Et voilà, un script tout prêt pour votre prochaine expédition dans vos notes MyGes !

### Depuis la console javascript
Allez sur la page https://www.myges.fr/student/marks.  
Copiez-collez le code du fichier "script.js" dans la console javascript de votre navigateur puis lancez le.

---

## Comment ouvrir la console javascript ?
### Chrome
Ouvrir le panneau "Console" des DevTools de Chrome :

    Windows: Ctrl + Shift + J

    Mac OS: Cmd + Opt + J

[Documentation](https://developer.chrome.com/devtools/docs/shortcuts)


### Firefox
Ouvrir le panneau "Console" des Developer Tools de Firefox :

    Windows: Ctrl + Shift + K

    Mac OS: Cmd + Opt + K

[Documentation](https://developer.mozilla.org/en-US/docs/Tools/Keyboard_shortcuts)


### Internet Explorer
Ouvrir le panneau "Console" des F12 Developer Tools d'Internet Explorer :

    F12, puis cliquer sur l'onglet “Console”

[Documentation](https://msdn.microsoft.com/en-us/library/ie/dn322041%28v=vs.85%29.aspx)


### Safari
Ouvrir le panneau "Console" dans l'Inspecteur Web de Safari :

    Cmd + Opt + I

Si le menu Développement n’apparaît pas dans la barre des menus, choisissez Safari > Préférences, cliquez sur Avancées, puis sélectionnez « Afficher le menu Développement dans la barre des menus ».

[Documentation](https://support.apple.com/en-ie/guide/safari-developer/keyboard-shortcuts-reference-dev654e5967f/mac)


### Opera

    Windows et Linux: Ctrl + Shift + I
    Mac : Cmd + Opt + I

[Documentation](http://www.opera.com/dragonfly/documentation/)
