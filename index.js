import { menuArray } from "./data";
import { renderMenu } from "./menuOrder";

const menuPage = document.getElementById("menu")
const confirmPage = document.getElementById("confirmOrder")
const payPage = document.getElementById("payOrder")
const orderMessage = document.getElementById("orderMessage")
document.getElementById("yearUpdate").textContent = new Date().getFullYear()

let orderedItem = []

payPage.style.display = "none"

payPage.addEventListener("submit", function(e)
{
    e.preventDefault()
    const customerCardDetails = new FormData(payPage)
    const customerName = customerCardDetails.get("customerName")
    orderMessage.innerHTML = 
    `Thanks ${customerName.charAt(0).toUpperCase()}${customerName.slice(1)}! Your order is on the way!`
    orderMessage.style.display = "block"
    payPage.style.display = "none"
    payPage.reset()
    orderedItem = []
    confirmPage.innerHTML = ""
    render()
})

document.addEventListener("click", function(e)
{
    if (e.target.dataset.addButton)
    {
        handleAddButton(e.target.dataset.addButton)
        orderMessage.style.display = "none"
    }

    else if(e.target.dataset.remove)
    {
        handleRemoveButton(e.target.dataset.remove)
    }

    else if(e.target.classList.contains("finishOrderBtn"))
    {
        payPage.style.display = "flex"
    }
})

function handleAddButton(addBtnId)
{
    const orderBtn = menuArray.find(menu => menu.uuid === addBtnId)
    if(orderBtn)
    {
        orderedItem.push(orderBtn)
        render()
    }
}

function handleRemoveButton(index)
{
    orderedItem.splice(index, 1)
    render()

    if(orderedItem.length === 0)
    {
        confirmPage.innerHTML = ""
    }
}

function confirmOptions()
{
    if (orderedItem.length === 0) return ""

    let totalPrice = orderedItem.reduce((sum, item) => sum + item.price, 0)

    let orderItemsHTML = orderedItem.map((item, index) => `
    <div class="confirmItem">
            <p>${item.name} <span class="remove-btn" data-remove="${index}">remove</span></p>
            <p>$${item.price}</p>
        </div>
        `).join("")

        return `
        <div class="confirmDiv">
            <h1>Your Order</h1>
            ${orderItemsHTML}
            <div class="totalPriceDiv">
                <p>Total Price: $${totalPrice}</p>
            </div>
            <button class="finishOrderBtn">Complete Order</button>
        </div>
        `
}

function render()
{
    menuPage.innerHTML = renderMenu()
    confirmPage.innerHTML = confirmOptions()
}

render()