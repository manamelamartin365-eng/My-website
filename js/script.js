/* =========================================================
   CANNA PLUG - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   SUPABASE CONNECTION
========================================================= */

const SUPABASE_URL =
    "https://iraietxowqmnlfjdxhyg.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_gjBzlS09A7SumW-1v1ERpw_-joi0GnM";


let db = null;

if (window.supabase) {

    db = window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

} else {

    console.error(
        "Supabase library was not loaded."
    );

}


/* =========================================================
   AGE VERIFICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const ageGate = document.getElementById("ageGate");
    const ageEnter = document.getElementById("ageEnter");
    const ageExit = document.getElementById("ageExit");

    if (!ageGate) return;


    /* CHECK IF ALREADY VERIFIED */

    const ageVerified =
        localStorage.getItem("cannaPlugAgeVerified");


    if (ageVerified === "true") {

        ageGate.classList.add("hidden");

        document.body.classList.remove("age-locked");

    } else {

        document.body.classList.add("age-locked");

    }


    /* ENTER WEBSITE */

    if (ageEnter) {

        ageEnter.addEventListener("click", () => {

            localStorage.setItem(
                "cannaPlugAgeVerified",
                "true"
            );

            ageGate.classList.add("hidden");

            document.body.classList.remove("age-locked");

        });

    }


    /* EXIT WEBSITE */

    if (ageExit) {

        ageExit.addEventListener("click", () => {

            document.body.innerHTML = `
                <div style="
                    min-height:100vh;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    padding:30px;
                    background:#080908;
                    color:#f5f5f2;
                    font-family:Montserrat,sans-serif;
                    text-align:center;
                ">

                    <div style="max-width:500px;">

                        <div style="
                            color:#9fcf67;
                            font-size:12px;
                            font-weight:800;
                            letter-spacing:3px;
                            margin-bottom:20px;
                        ">
                            CANNA PLUG
                        </div>

                        <h1 style="
                            font-size:36px;
                            margin-bottom:15px;
                        ">
                            Access Restricted
                        </h1>

                        <p style="
                            color:#a5aaa2;
                            line-height:1.7;
                        ">
                            You must meet the minimum legal
                            age requirement to access this
                            website.
                        </p>

                    </div>

                </div>
            `;

        });

    }

});
/* =========================================================
   2. HEADER SCROLL EFFECT
========================================================= */

const siteHeader =
    document.getElementById("siteHeader");

function handleHeaderScroll() {

    if (!siteHeader) return;

    if (window.scrollY > 30) {

        siteHeader.classList.add("scrolled");

    } else {

        siteHeader.classList.remove("scrolled");

    }

}

window.addEventListener(
    "scroll",
    handleHeaderScroll
);

handleHeaderScroll();


/* =========================================================
   3. MOBILE NAVIGATION
========================================================= */

const mobileMenuButton =
    document.getElementById("mobileMenuButton");

const mobileNav =
    document.getElementById("mobileNav");


if (mobileMenuButton && mobileNav) {

    mobileMenuButton.addEventListener(
        "click",
        () => {

            mobileNav.classList.toggle("open");

            const icon =
                mobileMenuButton.querySelector("i");

            if (mobileNav.classList.contains("open")) {

                icon.classList.remove("fa-bars");

                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }

        }
    );


    /*
       Close mobile menu when a link
       is clicked.
    */

    const mobileLinks =
        mobileNav.querySelectorAll("a");

    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                mobileNav.classList.remove("open");

                const icon =
                    mobileMenuButton.querySelector("i");

                icon.classList.remove("fa-xmark");

                icon.classList.add("fa-bars");

            }
        );

    });

}


/* =========================================================
   4. SEARCH SYSTEM
========================================================= */


/*
   Product database.

   We will expand this when we build the
   Shop page.
*/

const products = [

    {
        id: 1,
        name: "Premium Flower",
        category: "Flower",
        price: "R350",
        url: "shop.html?product=1"
    },

    {
        id: 2,
        name: "Premium Edibles",
        category: "Edibles",
        price: "R250",
        url: "shop.html?product=2"
    },

    {
        id: 3,
        name: "Canna Drink",
        category: "Drinks",
        price: "R80",
        url: "shop.html?product=3"
    },

    {
        id: 4,
        name: "Premium Vape",
        category: "Vapes",
        price: "R450",
        url: "shop.html?product=4"
    },

    {
        id: 5,
        name: "CannaPlug Accessories",
        category: "Accessories",
        price: "R150",
        url: "shop.html?product=5"
    },

    {
        id: 6,
        name: "CannaPlug Merchandise",
        category: "Merchandise",
        price: "R300",
        url: "shop.html?product=6"
    }

];


