function Calculator(form, summary) {
    this.prices = {
        products: 0.5,
        orders: 0.25,
        package: {
            basic: 0,
            professional: 25,
            premium: 60
        },
        accounting: 35,
        terminal: 5
    };
    this.form = {
        products: form.querySelector("#products"),
        orders: form.querySelector("#orders"),
        package: form.querySelector("#package"),
        typesOfPackage: {
            basic: form.querySelector("#package .select__dropdown li:nth-of-type(1)"),
            professional: form.querySelector("#package .select__dropdown li:nth-of-type(2)"),
            premium: form.querySelector("#package .select__dropdown li:nth-of-type(3)")
        },
        accounting: form.querySelector("#accounting"),
        terminal: form.querySelector("#terminal")
    };
    this.summary = {
        list: summary.querySelector("ul"),
        countedPrices: [0, 0, 0, 0, 0],
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price"),
        }
    };
    this.addEvents()
}


Calculator.prototype.showGreenCalc = function (event) {
    if ((event.target.value && event.target.type !== "checkbox") || (event.target.checked && event.target.type === "checkbox"))  {
        this.summary.list.querySelector("[data-id=" + event.target.id + "]").classList.add("open");
    }
    else {this.summary.list.querySelector("[data-id=" + event.target.id + "]").classList.remove("open");
    }
    this.showTotalPrice();
}

Calculator.prototype.showTotalPrice = function () {
    this.summary.total.price.innerText = "$" + this.summary.countedPrices.reduce(function (total,item){
        return total + item;
    })
    const visibleCalc = document.querySelector(".list__item.open");
    if (visibleCalc) {
        this.summary.total.container.classList.add("open");
    }
    else {this.summary.total.container.classList.remove("open");
    }
}


Calculator.prototype.textInputCallback = function (event) {
    this.summary.list.querySelector("[data-id=" + event.target.id + "]").querySelector(".item__calc").innerText = event.target.value + " * " + "$" + this.prices[event.target.id];
    this.summary.list.querySelector("[data-id=" + event.target.id + "]").querySelector(".item__price").innerText = "$" + event.target.value * this.prices[event.target.id];

    if (event.target.id === "products") {
        this.summary.countedPrices.splice(0, 1, event.target.value * this.prices[event.target.id]);
    }
    else {
        this.summary.countedPrices.splice(1, 1, event.target.value * this.prices[event.target.id]);
    }
    this.showGreenCalc(event);
}

Calculator.prototype.checkboxCallback = function (event) {
    this.summary.list.querySelector("[data-id=" + event.target.id + "]").querySelector(".item__price").innerText = "$" + this.prices[event.target.id];

    if (event.target.id === "accounting") {
        this.summary.countedPrices.splice(2, 1, this.prices[event.target.id]);
    }
    else {
        this.summary.countedPrices.splice(3, 1, this.prices[event.target.id]);
    }
    this.showGreenCalc(event);
}

Calculator.prototype.showCustomSelect = function (event) {
    this.form.package.classList.toggle("open");
}
Calculator.prototype.selectValue = function (event) {
    event.target.parentElement.parentElement.dataset.value = event.target.dataset.value;
    this.form.package.querySelector(".select__input").innerText = event.target.innerText;
    this.summary.list.querySelector('[data-id="package"]').classList.add("open");
    this.summary.list.querySelector('[data-id="package"]').querySelector(".item__calc").innerText = event.target.innerText;
    this.summary.list.querySelector('[data-id="package"]').querySelector(".item__price").innerText = "$" + this.prices.package[event.target.dataset.value];
    this.summary.countedPrices.splice(4, 1, this.prices.package[event.target.dataset.value]);
    this.showTotalPrice();
}


Calculator.prototype.addEvents = function () {
    this.form.products.addEventListener("change", this.textInputCallback.bind(this));
    this.form.products.addEventListener("keyup", this.textInputCallback.bind(this));
    this.form.orders.addEventListener("change", this.textInputCallback.bind(this));
    this.form.orders.addEventListener("keyup", this.textInputCallback.bind(this));
    this.form.accounting.addEventListener("change", this.checkboxCallback.bind(this));
    this.form.terminal.addEventListener("change", this.checkboxCallback.bind(this));
    this.form.package.addEventListener("click", this.showCustomSelect.bind(this));
    this.form.typesOfPackage.basic.addEventListener("click", this.selectValue.bind(this));
    this.form.typesOfPackage.professional.addEventListener("click", this.selectValue.bind(this));
    this.form.typesOfPackage.premium.addEventListener("click", this.selectValue.bind(this));
}


const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");

const q = new Calculator(form,summary);
console.log(q)






