import { menuArray } from "./data.js";

const menuPage = document.getElementById("menu");
const confirmPage = document.getElementById("confirmOrder");
const payPage = document.getElementById("payOrder");
const orderMessage = document.getElementById("orderMessage");

let orderedItem = [];

payPage.style.display = "none"; // Hide payment form initially

payPage.addEventListener('submit', function(e) {
    e.preventDefault();
    const customerCardDetails = new FormData(payPage);
    const customerName = customerCardDetails.get('customerName');
    orderMessage.innerHTML = 
      `Thanks, ${customerName.charAt(0).toUpperCase()}${customerName.slice(1)}! Your order is on the way!`;
    orderMessage.style.display = "block";
    payPage.style.display = "none";
    payPage.reset();
    orderedItem = [];
    confirmPage.innerHTML = "";
    render();
});

document.addEventListener('click', function(e) {
    if (e.target.dataset.buttonPop) {
        handleButtonPop(e.target.dataset.buttonPop);
        orderMessage.style.display = "none";
    } else if (e.target.dataset.remove) {
        handleRemovePop(e.target.dataset.remove);
    } else if (e.target.classList.contains("finishOrderBtn")) {
        payPage.style.display = "flex";
    }
});

function handleButtonPop(addBtnId) {
    const orderBtn = menuArray.find(menu => menu.uuid === addBtnId);
    if (orderBtn) {
        orderedItem.push(orderBtn);
        render();
    }
}

function handleRemovePop(index) {
    orderedItem.splice(index, 1);
    render();

    if (orderedItem.length === 0) {
        confirmPage.innerHTML = "";
    }
}

function menuOptionsHTML() {
    let menuOptions = "";
    menuArray.forEach(menu => {
        menuOptions += `
        <div class="menuOptions">
            <span class="emoji">${menu.emoji}</span>
            <div class="foodOption">
                <h2>${menu.name}</h2>
                <h3>$${menu.price}</h3>
                <p>${menu.ingredients.join(", ")}</p>
            </div>
            <div class="buttonPop">
                <i class="fa-solid fa-plus" data-buttonPop="${menu.uuid}"></i>
            </div>
        </div>
        `;
    });
    return menuOptions;
}

function confirmOptionsHTML() {
    if (orderedItem.length === 0) return "";

    let totalPrice = orderedItem.reduce((sum, item) => sum + item.price, 0);

    let orderItemsHTML = orderedItem.map((item, index) => `
        <div class="confirmItem">
            <p>${item.name} <span class="remove-btn" data-remove="${index}">remove</span></p>
            <p>$${item.price}</p>
        </div>
    `).join("");

    return `
        <div class="confirmDiv">
            <h1>Your Order</h1>
            ${orderItemsHTML}
            <div class="totalPriceDiv">
                <p>Total Price: $${totalPrice}</p>
            </div>
            <button class="finishOrderBtn">Complete Order</button>
        </div>
    `;
}

function render() {
    menuPage.innerHTML = menuOptionsHTML();
    confirmPage.innerHTML = confirmOptionsHTML();
}

render();
