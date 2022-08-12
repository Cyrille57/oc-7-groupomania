///////////////////////////////////////////////////////////
// PostWall.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER
///////////////////////////////////////////////////////////
// Connexion et récupération: valide



//---------------------------------------------------------
// Posts:


//---------------------------------------------------------
//token:

// récupére l'id de l'user:
var idUserConnect = parseInt(localStorage.getItem('infoUserId'))
console.log('idUserConnect:')
console.log(idUserConnect)

// Récupére le token:
var tokenConnect = localStorage.getItem('infoUserToken')
console.log('Admin.js token:')
console.log(tokenConnect)

// Récupére le role admin:

var admin = localStorage.getItem('infoAdmin')
console.log('Admin.js admin:')
console.log(admin)


// Url pour recupérer les posts:
const urlPost = 'http://localhost:3000/api/posts'

// Fonction qui récupére les posts:
async function connectPost(urlPost) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var post = JSON.parse(this.responseText)

      post.reverse()

      displayAllPosts(post)
      modifyPost(post)
      deletePost(post)
      displayUsername(post)

      for (var i = 0; i < post.length; i++) {
        var userIdPost = post[i].userId
      }

      sessionStorage.setItem("userIdPost", userIdPost)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlPost, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectPost(urlPost)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Navbar:

function displayNavBar() {

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

  //---------------------------------------------------------
  // Menu:

  //---------------------------------------------------------
  // Admin:

  // li admin
  let liAdmin = createTag('li')
  addClass(liAdmin, ['postWall-linkAdmin'])

  // lien de admin:
  let linkAdmin = createTag('a')
  linkAdmin.setAttribute("href", "../html/admin.html?id=" + idUserConnect)

  // icone Admin:
  let iconeAdmin = createTag('i')
  addClass(iconeAdmin, ['fas', 'fa-user-lock', 'fa', 'postWall-linkAdmin__icon'])

  // Injecte dans le html SI admin
  if (admin != 'true') {
    console.log(' JE SUIS PAS ADMIN§ :(')
    console.log(admin)

  } else {
    console.log(' JE SUIS ADMIN§!!!')
    console.log(admin)
    ulNav.appendChild(liAdmin)
    liAdmin.appendChild(linkAdmin)
    linkAdmin.appendChild(iconeAdmin)

  }

  //---------------------------------------------------------
  // Voir le profil:

  // li vue profil:
  let liViewProfil = createTag('li')
  addClass(liViewProfil, ['postWall-linkProfil'])

  // lien de viewProfil:
  let linkViewProfil = createTag('a')
  linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + idUserConnect)

  // icone vue profil:
  let iconeViewProfil = createTag('i')
  addClass(iconeViewProfil, ['fas', 'fa-user-circle', 'fa', 'postWall-linkProfil__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liViewProfil)
  liViewProfil.appendChild(linkViewProfil)
  linkViewProfil.appendChild(iconeViewProfil)


  //---------------------------------------------------------
  // Logout:

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
// Affiche l'input et envoie les posts:


function displayFormPost() {
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
  addClass(titlePage, ['titlePage', 'text-center', 'text-white'])
  titlePage.innerHTML = 'The Wall'

  // Injecte dans le html:
  divCol.appendChild(titlePage)

  //---------------------------------------------------------
  // Cadre Card Post:

  let divPostFrameCard = createTag('div')
  addClass(divPostFrameCard, ['post-frameCard'])

  let divSendPost = createTag('div')
  addClass(divSendPost, ['post-frameCard__send-post', 'shadow', 'rounded'])

  // Injecte dans le html:
  divCol.appendChild(divPostFrameCard)
  divPostFrameCard.appendChild(divSendPost)

  //---------------------------------------------------------
  // Formulaire Post:

  // Form:
  let postForm = createTag('form')
  addClass(postForm, ['post-frameCard__form'])
  postForm.setAttribute('id', 'postForm')

  // Label :
  let divLabelInputComment = createTag('label')
  addClass(divLabelInputComment, ['sizeLabel', 'control-label', 'mt-2', 'mb-2'])
  divLabelInputComment.innerHTML = 'Votre commentaire:'

  // Input:
  let divInputPost = createTag('div')
  addClass(divInputPost, ['post-frameCard__input'])

  // Textarea:
  let textareaPost = createTag('textarea')
  addClass(textareaPost, ['shadow', 'rounded'])
  textareaPost.setAttribute('id', 'inputPost')
  textareaPost.setAttribute('name', 'post')
  textareaPost.setAttribute('type', 'text')
  textareaPost.setAttribute('rows', '2')
  textareaPost.setAttribute('placeholder', 'Un petit mot ?')
  textareaPost.required = true;

  // Frame Btn:
  let divBtnPost = createTag('div')
  addClass(divBtnPost, ['post-frameCard__frameBtn'])

  // Btn post:
  let btnPost = createTag('button')
  addClass(btnPost, ['post-frameCard__btn', 'btn--sendPost', 'shadow', 'rounded'])
  btnPost.setAttribute('type', 'button')
  btnPost.innerHTML = 'Post'

  // Icone Post:
  let iconPost = createTag('span')
  addClass(iconPost, ['fas', 'fa-paper-plane'])

  // Injecte dans le html:
  divSendPost.appendChild(postForm)
  postForm.appendChild(divLabelInputComment)
  divLabelInputComment.appendChild(divInputPost)
  divInputPost.appendChild(textareaPost)
  postForm.appendChild(divBtnPost)
  divBtnPost.appendChild(btnPost)
  btnPost.appendChild(iconPost)


  //---------------------------------------------------------
  // Envoie le Post:

  btnPost.addEventListener('click', (event) => {
    event.preventDefault();

    const urlSendPost = "http://localhost:3000/api/posts"

    let formData = {
      userId: idUserConnect,
      content: document.getElementById('inputPost').value
    }

    console.log(formData)
    var myInit = {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json;charset=UTF-8"
      }),
      body: JSON.stringify(formData),
      mode: 'cors',
      cache: 'default'
    };

    fetch(urlSendPost, myInit)
      .then(res => res.text())
      .then(res => window.location.reload())

  })

}
displayFormPost()


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche tous les posts:


