// ---------------- LOGIN ------------------
let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

if (!loggedUser) {
  window.location.href = "login.html";
} else {
  document.getElementById(
    "welcomeText"
  ).innerHTML = `Welcome, <strong>${loggedUser.name}</strong>`;
  document.getElementById("logoutBtn").style.display = "inline-block";
}

document.getElementById("logoutBtn").addEventListener("click", function () {
  localStorage.removeItem("loggedUser");
  window.location.href = "login.html";
});

// ---------------- POSTS ------------------
let allPosts = JSON.parse(localStorage.getItem("post")) || [];
let editingPostId = null;

// Modals
const modal = document.getElementById("modal");
const closeCreateBtn = document.querySelectorAll("#closeCreateBtn");

// ---------------- SEARCH ----------------
let searchValue = "";
const searchInput = document.getElementById("searchInput");

if (searchInput) {
  searchInput.addEventListener("input", function () {
    searchValue = this.value.toLowerCase();
    renderAll();
  });
}

function filterByTitle(posts) {
  return posts.filter((p) => p.title.toLowerCase().includes(searchValue));
}

// ---------------- SORTING ----------------
let sortValue = "latest";

const sortSelect = document.getElementById("sortSelect");
if (sortSelect) {
  sortSelect.addEventListener("change", function () {
    sortValue = this.value;
    renderAll();
  });
}

function sortPosts(posts) {
  return posts.sort((a, b) => {
    if (sortValue === "latest") return b.id - a.id;
    if (sortValue === "oldest") return a.id - b.id;
    if (sortValue === "liked") return b.likes.length - a.likes.length;
  });
}

// ---------------- CREATE POST ----------------
function openCreatePostModal() {
  modal.style.display = "flex";
}

closeCreateBtn.forEach((btn) => btn.addEventListener("click", resetModal));

function postModal() {
  let postTitle = document.getElementById("postTitle").value.trim();
  let postDescription = document.getElementById("postDescription").value.trim();
  let postImage = document.getElementById("postImage").value;

  if (!postTitle || !postDescription) {
    Swal.fire({
      text: "Please enter title and description!",
      icon: "question",
    });
    return;
  }

  if (editingPostId) {
    allPosts = allPosts.map((p) =>
      p.id === editingPostId
        ? { ...p, title: postTitle, desc: postDescription, image: postImage }
        : p
    );
    editingPostId = null;
  } else {
    allPosts.push({
      id: Date.now(),
      userEmail: loggedUser.email,
      userName: loggedUser.name,
      title: postTitle,
      desc: postDescription,
      image: postImage,
      time: new Date().toLocaleString(),
      likes: [],
      comments: [],
    });
  }

  localStorage.setItem("post", JSON.stringify(allPosts));
  resetModal();
  renderAll();
}

function resetModal() {
  document.getElementById("postTitle").value = "";
  document.getElementById("postDescription").value = "";
  document.getElementById("postImage").value = "";
  document.getElementById("modalHeading").innerText = "Create Post";
  document.getElementById("postBtn").innerText = "Post";
  modal.style.display = "none";
}

// ---------------- DASHBOARD POSTS ----------------
const postContainer = document.querySelector(".postContainer");

function loadDashboardPosts() {
  if (!postContainer) return;

  let posts = allPosts.filter((p) => p.userEmail === loggedUser.email);
  posts = sortPosts(filterByTitle(posts));

  postContainer.innerHTML = posts
    .map(
      (post) => `
        <div class="postDiv">
            <img class="postImage" src="${post.image}">
            <div class="postContentDiv">

                <div class="postTitleContainer">
                    <div class="userPostName">
                        <h4>${post.userName}</h4>
                        <p>${post.time}</p>
                    </div>

                    <div class="postBtnContainer">
                        <button class="postEditBtn" onclick="onePostEdit(${
                          post.id
                        })">Edit</button>
                        <button class="postDeleteBtn" onclick="onePostDelete(${
                          post.id
                        })">Delete</button>
                    </div>
                </div>

                <h4 class="postTitle">${post.title}</h4>
                <p class="descriptionDiv">${post.desc}</p>

                <div class="postReactContainer">
                    <div class="likeWrapper" onclick="toggleLike(${
                      post.id
                    }, this)">
                        <i class="${
                          post.likes.includes(loggedUser.email)
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"></i>
                        <span class="likeCount">${post.likes.length}</span>
                    </div>

                    <button class="commentBtn" onclick="openCommentModal(${
                      post.id
                    })">
                        <i class="fa-regular fa-comment"></i>
                        <span class="commentCount">${
                          post.comments.length
                        }</span>
                    </button>
                </div>

            </div>
        </div>
    `
    )
    .join("");
}

