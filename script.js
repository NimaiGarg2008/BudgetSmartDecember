let storeItems = document.querySelectorAll('.store-item');
let cartBox = document.querySelector('.itemsInCartBox');
let amountInputs = document.querySelectorAll('.item-amount');
let budgetElement = document.querySelector("#budget");
let budgetCurrencySymbol = document.querySelector("#budget-currency-symbol");
let timerDisplay = document.querySelector("#timer");
let storeItemsContainer = document.getElementById("store-items-container");

let totalPrice = 0;
let currentIndex = 0;
let cart = [];
let selectedCurrency = 'USD';
let selectedSpeed = '1x';
let remainingTime = 120;
let speedFactor = 1;
let totalDesirability = 0;
let currencyRates = { USD: 1, CAD: 1.3, EUR: 0.9 };
let timerInterval;

aValue = parseInt(localStorage.getItem("myValue"));

function goToNextPage(nextPage)
{
    localStorage.setItem("myValue", aValue);
    window.location.href = nextPage;
    location.replace(nextPage);
}

let items = [
  // Dairy
  { name: "Golden Farms Unsalted Butter - Organic (2 sticks)", category: "Dairy", price: 2.75, desirability: 1.2 },
  { name: "Irish Salted Butter (1 slab)", category: "Dairy", price: 1.50, desirability: 0.75 },
  { name: "Happy Cow Milk - Organic (1 gallon)", category: "Dairy", price: 4.25, desirability: 2.5 },
  { name: "Pure Organic Almond Milk (64 fl oz)", category: "Dairy", price: 3.50, desirability: 2 },
  { name: "Silver Oak Cheese - Cheddar (8 oz)", category: "Dairy", price: 3.75, desirability: 3 },
  { name: "Green Valley Greek Yogurt - Organic (6 oz)", category: "Dairy", price: 1.85, desirability: 2.8 },
  { name: "Sunshine Butter (1 lb)", category: "Dairy", price: 2.40, desirability: 1.5 },
  { name: "Happy Dairy Whole Milk (1 gallon)", category: "Dairy", price: 2.99, desirability: 1.7 },
  { name: "Silver Oak Cheese - Mozzarella (8 oz)", category: "Dairy", price: 3.50, desirability: 3 },
  { name: "Green Valley Nonfat Yogurt (32 oz)", category: "Dairy", price: 4.00, desirability: 2.5 },
  { name: "Irish Cream Cheese (8 oz)", category: "Dairy", price: 2.99, desirability: 1.8 },
  { name: "Nature's Choice Butter - Organic (1 lb)", category: "Dairy", price: 4.25, desirability: 3.2 },
  { name: "Golden Farms Cottage Cheese (16 oz)", category: "Dairy", price: 2.00, desirability: 1.6 },
  { name: "Green Valley Sour Cream (16 oz)", category: "Dairy", price: 2.75, desirability: 2.2 },

  // Meats
  { name: "Butcher's Pride Pork Chops (1 lb)", category: "Meats", price: 5.99, desirability: 2.2 },
  { name: "Gold Coast Beef Ribeye Steak (1 lb)", category: "Meats", price: 14.50, desirability: 4 },
  { name: "Pure Valley Organic Chicken Breast (1 lb)", category: "Meats", price: 6.99, desirability: 3.5 },
  { name: "Wild Ocean Salmon Fillet (6 oz)", category: "Meats", price: 7.50, desirability: 4.2 },
  { name: "Fresh Farms Ground Turkey (1 lb)", category: "Meats", price: 4.99, desirability: 2.8 },
  { name: "Golden Harvest Ground Beef (1 lb)", category: "Meats", price: 5.99, desirability: 3.2 },
  { name: "Harvest Choice Boneless Chicken Thighs (1 lb)", category: "Meats", price: 5.50, desirability: 3.4 },
  { name: "Ocean Fresh Cod Fillets (1 lb)", category: "Meats", price: 8.99, desirability: 3.7 },
  { name: "Green Meadows Organic Pork Tenderloin (1 lb)", category: "Meats", price: 9.75, desirability: 3.8 },
  { name: "Silver Lake Boneless Chicken Wings (1 lb)", category: "Meats", price: 4.50, desirability: 2.5 },
  { name: "Golden Farms Beef Sirloin Steaks (2 steaks)", category: "Meats", price: 12.99, desirability: 4.5 },
  { name: "Wild Salmon Fillet (1 lb)", category: "Meats", price: 15.00, desirability: 4.8 },
  { name: "Royal Meadows Organic Chicken Wings (1 lb)", category: "Meats", price: 7.00, desirability: 3.0 },
  { name: "Fresh Valley Organic Ground Lamb (1 lb)", category: "Meats", price: 10.50, desirability: 4.2 },

  // Vegetables
  { name: "Fresh Harvest Broccoli (1 bunch)", category: "Vegetables", price: 1.75, desirability: 1.5 },
  { name: "Golden Fields Cauliflower (1 head)", category: "Vegetables", price: 2.50, desirability: 2 },
  { name: "Sunshine Asparagus (1 bunch)", category: "Vegetables", price: 3.99, desirability: 2.8 },
  { name: "Pure Earth Green Beans (1 lb)", category: "Vegetables", price: 1.29, desirability: 1.2 },
  { name: "Happy Farms Corn (1 cob)", category: "Vegetables", price: 0.99, desirability: 1.3 },
  { name: "Sunny Valley Potatoes (2 lbs)", category: "Vegetables", price: 1.29, desirability: 1.4 },
  { name: "Golden Harvest Yellow Onions (3 onions)", category: "Vegetables", price: 1.50, desirability: 1.8 },
  { name: "Green Farms Garlic (1 bulb)", category: "Vegetables", price: 1.99, desirability: 2.0 },
  { name: "Nature's Choice Mushrooms (8 oz)", category: "Vegetables", price: 2.99, desirability: 2.5 },
  { name: "Golden Meadows Tomatoes (4 tomatoes)", category: "Vegetables", price: 2.75, desirability: 2.2 },
  { name: "Nature Valley Kale (1 bunch)", category: "Vegetables", price: 3.50, desirability: 2.8 },
  { name: "Wild Orchards Spinach (1 lb)", category: "Vegetables", price: 2.25, desirability: 2.3 },
  { name: "Earth's Bounty Zucchini (2 zucchinis)", category: "Vegetables", price: 1.49, desirability: 1.6 },
  { name: "Herb's Best Lettuce Mix (5 oz)", category: "Vegetables", price: 2.00, desirability: 2.4 },

  // Fruits
  { name: "Redwood Apples - Organic (3 apples)", category: "Fruits", price: 2.50, desirability: 2.2 },
  { name: "Golden Orchard Pears (2 pears)", category: "Fruits", price: 1.99, desirability: 2.5 },
  { name: "Green Grove Strawberries - Organic (1 lb)", category: "Fruits", price: 3.75, desirability: 4.2 },
  { name: "Citrus Valley Oranges (4 oranges)", category: "Fruits", price: 2.99, desirability: 3.0 },
  { name: "Tropical Mangoes (2 mangoes)", category: "Fruits", price: 4.99, desirability: 4.5 },
  { name: "Sunrise Bananas (1 bunch)", category: "Fruits", price: 1.25, desirability: 1.8 },
  { name: "Golden Grove Peaches (3 peaches)", category: "Fruits", price: 2.99, desirability: 2.7 },
  { name: "Sunny Farms Lemons (4 lemons)", category: "Fruits", price: 2.00, desirability: 1.5 },
  { name: "Citrus Coast Limes (5 limes)", category: "Fruits", price: 2.50, desirability: 2.3 },
  { name: "Red Mountain Plums (4 plums)", category: "Fruits", price: 2.50, desirability: 2.2 },
  { name: "Sunny Valley Grapes - Organic (1 lb)", category: "Fruits", price: 5.00, desirability: 4.7 },
  { name: "Apple Farms Red Apples (6 apples)", category: "Fruits", price: 3.00, desirability: 2.0 },
  { name: "Pure Earth Pineapple (1 pineapple)", category: "Fruits", price: 3.99, desirability: 4.1 },
  { name: "Golden Farms Kiwi (4 kiwis)", category: "Fruits", price: 2.25, desirability: 2.5 },

  // Grains
  { name: "Pure Harvest Brown Rice (2 lbs)", category: "Grains", price: 3.50, desirability: 3.0 },
  { name: "Nature's Choice Oats (1 lb)", category: "Grains", price: 2.00, desirability: 2.2 },
  { name: "Red River Barley (1 lb)", category: "Grains", price: 3.00, desirability: 2.5 },
  { name: "Golden Valley Quinoa (1 lb)", category: "Grains", price: 4.00, desirability: 3.8 },

  // Pasta
  { name: "Classic Italian Spaghetti (1 lb)", category: "Pasta", price: 1.20, desirability: 2.0 },
  { name: "Harvest Wheat Fusilli Pasta (12 oz)", category: "Pasta", price: 1.00, desirability: 1.8 },
  { name: "Silver Oak Penne Pasta (1 lb)", category: "Pasta", price: 1.50, desirability: 1.7 },
  { name: "Golden Grains Couscous (1 lb)", category: "Pasta", price: 2.25, desirability: 2.0 },
  { name: "Italian Couscous (1 lb)", category: "Pasta", price: 3.00, desirability: 2.3 },

  // Beverages
  { name: "Pure Valley Orange Juice (64 oz)", category: "Beverages", price: 3.99, desirability: 3.2 },
  { name: "Green Meadows Apple Juice (64 oz)", category: "Beverages", price: 2.99, desirability: 2.5 },
  { name: "Silver Oak Iced Tea (1 liter)", category: "Beverages", price: 2.50, desirability: 2.0 },
  { name: "Fresh Brewed Coffee Beans (8 oz)", category: "Beverages", price: 5.50, desirability: 3.8 },
  { name: "Golden Valley Sparkling Water (12 fl oz)", category: "Beverages", price: 1.50, desirability: 1.5 },
  { name: "Tropical Breeze Lemonade (1 liter)", category: "Beverages", price: 3.00, desirability: 2.3 },
  { name: "Mountain Springs Bottled Water (1 liter)", category: "Beverages", price: 1.25, desirability: 1.1 },
];