function displayAllPosts(post) {

  for (let i = 0; i < post.length; i++) {

    let postLength = post.length
    sessionStorage.setItem("postLength", postLength)

    //---------------------------------------------------------
    // Cadre de la card qui affiche les posts et comments:

    // Selectionne l'id parent:
    let divCol = document.getElementById('divCol')

    // Card:
    let postAndComment = createTag('div')
    addClass(postAndComment, ['postAndComment'])
    postAndComment.setAttribute('id', 'postAndComment_' + post[i].id)

    // Frame de la card:
    let divReadPost = createTag('div')
    addClass(divReadPost, ['display-frameCard__read-post', 'shadow', 'rounded'])
    divReadPost.setAttribute('id', 'divReadPost')
    divReadPost.setAttribute('id', 'divReadPost_' + post[i].id)
    divReadPost.setAttribute('data-divReadPost', post[i].id)


    // Injecte dans le html:
    divCol.appendChild(postAndComment)
    postAndComment.appendChild(divReadPost)

    //---------------------------------------------------------
    // Intérieur de la card:

    // H2 Cadre Username:
    let divDisplayUsername = createTag('div')
    addClass(divDisplayUsername, ['display-frameCard__username'])

    //Username:
    let divUsername = createTag('h2')
    divUsername.setAttribute("id", "username_" + post[i].id)
    divUsername.setAttribute('data-idUsername', post[i].userId)

    // Cadre du displayPost:
    let divDisplayPost = createTag('div')
    addClass(divDisplayPost, ['display-frameCard__displayPost', 'shadow', 'rounded'])
    divDisplayPost.setAttribute('id', 'displayPost_' + post[i].id)

    // Affichage du post:
    let divPost = createTag('p')
    divPost.innerHTML = post[i].content

    // Injecte dans le html:
    divReadPost.appendChild(divDisplayUsername)
    divDisplayUsername.appendChild(divUsername)
    divReadPost.appendChild(divDisplayPost)
    divDisplayPost.appendChild(divPost)

    //---------------------------------------------------------
    // PLacement des icones modifier et supprimer le post:

    // Cadre pour les 2 icones:
    let divPlaceIcon = createTag('div')
    addClass(divPlaceIcon, ['display-frameCard__icon-Modify-Delete-Post'])

    // Icone modifier post:
    let iconModifyPost = createTag('i') //
    addClass(iconModifyPost, ['fas', 'fa-reply']) //
    iconModifyPost.setAttribute('id', 'modifyPost_' + post[i].id) //
    iconModifyPost.setAttribute('data-bs-toggle', 'tooltip')
    iconModifyPost.setAttribute('data-bs-placement', 'right')
    iconModifyPost.setAttribute('title', 'Modifier')
    iconModifyPost.setAttribute('data-idModifyPost', post[i].id)

    // Récuoere l'id du post a modifier:
    const getIdModify = ('data-idModifyPost', post[i].id) //

    // Icone supprimer le post:
    let iconDeletePost = createTag('i')
    addClass(iconDeletePost, ['fas', 'fa-times-circle'])
    iconDeletePost.setAttribute('id', 'deleteComment_' + post[i].id)
    iconDeletePost.setAttribute('data-bs-toggle', 'tooltip')
    iconDeletePost.setAttribute('data-bs-placement', 'right')
    iconDeletePost.setAttribute('title', 'Supprimer')
    iconDeletePost.setAttribute('data-idDeletePost', post[i].id)

    // Injecte dans le html:
    divDisplayPost.appendChild(divPlaceIcon)
    divPlaceIcon.appendChild(iconModifyPost)
    divPlaceIcon.appendChild(iconDeletePost)

    //---------------------------------------------------------
    // PLacement de la date du publication du post:

    // Cadre de la date:
    let divInfoDate = createTag('div')
    addClass(divInfoDate, ['display-frameCard__infoPost'])

    // Convertit la date:
    let convertsDate = new Date(post[i].createdAt);
    let dateFormat = (convertsDate.toLocaleString())

    // Date de publication:
    let pDate = createTag('p')
    pDate.setAttribute('id', 'pDate_' + post[i].id)
    pDate.setAttribute('data-pDate', post[i].id)
    pDate.innerHTML = dateFormat

    // Injecte dans le html:
    divReadPost.appendChild(divInfoDate)
    divInfoDate.appendChild(pDate)

    //---------------------------------------------------------
    // PLacement des bouton vue et editer un commentaire:

    // Cadre des boutons:
    let divFrameButton = createTag('div')
    addClass(divFrameButton, ['display-frameCard__option'])
    divFrameButton.setAttribute('id', 'frameOption_' + post[i].id)

    // Lien bouton voir commentaires:
    let linkView = createTag('a')
    addClass(linkView, ['button'])
    linkView.setAttribute('id', 'btnViewComment')
    linkView.setAttribute("href", "../html/viewComment.html?id=" + post[i].id)
    linkView.setAttribute('data-viewComment', post[i].id)
    linkView.innerHTML = 'Comment'

    const idViewComment = ('data-viewComment', post[i].id)
    sessionStorage.setItem("idViewComment", idViewComment)
    const idView = ('data-lookComment', post[i].id)
    sessionStorage.setItem("idView", idView)

    // Icone dans le bouton vue:
    let iconeViewComment = createTag('i')
    addClass(iconeViewComment, ['far', 'fa-eye'])

    // Lien bouton editer commentaires:
    let linkEdit = createTag('a')
    addClass(linkEdit, ['button'])
    linkEdit.setAttribute('id', 'btnEditComment')
    linkEdit.setAttribute("href", "../html/editComment.html?id=" + post[i].id)
    linkEdit.setAttribute('data-editComment', post[i].id)
    linkEdit.innerHTML = 'Comment'

    // Icone dans le bouton edit:
    let iconeEditComment = createTag('i')
    addClass(iconeEditComment, ['far', 'fa-edit'])

    // Injecte dans le html:
    divReadPost.appendChild(divFrameButton)

    // Bouton voir commentaire:
    divFrameButton.appendChild(linkView)
    linkView.appendChild(iconeViewComment)

    // Bouton editer commentaire:
    divFrameButton.appendChild(linkEdit)
    linkEdit.appendChild(iconeEditComment)

  }
}


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Affiche le username du post:


