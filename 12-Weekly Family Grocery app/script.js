const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const groceryContainer = document.querySelector(".grocery-container");
const groceryList = document.querySelector(".grocery-list");
const clearBtn = document.querySelector(".clear-btn");

//edit options
let editElement;
let editFlag = false;
let editElementId = "";

//submit form should add items
form.addEventListener("submit", addItem, false);

//for clearing all items
clearBtn.addEventListener("click", clearItems, false);

//display the contents from local storage to ensure that you don't duplicate items
window.addEventListener("DOMContentLoaded", createInitialPage);

//function to add each item
function addItem(event) {
  event.preventDefault();

  //generate a unique id
  const id = new Date().getTime().toString();
  let value = grocery.value;

  if (value && !editFlag) {
    //create a grocery item
    createListItem(id, value);

    // display alert
    displayAlert("item added to the list", "success");

    //show-container displays the items panel
    groceryContainer.classList.add("show-container");
    //add to local storage
    addToLocalStorage(id, value);

    //setting back to original state
    setDefaults();
  } else if (value && editFlag) {
    editElement.innerHTML = value;
    displayAlert("item updated", "success");
    editLocalStorage(editElementId, value);
    setDefaults();
  } else {
    displayAlert("Please enter a value", "danger");
  }
}

//message display
function displayAlert(messageText, messageStyle) {
  alert.classList.add(`alert-${messageStyle}`);
  alert.textContent = messageText;

  //remove alert
  setTimeout(() => {
    alert.textContent = "";
    alert.classList.remove(`alert-${messageStyle}`);
  }, 1000);
}

//Edit item
function editItem(event) {
  //get the item on which the Edit button was clicked
  editFlag = true;
  let itemToBeEdited = event.currentTarget.parentElement.parentElement; //article
  editElement = itemToBeEdited.firstChild; //p with class=title
  grocery.value = editElement.innerHTML; //p has the value
  editElementId = itemToBeEdited.dataset.id;
  submitBtn.innerHTML = "edit"; //or submitBtn.textContent="edit"
}

//Delete an Item
function deleteItem(event) {
  //get the article
  let itemToBeDeleted = event.currentTarget.parentElement.parentElement;
  groceryList.removeChild(itemToBeDeleted);
  //hide the 'clear-items' section when there are no elements
  if (groceryList.children.length === 0) {
    groceryContainer.classList.remove("show-container");
  }
  displayAlert("item removed", "success");

  //Remove the element from local storage
  const id = itemToBeDeleted.dataset.id;
  removeFromLocalStorage(id);
  setDefaults();
}

//clear all article items
function clearItems() {
  const groceryItems = document.querySelectorAll(".grocery-item");
  groceryItems.forEach((item) => {
    groceryList.removeChild(item);
  });

  groceryContainer.classList.remove("show-container");
  displayAlert("all items removed", "success");

  removeAllFromLocalStorage();
  setDefaults();
}

function setDefaults() {
  grocery.value = "";
  editFlag = false;
  submitBtn.textContent = "submit";
  editElementId = "";
  editElement = "";
}

function createListItem(id, value) {
  const article = document.createElement("article");
  let attribute = document.createAttribute("data-id");
  attribute.value = id;
  article.setAttributeNode(attribute);
  article.classList.add("grocery-item");
  article.innerHTML = `<p class="title">${value}</p>
              <div class="btn-container">
                <!-- edit btn -->
                <button type="button" class="edit-btn">
                  <i class="fas fa-edit"></i>
                </button>
                <!-- delete btn -->
                <button type="button" class="delete-btn">
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            `;
  // add event listeners to both buttons;
  const deleteBtn = article.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", deleteItem);
  const editBtn = article.querySelector(".edit-btn");
  editBtn.addEventListener("click", editItem);

  // append child
  groceryList.appendChild(article);
}

function createInitialPage() {
  let lsGroceryList = getGroceryList();
  if (lsGroceryList.length > 0) {
    lsGroceryList.forEach((item) => {
      createListItem(item.id, item.value);
    });
    groceryContainer.classList.add("show-container");
  }
}

function addToLocalStorage(id, value) {
  const groceryItem = { id, value };

  //add the grocery item either to new one for first time
  //or to the already existing list
  let lsGroceryList = getGroceryList();
  lsGroceryList.push(groceryItem);
  setGroceryList(lsGroceryList);
}

function editLocalStorage(id, value) {
  //for editing , first get the list, then change the value
  //note you have retain the position of the item.
  //don't do remove and then set , use map instead
  let lsGroceryList = getGroceryList();

  lsGroceryList = lsGroceryList.map((item) => {
    if (item.id === id) {
      item.value = value;
    }
    return item;
  });
  setGroceryList(lsGroceryList);
}
function removeFromLocalStorage(id) {
  let lsGroceryList = getGroceryList();
  lsGroceryList = lsGroceryList.filter((item) => {
    if (item.id === id) {
      localStorage.removeItem(id);
    } else {
      return item;
    }
  });
  setGroceryList(lsGroceryList);
}

function removeAllFromLocalStorage() {
  localStorage.removeItem("list");
}

function getGroceryList() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}

function setGroceryList(list) {
  localStorage.setItem("list", JSON.stringify(list));
}
