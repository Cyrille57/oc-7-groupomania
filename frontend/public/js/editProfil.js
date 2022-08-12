///////////////////////////////////////////////////////////
// editProfil.js: ////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER
///////////////////////////////////////////////////////////
// Récuére l'id et la concaténe avec l'ulr comment;


//---------------------------------------------------------
// Récupére l'id dans l'url:
const getIdEditProfilUrl = window.location.search

//---------------------------------------------------------
// Purge getIdUrl de ?id= et recupere  l'id :

// Analyser les paramètres de la chaîne de requête:
const getUrlParams = new URLSearchParams(getIdEditProfilUrl);

// Recupére l'id du user:
const getIdUser = parseInt(getUrlParams.get('id'))

//---------------------------------------------------------
// Url de comments:

const urlUser = "http://localhost:3000/api/users/" + getIdUser;

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

async function connectUser(urlUser) {

  let xhr = new XMLHttpRequest()

  xhr.onreadystatechange = function () {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

      var user = JSON.parse(this.responseText)

      displayNavBar(user)
      displayEditProfil(user)
      sendModifyProfil(user)

    } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {
      console.log("Erreur 500")
    }
  }
  xhr.open("GET", urlUser, true)
  xhr.setRequestHeader("Authorization", "Bearer " + tokenConnect)
  xhr.send()
}
connectUser(urlUser)

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// NavBar:

function displayNavBar(user) {

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
  linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + idUserConnect)

  // icone vue profil:
  let iconeViewProfil = createTag('i')
  addClass(iconeViewProfil, ['fas', 'fa-user-circle', 'fa', 'postWall-linkProfil__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liViewProfil)
  liViewProfil.appendChild(linkViewProfil)
  linkViewProfil.appendChild(iconeViewProfil)

  // li logout:
  let liLogOut = createTag('li')
  addClass(liLogOut, ['postWall-linkDeconnect'])

  // lien de logout:
  let linkLogout = createTag('a')
  linkLogout.setAttribute('href', '../../index.html')

  // icone logOut:
  let iconeLogOut = createTag('i')
  addClass(iconeLogOut, ['fas', 'fa-sign-out-alt', 'fa', 'postWall-linkDeconnect__icon'])

  // Injecte dans le html:
  ulNav.appendChild(liLogOut)
  liLogOut.appendChild(linkLogout)
  linkLogout.appendChild(iconeLogOut)

}

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Formulaire:

function displayEditProfil(user) {

  //---------------------------------------------------------
  // Création des éléments de base enfants:

  //Selectionne l'id parent:
  let main = document.querySelector('main')

  // Container:
  let divContainerUser = createTag('div')
  addClass(divContainerUser, ['container'])

  // Row:
  let divRow = createTag('div') //
  addClass(divRow, ['row'])

  // Col-12
  let divCol = createTag('div') //
  addClass(divCol, ['col-12'])
  divCol.setAttribute('id', 'divCol')

  // Injecte dans le html:
  main.appendChild(divContainerUser)
  divContainerUser.appendChild(divRow)
  divRow.appendChild(divCol)

  //---------------------------------------------------------
  // Titre de la page:
  let titlePage = createTag('h1')
  addClass(titlePage, ['titlePage', 'text-center'])
  titlePage.innerHTML = 'Modifier votre profil:'

  // Injecte dans le html:
  divCol.appendChild(titlePage)

  //---------------------------------------------------------
  // Cadre Card User:

  let frameCardUser = createTag('div')
  addClass(frameCardUser, ['frameCardUser'])

  // Frame de la card:
  let divDisplayUser = createTag('div')
  addClass(divDisplayUser, ['display-frameCard__displayUser', 'shadow', 'rounded'])
  divDisplayUser.setAttribute('id', 'divDisplayUser')

  // Injecte dans le html:
  divCol.appendChild(frameCardUser)
  frameCardUser.appendChild(divDisplayUser)

  //---------------------------------------------------------
  // Base du formulaire:

  // Formulaire:
  let formUpdateUser = createTag('form')
  addClass(formUpdateUser, ['well', 'form-horizontal', 'formUpdate'])
  formUpdateUser.setAttribute('id', 'formUpdateUser')
  formUpdateUser.setAttribute('id', 'formUpdateUser_' + user.id)

  //---------------------------------------------------------
  // Titre du formulaire:
  let titleForm = createTag('h1')
  titleForm.innerHTML = "Modification de votre profil:"
  addClass(titleForm, ['titleForm'])

  //---------------------------------------------------------
  // Groupe formulaire:

  // Form-group:
  let divFormGroup = createTag('div')
  addClass(divFormGroup, ['form-group', 'form-group-username'])

  // Injecte dans le html:
  divDisplayUser.appendChild(formUpdateUser)
  formUpdateUser.appendChild(titleForm)
  formUpdateUser.appendChild(divFormGroup)

  //---------------------------------------------------------
  // Input Pseudo:

  // Label Pseudo:
  let divLabelUsername = createTag('label')
  addClass(divLabelUsername, ['sizeLabel', 'control-label'])
  divLabelUsername.innerHTML = 'Pseudo:'

  let inputGroupContainer = createTag('div')
  addClass(inputGroupContainer, ['sizeInput', 'inputGroupContainer'])

  let divInputGroup = createTag('div')
  addClass(divInputGroup, ['input-group'])

  let inputPseudo = createTag('input')
  addClass(inputPseudo, ['form-control'])
  inputPseudo.setAttribute('name', 'pseudo')
  inputPseudo.setAttribute('type', 'text')
  inputPseudo.setAttribute('placeholder', 'Pseudo')
  inputPseudo.setAttribute('id', 'inputPseudo_' + user.id)
  inputPseudo.setAttribute('data-inputPseudo', user.id)

  // Injecte dans le html:
  divFormGroup.appendChild(divLabelUsername)
  divFormGroup.appendChild(inputGroupContainer)
  inputGroupContainer.appendChild(divInputGroup)
  divInputGroup.appendChild(inputPseudo)

  //---------------------------------------------------------
  // Groupe formulaire 2:

  // Form-group:
  let divFormGroup2 = createTag('div')
  addClass(divFormGroup2, ['form-group'])

  // Injecte dans le html:
  formUpdateUser.appendChild(divFormGroup2)

  //---------------------------------------------------------
  // Input Email

  // Label Email:
  let divLabelEmail = createTag('label')
  addClass(divLabelEmail, ['sizeLabel', 'control-label'])
  divLabelEmail.innerHTML = 'Email'

  let inputGroupContainer2 = createTag('div')
  addClass(inputGroupContainer2, ['sizeInput', 'inputGroupContainer2'])

  let divInputGroup2 = createTag('div')
  addClass(divInputGroup2, ['input-group'])

  let inputMail = createTag('input')
  addClass(inputMail, ['form-control'])
  inputMail.setAttribute('name', 'email')
  inputMail.setAttribute('type', 'text')
  inputMail.setAttribute('placeholder', 'Email')
  inputMail.setAttribute('id', 'inputMail_' + user.id)
  inputMail.setAttribute('data-inputMail', user.id)

  // Injecte dans le html:
  divFormGroup2.appendChild(divLabelEmail)
  divFormGroup2.appendChild(inputGroupContainer2)
  inputGroupContainer2.appendChild(divInputGroup2)
  divInputGroup2.appendChild(inputMail)

  //---------------------------------------------------------
  // Groupe formulaire 3:

  // Form-group:
  let divFormGroup3 = createTag('div')
  addClass(divFormGroup3, ['form-group'])

  //Injecte dans le html:
  formUpdateUser.appendChild(divFormGroup3)

  //---------------------------------------------------------
  // Input Password

  // Label Password:
  let divLabelPassword = createTag('label')
  addClass(divLabelPassword, ['sizeLabel', 'control-label'])
  divLabelPassword.innerHTML = 'Mot de passe'

  let inputGroupContainer3 = createTag('div')
  addClass(inputGroupContainer3, ['sizeInput', 'inputGroupContainer'])

  let divInputGroup3 = createTag('div')
  addClass(divInputGroup3, ['input-group'])

  let inputPassword = createTag('input')
  addClass(inputPassword, ['form-control'])
  inputPassword.setAttribute('name', 'password')
  inputPassword.setAttribute('type', 'password')
  inputPassword.setAttribute('placeholder', 'Mot de passse')
  inputPassword.setAttribute('id', 'inputPassword_' + user.id)
  inputPassword.setAttribute('data-inputPassword', user.id)

  // Injecte dans le html:
  divFormGroup3.appendChild(divLabelPassword)
  divFormGroup3.appendChild(inputGroupContainer3)
  inputGroupContainer3.appendChild(divInputGroup3)
  divInputGroup3.appendChild(inputPassword)

  //---------------------------------------------------------
  // Groupe formulaire 4:

  // Form-group:
  let divFormGroup4 = createTag('div')
  addClass(divFormGroup4, ['form-group'])

  // Injecte dans le html:
  formUpdateUser.appendChild(divFormGroup4)

  //---------------------------------------------------------
  // Input Confirmation Password:

  // Label Password:
  let divLabelPassword2 = createTag('label')
  addClass(divLabelPassword2, ['sizeLabel', 'control-label'])
  divLabelPassword2.innerHTML = 'Confirmation'

  let inputGroupContainer4 = createTag('div')
  addClass(inputGroupContainer4, ['sizeInput', 'inputGroupContainer'])

  let divInputGroup4 = createTag('div')
  addClass(divInputGroup4, ['input-group'])

  let inputPassword2 = createTag('input')
  addClass(inputPassword2, ['form-control'])
  inputPassword2.setAttribute('name', 'password')
  inputPassword2.setAttribute('type', 'password')
  inputPassword2.setAttribute('placeholder', 'Confirmation Mot de passse')
  inputPassword2.setAttribute('id', 'inputConfirmPassword_' + user.id)
  inputPassword2.setAttribute('data-inputConfirmPassword', user.id)

  // Injecte dans le html:
  divFormGroup4.appendChild(divLabelPassword2)
  divFormGroup4.appendChild(inputGroupContainer4)
  inputGroupContainer4.appendChild(divInputGroup4)
  divInputGroup4.appendChild(inputPassword2)

  //---------------------------------------------------------
  // Groupe formulaire 5:

  // Form-group:
  let divFormGroup5 = createTag('div')
  addClass(divFormGroup5, ['form-group', 'form-group-bio'])

  // Injecte dans le html:
  formUpdateUser.appendChild(divFormGroup5)

  //---------------------------------------------------------
  // Bio:

  // Label Password:
  let divLabelBio = createTag('label')
  addClass(divLabelBio, ['sizeLabel', 'control-label'])
  divLabelBio.innerHTML = 'Bio'

  let inputGroupContainer5 = createTag('div')
  addClass(inputGroupContainer5, ['sizeInput', 'inputGroupContainer'])

  let divInputGroup5 = createTag('div')
  addClass(divInputGroup5, ['input-group'])

  let inputBio = createTag('textarea')
  addClass(inputBio, ['form-control'])
  inputBio.setAttribute('name', 'bio')
  inputBio.setAttribute('type', 'text')
  inputBio.setAttribute('placeholder', 'Bio')
  inputBio.setAttribute('id', 'inputBio_' + user.id)
  inputBio.setAttribute('data-inputBio', user.id)

  // Injecte dans le html:
  divFormGroup5.appendChild(divLabelBio)
  divFormGroup5.appendChild(inputGroupContainer5)
  inputGroupContainer5.appendChild(divInputGroup5)
  divInputGroup5.appendChild(inputBio)

  //---------------------------------------------------------
  // Groupe formulaire 6:

  // Form-group:
  let divFormGroup6 = createTag('div')
  addClass(divFormGroup6, ['form-group'])

  // Injecte dans le html:
  formUpdateUser.appendChild(divFormGroup6)

  //---------------------------------------------------------
  // Bouton:

  // Cadre bouton:
  let divFrameButton = createTag('div')
  addClass(divFrameButton, ['divFrameButton'])

  //Validr:
  let linkValidateModifyUser = createTag('a')
  addClass(linkValidateModifyUser, ['button'])
  linkValidateModifyUser.setAttribute('id', 'linkValidateModifyUser_' + user.id)
  linkValidateModifyUser.setAttribute('data-idValidateModifyUser', user.id)
  linkValidateModifyUser.setAttribute('type', 'button')
  linkValidateModifyUser.innerHTML = 'Valider'

  // Icone du le bouton modifier:
  let iconeModifyUser = createTag('i')
  addClass(iconeModifyUser, ['far', 'fa-check-circle'])

  //Retour:
  let linkReturnAllUser = createTag('a')
  addClass(linkReturnAllUser, ['button'])
  linkReturnAllUser.setAttribute('id', 'linkReturnAllUser')
  linkReturnAllUser.setAttribute('type', 'button')
  linkReturnAllUser.setAttribute("href", "../html/postWall.html")
  linkReturnAllUser.innerHTML = 'Retour'

  // Icone du bouton retour:
  let iconeReturnUser = createTag('i')
  addClass(iconeReturnUser, ['fas', 'fa-undo'])

  divFormGroup6.appendChild(divFrameButton)

  divFrameButton.appendChild(linkValidateModifyUser)
  linkValidateModifyUser.appendChild(iconeModifyUser)

  divFrameButton.appendChild(linkReturnAllUser)
  linkReturnAllUser.appendChild(iconeReturnUser)

}

///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Envoie du formulaire:

function sendModifyProfil(user) {

  // Sélectionne l'icone modify du post correspondant:
  let iconmodifyComment = document.getElementById('linkValidateModifyUser_' + user.id)

  iconmodifyComment.addEventListener('click', (event) => {

    event.preventDefault();

    //---------------------------------------------------------
    // Autorisation:

    // Sélectionne l'auteur du post:
    let getIdAuthor = user.id

    // Si auteur autorisé sinon non:
    if (idUserConnect != getIdAuthor) {
      console.log('désolé')
    } else {
      console.log('ok')

      //---------------------------------------------------------
      // Sélectionne:

      // Input username:
      let inputPseudo = document.getElementById('inputPseudo_' + user.id)

      // Input email:
      let inputMail = document.getElementById('inputMail_' + user.id)

      //Input password:
      let inputPassword = document.getElementById('inputPassword_' + user.id)

      // Input confirm password:
      let inputConfirmPassword = document.getElementById('inputConfirmPassword_' + user.id)

      // Input bio:
      let inputBio = document.getElementById('inputBio_' + user.id)

      // Récuoere l'id du post a modifier:
      const getIdModify = ('data-idValidateModifyUser', user.id)

      //---------------------------------------------------------
      // Préparation de l'url pour la modification du comment:

      // Recupere l'id du post:
      let getModify = document.getElementById('formUpdateUser_' + user.id)

      // Ajoute a l'url l'id du post:
      const url = "http://localhost:3000/api/users/user/" + getIdModify

      //---------------------------------------------------------
      // Récupére la modification du post:

      if (inputPassword.value != inputConfirmPassword.value) {
        console.log('Désolé les mdp ne correspondent pas')
      } else {
        let formData = {
          id: idUserConnect,
          username: inputPseudo.value,
          email: inputMail.value,
          password: inputPassword.value,
          bio: inputBio.value
        }

        //---------------------------------------------------------
        // Envoie la modification du post:

        var myInit = {
          method: "PUT",
          headers: new Headers({
            "Content-Type": "application/json;charset=UTF-8",
            "Authorization": 'Bearer ' + tokenConnect
          }),
          body: JSON.stringify(formData),
          mode: 'cors',
          cache: 'default'
        };

        fetch(url, myInit)
          .then(response => response.json())
          .then(res => document.location.reload())
          .catch(err => console.log(err))
      }

    }

  })

}
