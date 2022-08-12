///////////////////////////////////////////////////////////
// Connexion.js: //////////////////////////////////////////
///////////////////////////////////////////////////////////

// NETTOYER
const url = 'http://localhost:3000/api/users/login'

const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', function (event) {

  event.preventDefault()

  let formData = {
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
    .then(json_object => {

      if (json_object.status == 201) {
        location.href = "/frontend/public/html/postWall.html"
      }

      let infoUserId = json_object.userId
      let infoUserToken = json_object.token
      let infoAdmin = json_object.adminoupas

      localStorage.setItem('infoUserId', infoUserId)
      localStorage.setItem('infoUserToken', infoUserToken);
      localStorage.setItem('infoAdmin', infoAdmin);

    })
    .catch((error) => {
      console.log(error)
    })

})