const searchToggle =
    document.getElementById("searchToggle");

const searchPanel =
    document.getElementById("searchPanel");

const closeSearch =
    document.getElementById("closeSearch");

const siteSearch =
    document.getElementById("siteSearch");

const searchResults =
    document.getElementById("searchResults");


/*
   Open search.
*/

if (searchToggle && searchPanel) {

    searchToggle.addEventListener(
        "click",
        () => {

            searchPanel.classList.add("open");

            setTimeout(() => {

                if (siteSearch) {

                    siteSearch.focus();

                }

            }, 250);

        }
    );

}


/*
   Close search.
*/

if (closeSearch && searchPanel) {

    closeSearch.addEventListener(
        "click",
        () => {

            searchPanel.classList.remove("open");

        }
    );

}


/*
   Search products as the customer types.
*/

if (siteSearch) {

    siteSearch.addEventListener(
        "input",
        () => {

            const searchTerm =
                siteSearch.value
                    .trim()
                    .toLowerCase();


            /*
               Nothing typed.
            */

            if (!searchTerm) {

                searchResults.innerHTML = "";

                return;

            }


            /*
               Find matching products.
            */

            const matches =
                products.filter(product =>

                    product.name
                        .toLowerCase()
                        .includes(searchTerm)

                    ||

                    product.category
                        .toLowerCase()
                        .includes(searchTerm)

                );


            /*
               No results.
            */

            if (matches.length === 0) {

                searchResults.innerHTML = `

                    <div class="no-results">

                        No products found for
                        "<strong>${escapeHTML(searchTerm)}</strong>"

                    </div>

                `;

                return;

            }


            /*
               Display results.
            */

            searchResults.innerHTML =
                matches.map(product => `

                    <a
                        href="${product.url}"
                        class="search-result"
                    >

                        <div class="search-result-info">

                            <strong>
                                ${product.name}
                            </strong>

                            <span>
                                ${product.category}
                            </span>

                        </div>

                        <span class="search-result-price">

                            ${product.price}

                        </span>

                    </a>

                `).join("");

        }
    );

}


/* =========================================================
   5. SEARCH KEYBOARD SHORTCUT
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        /*
           "/" opens search unless the user
           is already typing in an input.
        */

        if (
            event.key === "/" &&
            document.activeElement.tagName !== "INPUT" &&
            document.activeElement.tagName !== "TEXTAREA"
        ) {

            event.preventDefault();

            if (searchPanel) {

                searchPanel.classList.add("open");

            }

            if (siteSearch) {

                siteSearch.focus();

            }

        }


        /*
           ESC closes search.
        */

        if (event.key === "Escape") {

            if (searchPanel) {

                searchPanel.classList.remove("open");

            }

        }

    }
);


/* =========================================================
   7. FEATURED PRODUCTS
========================================================= */

const featuredProducts =
    document.getElementById(
        "featuredProducts"
    );


if (featuredProducts) {

    featuredProducts.innerHTML =
        products
            .slice(0, 4)
            .map(product => `

                <article class="product-card">

                    <a
                        href="${product.url}"
                        class="product-image"
                    >

                        <div></div>

                    </a>

                    <div class="product-details">

                        <span class="product-category">

                            ${product.category}

                        </span>

                        <h3>

                            ${product.name}

                        </h3>

                        <div class="product-price">

                            <strong>

                                ${product.price}

                            </strong>

                            <button
                                class="product-add"
                                type="button"
                                aria-label="Add ${product.name} to cart"
                                data-product-id="${product.id}"
                            >

                                <i class="fa-solid fa-plus"></i>

                            </button>

                        </div>

                    </div>

                </article>

            `)
            .join("");


    /*
       Add click events to the generated
       product buttons.
    */

    const addButtons =
        featuredProducts.querySelectorAll(
            ".product-add"
        );


    addButtons.forEach(button => {

        button.addEventListener(
            "click",
            event => {

                event.preventDefault();

                event.stopPropagation();

                const productId =
                    Number(
                        button.dataset.productId
                    );

                const product = products.find(
    item => item.id === productId
);

if (product) {
    addToCart({
        id: product.id,
        name: product.name,
        price: Number(
            product.price.replace("R", "")
        ),
        image: product.image || ""
    });
}

                /*
                   Small visual confirmation.
                */

                const original =
                    button.innerHTML;

                button.innerHTML =
                    `<i class="fa-solid fa-check"></i>`;

                button.style.background =
                    "#9fcf67";

                button.style.color =
                    "#080908";


                setTimeout(() => {

                    button.innerHTML = original;

                    button.style.background = "";

                    button.style.color = "";

                }, 900);

            }
        );

    });

}


