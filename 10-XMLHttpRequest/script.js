const button = document.querySelector("#clickme");
button.addEventListener(
  "click",
  function () {
    const xhr = new XMLHttpRequest();
    const url = "https://api.github.com/users/hiteshchoudhary";
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      let readyState = xhr.readyState;
      if (readyState === 4) {
        //response available
        let response = JSON.parse(this.responseText);
        if (response) {
          createCard(response);
        }
      }
    };
    xhr.send();
  },
  false
);
function createCard(response) {
  let name = response.name;
  let avatar = response.avatar_url;
  let followers = response.followers;
  let card = document.querySelector("#card");
  card.innerHTML = `<div>
   <img src="${avatar}" alt="${name}">
   <p>Chai Aur Code: ${name}</p>
   <p>Number of followers: ${followers}</p>
  </div>`;
}
