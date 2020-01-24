/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const myData = axios.get('https://api.github.com/users/ErikScow')
console.log(myData)
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const cards = document.querySelector('.cards')

myData.then(response => {
  cards.appendChild(cardCreator(response.data))
})

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [`tetondan`, `dustinmyers`, `justsml`, `luishrd`, `bigknell`
];

const newData = followersArray.map(item => {
  const newUser = `https://api.github.com/users/${item}`
  return newUser
})

newData.forEach(item => {
  const newCard = axios.get(`${item}`)
  newCard.then(response => {
    cards.appendChild(cardCreator(response.data))
  })
})


/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

const cardCreator = (data) => {
  
//create elements
const cardDiv = document.createElement('div')
const image = document.createElement('img')
const infoDiv = document.createElement('div')
const name = document.createElement('h3')
const username = document.createElement('p')
const location = document.createElement('p')
const profile = document.createElement('p')
const profileLink = document.createElement('a')
const followerCount = document.createElement('p')
const followingCount = document.createElement('p')
const bio = document.createElement('p')

//nesting elements
cardDiv.appendChild(image)
cardDiv.appendChild(infoDiv)
infoDiv.appendChild(name)
infoDiv.appendChild(username)
infoDiv.appendChild(location)
infoDiv.appendChild(profile)
infoDiv.appendChild(followerCount)
infoDiv.appendChild(followingCount)
infoDiv.appendChild(bio)
profile.appendChild(profileLink)

//adding classes
cardDiv.classList.add('card')
infoDiv.classList.add('card-info')
name.classList.add('name')
username.classList.add('username')

//adding content
image.src = data.avatar_url
name.textContent = `Name: ${data.name}`
username.textContent = `Username: ${data.login}`
location.textContent = `Location: ${data.location}`
profileLink.href = `${data.html_url}`
profileLink.textContent = `Profile`
followerCount.textContent = `Followers: ${data.followers}`
followingCount.textContent = `Following: ${data.following}`
bio.textContent = `Bio: ${data.bio}`

return cardDiv

}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