/* =========================================================
   8. NEWSLETTER
========================================================= */

const newsletterForm =
    document.getElementById(
        "newsletterForm"
    );


if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "newsletterEmail"
                );


            if (!email || !email.value.trim()) {

                return;

            }


            /*
               For now this is a front-end
               confirmation.

               Later we can connect it to
               a real email service.
            */

            const button =
                newsletterForm.querySelector(
                    "button"
                );


            button.textContent =
                "Subscribed ✓";

            button.disabled = true;

            email.disabled = true;


            setTimeout(() => {

                newsletterForm.reset();

                email.disabled = false;

                button.disabled = false;

                button.textContent =
                    "Subscribe";

            }, 3000);

        }
    );

}


/* =========================================================
   9. SCROLL REVEAL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".section-heading, .category-card, .product-card, .value-item, .review-card, .newsletter-box"
    );


revealElements.forEach(element => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    revealObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   10. SAFE HTML FUNCTION
========================================================= */

function escapeHTML(value) {

    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================================
   11. CLOSE SEARCH WHEN CLICKING OUTSIDE
========================================================= */

document.addEventListener(
    "click",
    event => {

        if (!searchPanel) return;

        const clickedInsideSearch =
            searchPanel.contains(event.target);

        const clickedSearchButton =
            searchToggle &&
            searchToggle.contains(event.target);


        if (
            searchPanel.classList.contains("open") &&
            !clickedInsideSearch &&
            !clickedSearchButton
        ) {

            searchPanel.classList.remove(
                "open"
            );

        }

    }
);


/* =========================================================
   12. PREVENT EMPTY HASH LINKS FROM JUMPING
========================================================= */

document.querySelectorAll(
    'a[href="#"]'
).forEach(link => {

    link.addEventListener(
        "click",
        event => {

            event.preventDefault();

        }
    );

});
/* =========================================================
   SHOP PAGE
========================================================= */

const shopProducts =
    document.getElementById("shopProducts");

const shopSearch =
    document.getElementById("shopSearch");

const shopNoResults =
    document.getElementById("shopNoResults");

const shopFilters =
    document.querySelectorAll(".shop-filter");


let selectedCategory = "all";


function displayShopProducts() {

    if (!shopProducts) return;


    const searchTerm =
        shopSearch
            ? shopSearch.value
                .trim()
                .toLowerCase()
            : "";


    const filteredProducts =
        products.filter(product => {

            const matchesCategory =
                selectedCategory === "all" ||
                product.category === selectedCategory;


            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchTerm)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchTerm);


            return (
                matchesCategory &&
                matchesSearch
            );

        });


    if (filteredProducts.length === 0) {

        shopProducts.innerHTML = "";

        if (shopNoResults) {

            shopNoResults.style.display =
                "block";

        }

        return;

    }


    if (shopNoResults) {

        shopNoResults.style.display =
            "none";

    }


    shopProducts.innerHTML =
        filteredProducts.map(product => `

            <article class="product-card">

                <a href="${product.url}"
                   class="product-image">

                    <div></div>

                </a>

                <div class="product-details">

                    <span class="product-category">
                        ${product.category}
                    </span>

                    <h3>
                        ${product.name}
                    </h3>

                    <div class="product-price">

                        <strong>
                            ${product.price}
                        </strong>

                        <button
                            type="button"
                            class="product-add"
                            data-product-id="${product.id}"
                            aria-label="Add ${product.name} to cart">

                            <i class="fa-solid fa-plus"></i>

                        </button>

                    </div>

                </div>

            </article>

        `).join("");


    /*
       Add to cart buttons
    */

    shopProducts
        .querySelectorAll(".product-add")
        .forEach(button => {

            button.addEventListener(
                "click",
                event => {

                    event.preventDefault();

                    event.stopPropagation();


                    const productId =
                        Number(
                            button.dataset.productId
                        );


                    const product = products.find(
    item => item.id === productId
);

if (product) {
    addToCart({
        id: product.id,
        name: product.name,
        price: Number(
            product.price.replace("R", "")
        ),
        image: product.image || ""
    });
}


                    const original =
                        button.innerHTML;


                    button.innerHTML =
                        `<i class="fa-solid fa-check"></i>`;


                    button.style.background =
                        "#9fcf67";

                    button.style.color =
                        "#080908";


                    setTimeout(() => {

                        button.innerHTML =
                            original;

                        button.style.background =
                            "";

                        button.style.color =
                            "";

                    }, 900);

                }
            );

        });

}


