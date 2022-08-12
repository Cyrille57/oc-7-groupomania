///////////////////////////////////////////////////////////
// admin.js: ///////////////////////////////////////////
///////////////////////////////////////////////////////////


//NETTOYER
///////////////////////////////////////////////////////////
// Connexion et récupération:


//---------------------------------------------------------
// Users:


//---------------------------------------------------------
//token:

// récupére l'id de l'user:
var idUserConnect = parseInt(localStorage.getItem('infoUserId'))
console.log('Admin.js idUserConnect:')
console.log(idUserConnect)

// Récupére le token:
var tokenConnect = localStorage.getItem('infoUserToken')
console.log('Admin.js token:')
console.log(tokenConnect)

// Récupére le role admin:

var admin = localStorage.getItem('infoAdmin')
console.log('Admin.js admin:')
console.log(admin)

// Url pour recupérer les users:
const urlUser = 'http://localhost:3000/api/users'

async function connectUser(urlUser) {

    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {

            var getUser = JSON.parse(this.responseText)

            displayAll(getUser)
            displayNavBar(getUser)

        } else if (this.readyState == XMLHttpRequest.DONE && this.status == 500) {

            console.log("Erreur 500")
        }
    }
    xhr.open("GET", urlUser, true)
    xhr.send()
}
connectUser(urlUser)


///////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Navbar:


function displayNavBar(getUser) {

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
    linkViewProfil.setAttribute("href", "../html/vueProfil.html?id=" + getUser)

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
// Affiche les users

function displayAll(getUser) {

    //Selectionne l'id parent:
    let main = document.querySelector('main')

    //---------------------------------------------------------
    // Création des éléments de base enfants:

    // Container:
    let divContainer = createTag('div')
    addClass(divContainer, ['container'])

    // Row:
    let divRow = createTag('div')
    addClass(divRow, ['row', 'modifyRowAdmin'])

    // Col-12
    let divCol = createTag('div')
    addClass(divCol, ['col-12'])
    divCol.setAttribute('id', 'divCol')

    //---------------------------------------------------------
    // Titre de la page:
    let titlePage = createTag('h1')
    addClass(titlePage, ['titlePage', 'text-center', 'text-white'])
    titlePage.innerHTML = 'DashBoard'

    // Injecte dans le html:
    divCol.appendChild(titlePage)

    //---------------------------------------------------------
    // Création du tableau:

    // Tableau
    let table = createTag('table')
    addClass(table, ['table', 'table-dark', 'table-hover', 'table-bordered', 'mt-5'])
    table.setAttribute('id', 'table')

    //---------------------------------------------------------
    // Entête du tableau:
    let tHead = createTag('thead')

    // Ligne de l'entete;
    let trHead = createTag('tr')
    addClass(trHead, ['table', 'table-light', 'text-center', 'align-middle'])

    //---------------------------------------------------------
    // Colonne:

    // Colonne de l'entete:
    let thHead1 = createTag('th')
    addClass(thHead1, ['col-sm-1'])
    thHead1.setAttribute('scope', 'col')
    thHead1.innerHTML = '#'

    let thHead2 = createTag('th')
    addClass(thHead2, ['col-sm-3'])
    thHead2.setAttribute('scope', 'col')
    thHead2.innerHTML = 'Pseudo'

    let thHead3 = createTag('th')
    addClass(thHead3, ['col-sm-3'])
    thHead3.setAttribute('scope', 'col')
    thHead3.innerHTML = 'Email'

    let thHead4 = createTag('th')
    addClass(thHead4, ['col-sm-6'])
    thHead4.setAttribute('scope', 'col')
    thHead4.innerHTML = 'Action'

    //---------------------------------------------------------
    // Corps du tableau:
    let tBody = createTag('tbody')

    //---------------------------------------------------------
    // Injecte dans le html:

    // Eléments de base enfants:
    main.appendChild(divContainer)
    divContainer.appendChild(divRow)
    divRow.appendChild(divCol)

    // Ajout du Tableau:
    divCol.appendChild(table)
    table.appendChild(tHead)

    // Ligne entete:
    tHead.appendChild(trHead)

    // Colonne entete:
    trHead.appendChild(thHead1)
    trHead.appendChild(thHead2)
    trHead.appendChild(thHead3)
    trHead.appendChild(thHead4)

    // Corps du tableau:
    table.appendChild(tBody)

    //---------------------------------------------------------
    // Boucle pour creer les lignes en foncion des users:

    for (var i = 0; i < getUser.length; i++) {

        //---------------------------------------------------------
        // Création des lignes du tableau:

        // Corp du tableau:
        let trBody = createTag('tr')
        addClass(trBody, ['text-center', 'table-striped', 'align-middle', 'text-white'])
        trBody.setAttribute("id", "trRowUser_" + getUser[i].id)

        // Entete de la ligne:
        let thRow = createTag('th')
        thRow.setAttribute('scope', 'row')
        thRow.innerHTML = getUser[i].id

        //---------------------------------------------------------
        // Colonne:

        // Colonne pseudo:
        let tdBodyUsername = createTag('td')
        tdBodyUsername.setAttribute("id", "trRowUserName_" + getUser[i].id)
        tdBodyUsername.innerHTML = getUser[i].username

        // Colonne email:
        let tdBodyMail = createTag('td')
        tdBodyMail.innerHTML = getUser[i].email

        //Colonne Action:
        let tBodyAction = createTag('td')
        addClass(tBodyAction, ['d-flex', 'justify-content-center'])

        //---------------------------------------------------------
        // Bouton:

        // Vue:
        let actionVue = createTag('a')
        addClass(actionVue, ['btn', 'btn-light', 'btn-small'])
        actionVue.setAttribute('href', '../html/vueProfil.html')
        actionVue.setAttribute('type', 'button')
        actionVue.setAttribute("data-actionvue", getUser[i].id)
        actionVue.innerHTML = 'Vue'

        // Icone de vue:
        let logoVue = createTag('i')
        addClass(logoVue, ['bi', 'bi-eye'])
        logoVue.setAttribute("data-actionvue", getUser[i].id)

        // Edit:
        let actionEdit = createTag('a')
        addClass(actionEdit, ['btn', 'btn-light', 'btn-small', 'mx-3'])
        actionEdit.setAttribute('href', '#')
        actionEdit.setAttribute('type', 'button')
        actionEdit.setAttribute("data-actionedit", getUser[i].id)
        actionEdit.innerHTML = 'Edit'

        // Icone de edit:
        let logoEdit = createTag('i')
        addClass(logoEdit, ['bi', 'bi-pencil-square'])
        logoEdit.setAttribute("data-actionedit", getUser[i].id)

        // Delete:
        let actionDelete = createTag('a')
        addClass(actionDelete, ['btn', 'btn-light', 'btn-small'])
        actionDelete.setAttribute('href', '#')
        actionDelete.setAttribute('type', 'button')
        actionDelete.setAttribute("data-actiondelete", getUser[i].id)
        actionDelete.innerHTML = 'Delete'

        // Icone de delete:
        let logoDelete = createTag('i')
        addClass(logoDelete, ['bi', 'bi-x-square'])
        logoDelete.setAttribute("data-actiondelete", getUser[i].id)

        //---------------------------------------------------------
        // Injecte dans le html:

        // Ajout corp du tableau:
        tBody.appendChild(trBody)

        // Entete de la ligne:
        trBody.appendChild(thRow)

        //---------------------------------------------------------
        // Colonne:
        trBody.appendChild(tdBodyUsername)
        trBody.appendChild(tdBodyMail)
        trBody.appendChild(tBodyAction)

        //---------------------------------------------------------
        // Bouton:

        //vue:
        tBodyAction.appendChild(actionVue)
        // Bouton vue:
        actionVue.appendChild(logoVue)

        //edit:
        tBodyAction.appendChild(actionEdit)
        // Bouton edit
        actionEdit.appendChild(logoEdit)

        //delete:
        tBodyAction.appendChild(actionDelete)
        // Bouton delete:
        actionDelete.appendChild(logoDelete)

        //---------------------------------------------------------
        // Fonction de Vue, Edit, et Delete:

        //Vue:
        actionVue.addEventListener('click', (event) => {

            event.preventDefault();

            // Cible l'id de vue utilisé:
            let idView = parseInt(event.target.getAttribute('data-actionvue'))

            // Sélectionne la ligne de l'user:
            let getRowUser = document.getElementById("trRowUser_" + idView)

            //---------------------------------------------------------
            // Cache le tableau pour afficher la card user:
            table.style.display = 'none'

            //---------------------------------------------------------
            // Cadre de la card qui affiche l'user:

            // Selectionne l'id parent:
            let getDivCol = document.getElementById('divCol')

            // Card:
            let cardUser = createTag('div')
            addClass(cardUser, ['cardUser'])

            // Frame de la card:
            let divReadCardUser = createTag('div')
            addClass(divReadCardUser, ['display-frameCard__cardUser', 'shadow', 'rounded'])

            // Div gauche:
            let divLeftCardUser = createTag('div')
            addClass(divLeftCardUser, ['divLeftCardUser'])

            // Div droite:
            let divRightCardUser = createTag('div')
            addClass(divRightCardUser, ['divRightCardUser'])

            // Injecte dans le html:
            getDivCol.appendChild(cardUser)
            cardUser.appendChild(divReadCardUser)
            divReadCardUser.appendChild(divLeftCardUser)
            divReadCardUser.appendChild(divRightCardUser)

            //---------------------------------------------------------
            // Intérieur de la card:

            // H2 Cadre Username:
            let divDisplayUsername = createTag('div')
            addClass(divDisplayUsername, ['display-frameCard__cardUserUsername'])

            //---------------------------------------------------------
            // Cherche l'id user pour atteindre les éléments:

            // Username:
            const getUsername = getUser.find(user => user.id === idView).username
            // Email:
            const getEmail = getUser.find(user => user.id === idView).email
            // Rôles:
            const getRole = getUser.find(user => user.id === idView).admin
            // Bio:
            const getBio = getUser.find(user => user.id === idView).bio

            // Username:
            let divUsername = createTag('h2')
            addClass(divUsername, ['text-white'])
            divUsername.innerHTML = getUsername

            // Email;
            let divEmailUser = createTag('p')
            addClass(divEmailUser, ['divEmailUser', 'text-white'])
            divEmailUser.innerHTML = "Email: " + getEmail

            // Rôles:
            let divInfoRole = createTag('p')
            addClass(divInfoRole, ['divInfoRole'])
            if (getRole == true) {
                divInfoRole.innerHTML = "Rôles: " + "Cette personne est administrateur."
            } else(
                divInfoRole.innerHTML = "Rôles: " + "Cette personne n'est pas administrateur."
            )

            // Bio:
            let divBio = createTag('p')
            addClass(divBio, ['divBio', 'text-center'])
            if (getBio === null) {
                divBio.innerHTML = "Bio: </br>" + "Cette personne n'a pas rempli sa biographie."
            } else {
                divBio.innerHTML = "Bio: </br>" + getBio
            }

            //Retour:
            let btnReturnAllUser = createTag('a')
            addClass(btnReturnAllUser, ['button', 'shadow', 'rounded', 'my-3'])
            btnReturnAllUser.setAttribute('id', 'btnReturnAllUser')
            btnReturnAllUser.setAttribute('type', 'button')
            btnReturnAllUser.innerHTML = 'Retour'

            //---------------------------------------------------------
            // Ecoute le bouton retour:
            btnReturnAllUser.addEventListener('click', (event) => {
                document.location.reload()
            })

            //---------------------------------------------------------
            // Injecte dans le html:

            // Username:
            divLeftCardUser.appendChild(divDisplayUsername)
            divDisplayUsername.appendChild(divUsername)
            // Email:
            divDisplayUsername.appendChild(divEmailUser)
            // Rôles:
            divDisplayUsername.appendChild(divInfoRole)
            // Bio:
            divRightCardUser.appendChild(divBio)
            divRightCardUser.appendChild(btnReturnAllUser)

            return getRole
        })


        //Edit:
        actionEdit.addEventListener('click', (event) => {

            event.preventDefault();

            // Cible l'id de vue utilisé:
            let idEdit = parseInt(event.target.getAttribute('data-actionedit'))

            // Sélectionne la ligne de l'user:
            let getRowUser = document.getElementById("trRowUser_" + idEdit)

            //---------------------------------------------------------
            // Cache le tableau pour afficher la card user:
            table.style.display = 'none'

            //---------------------------------------------------------
            // Cadre de la card qui affiche l'user:

            // Selectionne l'id parent:
            let getDivCol = document.getElementById('divCol')

            // Card:
            let cardEditUser = createTag('div')
            addClass(cardEditUser, ['cardEditUser'])

            // Frame de la card:
            let divReadCardEditUser = createTag('div')
            addClass(divReadCardEditUser, ['display-frameCard__cardEditUser', 'shadow', 'rounded'])

            // Injecte dans le html:
            getDivCol.appendChild(cardEditUser)
            cardEditUser.appendChild(divReadCardEditUser)


            //---------------------------------------------------------
            // Intérieur de la card:


            //---------------------------------------------------------
            // Base du formulaire:

            // Formulaire:
            let formUpdateUser = createTag('form')
            addClass(formUpdateUser, ['well', 'form-horizontal'])
            formUpdateUser.setAttribute('id', 'formUpdateUser')

            //---------------------------------------------------------
            // Groupe formulaire:

            // Form-group:
            let divFormGroup = createTag('div')
            addClass(divFormGroup, ['form-group'])

            // Injecte dans le html:
            divReadCardEditUser.appendChild(formUpdateUser)
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

            // Injecte dans le html:
            divFormGroup2.appendChild(divLabelEmail)
            divFormGroup2.appendChild(inputGroupContainer2)
            inputGroupContainer2.appendChild(divInputGroup2)
            divInputGroup2.appendChild(inputMail)

            //---------------------------------------------------------
            // Groupe formulaire:

            // Form-group 3:
            let divFormGroup3 = createTag('div')
            addClass(divFormGroup3, ['form-group'])

            // Injecte dans le html:
            formUpdateUser.appendChild(divFormGroup3)

            //---------------------------------------------------------
            // Check Admin:

            let divRow = createTag('div')
            addClass(divRow, ['row'])
            divRow.setAttribute('id', 'divRow')

            let divFrameCheckBox = createTag('div')
            addClass(divFrameCheckBox, ['divFrameCheckBox'])

            let legendRadio = createTag('legend')
            addClass(legendRadio, ['col-form-label', 'col-sm-2', 'pt-0', 'text-white'])
            legendRadio.innerHTML = 'Administrateur: </br>'

            // Injecte dans le html:
            divFormGroup3.appendChild(divRow)
            divRow.appendChild(divFrameCheckBox)
            divFrameCheckBox.appendChild(legendRadio)

            // Non:
            let divFomCheck = createTag('div')
            addClass(divFomCheck, ['form-check', 'form-check-inline'])

            // Input check non :
            let checkInput = createTag('input')
            addClass(checkInput, ['form-check-input'])
            checkInput.setAttribute('id', 'gridRadios1')
            checkInput.setAttribute('name', 'gridRadios')
            checkInput.setAttribute('type', 'radio')
            checkInput.setAttribute('value', 'option1')

            // Label check non :
            let labelCheck = createTag('label')
            addClass(labelCheck, ['form-check-label'])
            labelCheck.setAttribute('for', 'gridRadios1')
            labelCheck.innerHTML = 'Non'

            legendRadio.appendChild(divFomCheck)
            divFomCheck.appendChild(checkInput)
            divFomCheck.appendChild(labelCheck)

            // Oui:
            let divFomCheck2 = createTag('div')
            addClass(divFomCheck2, ['form-check', 'form-check-inline'])

            // Input check oui :
            let checkInput2 = createTag('input')
            addClass(checkInput2, ['form-check-input'])
            checkInput2.setAttribute('id', 'gridRadios2')
            checkInput2.setAttribute('name', 'gridRadios')
            checkInput2.setAttribute('type', 'radio')
            checkInput2.setAttribute('value', 'option2') //
            //checkInput.setAttribute('', 'checked')

            // Label check oui :
            let labelCheck2 = createTag('label')
            addClass(labelCheck2, ['form-check-label'])
            labelCheck2.setAttribute('for', 'gridRadios2')
            labelCheck2.innerHTML = 'Oui'

            // Rôles:
            const getRole = getUser.find(user => user.id === idEdit).admin

            if (getRole == true) {
                checkInput2.checked = true
                //checkInput.checked = false
            } else {
                //checkInput2.checked = false
                checkInput.checked = true
            }

            // Cadre bouton:
            let divFrameButton = createTag('div')
            addClass(divFrameButton, ['divFrameButton'])

            //Retour:
            let btnReturnAllUser = createTag('a')
            addClass(btnReturnAllUser, ['button', 'shadow', 'rounded', 'text-white'])
            btnReturnAllUser.setAttribute('id', 'btnReturnAllUser')
            btnReturnAllUser.setAttribute('type', 'button')
            btnReturnAllUser.innerHTML = 'Retour'

            //Validr:
            let btnValidateUpdateUser = createTag('a')
            addClass(btnValidateUpdateUser, ['button', 'shadow', 'rounded', 'text-white'])
            btnValidateUpdateUser.setAttribute('id', 'btnValidateUpdateUser')
            btnValidateUpdateUser.setAttribute('type', 'button')
            btnValidateUpdateUser.innerHTML = 'Valider'

            divFrameCheckBox.appendChild(divFomCheck)
            divFrameCheckBox.appendChild(divFomCheck2)
            divFomCheck2.appendChild(checkInput2)
            divFomCheck2.appendChild(labelCheck2)
            divFrameCheckBox.appendChild(divFrameButton)
            divFrameButton.appendChild(btnValidateUpdateUser)
            divFrameButton.appendChild(btnReturnAllUser)

            //---------------------------------------------------------
            // Ecoute le bouton valider:
            btnValidateUpdateUser.addEventListener('click', (event) => {

                event.preventDefault

                //---------------------------------------------------------
                // Récupére la valeur du check non:

                function yesOrNotThatIsTheQuestion() {

                    let adminIsFalse = document.getElementById('gridRadios1')

                    if (adminIsFalse.checked === true) {
                        let noCkeck = "false"
                        let bolleanCheck = JSON.parse(noCkeck)
                        return noCkeck
                    } else {
                        let noCkeck = "true"
                        let bolleanCheck = JSON.parse(noCkeck)
                        return bolleanCheck
                    }

                }

                //---------------------------------------------------------
                // Ajoute a l'url l'id du user:

                const urlUpdateUser = "http://localhost:3000/api/users/" + idEdit

                //---------------------------------------------------------
                // Récupére la modification du post:

                function modifyFormData() {

                    for (var i = 0; i < getUser.length; i++) {

                        let formData = {
                            id: idEdit,
                            username: inputPseudo.value,
                            email: inputMail.value,
                            admin: yesOrNotThatIsTheQuestion()
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

                fetch(urlUpdateUser, myInit)
                    .then(response => response.json())
                    .then(res => document.location.reload())
                    .catch(err => console.log(err))
            })


            //---------------------------------------------------------
            // Ecoute le bouton retour:
            btnReturnAllUser.addEventListener('click', (event) => {
                document.location.reload()
            })

        })


        //Delete:
        actionDelete.addEventListener('click', (event) => {

            event.preventDefault();

            //---------------------------------------------------------
            // Récupére les id:

            // Cible l'id du delete utilisé:
            let idDelete = event.target.getAttribute('data-actionDelete')

            // Cible l'id de la ligne correspondant:
            let getDelete = document.getElementById('trRowUser_' + idDelete)

            //---------------------------------------------------------
            // Supprime le post coté front:
            getDelete.remove(idDelete)

            //---------------------------------------------------------
            // Supprime le post coté back:

            // Prépare l'url pour supprimer sur le backend:
            function getUrlDelete() {

                for (var i = 0; i < getUser.length; i++) {
                    const url = 'http://localhost:3000/api/users/' + idDelete
                    return url
                }
            }
            getUrlDelete()

            //---------------------------------------------------------
            // Envoie la requête:
            var myInit = {
                method: "DELETE",
                headers: new Headers({
                    "Authorization": 'Bearer ' + tokenConnect
                })
            };

            fetch(getUrlDelete(), myInit)
                .then(res => res.text())
                .then(res => console.log(res))

        })

    }

}
