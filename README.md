# poc-redux

```
npm install
npm start
```


**Salut Aurel**, si tu lis ca c'est que ca va deja un peux mieux :)

Le code de cette appli n'est pas de moi mais j'ai fait attention a être au plus proche de ce que j'aimerais faire.

J'ai utilisé **webpack** comme outil de build. C'est un concurent de grunt et gulp sur lequel j'ai lu beaucoup de très bonnes choses.

J'ai utilisé **Babel** comme plugin pour le projet. Cet outil compile nous permet d'ecrire notre code en JSX et es6 et le compile en javascript pour être compris par tout les navigateurs.

- Sur JSX : C'est un langage trés utilisé avec react. Dans réact on ne gere pas de "template" html comme dans Angular. On manipule un DOM virtuel ce qui est apparament plus performant. JSX ajoute un peu de syntaxe a js par exemple :
```{JSX}
monHtml = <div> Remarque bien l'absence de guillemets </div>
```

- Sur ES6 : C'est la nouvelle mouture de javacript qui ajoute beaucoup de chose au langage (qui ont l'air de permettre d'economiser bon nombre de ligne de code). Seulement cette version n'est pas encore intégrées dans tous les navigateurs donc pour profiter des new features avant l'heure on la compile en javascript.

Pour la suite je vais essayer de faire une app perso a la place de celle-ci dans le genre de la notre mais quelque chose de tres simple pour commencer. Et d'integrer un outil de test unitaires apellé Tape.

Voila, A bientot,
Antoine