/*
   Category filters
*/

shopFilters.forEach(filter => {

    filter.addEventListener(
        "click",
        () => {

            shopFilters.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            filter.classList.add("active");


            selectedCategory =
                filter.dataset.category;


            displayShopProducts();

        }
    );

});


/*
   Search
*/

if (shopSearch) {

    shopSearch.addEventListener(
        "input",
        displayShopProducts
    );

}


/*
   Initial display
*/

displayShopProducts();
/* =========================================================
   GALLERY LIGHTBOX
========================================================= */

const galleryItems =
    document.querySelectorAll(".gallery-item");

const galleryLightbox =
    document.getElementById("galleryLightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const lightboxTitle =
    document.getElementById("lightboxTitle");

const lightboxClose =
    document.getElementById("lightboxClose");

const lightboxPrev =
    document.getElementById("lightboxPrev");

const lightboxNext =
    document.getElementById("lightboxNext");


let currentGalleryIndex = 0;


/*
   Open selected image
*/

function openGallery(index) {

    if (!galleryItems.length) return;

    currentGalleryIndex = index;

    const item =
        galleryItems[currentGalleryIndex];

    const image =
        item.dataset.image;

    const title =
        item.dataset.title;


    lightboxImage.src = image;

    lightboxImage.alt = title;

    lightboxTitle.textContent = title;

    galleryLightbox.classList.add("open");

    document.body.style.overflow = "hidden";

}


/*
   Close gallery
*/

function closeGallery() {

    if (!galleryLightbox) return;

    galleryLightbox.classList.remove("open");

    document.body.style.overflow = "";

}


/*
   Previous image
*/

function previousGalleryImage() {

    currentGalleryIndex--;

    if (currentGalleryIndex < 0) {

        currentGalleryIndex =
            galleryItems.length - 1;

    }

    openGallery(currentGalleryIndex);

}


/*
   Next image
*/

function nextGalleryImage() {

    currentGalleryIndex++;

    if (
        currentGalleryIndex >=
        galleryItems.length
    ) {

        currentGalleryIndex = 0;

    }

    openGallery(currentGalleryIndex);

}


/*
   Click gallery images
*/

galleryItems.forEach(
    (item, index) => {

        item.addEventListener(
            "click",
            () => {

                openGallery(index);

            }
        );

    }
);


/*
   Buttons
*/

if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGallery
    );

}

if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousGalleryImage
    );

}

if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextGalleryImage
    );

}


/*
   Click dark background to close
*/

if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                galleryLightbox
            ) {

                closeGallery();

            }

        }
    );

}


/*
   Keyboard controls
*/

document.addEventListener(
    "keydown",
    event => {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains("open")
        ) {
            return;
        }


        if (event.key === "Escape") {

            closeGallery();

        }


        if (event.key === "ArrowLeft") {

            previousGalleryImage();

        }


        if (event.key === "ArrowRight") {

            nextGalleryImage();

        }

    }
);
/* =========================================================
   FAQ ACCORDION
========================================================= */

const faqQuestions =
    document.querySelectorAll(".faq-question");


faqQuestions.forEach(question => {

    question.addEventListener(
        "click",
        () => {

            const currentItem =
                question.closest(".faq-item");


            /*
               Close other questions
               so the page stays clean.
            */

            document
                .querySelectorAll(".faq-item.open")
                .forEach(item => {

                    if (item !== currentItem) {

                        item.classList.remove("open");

                    }

                });


            currentItem.classList.toggle("open");

        }
    );

});
/* =========================================================
   CONTACT FORM
========================================================= */

const contactForm =
    document.getElementById("contactForm");

