// Responsive behavior for blog sections
document.querySelectorAll('section').forEach(section => {
    const toggleButton = section.querySelector('.toggle-button');
    const content = section.querySelector('.section-content');

    toggleButton.addEventListener('click', () => {
        content.classList.toggle('show');
    });
});




// Mock data (may replace with actual API calls)
const blogPosts = [
    { title: 'My First Blog Post', content: 'Lorem ipsum dolor sit amet...' },
    // Add more posts here
];

// Function to render blog posts
function renderBlogPosts() {
    const main = document.querySelector('main');
    main.innerHTML = ''; // Clear existing content

    blogPosts.forEach(post => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${post.title}</h5>
                <p class="card-text">${post.content}</p>
            </div>
        `;
        main.appendChild(card);
    });
}

// script.js
function navigateTo(page) {
    // Redirect to the specified page
    window.location.href = page;
}

// Calls the function to render initial posts
renderBlogPosts();
