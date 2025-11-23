// ========= Global Variables =========
let posts = [];
let users = JSON.parse(localStorage.getItem("users")) || [];

// ========= Dark/Light Mode =========
const themeToggle = document.getElementById("themeToggle");
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

// ========= Signup/Login =========
function signup() {
    let name = document.getElementById("signupName").value.trim();
    let email = document.getElementById("signupEmail").value.trim();
    let pass = document.getElementById("signupPassword").value.trim();


    if (!name || !email || !pass) return alert("Fill all fields!");

    let users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find(function (u) { return u.email === email; })) return alert("Email already registered!");

    users.push({ name: name, email: email, pass: pass, posts: [] });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful!");
    showLogin();


}

function showLogin() {
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

function showSignup() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.remove("hidden");
}

function login() {
    let email = document.getElementById("loginEmail").value.trim();
    let pass = document.getElementById("loginPassword").value.trim();

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(function (u) { return u.email === email && u.pass === pass; });

    if (!user) return alert("Invalid credentials");

    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("currentUserEmail", email);

    loadFeed();


}

function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("currentUserEmail");
    document.getElementById("feedPage").classList.add("hidden");
    document.getElementById("loginPage").classList.remove("hidden");
}

// ========= Load Feed =========
function loadFeed() {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("signupPage").classList.add("hidden");
    document.getElementById("feedPage").classList.remove("hidden");


    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let user = users.find(function (u) { return u.email === currentUserEmail; });
    if (!user) return logout();

    document.getElementById("welcomeUser").innerText = "Welcome, " + user.name;

    posts = user.posts || [];
    showHome();
    displayAllHomePosts(); // Show all users posts on home
    displayPosts(posts, true); // Show dashboard posts


}

// Auto login
if (localStorage.getItem("loggedIn") === "true") {
    loadFeed();
}

// ========= Show Sections =========
function showHome() {
    document.getElementById("homeSection").classList.remove("hidden");
    document.getElementById("dashboardSection").classList.add("hidden");
}

function showDashboard() {
    document.getElementById("homeSection").classList.add("hidden");
    document.getElementById("dashboardSection").classList.remove("hidden");
}