const formSuccess =
    document.getElementById("formSuccess");


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            /*
               At this stage we prevent the browser
               from refreshing the page.

               Later we can connect this form to
               email or a proper backend.
            */

            if (formSuccess) {

                formSuccess.classList.add("show");

            }


            contactForm.reset();


            setTimeout(() => {

                if (formSuccess) {

                    formSuccess.classList.remove("show");

                }

            }, 5000);

        }
    );

}
/* =========================================================
   REVIEW STAR SELECTOR
========================================================= */

const selectStars =
    document.querySelectorAll(
        "#selectStars button"
    );

const selectedRating =
    document.getElementById(
        "selectedRating"
    );


selectStars.forEach(star => {

    star.addEventListener(
        "click",
        () => {

            const rating =
                Number(
                    star.dataset.rating
                );


            if (selectedRating) {

                selectedRating.value =
                    rating;

            }


            selectStars.forEach(
                button => {

                    const buttonRating =
                        Number(
                            button.dataset.rating
                        );


                    button.classList.toggle(
                        "selected",
                        buttonRating <= rating
                    );

                }
            );

        }
    );

});


/* =========================================================
   REVIEW FORM
========================================================= */

const reviewForm =
    document.getElementById(
        "reviewForm"
    );

const reviewSuccess =
    document.getElementById(
        "reviewSuccess"
    );


if (reviewForm) {

    reviewForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const name =
                document.getElementById(
                    "reviewName"
                ).value.trim();


            const message =
                document.getElementById(
                    "reviewMessage"
                ).value.trim();


            const rating =
                Number(
                    document.getElementById(
                        "selectedRating"
                    ).value
                );


            /*
               Make sure a star rating
               has been selected.
            */

            if (rating === 0) {

                alert(
                    "Please select a star rating."
                );

                return;

            }


            /*
               Create a new review card.
            */

            const reviewCard =
                document.createElement(
                    "article"
                );

            reviewCard.className =
                "review-card";


            let starsHTML = "";

            for (
                let i = 1;
                i <= 5;
                i++
            ) {

                if (i <= rating) {

                    starsHTML +=
                        '<i class="fa-solid fa-star"></i>';

                } else {

                    starsHTML +=
                        '<i class="fa-regular fa-star"></i>';

                }

            }


            const firstLetter =
                name.charAt(0).toUpperCase();


            reviewCard.innerHTML = `

                <div class="review-top">

                    <div class="review-stars">

                        ${starsHTML}

                    </div>

                    <span class="review-date">
                        Just now
                    </span>

                </div>


                <p class="review-text">
                    ${message}
                </p>


                <div class="review-author">

                    <div class="review-avatar">
                        ${firstLetter}
                    </div>

                    <div>

                        <strong>
                            ${name}
                        </strong>

                        <span>
                            Customer
                        </span>

                    </div>

                    <i class="fa-solid fa-circle-check"></i>

                </div>

            `;


            const reviewsGrid =
                document.getElementById(
                    "reviewsGrid"
                );


            if (reviewsGrid) {

                reviewsGrid.prepend(
                    reviewCard
                );

            }


            /*
               Show confirmation.
            */

            if (reviewSuccess) {

                reviewSuccess.classList.add(
                    "show"
                );

            }


            reviewForm.reset();


            if (selectedRating) {

                selectedRating.value = 0;

            }


            selectStars.forEach(
                button => {

                    button.classList.remove(
                        "selected"
                    );

                }
            );


            setTimeout(() => {

                if (reviewSuccess) {

                    reviewSuccess.classList.remove(
                        "show"
                    );

                }

            }, 5000);

        }
    );

}
/* =========================================================
   CANNA PLUG — WORKING CART SYSTEM
========================================================= */

let cart = JSON.parse(
    localStorage.getItem("cannaPlugCart")
) || [];


/* =========================================================
   SAVE CART
========================================================= */

function saveCart() {

    localStorage.setItem(
        "cannaPlugCart",
        JSON.stringify(cart)
    );

    updateCartCount();

}


/* =========================================================
   UPDATE CART COUNT
========================================================= */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");

    if (!cartCount) return;

    const totalItems =
        cart.reduce(
            (total, item) =>
                total + Number(item.quantity),
            0
        );

    cartCount.textContent = totalItems;

}


/* =========================================================
   ADD PRODUCT TO CART
========================================================= */

