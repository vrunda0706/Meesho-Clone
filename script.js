// ===============================
// 📂 OPEN CATEGORY → GO TO PRODUCTS PAGE
// ===============================
function openCategory(category) {
    localStorage.setItem("category", category);   // save selected category
    window.location.href = "products.html";       // open separate page
}

// ===============================
// 🔗 PAGE NAVIGATION FUNCTION
// ===============================
function goToPage(page) {
    console.log("Going to:", page); // for debugging
    window.location.href = page;
}

// ===============================
// 📩 CONTACT FORM FUNCTION
// ===============================
function submitForm(event) {
    event.preventDefault();

    // 👉 Get values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // ===============================
    // ✅ VALIDATION
    // ===============================
    if (name === "" || email === "" || message === "") {
        alert("Please fill all fields!");
        return;
    }

    // simple email check
    if (!email.includes("@") || !email.includes(".")) {
        alert("Enter valid email!");
        return;
    }

    // ===============================
    // 💾 SAVE DATA (LOCAL STORAGE)
    // ===============================
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

    let newMessage = {
        name: name,
        email: email,
        message: message,
        date: new Date().toLocaleString()
    };

    contacts.push(newMessage);

    localStorage.setItem("contacts", JSON.stringify(contacts));

    // ===============================
    // 🎉 SUCCESS MESSAGE
    // ===============================
    alert("Message sent successfully!");

    // clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
}

// ===============================
// 🛒 ADD TO  CART
// ===============================
// 1. ADD TO CART FUNCTION (put at top or middle)
function addToCart(id, name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    id = Number(id);

    let existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity = Number(existing.quantity) + 1;
    } else {
        cart.push({
            id: id,
            name: name,
            price: Number(price),
            image: image,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    alert("Added to cart 🛒");
}


// ===============================
// 🛒 LOAD CART
// ===============================
function loadCart() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cart-items");

    if (!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {

        let price = Number(item.price);
        let qty = Number(item.quantity);

        let total = price * qty;
        subtotal += total;

        container.innerHTML += `
        <tr>
            <td>
                <div class="cart-info">
                    <img src="${item.image}" width="80">
                    <div>
                        <p>${item.name}</p>
                        <small>Price: ₹${price}</small>
                        <br>
                        <a href="#" onclick="removeItem(${index}); return false;">Remove</a>
                    </div>
                </div>
            </td>

            <td>
                <input type="number" value="${qty}" min="1"
                onchange="updateQuantity(${index}, this.value)">
            </td>

            <td>₹${total}</td>
        </tr>
        `;
    });

    let tax = subtotal * 0.05;
    let totalAmount = subtotal + tax;

    document.getElementById("subtotal").innerText = "₹" + subtotal;
    document.getElementById("tax").innerText = "₹" + tax.toFixed(2);
    document.getElementById("total").innerText = "₹" + totalAmount.toFixed(2);
}

// ===============================
// ❌ REMOVE ITEM
// ===============================
function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// ===============================
// 🔁 UPDATE QUANTITY
// ===============================
function updateQuantity(index, value) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart[index].quantity = parseInt(value);

    localStorage.setItem("cart", JSON.stringify(cart));

    loadCart();
}

// load cart on page open
window.onload = loadCart;