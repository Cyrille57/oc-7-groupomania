# 📢 Projet OpenClassrooms / P7 Groupomania
<p>01.07.2021</p>
<p> 
  Dans le cadre de ma formation développeur web avec OpenClassrooms, différents projets sont à realiser.
</p>

<p> 
  Le scénario de ce septième et dernier projet, en tant que développeur chez CONNECT-E, une petite agence web,
  consiste à construire un réseau social interne pour les employés de Groupomania, un groupe spécialisé dans la grande distribution. </br>
  Le but de cet outil est de faciliter les interactions entre collègues.
  
</p>

<p> 
  Pour ce faire, les <a href="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf"> 
  spécifications fonctionnelles </a> et <a href="https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Logos+(3).zip">logos</a>,
  me sont fournies.
</p>
<!--
<p>
  <img alt="Groupomania" 
       src="" style:"max-width:60%; width:50%;">
</p>
-->
<p>
    <img alt="inscription_groupomania.html" 
       //src="https://github.com/Cyrille57/oc-7-groupomania/blob/master/frontend/public/screenshot/groupomania - inscription.jpg">
</p></br>

<p>
    <img alt="the wall_groupomania.html" 
       //src="https://github.com/Cyrille57/oc-7-groupomania/blob/master/frontend/public/screenshot/groupomania- the wall.jpg">
</p>

<h2>📝 Consignes:</h2>

<ul>
  <li>
    Choisir entre 9GAG (partage,comment les gifs) et Reddit (créer, partage des posts), les fonctionnalités à intégrer.
  </li>
  <li>
    Utiliser une base de données relationnelles, pour ce projet MySql est choisi.
  </li>
  <li>
    Mettre en œuvre des opérations CRUD pour les utilisateurs, posts et comments associer.
  </li>
  <li>
    Un des employés du groupe testera un MVP du produit.
  </li>
  <li>
    Carte blanche concernant la forme que cela prend.
  </li>
  <li>
    Respecter les standards WCAG.
  </li>
</ul>

<h2>⚡ Technologies demandées: </h2>

<p> Javascript, choix d'utiliser un framework Front-End ou non, serveur Node.js, framwork Express, base de données Mysql.</p>

<h2>👀 Rendu: </h2>

<h3> 🔨 Prérequis: </h3>

<ul>
 <li>
  NodeJS et WAMP doit être installé localement sur votre machine windows.
 </li>
 <li>
  Cloner ce projet.
 </li>
</ul>

<h3> 🔧 Installation:</h3>

<h4>▶️ Backend</h4>
<p>
  Dans le terminal, aller dans le dossier backend <code>cd backend</code>,</br>
  Charger les packages: 
  <ul>
    <li>
      nodemon <code>npm install -g nodemon</code>
    </li>
    <li>
      sequelize <code> npm i sequelize</code>
    </li>
  </ul>
  Exécuter Wamp. </br>
  Créer la base de données:      <code>sequelize db:create</code>, </br>
  migrer les models dans la bdd: <code>sequelize db:migrate</code>. </br> </br>
  Ensuite aller dans php my admin => bdd_groupomania => users. </br>
  Dans Insérer, 
  <ul>
    <li>
      créer un user avec ce mot de passe: Abcd1234!
    </li>
    <li>
      mettre dans le champs admin: 1
    </li>
  </ul>
 <p>  
  Lancer le serveur <code>nodemon</code>. 
 </p>

<h4>▶️ Frontend</h4>
<p>
  Dans le terminal, aller dans le dossier frontend <code>cd frontend</code>,</br>
  Puis, : 
  <ul>
    <li>
      lancer Sass <code>npm run sass</code>
    </li>
    <li>
      ouvrir le navigateur sur <code>http://127.0.0.1:5501/frontend/index.html</code>
    </li>
    <li>
      Connectez-vous à l'aide des informations précédemment renseignées.
    </li>
  </ul>
</p>

<h2>🙋‍♂️ À propos: </h2>

<ul>
  <li>
    <a href="https://www.linkedin.com/in/cyrille-morel/">Linkedin</a>
  </li>
</ul> 


<h2>📫 Contact: </h2>

<ul>
  <li>
    <a href="mailto:cyril_dev@outlook.fr">Mail</a>
  </li>
</ul>

 <h2>🌐 Réseaux sociaux:</h2>
 
<ul>
  <li>
    <a href="https://discord.gg/At8T9HD">Discord</a>
  </li>
  <li>
    <a href="https://twitter.com/Cyril2101">Twitter</a>
  </li>
</ul>
