// =========================================================
// MILLER JOURNAL
// Shared site interaction
// =========================================================


// ---------------------------------------------------------
// ELEMENTS
// ---------------------------------------------------------

const themeToggle = document.getElementById("theme-toggle");

const surpriseButton =
    document.getElementById("surprise-button");

const heroSurpriseButton =
    document.getElementById("hero-surprise-button");

const searchInput =
    document.getElementById("post-search");

const postCards =
    [...document.querySelectorAll(".post-card")];

const filterButtons =
    [...document.querySelectorAll(".filter-button")];

const noResults =
    document.getElementById("no-results");

const bookmarkButtons =
    [...document.querySelectorAll(".bookmark-button")];

const newsletterForm =
    document.getElementById("newsletter-form");

const newsletterEmail =
    document.getElementById("newsletter-email");

const newsletterMessage =
    document.getElementById("newsletter-message");

const backToTop =
    document.getElementById("back-to-top");

const readingProgress =
    document.getElementById("reading-progress");

const currentYear =
    document.getElementById("current-year");


// ---------------------------------------------------------
// YEAR
// ---------------------------------------------------------

if (currentYear) {
    currentYear.textContent =
        new Date().getFullYear();
}


// ---------------------------------------------------------
// THEME
// ---------------------------------------------------------

const savedTheme =
    localStorage.getItem("millerJournalTheme");

if (savedTheme === "light") {
    document.body.classList.add("light-theme");
}

if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle(
            "light-theme"
        );

        const isLight =
            document.body.classList.contains(
                "light-theme"
            );

        localStorage.setItem(
            "millerJournalTheme",
            isLight ? "light" : "dark"
        );

    });

}


// ---------------------------------------------------------
// SURPRISE ME
// ---------------------------------------------------------

const surpriseLinks = [
    "tech.html#edge-computing",
    "tech.html#ai-edge",
    "tech.html#security",
    "travel.html#kyoto",
    "travel.html#weekend",
    "travel.html#coast",
    "personal.html#focus",
    "personal.html#systems",
    "personal.html#workspace"
];


function surpriseMe() {

    const randomIndex =
        Math.floor(
            Math.random() *
            surpriseLinks.length
        );

    window.location.href =
        surpriseLinks[randomIndex];

}


if (surpriseButton) {
    surpriseButton.addEventListener(
        "click",
        surpriseMe
    );
}


if (heroSurpriseButton) {
    heroSurpriseButton.addEventListener(
        "click",
        surpriseMe
    );
}


// ---------------------------------------------------------
// SEARCH + FILTERING
// ---------------------------------------------------------

let activeFilter = "all";


function filterPosts() {

    if (!postCards.length) {
        return;
    }

    const searchTerm =
        searchInput
            ? searchInput.value
                .trim()
                .toLowerCase()
            : "";

    let visibleCount = 0;


    postCards.forEach(card => {

        const category =
            card.dataset.category || "";

        const searchableText =
            (
                card.dataset.search +
                " " +
                card.textContent
            ).toLowerCase();

        const categoryMatches =
            activeFilter === "all" ||
            category === activeFilter;

        const searchMatches =
            !searchTerm ||
            searchableText.includes(
                searchTerm
            );

        const shouldShow =
            categoryMatches &&
            searchMatches;


        card.classList.toggle(
            "hidden",
            !shouldShow
        );


        if (shouldShow) {
            visibleCount++;
        }

    });


    if (noResults) {

        noResults.classList.toggle(
            "hidden",
            visibleCount !== 0
        );

    }

}


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterPosts
    );

}


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(item => {
            item.classList.remove("active");
        });

        button.classList.add("active");

        activeFilter =
            button.dataset.filter;

        filterPosts();

    });

});


// ---------------------------------------------------------
// BOOKMARKS
// ---------------------------------------------------------

function loadBookmarks() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "millerJournalBookmarks"
            )
        ) || [];

    } catch {

        return [];

    }

}


function saveBookmarks(bookmarks) {

    localStorage.setItem(
        "millerJournalBookmarks",
        JSON.stringify(bookmarks)
    );

}


function updateBookmarkButtons() {

    const bookmarks =
        loadBookmarks();


    bookmarkButtons.forEach(button => {

        const id =
            button.dataset.bookmark;

        const isSaved =
            bookmarks.includes(id);

        button.classList.toggle(
            "saved",
            isSaved
        );

        button.textContent =
            isSaved ? "♥" : "♡";

    });

}


bookmarkButtons.forEach(button => {

    button.addEventListener("click", () => {

        const id =
            button.dataset.bookmark;

        let bookmarks =
            loadBookmarks();


        if (bookmarks.includes(id)) {

            bookmarks =
                bookmarks.filter(
                    item => item !== id
                );

        } else {

            bookmarks.push(id);

        }


        saveBookmarks(bookmarks);

        updateBookmarkButtons();

    });

});


updateBookmarkButtons();


// ---------------------------------------------------------
// NEWSLETTER DEMO
// ---------------------------------------------------------

if (newsletterForm) {

    newsletterForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const email =
                newsletterEmail.value.trim();


            if (!email) {
                return;
            }


            newsletterMessage.textContent =
                "You're on the list. Welcome to Miller Journal.";

            newsletterForm.reset();


            window.setTimeout(() => {

                newsletterMessage.textContent =
                    "";

            }, 5000);

        }
    );

}


// ---------------------------------------------------------
// READING PROGRESS
// ---------------------------------------------------------

function updateScrollUI() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement
            .scrollHeight -
        window.innerHeight;


    if (readingProgress) {

        const progress =
            documentHeight > 0
                ? (
                    scrollTop /
                    documentHeight
                ) * 100
                : 0;

        readingProgress.style.width =
            `${progress}%`;

    }


    if (backToTop) {

        backToTop.classList.toggle(
            "visible",
            scrollTop > 600
        );

    }

}


window.addEventListener(
    "scroll",
    updateScrollUI,
    { passive: true }
);


updateScrollUI();


// ---------------------------------------------------------
// BACK TO TOP
// ---------------------------------------------------------

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}
