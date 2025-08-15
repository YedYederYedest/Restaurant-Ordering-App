export function renderMenu() {
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
            <div class="addButton">
                <i class="fa-solid fa-plus" data-addButton="${menu.uuid}"></i>
            </div>
        </div>
        `;
    });
    return menuOptions;
}

/*Old Name of the Function is menuOptionsHTML */