let categories = ["Dairy", "Meats", "Vegetables", "Fruits", "Grains", "Pasta", "Beverages"]
let shoppingList = [];
let budget = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('usd-button').classList.add('active');
  });

const usdButton = document.getElementById("usd-button");
const cadButton = document.getElementById("cad-button");
const eurButton = document.getElementById("eur-button");

usdButton.addEventListener('click', function () {
    selectedCurrency = 'USD';
    updateUI();
    updateBudget();
    updateItemPrices();
    updateCart();
    renderStoreItems();
  });
  
cadButton.addEventListener('click', function () {
  selectedCurrency = 'CAD';
  updateUI();
  updateBudget();
  updateItemPrices();
  updateCart();
  renderStoreItems();
});

eurButton.addEventListener('click', function () {
  selectedCurrency = 'EUR';
  updateUI();
  updateBudget();
  updateItemPrices();
  updateCart();
  renderStoreItems();
});

let randomBudgetUSD;

function getCurrencySymbol(currency) {
  let symbols = {
    USD: "$",
    CAD: "C$",
    EUR: "€"
  };

  return symbols[currency] || "$";
}

aValue = parseInt(localStorage.getItem("myValue"));

function goToNextPage(nextPage)
{
    localStorage.setItem("myValue", aValue);
    window.location.href = nextPage;
    location.replace(nextPage);
}

