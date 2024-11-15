const products = [
    {
        id: 12345,
        name: 'Двухкамерный холодильник Beko CNMV5335E20VXR',
        supplier: 'Официальный магазин Beko',
        price: 44_420,
        src: './images/fridge.png',
    },
    {
        id: 12356,
        name: 'Электрогриль Kitfort КТ-1632',
        supplier: 'Kitfort',
        price: 4_694,
        src: './images/grill.png',
    },

    {
        id: 12389,
        name: 'Растворимый кофе Жокей Latte 3 в 1 в стиках, 50 шт',
        supplier: 'Яндекс Маркет',
        price: 478,
        src: './images/coffee.png',
    },
]

const cart = document.getElementById('cart')
const btnAdd = document.getElementById('btnAdd')
const inputField = document.getElementById('search')
const search = document.querySelector('.ids')

const productCard = []

const createTable = (items) => {
    let html = '<table>';
    html += '<tr>';
    html += '<th>' + 'Наименование' + '</th>';
    html += '<th>' + 'ID' + '</th>';
    html += '</tr>';
    for(let i = 0; i < items.length; i++)
    {
        html += '<tr>';
        html += '<td>' + items[i].name + '</td>';
        html += '<td>' + items[i].id + '</td>';
        html += '</tr>';
    }
    html += '</table>';
    return html;
}

const createItemUiComponent = (item) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product");

    const productWrap1 = document.createElement("div");
    productWrap1.classList.add("product__image-wrapper");
    const productWrap2 = document.createElement("div");
    productWrap2.classList.add("product__desc");

    const productWrap3 = document.createElement("div");
    productWrap3.classList.add("product__characters");

    const productWrap4 = document.createElement("div");
    productWrap4.classList.add("product__data-wrapper");

    const productWrap5 = document.createElement("div");
    productWrap5.classList.add("product__edit");

    const productImage = document.createElement("img");
    productImage.classList.add("product__image");
    productImage.setAttribute("src", item.src);

    const productName = document.createElement("h3");
    productName.classList.add("product__name");
    productName.innerHTML = item.name;

    const productSupplier = document.createElement("span");
    productSupplier.classList.add("product__supplier");
    productSupplier.innerHTML = item.supplier;

    const productPrice = document.createElement("span");
    productPrice.classList.add("product__price");
    productPrice.innerHTML = `${item.price} ₽`;

    const productMinus = document.createElement("button");
    productMinus.classList.add("product__btn-minus", "btn-reset");

    const productPlus = document.createElement("button");
    productPlus.classList.add("product__btn-plus", "btn-reset");

    const productCount = document.createElement("span");
    productCount.classList.add("product__count-field");
    productCount.innerHTML = `${item.count}`;

    const productDelete = document.createElement("button");
    productDelete.classList.add("product__btn-remove", "btn-reset");

    productDelete.addEventListener("click", () => {
        deleteItem(item)
        drawHtml()
    });

    productMinus.addEventListener("click", () => {
        const count = item.count > 1 ? item.count - 1 : item.count;
        addItem(item, count)
        drawHtml()
    })

    productPlus.addEventListener("click", () => {
        const count = item.count + 1;
        addItem(item, count)
        drawHtml()
    })

    productWrap1.appendChild(productImage);
    productWrap2.appendChild(productName);
    productWrap2.appendChild(productSupplier);
    productWrap3.appendChild(productPrice);
    productWrap5.appendChild(productMinus);
    productWrap5.appendChild(productCount);
    productWrap5.appendChild(productPlus);
    productWrap4.appendChild(productWrap5);
    productWrap3.appendChild(productWrap4);
    productItem.appendChild(productWrap1);
    productItem.appendChild(productWrap2);
    productItem.appendChild(productWrap3);
    productItem.appendChild(productDelete);
    return productItem;
}

const getElementInfo = (item) => {
    const element = productCard.find(el => el.id === item.id)
    const elementIndex = productCard.findIndex(el => el.id === item.id)
    return [element, elementIndex]
}

const deleteItem = (item) => {
    const [element, elementIndex] = getElementInfo(item)
    cart.innerHTML = null;

    if (Boolean(element)) {
        productCard.splice(elementIndex, item.count)
    }
}

const addItem = (item, count=1) => {
    const [element, elementIndex] = getElementInfo(item)
    const elementPrice = products.find(el => el.id === item.id).price

    if(Boolean(element)) {
        const item = {
            ...element,
            count: element.count ? count : 1,
        }
        console.log(count)
        item.price = elementPrice * item.count
        productCard.splice(elementIndex, 1, item)
    }else {
        item.count = 1
        productCard.push(item)
    }
}

const drawHtml = () => {
    while (cart.firstChild) {
        cart.firstChild.remove()
    }

    console.log(productCard)
    productCard.forEach((el) => {
        cart.appendChild(createItemUiComponent(el))
    })
}

inputField.addEventListener('input', (e) => {
    const items = products.filter(item => item.name.toLowerCase().includes(e.target.value.toLowerCase()))
    search.innerHTML = inputField.value ? createTable(items) : ''
})

btnAdd.addEventListener('click', (e) => {
    e.preventDefault()
    const id = prompt('Введите ID товара')
    const item = products.find(item => item.id === Number(id))
    if (item) {
        addItem(item)
    }else {
        alert("Товар не найден")
    }
    drawHtml()
})