function addToCart(product) {

    if (!product) return;

    const productId =
        Number(product.id);

    const existingProduct =
        cart.find(
            item =>
                Number(item.id) === productId
        );


    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({

            id: productId,

            name: product.name,

            price:
                Number(product.price),

            image:
                product.image || "",

            quantity: 1

        });

    }


    saveCart();

    renderCart();

    showCartMessage(
        `${product.name} added to cart`
    );

}


/* =========================================================
   REMOVE PRODUCT
========================================================= */

function removeFromCart(id) {

    cart =
        cart.filter(
            item =>
                Number(item.id) !== Number(id)
        );

    saveCart();

    renderCart();

}


/* =========================================================
   CHANGE QUANTITY
========================================================= */

function changeQuantity(id, change) {

    const product =
        cart.find(
            item =>
                Number(item.id) === Number(id)
        );

    if (!product) return;


    product.quantity += change;


    if (product.quantity <= 0) {

        removeFromCart(id);

        return;

    }


    saveCart();

    renderCart();

}


/* =========================================================
   RENDER CART
========================================================= */

function renderCart() {

    const cartItems =
        document.getElementById(
            "cartItems"
        );

    const emptyCart =
        document.getElementById(
            "emptyCart"
        );

    const cartSubtotal =
        document.getElementById(
            "cartSubtotal"
        );

    const cartTotal =
        document.getElementById(
            "cartTotal"
        );

    const cartItemCount =
        document.getElementById(
            "cartItemCount"
        );


    if (!cartItems) return;


    /* EMPTY CART */

    if (cart.length === 0) {

        cartItems.innerHTML = "";

        if (emptyCart) {

            emptyCart.style.display =
                "block";

        }

        if (cartSubtotal) {

            cartSubtotal.textContent =
                "R0.00";

        }

        if (cartTotal) {

            cartTotal.textContent =
                "R0.00";

        }

        if (cartItemCount) {

            cartItemCount.textContent =
                "0 items";

        }

        return;

    }


    /* CART HAS PRODUCTS */

    if (emptyCart) {

        emptyCart.style.display =
            "none";

    }


    let subtotal = 0;

    let totalItems = 0;


    cartItems.innerHTML =
        cart.map(item => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * quantity;


            subtotal += itemTotal;

            totalItems += quantity;


            return `

                <div class="cart-item">

                    <div class="cart-item-image">

                        ${
                            item.image
                                ? `
                                    <img
                                        src="${item.image}"
                                        alt="${item.name}"
                                    >
                                  `
                                : `
                                    <div class="cart-placeholder">
                                        <i class="fa-solid fa-bag-shopping"></i>
                                    </div>
                                  `
                        }

                    </div>


                    <div class="cart-item-info">

                        <h3>
                            ${item.name}
                        </h3>

                        <p>
                            R${price.toFixed(2)}
                        </p>

                        <span class="cart-item-price">

                            R${itemTotal.toFixed(2)}

                        </span>


                        <button
                            class="remove-item"
                            data-remove="${item.id}"
                            type="button">

                            Remove

                        </button>

                    </div>


                    <div class="cart-item-controls">

                        <button
                            class="quantity-button"
                            data-minus="${item.id}"
                            type="button">

                            −

                        </button>


                        <span class="quantity-value">

                            ${quantity}

                        </span>


                        <button
                            class="quantity-button"
                            data-plus="${item.id}"
                            type="button">

                            +

                        </button>

                    </div>

                </div>

            `;

        }).join("");


    /* UPDATE TOTALS */

    if (cartSubtotal) {

        cartSubtotal.textContent =
            `R${subtotal.toFixed(2)}`;

    }


    if (cartTotal) {

        cartTotal.textContent =
            `R${subtotal.toFixed(2)}`;

    }


    if (cartItemCount) {

        cartItemCount.textContent =
            `${totalItems} ${
                totalItems === 1
                    ? "item"
                    : "items"
            }`;

    }


    /* =====================================================
       PLUS BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-plus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        button.dataset.plus,
                        1
                    );

                }
            );

        });


    /* =====================================================
       MINUS BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-minus]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    changeQuantity(
                        button.dataset.minus,
                        -1
                    );

                }
            );

        });


    /* =====================================================
       REMOVE BUTTONS
    ===================================================== */

    document
        .querySelectorAll("[data-remove]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    removeFromCart(
                        button.dataset.remove
                    );

                }
            );

        });

}


/* =========================================================
   SHOP BUTTONS
========================================================= */