function setSpeed(speed) {
  // Set speed factor
  const buttons = document.querySelectorAll('.button-row-speed button');
  buttons.forEach(button => {
      button.classList.remove('active');
      if (button.id === `speed-${speed}`) {
          button.classList.add('active');
      }
  });

  if (speed === '1x') {
      speedFactor = 1;
  } else if (speed === '2x') {
      speedFactor = 2;
  } else if (speed === '3x') {
      speedFactor = 3;
  }
  //
}

function generateShoppingList(array)
{
  totalDesirability = 0;
  let category = "";
  shoppingList = [];
  for (let i = 0; i < array.length; i++)
  {
    if (array[i].category == category)
      {
        if (Math.random() < (13/items.length))
          {
             shoppingList[shoppingList.length-1] += 1;
          }
      }
       if (array[i].category != category)
      {
        category = array[i].category
        shoppingList[shoppingList.length] = 0;
        if (Math.random() < (13/items.length))
          {
            shoppingList[shoppingList.length-1] += 1;
          }
      }
  }
  let totalItems = 0;
  let shoppingListContent = "<h3>Your shopping list consists of:</h3><div class='shopping-list-container'>";
  for (let i = 0; i < categories.length; i++)
  {
    shoppingListContent += "<p>" + categories[i] + ": " + shoppingList[i] + "</p>";
    totalItems += shoppingList[i];
  }

  shoppingListContent += "</div><p>Total items: " + totalItems + "</p>";
  document.getElementById("shopping-list-content").innerHTML = shoppingListContent;
  
  let minPrice = [];
  let maxPrice = [];
  category = "";
  let currentMin = array[0].price;
  let currentMax = array[0].price;
  let budgetMax = 0;
  let budgetMin = 0;

  for (let i = 0; i < array.length; i++)
  {
    if (array[i].category == category)
      {
        if (array[i].price < currentMin)
          {
             currentMin = array[i].price;
          }
        if (array[i].price > currentMax)
          {
            currentMax = array[i].price;
          }
      }
      if (array[i].category != category)
      {
        category = array[i].category
        minPrice[minPrice.length] = currentMin;
        maxPrice[maxPrice.length] = currentMax;
        currentMin = array[i].price;
        currentMax = array[i].price;
      }
  }
  for (let i = 0; i < minPrice.length; i++)
  {
    budgetMax += maxPrice[i];
    budgetMin += minPrice[i];
  }
  budget = budgetMin + Math.sqrt(Math.random())*(budgetMax-budgetMin);
  budgetCurrencySymbol.textContent = "$";
  budgetElement.textContent = budget.toFixed(2);
}

