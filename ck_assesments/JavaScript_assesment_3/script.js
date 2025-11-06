(function () {
  function Product(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }

  Product.prototype.getDiscountedPrice = function (percent) {
    const discount = this.price * (percent / 100);
    return this.price - discount;
  };

  const products = [
    new Product("Wireless Headphones", 79.99, "Electronics"),
    new Product("Leather Wallet", 29.99, "Accessories"),
    new Product("Running Shoes", 89.99, "Footwear"),
    new Product("Smart Watch", 149.99, "Electronics"),
  ];

  const container = document.getElementById("productContainer");

  products.forEach((product) => {
    const card = document.createElement("div");
    card.className = "product-card";

    const name = document.createElement("div");
    name.className = "product-name";
    name.textContent = product.name;

    const price = document.createElement("div");
    price.className = "product-price";
    price.textContent = `Price: $${product.price.toFixed(2)}`;

    const discounted = document.createElement("div");
    discounted.className = "product-price";
    discounted.style.color = "#28a745";
    discounted.textContent = `Discounted (10%): $${product
      .getDiscountedPrice(10)
      .toFixed(2)}`;

    const category = document.createElement("div");
    category.className = "product-category";
    category.textContent = `Category: ${product.category}`;

    card.appendChild(name);
    card.appendChild(price);
    card.appendChild(discounted);
    card.appendChild(category);

    card.addEventListener("mouseenter", function () {
      card.style.backgroundColor = "#e6f7ff"; 
      card.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
      card.style.transform = "scale(1.03)";
      card.style.transition = "all 0.2s ease";
    });

    card.addEventListener("mouseleave", function () {
      card.style.backgroundColor = "white";
      card.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
      card.style.transform = "scale(1)";
    });

    container.appendChild(card);
  });

  // call/ apply/ blind //////////////////////////

  let costly1 = 0;

  function costlyProject() {
    if (this.price > costly1) {
      costly1 = this.price;
    }
  }

  products.forEach(function (element) {
    costlyProject.call(element);
  });

  const costly = document.getElementById("costlyproduct");
  costly.textContent = costly1;
})();
