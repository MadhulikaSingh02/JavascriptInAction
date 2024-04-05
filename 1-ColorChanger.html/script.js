const buttons = document.querySelectorAll(".button");
const body = document.querySelector("body");
buttons.forEach((button) => {
  button.addEventListener(
    "click",
    function (event) {
      const chosenColor = event.target.id;
      console.log(event);
      switch (chosenColor) {
        case "grey":
          body.style.backgroundColor = chosenColor;
          break;
        case "maroon":
          body.style.backgroundColor = chosenColor;
          break;
        case "yellow":
          body.style.backgroundColor = chosenColor;
          break;
        case "blue":
          body.style.backgroundColor = chosenColor;
          break;
      }
    },
    false
  );
});