function updateCart() {
  let cartList = '';
  let totalPrice = 0;

  for (let i = 0; i < cart.length; i++) {
    let convertedPrice = cart[i].finalPrice * currencyRates[selectedCurrency];
    totalPrice += convertedPrice
    cartList += "<p> <span class='cart-item-name'> " + cart[i].name + " x" + cart[i].quantity + "</span> <span class='cart-item-price'>" + getCurrencySymbol(selectedCurrency) + convertedPrice.toFixed(2) + "</span> <button class='remove-item' onclick = 'removeItem(" + i + ")'> Remove </button> </p>";
  }
  cartBox.innerHTML = `
    <h2>Items in Cart</h2>
    ` + cartList + `
    <div id = "total-price-div"> <p><strong>Total Price:</strong> <span id = "total-price-symbol">` + getCurrencySymbol(selectedCurrency) + `</span> <span id="total-price"> ` + totalPrice.toFixed(2) + `</span> </div> </p>
    <button id="checkout-button" onclick = "checkout()"> Checkout </button>
  `;
}

function checkout() {
  let budget = Number(budgetElement.textContent);
  let price = 0;
  totalDesirability = 0;
  let categoryCounts = {}; // This object will track category quantities

  for (let i = 0; i < cart.length; i++) {
    price += Number(cart[i].finalPrice);
    totalDesirability += cart[i].desirability;

    // Update category counts
    if (!categoryCounts[cart[i].category]) {
      categoryCounts[cart[i].category] = 0;
    }
    categoryCounts[cart[i].category] += cart[i].quantity;
  }

  function badCart(cart, categories, shoppingList) {
    let checker = new Array(categories.length).fill(0);

    for (let i = 0; i < cart.length; i++) {
      let categoryIndex = categories.indexOf(cart[i].category);
      if (categoryIndex !== -1) {
        checker[categoryIndex] += cart[i].quantity;
      }
    }

    for (let i = 0; i < shoppingList.length; i++) {
      if (checker[i] !== shoppingList[i]) {
        return true;
      }
    }
    return false;
  }

  if (price > budget) {
    alert("The cost is too much!");
    location.replace('gameOver.html');
  } else if (badCart(cart, categories, shoppingList)) {
    alert(
      "You did not properly buy what you were asked to buy!"
    );
    location.replace('gameOver.html');
  } else {
    alert(
      "Congrats! You are within budget and have bought what you were instructed to buy."
    );
   // alert("Your total desirability in the end was: " + totalDesirability);
   location.replace('gameWin.html');

    let buttons = document.querySelectorAll("button");
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    let inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].disabled = true;
    }
  }
}