document
    .querySelectorAll(".add-to-cart")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const product = {

                    id:
                        Number(
                            button.dataset.id
                        ),

                    name:
                        button.dataset.name,

                    price:
                        Number(
                            button.dataset.price
                                .replace("R", "")
                        ),

                    image:
                        button.dataset.image || ""

                };


                addToCart(product);

            }
        );

    });


/* =========================================================
   CART NOTIFICATION
========================================================= */

function showCartMessage(message) {

    let notification =
        document.getElementById(
            "cartNotification"
        );


    if (!notification) {

        notification =
            document.createElement(
                "div"
            );

        notification.id =
            "cartNotification";

        notification.style.position =
            "fixed";

        notification.style.bottom =
            "25px";

        notification.style.right =
            "25px";

        notification.style.zIndex =
            "99999";

        notification.style.padding =
            "14px 18px";

        notification.style.border =
            "1px solid rgba(159,207,103,.3)";

        notification.style.borderRadius =
            "8px";

        notification.style.background =
            "#101310";

        notification.style.color =
            "#9fcf67";

        notification.style.fontSize =
            "11px";

        notification.style.fontWeight =
            "600";

        notification.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.4)";

        document.body.appendChild(
            notification
        );

    }


    notification.textContent =
        message;

    notification.style.opacity =
        "1";


    clearTimeout(
        notification.hideTimer
    );


    notification.hideTimer =
        setTimeout(() => {

            notification.style.opacity =
                "0";

        }, 2500);

}


/* =========================================================
   START CART
========================================================= */

updateCartCount();

renderCart();
/* =========================================================
   STEP 12 — CHECKOUT SYSTEM
========================================================= */

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutSubtotal =
    document.getElementById("checkoutSubtotal");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const checkoutSuccess =
    document.getElementById("checkoutSuccess");


/* =========================================================
   DISPLAY CHECKOUT ITEMS
========================================================= */

function renderCheckout() {

   /*
   Get the latest cart from localStorage.
*/

const checkoutCart =
    JSON.parse(
        localStorage.getItem("cannaPlugCart")
    ) || [];


    /*
       If checkout elements don't exist,
       we're not on checkout.html.
    */

    if (!checkoutItems) return;


    /*
       Empty cart protection.
    */

    if (checkoutCart.length === 0) {

        checkoutItems.innerHTML = `

            <div class="checkout-empty">

                <i class="fa-solid fa-bag-shopping"></i>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add products before continuing
                    to checkout.
                </p>

                <a href="shop.html"
                   class="btn btn-primary">

                    Browse Shop

                    <i class="fa-solid fa-arrow-right"></i>

                </a>

            </div>

        `;


        if (checkoutSubtotal) {

            checkoutSubtotal.textContent =
                "R0.00";

        }


        if (checkoutTotal) {

            checkoutTotal.textContent =
                "R0.00";

        }


        return;

    }


    /*
       Calculate subtotal.
    */

    let subtotal = 0;


    /*
       Display products.
    */

    checkoutItems.innerHTML =
        checkoutCart.map(item => {

            const price =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemTotal =
                price * quantity;


            subtotal += itemTotal;


            return `

                <div class="checkout-item">

                    <div class="checkout-item-info">

                        <strong>
                            ${item.name}
                        </strong>

                        <span>
                            Qty: ${quantity}
                        </span>

                    </div>


                    <strong>
                        R${itemTotal.toFixed(2)}
                    </strong>

                </div>

            `;

        }).join("");


    /*
       Update totals.
    */

    if (checkoutSubtotal) {

        checkoutSubtotal.textContent =
            `R${subtotal.toFixed(2)}`;

    }


    if (checkoutTotal) {

        checkoutTotal.textContent =
    `R${subtotal.toFixed(2)}`;
    }

}


/* =========================================================
   START CHECKOUT
========================================================= */

renderCheckout();
/* =========================================================
   CANNA PLUG — SUPABASE CHECKOUT
========================================================= */