function displayUsername(post) {
console.log(post)
  for (let i = 0; i < post.length; i++) {

    //Sélectionne le h2 du comment correspondant:
    let hUsername = document.getElementById('username_' + post[i].id)

    // Récupe l'userId et l'ajoute a l'url des user:
    let findUrlUser = 'http://localhost:3000/api/users/' + post[i].userId

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
// Fonction modifie le post:


function modifyPost(post) {

  for (let i = 0; i < post.length; i++) {

    // Sélectionne l'icone modify du post correspondant:
    let iconmodifyPost = document.getElementById('modifyPost_' + post[i].id)

    iconmodifyPost.addEventListener('click', (event) => {
      event.preventDefault();

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = post[i].userId

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {
        console.log('désolé')
      } else {

        //---------------------------------------------------------
        // Sélectionne:

        // le post:
        let displayPost = document.getElementById('displayPost_' + post[i].id)

        // info date:
        let pDate = document.getElementById('pDate_' + post[i].id)

        let readComment = document.getElementById('divReadPost_' + post[i].id)

        let frameOption = document.getElementById('frameOption_' + post[i].id)

        let postAndComment = document.getElementById('postAndComment_' + post[i].id)

        // Récuoere l'id du post a modifier:
        const getIdModify = ('data-idModifyPost', post[i].id)

        //---------------------------------------------------------
        // Cache le post pour introduire le input pour update le post:
        displayPost.style.display = 'none'
        pDate.style.display = 'none'
        frameOption.style.display = 'none'

        let formModify = createTag('form')
        addClass(formModify, ['d-flex', 'flex-column', 'justify-content-around', 'postForm'])

        let frameTextereaModifyComment = createTag('div')
        addClass(frameTextereaModifyComment, ['frameTextereaModifyPost', 'input-field'])
        frameTextereaModifyComment.setAttribute('id', 'frameModifyPost')

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
        addClass(divBtnSendPostModify, ['button', 'shadow', 'rounded'])
        divBtnSendPostModify.setAttribute('id', 'btnSendPostModify')
        divBtnSendPostModify.innerHTML = 'Mettre à jour'

        // Icone dans le bouton vue:
        let iconeSendPostModify = createTag('i')
        addClass(iconeSendPostModify, ['far', 'fa-edit'])

        // Ecoute le bouton mettre à jour:
        divBtnSendPostModify.addEventListener('click', (event) => {

          //---------------------------------------------------------
          // Préparation de l'url pour la modification du comment:

          // Recupere l'id du post:
          let getModify = document.getElementById('postAndComment_' + getIdModify)

          // Ajoute a l'url l'id du post:
          const url = "http://localhost:3000/api/posts/" + getIdModify

          //---------------------------------------------------------
          // Récupére la modification du post:

          function modifyFormData() {

            for (var i = 0; i < post.length; i++) {

              let formData = {
                id: getIdModify,
                userId: idUserConnect,
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
        divBtnSendPostModify.appendChild(iconeSendPostModify)


      }
    })
  }
}
modifyPost()


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Return posts:


function returnModifyPost(frameTextereaModifyPost) {

  let btnReturnReadPost = createTag('button')
  addClass(btnReturnReadPost, ['btn--sendPostModify', 'shadow', 'shadow', 'rounded', 'my-3'])
  btnReturnReadPost.setAttribute('id', 'btnReturnReadPost')
  btnReturnReadPost.setAttribute('type', 'button')
  btnReturnReadPost.innerHTML = 'Retour'

  //---------------------------------------------------------
  // Ecoute le bouton retour:
  btnReturnReadPost.addEventListener('click', (event) => {
    document.location.reload()
  })

}

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Delete Post:


function deletePost(post) {

  for (let i = 0; i < post.length; i++) {

    // Sélectionne l'icone delete du post correspondant:
    let getDelete = document.getElementById('deleteComment_' + post[i].id)

    // Ecoute l'icone delete:
    getDelete.addEventListener('click', (event) => {

      event.preventDefault();

      // Cible l'icone du comment:
      let getIdDelete = event.target.getAttribute('data-idDeletePost')

      // Sélectionne l'id du post:
      let getIdPost = document.getElementById('postAndComment_' + post[i].id)

      //---------------------------------------------------------
      // Autorisation:

      // Sélectionne l'auteur du post:
      let getIdAuthor = post[i].userId

      // Si auteur autorisé sinon non:
      if (idUserConnect != getIdAuthor) {

      } else {

        //---------------------------------------------------------
        // Supprime le post coté front:
        getIdPost.remove(getIdDelete)

        //---------------------------------------------------------
        // Supprime le post coté back:

        // Prépare l'url pour supprimer sur le backend:
        function getUrlDelete() {

          for (var i = 0; i < post.length; i++) {
            const url = "http://localhost:3000/api/posts/" + getIdDelete
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
getUrlDelete()


///////////////////////////////////////////////////////////