function removeItem(index)
{
  cart.splice(index, 1);
  updateCart();
}

function renderStoreItems()
{
  storeItemsContainer.innerHTML = "";
  let item = items[currentIndex];
  let storeItemHTML = `
    <div class="store-item">
      <div class="item-content">
        <h3 class="item-name">` + item.name + `<span class="quantity-display"></span></h3>
        <p class="item-price" data-price="` + item.price + `">` + getCurrencySymbol(selectedCurrency) + item.price.toFixed(2) + `</p>
        <input type="number" class="item-amount" placeholder="Enter amount" min="1"></input>
        <button onclick = "addToCart()" class="add-to-cart">Add to Cart</button>
      </div>
    </div>
  `;

  document.getElementById("item-desirability").textContent = "Desirability: "+ item.desirability;
  document.getElementById("item-name").textContent = "Item: "+ item.name;
  storeItemsContainer.innerHTML = storeItemHTML;
  let amountInput = document.querySelector('.item-amount');
  let quantityDisplay = document.querySelector('.quantity-display');
  
  amountInput.addEventListener('input', function (){
    let quantity = parseInt(amountInput.value);
    if (amountInput.value < 1)
    {
      quantityDisplay.textContent ="";
    } else {
      quantityDisplay.textContent = " x" + quantity;
    }
  });
}

function updateUI() {
  const buttons = [usdButton, cadButton, eurButton];
  buttons.forEach(button => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }
  });

  if (selectedCurrency === 'USD') {
    usdButton.classList.add('active');
  } else if (selectedCurrency === 'CAD') {
    cadButton.classList.add('active');
  } else if (selectedCurrency === 'EUR') {
    eurButton.classList.add('active');
  }
}
  
function addToCart()
{
  let amountInput = document.querySelector('.item-amount');
  let item = items[Number(currentIndex)];
  let quantityDisplay = document.querySelector('.quantity-display');
  let quantity = Number(amountInput.value);
  if (amountInput.value.length == 0|| quantity <= 0 || quantity%1 != 0)
  {
    alert("Please enter a valid quantity.");
    return;
  }
  let finalDesirability = item.desirability * quantity;
  let finalPrice = item.price * quantity;
  let existingCartItem = undefined;
  let category = item.category;
  for (let i = 0; i < cart.length; i++)
  {
    if (cart[i].name === item.name)
    {
      existingCartItem = cart[i];  
      break;
    }
  }
  if (existingCartItem !== undefined)
  {
    existingCartItem.quantity += quantity;
    existingCartItem.finalPrice += finalPrice;
    existingCartItem.desirability += finalDesirability;
  } else
  {
    cart.push({ name: item.name, quantity: quantity, finalPrice: finalPrice, desirability: finalDesirability, category: category});
  }
  updateCart();
  amountInput.value = "";
  quantityDisplay.textContent = "";
}