if (checkoutForm) {

    checkoutForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const placeOrderButton =
            document.getElementById("placeOrderButton");

        const checkoutSuccess =
            document.getElementById("checkoutSuccess");


        /* ---------------------------------------------
           GET CUSTOMER INFORMATION
        --------------------------------------------- */

        const customerName =
            document.getElementById("checkoutName").value.trim();

        const customerPhone =
            document.getElementById("checkoutPhone").value.trim();

        const customerEmail =
            document.getElementById("checkoutEmail").value.trim();

        const customerAddress =
            document.getElementById("checkoutAddress").value.trim();

        const customerCity =
            document.getElementById("checkoutCity").value.trim();

        const customerPostal =
            document.getElementById("checkoutPostal").value.trim();

        const customerNotes =
            document.getElementById("checkoutNotes").value.trim();


        /* ---------------------------------------------
           CHECK CART
        --------------------------------------------- */

        if (!cart || cart.length === 0) {

            alert(
                "Your cart is empty. Please add a product before checking out."
            );

            window.location.href = "shop.html";

            return;

        }


        /* ---------------------------------------------
           CALCULATE ORDER TOTAL
        --------------------------------------------- */

        let orderTotal = 0;

        cart.forEach(item => {

            orderTotal +=
                Number(item.price) *
                Number(item.quantity);

        });


        /* ---------------------------------------------
           CREATE ORDER NUMBER
        --------------------------------------------- */

        const orderNumber =
            "CP-" +
            Date.now();


        /* ---------------------------------------------
           PREPARE ORDER ITEMS
        --------------------------------------------- */

        const orderItems =
            cart.map(item => {

                return `${item.name} x ${item.quantity}`;

            }).join(", ");


        /* ---------------------------------------------
           DISABLE BUTTON
        --------------------------------------------- */

        if (placeOrderButton) {

            placeOrderButton.disabled = true;

            placeOrderButton.innerHTML = `
                <i class="fa-solid fa-spinner fa-spin"></i>
                Processing Order...
            `;

        }

/* ---------------------------------------------
   SEND ORDER TO SUPABASE
--------------------------------------------- */

if (!db) {

    alert(
        "The order system is currently unavailable. Please try again."
    );

    if (placeOrderButton) {

        placeOrderButton.disabled = false;

        placeOrderButton.innerHTML = `
            Place Order
            <i class="fa-solid fa-arrow-right"></i>
        `;

    }

    return;

}

 const { data, error } =
    await db
        .from("orders for cannaplug")
        .insert([
            {
                order_number: orderNumber,
                customer_name: customerName,
                customer_email: customerEmail,
                customer_phone: customerPhone,
                customer_address: `${customerAddress}, ${customerCity}`,
                order_items: orderItems,
                customer_postal: customerPostal,
                order_total: `R${orderTotal.toFixed(2)}`,
                order_notes: customerNotes,
                status: "pending"
            }
        ]);

        /* ---------------------------------------------
           HANDLE ERROR
        --------------------------------------------- */

        if (error) {

            console.error(
                "Supabase order error:",
                error
            );

            alert(
                "We couldn't submit your order. Please try again."
            );


            if (placeOrderButton) {

                placeOrderButton.disabled = false;

                placeOrderButton.innerHTML = `
                    Place Order
                    <i class="fa-solid fa-arrow-right"></i>
                `;

            }

            return;

        }


        /* ---------------------------------------------
           ORDER SUCCESS
        --------------------------------------------- */

        console.log(
            "Order successfully created:",
            data
        );


        /* Show order information */

        const successOrderNumber =
            document.getElementById(
                "successOrderNumber"
            );

        const successCustomerName =
            document.getElementById(
                "successCustomerName"
            );

        const successCustomerEmail =
            document.getElementById(
                "successCustomerEmail"
            );

        const successOrderTotal =
            document.getElementById(
                "successOrderTotal"
            );


        if (successOrderNumber) {

            successOrderNumber.textContent =
                orderNumber;

        }


        if (successCustomerName) {

            successCustomerName.textContent =
                customerName;

        }


        if (successCustomerEmail) {

            successCustomerEmail.textContent =
                customerEmail;

        }


        if (successOrderTotal) {

            successOrderTotal.textContent =
                `R${orderTotal.toFixed(2)}`;

        }



        /* ---------------------------------------------
           SHOW SUCCESS MESSAGE
        --------------------------------------------- */

        if (checkoutSuccess) {

            checkoutSuccess.classList.add("show");

        }


        /* ---------------------------------------------
           CLEAR CART
        --------------------------------------------- */

        cart = [];

        localStorage.removeItem(
            "cannaPlugCart"
        );

        updateCartCount();


 /* ---------------------------------------------
   SHOW ORDER CONFIRMATION
--------------------------------------------- */

if (checkoutSuccess) {

    checkoutSuccess.classList.add("show");

    checkoutSuccess.scrollIntoView({
        behavior: "smooth",
        block: "center"
        });

      }

    });

} 