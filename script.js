// =========================================================
// MILLER JOURNAL v3
// =========================================================


document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------------------------------
    // ELEMENTS
    // -----------------------------------------------------

    const body =
        document.body;

    const themeToggle =
        document.getElementById("theme-toggle");

    const surpriseButton =
        document.getElementById("surprise-button");

    const heroSurpriseButton =
        document.getElementById("hero-surprise-button");

    const searchInput =
        document.getElementById("post-search");

    const filterButtons =
        Array.from(
            document.querySelectorAll(
                ".filter-button"
            )
        );

    const postCards =
        Array.from(
            document.querySelectorAll(
                ".post-card"
            )
        );

    const bookmarkButtons =
        Array.from(
            document.querySelectorAll(
                ".bookmark-button"
            )
        );

    const noResults =
        document.getElementById("no-results");

    const newsletterForm =
        document.getElementById(
            "newsletter-form"
        );

    const newsletterEmail =
        document.getElementById(
            "newsletter-email"
        );

    const newsletterMessage =
        document.getElementById(
            "newsletter-message"
        );

    const backToTop =
        document.getElementById(
            "back-to-top"
        );

    const readingProgress =
        document.getElementById(
            "reading-progress"
        );

    const currentYear =
        document.getElementById(
            "current-year"
        );


    // -----------------------------------------------------
    // YEAR
    // -----------------------------------------------------

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    // -----------------------------------------------------
    // THEME
    // -----------------------------------------------------

    const savedTheme =
        localStorage.getItem(
            "millerJournalTheme"
        );


    if (savedTheme === "light") {

        body.classList.add(
            "light-theme"
        );

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                body.classList.toggle(
                    "light-theme"
                );


                const mode =
                    body.classList.contains(
                        "light-theme"
                    )
                        ? "light"
                        : "dark";


                localStorage.setItem(
                    "millerJournalTheme",
                    mode
                );

            }
        );

    }


    // -----------------------------------------------------
    // SURPRISE ME
    // -----------------------------------------------------

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

        const index =
            Math.floor(
                Math.random() *
                surpriseLinks.length
            );


        window.location.href =
            surpriseLinks[index];

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


    // -----------------------------------------------------
    // FILTER + SEARCH
    // -----------------------------------------------------

    let activeFilter = "all";


    function filterPosts() {

        if (!postCards.length) {
            return;
        }


        const term =
            searchInput
                ? searchInput.value
                    .trim()
                    .toLowerCase()
                : "";


        let visible = 0;


        postCards.forEach(card => {

            const category =
                card.dataset.category || "";

            const searchText =
                (
                    card.dataset.search +
                    " " +
                    card.textContent
                ).toLowerCase();


            const categoryMatch =
                activeFilter === "all" ||
                category === activeFilter;


            const searchMatch =
                !term ||
                searchText.includes(term);


            const show =
                categoryMatch &&
                searchMatch;


            card.classList.toggle(
                "hidden",
                !show
            );


            if (show) {
                visible++;
            }

        });


        if (noResults) {

            noResults.classList.toggle(
                "hidden",
                visible > 0
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

        button.addEventListener(
            "click",
            () => {

                filterButtons.forEach(
                    item =>
                        item.classList.remove(
                            "active"
                        )
                );


                button.classList.add(
                    "active"
                );


                activeFilter =
                    button.dataset.filter;


                filterPosts();

            }
        );

    });


    // -----------------------------------------------------
    // BOOKMARKS
    // -----------------------------------------------------

    function getBookmarks() {

        try {

            return JSON.parse(
                localStorage.getItem(
                    "millerJournalBookmarks"
                )
            ) || [];

        } catch (error) {

            return [];

        }

    }


    function saveBookmarks(bookmarks) {

        localStorage.setItem(
            "millerJournalBookmarks",
            JSON.stringify(bookmarks)
        );

    }


    function updateBookmarks() {

        const bookmarks =
            getBookmarks();


        bookmarkButtons.forEach(button => {

            const id =
                button.dataset.bookmark;


            const saved =
                bookmarks.includes(id);


            button.classList.toggle(
                "saved",
                saved
            );


            button.textContent =
                saved ? "♥" : "♡";

        });

    }


    bookmarkButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const id =
                    button.dataset.bookmark;


                let bookmarks =
                    getBookmarks();


                if (
                    bookmarks.includes(id)
                ) {

                    bookmarks =
                        bookmarks.filter(
                            item => item !== id
                        );

                } else {

                    bookmarks.push(id);

                }


                saveBookmarks(bookmarks);

                updateBookmarks();

            }
        );

    });


    updateBookmarks();


    // -----------------------------------------------------
    // NEWSLETTER DEMO
    // -----------------------------------------------------

    if (
        newsletterForm &&
        newsletterEmail &&
        newsletterMessage
    ) {

        newsletterForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const email =
                    newsletterEmail.value
                        .trim();


                if (!email) {
                    return;
                }


                newsletterMessage.textContent =
                    "You're in. Welcome to Miller Journal.";


                newsletterForm.reset();


                setTimeout(
                    () => {

                        newsletterMessage.textContent =
                            "";

                    },
                    5000
                );

            }
        );

    }


    // -----------------------------------------------------
    // SCROLL UI
    // -----------------------------------------------------

    function updateScrollUI() {

        const scrollTop =
            window.scrollY ||
            document.documentElement
                .scrollTop;


        const scrollableHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        if (readingProgress) {

            const percent =
                scrollableHeight > 0
                    ? (
                        scrollTop /
                        scrollableHeight
                    ) * 100
                    : 0;


            readingProgress.style.width =
                `${percent}%`;

        }


        if (backToTop) {

            backToTop.classList.toggle(
                "visible",
                scrollTop > 500
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateScrollUI,
        {
            passive: true
        }
    );


    updateScrollUI();


    // -----------------------------------------------------
    // BACK TO TOP
    // -----------------------------------------------------

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

});