function getCurrencySymbol(currency)
{
  let symbols = {
    USD: "$",
    CAD: "C$",
    EUR: "€"
  };
  if (!symbols[currency])
  {
    return "$";
  }
  return symbols[currency];
}

function startTimer() {
  clearInterval(timerInterval);

  let updateDisplay = function () {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  timerInterval = setInterval(() => {
    remainingTime -= speedFactor;

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      remainingTime = 0;
      alert("Time's up!");
      endGame();
    }

    updateDisplay();
  }, 1000);
  updateDisplay();
}

function endGame()
{
  location.replace('gameOver.html');

  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++)
  {
    buttons[i].disabled = true;
  }
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length; i++)
  {
    inputs[i].disabled = true;
  }
}

function leftButton()
{
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  renderStoreItems();
}

function rightButton ()
{
  currentIndex = (currentIndex + 1) % items.length;
  renderStoreItems();
}


document.addEventListener("DOMContentLoaded", function() {
  generateShoppingList(items);
});

function convertCurrency(currency) {
  selectedCurrency = currency;

  const currencyButtons = ['usd-button', 'cad-button', 'eur-button'];
  currencyButtons.forEach((buttonId) => {
    document.getElementById(buttonId).classList.remove('active');
  });
  document.getElementById(`${currency.toLowerCase()}-button`).classList.add('active');
}

function updateItemPrices() {
  const itemPrices = document.querySelectorAll(".item-price");
  itemPrices.forEach(priceElement => {
    const basePrice = parseFloat(priceElement.dataset.price);
    const convertedPrice = basePrice * currencyRates[selectedCurrency];
    priceElement.textContent = getCurrencySymbol(selectedCurrency) + convertedPrice.toFixed(2);
  });

  const totalPriceSign = document.querySelector("#total-price-symbol");
  totalPriceSign.textContent = getCurrencySymbol(selectedCurrency);

  const totalPriceElement = document.querySelector("#total-price");
  const totalPrice = parseFloat(totalPriceElement.textContent);
  const convertedTotal = (totalPrice * currencyRates[selectedCurrency]).toFixed(2);
  totalPriceElement.textContent = convertedTotal;
}  

function updateBudget() {
   let convertedBudget = budget * currencyRates[selectedCurrency];
   budgetCurrencySymbol.textContent = getCurrencySymbol(selectedCurrency);
   budgetElement.textContent = convertedBudget.toFixed(2);
}

function setActiveSpeedButton(button) {
    const speedButtons = document.querySelectorAll(".button-row-speed button");
    speedButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
}

function randomizePricesAndDesirability() {
  const priceRange = 0.2;
  const desirabilityRange = 0.3;

  items.forEach(item => {
      let priceChange = (Math.random() * 2 * priceRange) - priceRange;
      item.price += item.price * priceChange;

      let desirabilityChange = (Math.random() * 2 * desirabilityRange) - desirabilityRange;
      item.desirability += item.desirability * desirabilityChange;

      item.desirability = parseFloat(item.desirability.toFixed(2));
  });
}

randomizePricesAndDesirability();

document.addEventListener("DOMContentLoaded", function () {
  generateShoppingList(items);
  updateUI();

  startTimer();
  // alert("Please select a speed to start the game")

  document.querySelector(".button-row-currency button[data-currency='USD']").classList.add("active");
  document.querySelector(".button-row-speed button:first-child").classList.add("active");
  
});

renderStoreItems();
generateShoppingList(items);
updateUI();