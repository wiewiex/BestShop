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
        items: summary.querySelector("ul").children,
        total: {
            container: summary.querySelector("#total-price"),
            price: summary.querySelector(".total__price")
        }
    };

    this.addEvents()
}


Calculator.prototype.showGreenCalc = function (event) {
    const id = event.target.id;
    const value = event.target.value;

    if ((value && event.target.type !== "checkbox") || (event.target.checked && event.target.type === "checkbox"))  {
        this.summary.list.querySelector("[data-id=" + id + "]").classList.add("open");
    }
    else {this.summary.list.querySelector("[data-id=" + id + "]").classList.remove("open");}
}

Calculator.prototype.showCustomSelect = function (event) {
    this.form.package.classList.toggle("open");
}
Calculator.prototype.selectValue = function (event) {
    event.target.parentElement.parentElement.dataset.value = event.target.dataset.value;
    this.form.package.querySelector(".select__input").innerText = event.target.innerText;
}


Calculator.prototype.addEvents = function () {
    this.form.products.addEventListener("change", this.showGreenCalc.bind(this));
    this.form.products.addEventListener("keyup", this.showGreenCalc.bind(this));
    this.form.orders.addEventListener("change", this.showGreenCalc.bind(this));
    this.form.orders.addEventListener("keyup", this.showGreenCalc.bind(this));
    this.form.accounting.addEventListener("change", this.showGreenCalc.bind(this));
    this.form.terminal.addEventListener("change", this.showGreenCalc.bind(this));

    this.form.package.addEventListener("click", this.showCustomSelect.bind(this));
    this.form.typesOfPackage.basic.addEventListener("click", this.selectValue.bind(this));
    this.form.typesOfPackage.professional.addEventListener("click", this.selectValue.bind(this));
    this.form.typesOfPackage.premium.addEventListener("click", this.selectValue.bind(this));
}


const form = document.querySelector(".calc__form");
const summary = document.querySelector(".calc__summary");

const q = new Calculator(form,summary);
console.log(q)






