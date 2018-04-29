var msg = document.getElementById('msg')
var userData = document.getElementById('userData')


window.onload = function() {
  document.getElementById('user').focus();
}

function search(){
    if(document.getElementById('user').value == '') {
        document.write("Please enter a username!")
        return;
    }

    var request = new XMLHttpRequest()

    request.onload = checkUser
    request.open('get', 'https://api.github.com/users/' + document.getElementById('user').value)
    request.send()
}

function checkUser() {
    var responseObj = JSON.parse(this.responseText)
    var repos= responseObj.public_repos
    if( repos == 0)
      {
        document.write ("The given username does not exist!")
      }
  else{
    console.log(responseObj.name + " has " + responseObj.public_repos + " public repositories!")
    console.log(responseObj, responseObj.message)
  }
   
    showUser(responseObj)
}

function showUser(user){
    userData.style.display = 'block'
    document.getElementById('listTitle').innerHTML = ((user.name !== null) ? user.name : user.login) + " has " + user.public_repos + " public repositories!"
    document.getElementById('name').innerHTML = (user.name !== null) 
        ? user.name
        : user.login
    document.getElementById('bio').innerHTML = user.bio

    showRepos(user.repos_url)
}

function showRepos(url){
    var request = new XMLHttpRequest()

    request.onload = createReposList
    request.open('get', url)
    request.send()
}

function createReposList(){
    var responseObj = JSON.parse(this.responseText)
    var list = document.getElementById('repos')
    list.innerHTML = ''

    for(var i = 0; i < responseObj.length; i++) {
        var item = document.createElement('li')
        var link = document.createElement('a')
        link.setAttribute('href', responseObj[i].html_url)
        link.appendChild(document.createTextNode(responseObj[i].name))
        item.appendChild(link)
        list.appendChild(item)
    }
    return list
}
