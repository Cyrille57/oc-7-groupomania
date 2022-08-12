///////////////////////////////////////////////////////////
// editComment.js: ////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER §
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

      displayNavBar(comment)
      displayAllCommentOfPost(comment)
      modifyComment(comment)
      deleteComment(comment)
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


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Créer un commentaire:


function displayFormComment() {
  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')

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
  // Titre de la page:
  let titlePage = createTag('h1')
  addClass(titlePage, ['titlePage', 'text-center'])
  titlePage.innerHTML = 'Edition commentaire'

  // Injecte dans le html:
  divCol.appendChild(titlePage)

  //---------------------------------------------------------
  // Cadre Card Post:

  let divCommentFrameCard = createTag('div')
  addClass(divCommentFrameCard, ['post-frameCard'])

  let divSendComment = createTag('div')
  addClass(divSendComment, ['post-frameCard__send-post', 'shadow', 'rounded'])

  // Injecte dans le html:
  divCol.appendChild(divCommentFrameCard)
  divCommentFrameCard.appendChild(divSendComment)

  //---------------------------------------------------------
  // Formulaire Post:

  // Form:
  let commentForm = createTag('form')
  addClass(commentForm, ['post-frameCard__form'])
  commentForm.setAttribute('id', 'postForm')

  // Label :
  let divLabelInputComment = createTag('label')
  addClass(divLabelInputComment, ['sizeLabel', 'control-label', 'mt-2', 'mb-2'])
  divLabelInputComment.innerHTML = 'Votre commentaire:'

  // Input:
  let divInputComment = createTag('div')
  addClass(divInputComment, ['post-frameCard__input', 'modifySizeInput'])

  // Textarea:
  let textareaComment = createTag('textarea')
  addClass(textareaComment, ['shadow', 'rounded'])
  textareaComment.setAttribute('id', 'inputPost')
  textareaComment.setAttribute('name', 'post')
  textareaComment.setAttribute('type', 'text')
  textareaComment.setAttribute('rows', '2')
  textareaComment.setAttribute('placeholder', 'Un petit commentaire ?')
  textareaComment.required = true;

  // Frame Btn:
  let divBtnComment = createTag('div')
  addClass(divBtnComment, ['post-frameCard__frameBtn'])

  // Btn post:
  let btnComment = createTag('button')
  addClass(btnComment, ['post-frameCard__btn', 'btn--sendComment', 'shadow', 'rounded'])
  btnComment.setAttribute('type', 'button')
  btnComment.innerHTML = 'Comment'

  // Icone Post:
  let iconPost = createTag('span')
  addClass(iconPost, ['fas', 'fa-paper-plane'])

  // Injecte dans le html:
  divSendComment.appendChild(commentForm)
  commentForm.appendChild(divLabelInputComment)
  divLabelInputComment.appendChild(divInputComment)
  divInputComment.appendChild(textareaComment)
  commentForm.appendChild(divBtnComment)
  divBtnComment.appendChild(btnComment)
  btnComment.appendChild(iconPost)


  //---------------------------------------------------------
  // Envoie le Post:

  btnComment.addEventListener('click', (event) => {
    event.preventDefault();

    const urlSendComment = "http://localhost:3000/api/comments"

    let formData = {
      userId: idUserConnect,
      postId: getIdPost,
      content: document.getElementById('inputPost').value
    }
    var myInit = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8"
      }),
      body: JSON.stringify(formData),
      mode: 'cors',
      cache: 'default'
    };

    fetch(urlSendComment, myInit)
      .then(res => res.text())
      .then(res => window.location.reload())

  })

}
displayFormComment()

///////////////////////////////////////////////////////////
// Affiche tous les comentaire du post:


