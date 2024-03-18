const form = document.querySelector("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const height = parseInt(document.querySelector("#height").value);
  const weight = parseInt(document.querySelector("#weight").value);
  const results = document.querySelector("#results");
  let bmi = 0;
  if (height === "" || height < 0 || isNaN(height)) {
    results.textContent = "Please enter a valid height.";
  } else if (weight === "" || weight < 0 || isNaN(weight)) {
    results.textContent = "Please enter a valid weight.";
  } else {
    let heightInMeter = height / 100;
    bmi = (weight / heightInMeter ** 2).toFixed(2);
  }

  let text;
  if (bmi < 18.6) {
    text = `<p>BMI: ${bmi}<br/>You are Under Weight</p>`;
  } else if (bmi >= 18.6 && bmi < 24.9) {
    text = `<p>BMI: ${bmi}<br/>Congratulations!! keep up what you have been doing</p>`;
  } else {
    text = `<p>BMI: ${bmi}<br/>You are Overweight</p>`;
  }
  results.innerHTML = text;
});
