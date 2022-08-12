///////////////////////////////////////////////////////////
// Inscription.js /////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER

const url = 'http://localhost:3000/api/users/signup'

const singUpForm = document.getElementById('signInForm')

singUpForm.addEventListener('submit', function (event) {

  event.preventDefault()

  let formData = {
    username: document.getElementById('inputPseudo').value,
    email: document.getElementById('inputEmail').value,
    password: document.getElementById('inputPassword').value
  }

  var myInit = {
    method: "post",
    headers: new Headers({
      "Content-Type": "application/json;charset=UTF-8"
    }),
    body: JSON.stringify(formData),
    mode: 'cors',
    cache: 'default'
  };

  fetch(url, myInit)
    .then(response => response.json())
    // Quand la promesse est tenue, elle est parsée au format Json
    .then(json_object => {

      let getUser = json_object

      let infoUserId = json_object.userId
      let infoUserToken = json_object.token

      localStorage.setItem('infoUserId', infoUserId)
      localStorage.setItem('infoUserToken', infoUserToken);

    })
    .catch((error) => {
      console.log(error)
    })

})