// ========= Modal =========
function openModal() {
    document.getElementById("postModal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("postModal").classList.add("hidden");
}

// ========= Save Posts =========
function savePosts() {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let userIndex = users.findIndex(function (u) { return u.email === currentUserEmail; });


    if (userIndex !== -1) {
        users[userIndex].posts = posts;
        localStorage.setItem("users", JSON.stringify(users));
    }


}

// ========= Posts =========
function createPostFromModal() {
    let text = document.getElementById("modalPostText").value.trim();
    let img = document.getElementById("modalPostImage").value.trim();
    if (!text) return alert("Write something!");


    let post = {
        id: Date.now(),
        text: text,
        img: img,
        liked: false,
        likes: 0,
        time: new Date().toLocaleString()
    };

    posts.unshift(post);
    savePosts();
    displayPosts(posts, true); // Dashboard
    displayAllHomePosts(); // Home

    document.getElementById("modalPostText").value = "";
    document.getElementById("modalPostImage").value = "";
    closeModal();


}

function displayPosts(list, isDashboard) {
    if (isDashboard === undefined) isDashboard = false;
    let dashboardContainer = document.getElementById("dashboardPosts");
    dashboardContainer.innerHTML = "";


    list.forEach(function (post) {
        let editDeleteButtons = "";
        if (isDashboard) {
            editDeleteButtons = "<button onclick='editPost(" + post.id + ")'>Edit</button>" +
                "<button onclick='deletePost(" + post.id + ")'>Delete</button>";
        }

        let postHTML = "<div class='post'>" +
            "<p>" + post.text + "</p>" +
            (post.img ? "<img src='" + post.img + "'>" : "") +
            "<small>" + post.time + "</small>" +
            "<div class='post-footer'>" +
            "<span class='like-btn " + (post.liked ? "liked" : "") + "' onclick='toggleLike(" + post.id + ", " + isDashboard + ")'>❤️ " + post.likes + "</span>" +
            editDeleteButtons +
            "</div></div>";

        if (isDashboard) dashboardContainer.innerHTML += postHTML;
    });


}

// Show all posts on home page (all users)
function displayAllHomePosts() {
    let homeContainer = document.getElementById("postsContainer");
    homeContainer.innerHTML = "";


    let users = JSON.parse(localStorage.getItem("users")) || [];
    let allPosts = [];
    users.forEach(function (u) { allPosts = allPosts.concat(u.posts); });

    allPosts.sort(function (a, b) { return b.id - a.id; });

    allPosts.forEach(function (post) {
        let postHTML = "<div class='post'>" +
            "<p>" + post.text + "</p>" +
            (post.img ? "<img src='" + post.img + "'>" : "") +
            "<small>" + post.time + "</small>" +
            "<div class='post-footer'>" +
            "<span class='like-btn " + (post.liked ? "liked" : "") + "' onclick='toggleLike(" + post.id + ", false)'>❤️ " + post.likes + "</span>" +
            "</div></div>";
        homeContainer.innerHTML += postHTML;
    });


}

// ========= Likes, Edit, Delete =========
function toggleLike(id, isDashboard) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let userIndex = users.findIndex(function (u) { return u.email === currentUserEmail; });


    if (userIndex === -1) return;

    let postIndex = users[userIndex].posts.findIndex(function (p) { return p.id === id; });
    if (postIndex !== -1) {
        let post = users[userIndex].posts[postIndex];
        post.liked = !post.liked;
        post.likes = post.liked ? 1 : 0;
        localStorage.setItem("users", JSON.stringify(users));
    } else {
        users.forEach(function (u) {
            let p = u.posts.find(function (p) { return p.id === id; });
            if (p) { p.liked = !p.liked; p.likes = p.liked ? 1 : 0; }
        });
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (isDashboard) displayPosts(users[userIndex].posts, true);
    displayAllHomePosts();


}

function deletePost(id) {
    if (!confirm("Delete this post?")) return;


    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let userIndex = users.findIndex(function (u) { return u.email === currentUserEmail; });

    if (userIndex !== -1) {
        users[userIndex].posts = users[userIndex].posts.filter(function (p) { return p.id !== id; });
        localStorage.setItem("users", JSON.stringify(users));
        posts = users[userIndex].posts;
        displayPosts(posts, true);
        displayAllHomePosts();
    }


}

function editPost(id) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let userIndex = users.findIndex(function (u) { return u.email === currentUserEmail; });
    if (userIndex === -1) return;


    let post = users[userIndex].posts.find(function (p) { return p.id === id; });
    if (!post) return;

    let newText = prompt("Edit your post text:", post.text);
    let newImg = prompt("Edit Image URL (leave empty if none):", post.img);

    if (newText !== null) post.text = newText.trim();
    if (newImg !== null) post.img = newImg.trim();

    localStorage.setItem("users", JSON.stringify(users));
    posts = users[userIndex].posts;
    displayPosts(posts, true);
    displayAllHomePosts();


}

// ========= Search & Sort =========
function searchPosts() {
    let word = document.getElementById("searchInput").value.toLowerCase();
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let user = users.find(function (u) { return u.email === currentUserEmail; });
    if (!user) return;


    let filtered = user.posts.filter(function (p) { return p.text.toLowerCase().includes(word); });
    displayPosts(filtered, true);


}

function sortPosts() {
    let type = document.getElementById("sortSelect").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUserEmail = localStorage.getItem("currentUserEmail");
    let user = users.find(function (u) { return u.email === currentUserEmail; });
    if (!user) return;


    let sortedPosts = user.posts.slice();
    if (type === "latest") sortedPosts.sort(function (a, b) { return b.id - a.id; });
    if (type === "oldest") sortedPosts.sort(function (a, b) { return a.id - b.id; });
    if (type === "liked") sortedPosts.sort(function (a, b) { return b.likes - a.likes; });

    displayPosts(sortedPosts, true);


}

