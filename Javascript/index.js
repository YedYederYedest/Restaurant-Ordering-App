import { menuArray } from "./data.js";

const paymentDiv = document.getElementById("pay");
const cartHTML = document.getElementById("cart");
const completeOrderBtn = document.getElementById("cart-completeOrderBtn");
const paymentForm = document.getElementById("pay-modal");
const orderMessage = document.getElementById("orderMessage");
const paidMessage = document.getElementById("orderMessage-paid");
const closeModalBtn = document.getElementById("closeModal");

const yearUpdate = document.getElementById("yearUpdate")
yearUpdate.textContent = new Date().getFullYear()

const currItem = [];
const data = {};

// Render Menu
function renderMenu() {
    const menuHTML = document.getElementById("menu");

    menuHTML.innerHTML = menuArray
        .map((menuItem) => {
            return `
        <div class="menuOptions">
            <span class="emoji">${menuItem.emoji}</span>
            <div class="foodOption">
                <h2>${menuItem.name}</h2>
                <h3>$${menuItem.price}</h3>
                <p>${menuItem.ingredients.join(", ")}</p>
            </div>
            <button class="addButton" data-order="${menuItem.id}">
                <i class="fa-solid fa-plus"></i>
            </button>
        </div>
        `;
        })
        .join("");

    const addButtons = document.querySelectorAll(".addButton");
    addButtons.forEach((addBtn) => {
        addBtn.addEventListener("click", function (e) {
            const itemId = parseInt(e.target.closest("button").dataset.order);
            const selectedItem = menuArray.find((item) => item.id === itemId);
            if (selectedItem) {
                currItem.push(selectedItem);
                renderCart();
            }
        });
    });
}

// Render Cart
function renderCart() {
    const orderCartList = document.getElementById("cart-user-order");
    cartHTML.style.display = currItem.length > 0 ? "block" : "none";

    orderCartList.innerHTML = currItem
        .map((item, index) => {
            return `
        <li class="cart-user-order">
            <h2>${item.name}</h2>
            <button class="removeButton" data-index="${index}">Remove</button>
            <p class="cart-item-price">$${item.price}</p>
        </li>
        `;
        })
        .join("");

    const totalPrice = currItem.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("cart-user-total-amount").textContent = `$${totalPrice}`;

    const removeBtns = document.querySelectorAll(".removeButton");
    removeBtns.forEach((btn) => {
        btn.addEventListener("click", function (e) {
            const id = e.target.dataset.index;
            currItem.splice(id, 1);
            renderCart();
        });
    });
}

// Show payment modal
completeOrderBtn.addEventListener("click", function () {
    paymentDiv.style.display = "flex";
});

// Close modal when clicking "X"
closeModalBtn.addEventListener("click", function () {
    paymentDiv.style.display = "none";
});

// Close modal when clicking outside the form
paymentDiv.addEventListener("click", function (e) {
    if (e.target === paymentDiv) {
        paymentDiv.style.display = "none";
    }
});

// Handle payment form submission
paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(paymentForm);
    formData.forEach((value, key) => {
        data[key] = value;
    });

    renderConfirmation();
});

// Show confirmation message
function renderConfirmation() {
    cartHTML.style.display = "none";
    paymentDiv.style.display = "none";
    orderMessage.style.display = "block";
    paidMessage.innerText = `Thank you ${data.customerName}, your order is on its way!`;
}

// Initialize
renderMenu();