function displayAllCommentOfPost(comment) {

  for (let i = 0; i < comment.length; i++) {

    let commentLength = comment.length
    sessionStorage.setItem("commentLength", commentLength)

    //---------------------------------------------------------
    // Cadre de la card qui affiche les posts et comments:

    // Selectionne l'id parent:
    let divCol = document.getElementById('divCol')

    // Card:
    let commentOfPost = createTag('div') // postAndComment
    addClass(commentOfPost, ['postAndComment'])
    commentOfPost.setAttribute('id', 'postAndComment_' + comment[i].id)

    // Frame de la card:
    let divReadComment = createTag('div') // divReadPost
    addClass(divReadComment, ['display-frameCard__read-post', 'modifyReadPost', 'shadow', 'rounded'])
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
    // PLacement des icones modifier et supprimer le post:

    // Cadre pour les 2 icones:
    let divPlaceIcon = createTag('div')
    addClass(divPlaceIcon, ['display-frameCard__icon-Modify-Delete-Post'])

    // Icone modifier post:
    let iconModifyPost = createTag('i') //
    addClass(iconModifyPost, ['fas', 'fa-reply']) //
    iconModifyPost.setAttribute('id', 'modifyPost_' + comment[i].id) //
    iconModifyPost.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyPost.setAttribute('data-bs-placement', 'right')
    iconModifyPost.setAttribute('title', 'Modifier')
    iconModifyPost.setAttribute('data-idModifyPost', comment[i].id)

    // Récuoere l'id du post a modifier:
    const getIdModify = ('data-idModifyPost', comment[i].id) //

    // Icone supprimer le post:
    let iconDeletePost = createTag('i')
    addClass(iconDeletePost, ['fas', 'fa-times-circle'])
    iconDeletePost.setAttribute('id', 'deleteComment_' + comment[i].id)
    iconDeletePost.setAttribute('data-bs-toggle', 'tooltip')
    iconDeletePost.setAttribute('data-bs-placement', 'right')
    iconDeletePost.setAttribute('title', 'Supprimer')
    iconDeletePost.setAttribute('data-idDeletePost', comment[i].id)

    // Injecte dans le html:
    divDisplayPost.appendChild(divPlaceIcon)
    divPlaceIcon.appendChild(iconModifyPost)
    divPlaceIcon.appendChild(iconDeletePost)

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

///////////////////////////////////////////////////////////
// Affiche le username du comment:


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


///////////////////////////////////////////////////////////
// Fonction modifie le comment:


function modifyComment(comment) {

  for (let i = 0; i < comment.length; i++) {

    // Sélectionne l'icone modify du post correspondant:
    let iconmodifyComment = document.getElementById('modifyPost_' + comment[i].id)

    iconmodifyComment.addEventListener('click', (event) => {
      event.preventDefault();

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = comment[i].userId

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {
        console.log('désolé')
      } else {

        //---------------------------------------------------------
        // Sélectionne:

        // le post:
        let displayPost = document.getElementById('displayPost_' + comment[i].id)

        // info date:
        let pDate = document.getElementById('pDate_' + comment[i].id)

        // bouton backToPost:
        let backToPost = document.getElementById('btnViewComment')

        let readComment = document.getElementById('divReadPost_' + comment[i].id)

        let commentOfPost = document.getElementById('postAndComment_' + comment[i].id)

        // Récuoere l'id du post a modifier:
        const getIdModify = ('data-idModifyPost', comment[i].id)

        //---------------------------------------------------------
        // Cache le post pour introduire le input pour update le post:
        displayPost.style.display = 'none'
        pDate.style.display = 'none'
        backToPost.style.display = 'none'

        let formModify = createTag('form')
        addClass(formModify, ['d-flex', 'modifyForm', 'flex-column', 'justify-content-around', 'postForm'])

        let frameTextereaModifyComment = createTag('div')
        addClass(frameTextereaModifyComment, ['frameTextereaModifyPost', 'input-field', 'modifieFrame'])
        returnModifyComment(frameTextereaModifyComment)

        let textareaModyfyPost = createTag('textarea')
        addClass(textareaModyfyPost, ['form-control', 'input-lg', 'p-text-area', 'shadow', 'rounded'])
        textareaModyfyPost.setAttribute('id', 'modifyPost')
        textareaModyfyPost.setAttribute('name', 'post')
        textareaModyfyPost.setAttribute('type', 'text')
        textareaModyfyPost.setAttribute('rows', '2')
        textareaModyfyPost.setAttribute('placeholder', 'On efface et on recommence ?')

        readComment.appendChild(formModify)
        formModify.appendChild(frameTextereaModifyComment)
        frameTextereaModifyComment.appendChild(textareaModyfyPost)

        // Btn:
        let divBtnSendPostModify = createTag('a')
        addClass(divBtnSendPostModify, ['button-backToPost', 'shadow', 'rounded', 'modify-btn-send'])
        divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
        divBtnSendPostModify.setAttribute('type', 'button')
        divBtnSendPostModify.innerHTML = 'Mettre à jour'

        // Icone dans le bouton :
        let iconePostModify = createTag('i')
        addClass(iconePostModify, ['fas', 'fa-external-link-alt'])

        // Ecoute le bouton mettre à jour:
        divBtnSendPostModify.addEventListener('click', (event) => {

          //---------------------------------------------------------
          // Préparation de l'url pour la modification du comment:

          // Recupere l'id du post:
          let getModify = document.getElementById('postAndComment_' + getIdModify)

          // Ajoute a l'url l'id du post:
          const url = "http://localhost:3000/api/comments/" + getIdModify

          //---------------------------------------------------------
          // Récupére la modification du post:

          function modifyFormData() {

            for (var i = 0; i < comment.length; i++) {

              let formData = {
                id: getIdModify,
                userId: idUserConnect,
                postId: getIdPost,
                content: textareaModyfyPost.value
              }
              return formData
            }
          }
          modifyFormData()
          //---------------------------------------------------------
          // Envoie la modification du post:

          var myInit = {
            method: "PUT",
            headers: new Headers({
              "Content-Type": "application/json;charset=UTF-8",
              "Authorization": 'Bearer ' + tokenConnect
            }),
            body: JSON.stringify(modifyFormData()),
            mode: 'cors',
            cache: 'default'
          };

          fetch(url, myInit)
            .then(response => response.json())
            .then(res => document.location.reload())
            .catch(err => console.log(err))

        })

        // Injecte dans le html:
        readComment.appendChild(formModify)

        formModify.appendChild(frameTextereaModifyComment)
        frameTextereaModifyComment.appendChild(textareaModyfyPost)

        frameTextereaModifyComment.appendChild(divBtnSendPostModify)
        divBtnSendPostModify.appendChild(iconePostModify)

        frameTextereaModifyComment.appendChild(btnReturnReadPost)
        btnReturnReadPost.appendChild(iconeReturnReadPost)

      }



    })
  }
}
modifyComment()


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Return commments:


function returnModifyComment(frameTextereaModifyComment) {

  let btnReturnReadPost = createTag('button')
  addClass(btnReturnReadPost, ['button-backToPost', 'shadow', 'rounded', 'modifyReturn'])
  btnReturnReadPost.setAttribute('id', 'btnReturnReadPost')
  btnReturnReadPost.setAttribute('type', 'button')
  btnReturnReadPost.innerHTML = 'Retour'

  // Icone dans le bouton :
  let iconeReturnReadPost = createTag('i')
  addClass(iconeReturnReadPost, ['fas', 'fa-undo'])



  frameTextereaModifyComment.appendChild(btnReturnReadPost)
  btnReturnReadPost.appendChild(iconeReturnReadPost)

  //---------------------------------------------------------
  // Ecoute le bouton retour:
  btnReturnReadPost.addEventListener('click', (event) => {
    document.location.reload()
  })

}


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Delete Comment:


function deleteComment(comment) {


  for (let i = 0; i < comment.length; i++) {

    // Sélectionne l'icone delete du post correspondant:
    let getDelete = document.getElementById('deleteComment_' + comment[i].id)

    // Ecoute l'icone delete:
    getDelete.addEventListener('click', (event) => {
      event.preventDefault();

      // Cible l'icone du comment:
      let getIdDelete = event.target.getAttribute('data-idDeletePost')

      // Sélectionne l'id du post:
      let getIdPost = document.getElementById('postAndComment_' + comment[i].id)

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = comment[i].userId

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {
        console.log('désolé')
      } else {
        //---------------------------------------------------------
        // Supprime le post coté front:
        getIdPost.remove(getIdDelete)

        //---------------------------------------------------------
        // Supprime le post coté back:

        // Prépare l'url pour supprimer sur le backend:
        function getUrlDelete() {

          for (var i = 0; i < comment.length; i++) {
            const url = "http://localhost:3000/api/comments/" + getIdDelete
            return url
          }
        }
        getUrlDelete()

        // Envoie la requête:
        var myInit = {
          headers: {
            'Authorization': 'Bearer ' + tokenConnect
          },
          method: "DELETE"
        };

        // Envoie la requête cioté back:
        fetch(getUrlDelete(), myInit)
          .then(res => res.json())
          .then(res => console.log(res))

      }

    })

  }

}


///////////////////////////////////////////////////////////
