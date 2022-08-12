///////////////////////////////////////////////////////////
// viewComment.js: ////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER
///////////////////////////////////////////////////////////
// Récuére l'id et la concaténe avec l'ulr comment;


//---------------------------------------------------------
// Récupére l'id dans l'url:
const getIdEditCommentOfPostUrl = window.location.search

//---------------------------------------------------------
// Purge getIdUrl de ?id= et recupere  l'id :

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdEditCommentOfPostUrl);

// Recupére l'id du post:
const getIdPost = parseInt(getUrlParams.get('id'))

//---------------------------------------------------------
// Url de comments:

const urlComment = "http://localhost:3000/api/comments/post/" + getIdPost;

//---------------------------------------------------------
//token:

// récupére l'id de l'user:
var idUserConnect = parseInt(localStorage.getItem('infoUserId'))

// Récupére le token:
var tokenConnect = localStorage.getItem('infoUserToken')

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Connexion:

// Fonction qui récupére le comments:

async function connectComment(urlComment) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var comment = JSON.parse(this.responseText)

      comment.reverse()

      displayAllCommentOfPost(comment)
      displayUsername(comment)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlComment, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectComment(urlComment)


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Navbar:


function displayNavBar(comment) {

  //Selectionne l'id parent:
  // header:
  let header = document.getElementById('header')

  // frame de la navbar:
  let frameNavBar = createTag('nav')
  addClass(frameNavBar, ['navbar', 'postWall-navbar'])

  // container de la navbar:
  let containerNavBar = createTag('div')
  addClass(containerNavBar, ['container', 'postWall-container'])

  // Injecte dans le html:
  header.appendChild(frameNavBar)
  frameNavBar.appendChild(containerNavBar)

  // frame logo:
  let frameLogo = createTag('div')
  addClass(frameLogo, ['postWall-frame-logo'])

  // lien du lmogo:
  let linkLogo = createTag('a')
  linkLogo.setAttribute('href', '../html/postWall.html')

  // image du logo:
  let logo = createTag('img')
  addClass(logo, ['postWall-logo-site'])
  logo.setAttribute('src', '../images/Logo Groupomania/icon-font-monochrome-white.png')
  logo.setAttribute('width', '35')
  logo.setAttribute('height', '35')
  logo.setAttribute('alt', 'Logo de Groupomania')

  // Injecte dans le html:
  containerNavBar.appendChild(frameLogo)
  frameLogo.appendChild(linkLogo)
  linkLogo.appendChild(logo)

  // frame ul:
  let frameUl = createTag('div')
  addClass(frameUl, ['postWall-frameUlNav'])

  // ul
  let ulNav = createTag('ul')
  addClass(ulNav, ['postWall-frameUlNav__ul'])

  // Injecte dans le html:
  containerNavBar.appendChild(frameUl)
  frameUl.appendChild(ulNav)

  // li vue profil:
  let liViewProfil = createTag('li')
  addClass(liViewProfil, ['postWall-linkProfil'])

  // lien de viewProfil:
  let linkViewProfil = createTag('a')
  linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + comment)

  // icone vue profil:
  let iconeViewProfil = createTag('i')
  addClass(iconeViewProfil, ['fas', 'fa-user-circle', 'fa', 'postWall-linkProfil__icon'])

  // li logout:
  let liLogOut = createTag('li')
  addClass(liLogOut, ['postWall-linkDeconnect'])

  // lien de logout:
  let linkLogout = createTag('a')
  linkLogout.setAttribute('id', 'logOut')

  // icone logOut:
  let iconeLogOut = createTag('i')
  addClass(iconeLogOut, ['fas', 'fa-sign-out-alt', 'fa', 'postWall-linkDeconnect__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liLogOut)
  liLogOut.appendChild(linkLogout)
  linkLogout.appendChild(iconeLogOut)

  //---------------------------------------------------------
  // LogOut:

  // Sélectionne l'icone:
  let getLinkLogout = document.getElementById('logOut')

  // Ecoute le lien:
  getLinkLogout.addEventListener('click', (event) => {

    localStorage.removeItem('infoUserToken')
    localStorage.removeItem('infoUserId')
    location.href = '../../index.html'
  })

}
displayNavBar()

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche tous les comentaire du post: OK

//---------------------------------------------------------


function displayAllCommentOfPost(comment) {

  //---------------------------------------------------------
  //Selectionne l'id parent:
  let main = document.querySelector('main')

  //---------------------------------------------------------
  // Titre de la page:
  let titlePage = createTag('h1')
  addClass(titlePage, ['titlePage', 'text-center'])
  titlePage.innerHTML = 'Les commentaires du post'

  // Injecte dans le html:
  main.appendChild(titlePage)
  for (let i = 0; i < comment.length; i++) {

    //---------------------------------------------------------
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div') //
    addClass(divContainer, ['container'])

    // Row:
    let divRow = createTag('div') //
    addClass(divRow, ['row'])

    // Col-12
    let divCol = createTag('div') //
    addClass(divCol, ['col-12'])
    divCol.setAttribute('id', 'divCol')

    // Injecte dans le html:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    //---------------------------------------------------------
    // Cadre de la card qui affiche les posts et comments:

    // Card:
    let commentOfPost = createTag('div') // postAndComment
    addClass(commentOfPost, ['postAndComment'])
    commentOfPost.setAttribute('id', 'postAndComment_' + comment[i].id)

    // Frame de la card:
    let divReadComment = createTag('div') // divReadPost
    addClass(divReadComment, ['display-frameCard__read-post', 'modifyReadComment', 'shadow', 'rounded'])
    divReadComment.setAttribute('id', 'divReadPost_' + comment[i].id)
    divReadComment.setAttribute('data-divReadPost', comment[i].id)

    // Injecte dans le html:
    divCol.appendChild(commentOfPost)
    commentOfPost.appendChild(divReadComment)

    //---------------------------------------------------------
    // Intérieur de la card:

    // H2 Cadre Username:
    let divDisplayUsername = createTag('div')
    addClass(divDisplayUsername, ['display-frameCard__username'])

    //Username:
    let divUsername = createTag('h2')
    divUsername.setAttribute("id", "username_" + comment[i].id)
    divUsername.setAttribute('data-idUsername', comment[i].userId)

    // Cadre du displayPost:
    let divDisplayPost = createTag('div')
    addClass(divDisplayPost, ['display-frameCard__displayPost', 'modify-DisplayPost', 'shadow', 'rounded'])
    divDisplayPost.setAttribute('id', 'displayPost_' + comment[i].id)

    // Affichage du post:
    let divPost = createTag('p')
    divPost.innerHTML = comment[i].content

    // Injecte dans le html:
    divReadComment.appendChild(divDisplayUsername)
    divDisplayUsername.appendChild(divUsername)
    divReadComment.appendChild(divDisplayPost)
    divDisplayPost.appendChild(divPost)

    //---------------------------------------------------------
    // PLacement de la date du publication du post:

    // Cadre de la date:
    let divInfoDate = createTag('div')
    addClass(divInfoDate, ['display-frameCard__infoPost'])
    divInfoDate.setAttribute('data-idInfoDate', comment[i].id)

    // Convertit la date:
    let convertsDate = new Date(comment[i].createdAt);
    let dateFormat = (convertsDate.toLocaleString())

    // Date de publication:
    let pDate = createTag('p')
    pDate.setAttribute('id', 'pDate_' + comment[i].id)
    pDate.setAttribute('data-pDate', comment[i].id)
    pDate.innerHTML = dateFormat

    // Injecte dans le html:
    divReadComment.appendChild(divInfoDate)
    divInfoDate.appendChild(pDate)

    //---------------------------------------------------------
    // PLacement du bouton retour au waal post;

    let backToPost = createTag('a')
    addClass(backToPost, ['button-backToPost'])
    backToPost.setAttribute('id', 'btnViewComment')
    backToPost.setAttribute("href", "../html/postWall.html")
    backToPost.innerHTML = 'Retour aux posts'

    // Icone dans le bouton vue:
    let iconeBackToPost = createTag('i')
    addClass(iconeBackToPost, ['far', 'fa-hand-point-left'])

    // Injecte dans le html:
    divReadComment.appendChild(backToPost)
    backToPost.appendChild(iconeBackToPost)

  }

}


///////////////////////////////////////////////////////////
// Affiche le username du comment: a voir si valide quand auth en place


function displayUsername(comment) {

  for (let i = 0; i < comment.length; i++) {

    //Sélectionne le h2 du comment correspondant:
    let hUsername = document.getElementById('username_' + comment[i].id)

    // Récupe l'userId et l'ajoute a l'url des user:
    let findUrlUser = 'http://localhost:3000/api/users/' + comment[i].userId

    fetch(findUrlUser)
      .then(response => response.json())
      .then(data => {

        hUsername.innerHTML = data.username

      })

  }

}
displayUsername()

///////////////////////////////////////////////////////////