// ---------------- HOME PAGE POSTS ----------------
function loadAllPosts() {
  const homeContainer = document.querySelector(".allPostContainer");
  if (!homeContainer) return;

  let posts = sortPosts(filterByTitle(allPosts));

  homeContainer.innerHTML = posts
    .map(
      (post) => `
        <div class="postDiv">
            <img class="postImage" src="${post.image}">
            <div class="postContentDiv">

                <div class="postTitleContainer">
                    <div class="userPostName">
                        <h4>${post.userName}</h4>
                        <p>${post.time}</p>
                    </div>

                    <div class="postBtnContainer">
                        ${
                          post.userEmail === loggedUser.email
                            ? `<button class="postDeleteBtn" onclick="onePostDelete(${post.id})">Delete</button>`
                            : ""
                        }
                    </div>
                </div>

                <h4 class="postTitle">${post.title}</h4>
                <p class="descriptionDiv">${post.desc}</p>

                <div class="postReactContainer">
                    <div class="likeWrapper" onclick="toggleLike(${
                      post.id
                    }, this)">
                        <i class="${
                          post.likes.includes(loggedUser.email)
                            ? "fa-solid"
                            : "fa-regular"
                        } fa-heart"></i>
                        <span class="likeCount">${post.likes.length}</span>
                    </div>

                    <button class="commentBtn" onclick="openCommentModal(${
                      post.id
                    })">
                        <i class="fa-regular fa-comment"></i>
                        <span class="commentCount">${
                          post.comments.length
                        }</span>
                    </button>
                </div>

            </div>
        </div>
    `
    )
    .join("");
}

// ---------------- DELETE POST ----------------
function onePostDelete(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true, // <-- ye add karein
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      // POST DELETE LOGIC YAHAN HI
      allPosts = allPosts.filter((p) => p.id !== id);
      localStorage.setItem("post", JSON.stringify(allPosts));
      renderAll();

      Swal.fire({
        title: "Deleted!",
        text: "Your post has been deleted.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    // Agar cancel pe click hua to kuch nahi hoga
  });
}

// ---------------- EDIT POST ----------------
function onePostEdit(id) {
  const p = allPosts.find((p) => p.id === id);
  editingPostId = id;

  document.getElementById("postTitle").value = p.title;
  document.getElementById("postDescription").value = p.desc;
  document.getElementById("postImage").value = p.image;

  document.getElementById("modalHeading").innerText = "Edit Post";
  document.getElementById("postBtn").innerText = "Save";
  modal.style.display = "flex";
}

// ---------------- LIKE SYSTEM ----------------
function toggleLike(id, el) {
  let post = allPosts.find((p) => p.id === id);
  let index = post.likes.indexOf(loggedUser.email);

  if (index === -1) post.likes.push(loggedUser.email);
  else post.likes.splice(index, 1);

  localStorage.setItem("post", JSON.stringify(allPosts));
  renderAll();
}

// ---------------- COMMENTS SYSTEM ----------------
let currentPostId = null;
const commentModal = document.getElementById("commentModal");
const modalList = document.querySelector(".modalCommentList");

function openCommentModal(id) {
  currentPostId = id;
  commentModal.style.display = "flex";
  loadComments(id);
}

function closeCommentModal() {
  commentModal.style.display = "none";
}

function loadComments(id) {
  let post = allPosts.find((p) => p.id === id);
  modalList.innerHTML = post.comments
    .map(
      (c, i) => `
        <div class="singleModalComment">
            <div class="commentHeader">
                <div class="commentUserName">
                    <strong>${c.user}</strong>
                    <small>${c.time}</small>
                    ${
                      c.user === loggedUser.name
                        ? `<button onclick="deleteComment(${id}, ${i})" class="commentDeleteBtn">Delete</button>`
                        : ""
                    }
                </div>
            </div>
            <p>${c.text}</p>
        </div>
    `
    )
    .join("");
}

function commentAddBtn() {
  const input = document.querySelector(".modalInput");
  let text = input.value.trim();
  if (!text) return;

  let post = allPosts.find((p) => p.id === currentPostId);

  post.comments.push({
    user: loggedUser.name,
    text: text,
    time: new Date().toLocaleString(),
  });

  input.value = "";
  localStorage.setItem("post", JSON.stringify(allPosts));

  loadComments(currentPostId);
  renderAll();
}

function deleteComment(postId, i) {
  let post = allPosts.find((p) => p.id === postId);
  post.comments.splice(i, 1);

  localStorage.setItem("post", JSON.stringify(allPosts));
  loadComments(postId);
  renderAll();
}

// ---------------- RENDER ALL ----------------
function renderAll() {
  loadDashboardPosts();
  loadAllPosts();
}

// ---------------- INITIAL LOAD ----------------
renderAll();



