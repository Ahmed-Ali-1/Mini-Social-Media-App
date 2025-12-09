// // ---------------- LOGIN ------------------
// let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

// if (!loggedUser) {
//     window.location.href = "login.html";
// } else {
//     document.getElementById("welcomeText").innerHTML = `Welcome, <strong>${loggedUser.name}<strong/>`;
//     document.getElementById("logoutBtn").style.display = "inline-block";
// }

// document.getElementById('logoutBtn').addEventListener("click", function () {
//     localStorage.removeItem('loggedUser')
//     window.location.href = "login.html"
// })

// // ---------------- POSTS ------------------
// let userPost = JSON.parse(localStorage.getItem("post")) || [];
// let editingPostId = null;

// const modal = document.getElementById('modal');
// const closeCreateBtn = document.querySelectorAll('#closeCreateBtn');

// // OPEN CREATE MODAL
// function openCreatePostModal() {
//     modal.style.display = "flex";
// }

// // CLOSE MODAL
// closeCreateBtn.forEach(btn => {
//     btn.addEventListener('click', () => {
//         modal.style.display = "none";
//     });
// });

// // CREATE + EDIT POST
// function postModal() {
//     let postTitle = document.getElementById('postTitle').value.trim();
//     let postDescription = document.getElementById('postDescription').value.trim();
//     let postImage = document.getElementById('postImage').value;

//     if (editingPostId) {
//         userPost = userPost.map(post => {
//             if (post.id === editingPostId) {
//                 return {
//                     ...post,
//                     title: postTitle,
//                     desc: postDescription,
//                     image: postImage
//                 }
//             }
//             return post;
//         });
//         editingPostId = null;
//     } else {
//         let newPost = {
//             id: Date.now(),
//             title: postTitle,
//             desc: postDescription,
//             image: postImage,
//             time: new Date().toLocaleString(),
//             likes: [],          // <-- user id's array
//             comments: []        // <-- comment array stored here
//         };
//         userPost.push(newPost);
//     }

//     localStorage.setItem("post", JSON.stringify(userPost));

//     document.getElementById('postTitle').value = "";
//     document.getElementById('postDescription').value = "";
//     document.getElementById('postImage').value = "";

//     modal.style.display = "none";
//     savePostDashboard();
// }

// // ---------------- SHOW POSTS ----------------
// const postContainer = document.querySelector('.postContainer');

// function savePostDashboard() {
//     postContainer.innerHTML = "";

//     userPost.forEach(post => {
//         postContainer.innerHTML += `
//         <div class="postDiv">
//             <img class="postImage" src="${post.image}" alt="">
//             <div class="postContentDiv">
//                 <div class="postTitleContainer">
//                     <h4>${post.title}</h4>
//                     <div class="postBtnContainer">
//                         <button class="postEditBtn" onclick="onePostEdit(${post.id})">Edit</button>
//                         <button class="postDeleteBtn" onclick="onePostDelete(${post.id})">Delete</button>
//                     </div>
//                 </div>

//                 <p class="descriptionDiv">${post.desc}</p>
//                 <p>${post.time}</p>

//                 <div class="postReactContainer">
//                     <div class="likeWrapper" onclick="toggleLike(${post.id}, this)">
//                         <i class="${post.likes.includes(loggedUser.email) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
//                         <span class="likeCount">${post.likes.length}</span>
//                     </div>

//                     <button class="commentBtn" onclick="openCommentModal(${post.id})">
//                         <i class="fa-regular fa-comment"></i>
//                         <span class="commentCount">${post.comments.length}</span>
//                     </button>
//                 </div>
//             </div>
//         </div>`;
//     });
// }
// savePostDashboard();

// // ---------------- DELETE ----------------
// function onePostDelete(id) {
//     userPost = userPost.filter(p => p.id !== id);
//     localStorage.setItem("post", JSON.stringify(userPost));
//     savePostDashboard();
// }

// // ---------------- EDIT ----------------
// function onePostEdit(id) {
//     const found = userPost.find(p => p.id === id);
//     editingPostId = id;

//     document.getElementById("postTitle").value = found.title;
//     document.getElementById("postDescription").value = found.desc;
//     document.getElementById("postImage").value = found.image;

//     document.getElementById("modalHeading").innerText = "Edit Post";
//     document.getElementById("postBtn").innerText = "Save";

//     modal.style.display = "flex";
// }

// // ---------------- LIKE SYSTEM ----------------
// function toggleLike(postId, element) {
//     let post = userPost.find(p => p.id === postId);
//     let index = post.likes.indexOf(loggedUser.email);

//     const heart = element.querySelector("i");
//     const likeCount = element.querySelector(".likeCount");

//     if (index === -1) {
//         // LIKE
//         post.likes.push(loggedUser.email);
//         heart.classList.remove("fa-regular");
//         heart.classList.add("fa-solid");
//     } else {
//         // UNLIKE
//         post.likes.splice(index, 1);
//         heart.classList.remove("fa-solid");
//         heart.classList.add("fa-regular");
//     }

//     likeCount.innerText = post.likes.length;
//     localStorage.setItem("post", JSON.stringify(userPost));
// }

// // ---------------- COMMENTS SYSTEM ----------------
// let currentPostId = null;

// const commentModal = document.getElementById('commentModal');
// const modalList = document.querySelector('.modalCommentList');
// const addCommentBtn = document.getElementById('commentAddBtn');

// function openCommentModal(postId) {
//     currentPostId = postId;
//     commentModal.style.display = "flex";
//     loadComments(postId);
// }

// document.getElementById('closeCommentModal').addEventListener('click', () => {
//     commentModal.style.display = "none";
// });

// // SHOW COMMENTS INSIDE MODAL
// function loadComments(id) {
//     let post = userPost.find(p => p.id === id);

//     modalList.innerHTML = "";

//     post.comments.forEach(c => {
//         modalList.innerHTML += `
//             <div class="singleModalComment">${c}</div>
//         `;
//     });
// }

// // ADD COMMENT
// addCommentBtn.addEventListener('click', () => {
//     const input = document.querySelector('.modalInput');
//     let text = input.value.trim();
//     if (!text) return;

//     let post = userPost.find(p => p.id === currentPostId);
//     post.comments.push(text);

//     input.value = "";

//     localStorage.setItem("post", JSON.stringify(userPost));

//     loadComments(currentPostId);
//     savePostDashboard();
// });




























// // ---------------- LOGIN ------------------
// let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

// if (!loggedUser) {
//     window.location.href = "login.html";
// } else {
//     document.getElementById("welcomeText").innerHTML = `Welcome, <strong>${loggedUser.name}<strong/>`;
//     document.getElementById("logoutBtn").style.display = "inline-block";
// }

// document.getElementById('logoutBtn').addEventListener("click", function () {
//     localStorage.removeItem('loggedUser');
//     window.location.href = "login.html";
// });

// // ---------------- POSTS ------------------
// let allPosts = JSON.parse(localStorage.getItem("post")) || [];
// let editingPostId = null;

// const modal = document.getElementById('modal');
// const closeCreateBtn = document.querySelectorAll('#closeCreateBtn');

// // OPEN CREATE MODAL
// function openCreatePostModal() {
//     modal.style.display = "flex";
// }

// // CLOSE MODAL
// closeCreateBtn.forEach(btn => {
//     btn.addEventListener('click', () => {
//         modal.style.display = "none";
//     });
// });

// // CREATE + EDIT POST
// function postModal() {
//     let postTitle = document.getElementById('postTitle').value.trim();
//     let postDescription = document.getElementById('postDescription').value.trim();
//     let postImage = document.getElementById('postImage').value;

//     if (editingPostId) {
//         // EDIT POST
//         allPosts = allPosts.map(p => {
//             if (p.id === editingPostId) {
//                 return {
//                     ...p,
//                     title: postTitle,
//                     desc: postDescription,
//                     image: postImage
//                 };
//             }
//             return p;
//         });
//         editingPostId = null;
//     } else {
//         // NEW POST
//         let newPost = {
//             id: Date.now(),
//             userEmail: loggedUser.email, // <-- user specific
//             title: postTitle,
//             desc: postDescription,
//             image: postImage,
//             time: new Date().toLocaleString(),
//             likes: [],
//             comments: []
//         };
//         allPosts.push(newPost);
//     }

//     localStorage.setItem("post", JSON.stringify(allPosts));

//     document.getElementById('postTitle').value = "";
//     document.getElementById('postDescription').value = "";
//     document.getElementById('postImage').value = "";

//     modal.style.display = "none";
//     loadUserPosts();
// }

// // ---------------- LOAD DASHBOARD POSTS ----------------
// const postContainer = document.querySelector('.postContainer');
// let userPost = []; // current user's posts

// function loadUserPosts() {
//     userPost = allPosts.filter(p => p.userEmail === loggedUser.email);
//     savePostDashboard();
// }

// function savePostDashboard() {
//     postContainer.innerHTML = "";

//     userPost.forEach(post => {
//         postContainer.innerHTML += `
//         <div class="postDiv">
//             <img class="postImage" src="${post.image}" alt="">
//             <div class="postContentDiv">
//                 <div class="postTitleContainer">
//                     <h4>${post.title}</h4>
//                     <div class="postBtnContainer">
//                         <button class="postEditBtn" onclick="onePostEdit(${post.id})">Edit</button>
//                         <button class="postDeleteBtn" onclick="onePostDelete(${post.id})">Delete</button>
//                     </div>
//                 </div>

//                 <p class="descriptionDiv">${post.desc}</p>
//                 <p>${post.time}</p>

//                 <div class="postReactContainer">
//                     <div class="likeWrapper" onclick="toggleLike(${post.id}, this)">
//                         <i class="${post.likes.includes(loggedUser.email) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
//                         <span class="likeCount">${post.likes.length}</span>
//                     </div>

//                     <button class="commentBtn" onclick="openCommentModal(${post.id})">
//                         <i class="fa-regular fa-comment"></i>
//                         <span class="commentCount">${post.comments.length}</span>
//                     </button>
//                 </div>
//             </div>
//         </div>`;
//     });
// }
// loadUserPosts();

// // ---------------- DELETE ----------------
// function onePostDelete(id) {
//     allPosts = allPosts.filter(p => p.id !== id);
//     localStorage.setItem("post", JSON.stringify(allPosts));
//     loadUserPosts();
// }

// // ---------------- EDIT ----------------
// function onePostEdit(id) {
//     const found = allPosts.find(p => p.id === id);
//     editingPostId = id;

//     document.getElementById("postTitle").value = found.title;
//     document.getElementById("postDescription").value = found.desc;
//     document.getElementById("postImage").value = found.image;

//     document.getElementById("modalHeading").innerText = "Edit Post";
//     document.getElementById("postBtn").innerText = "Save";

//     modal.style.display = "flex";
// }

// // ---------------- LIKE SYSTEM ----------------
// function toggleLike(postId, element) {
//     let post = allPosts.find(p => p.id === postId);
//     let index = post.likes.indexOf(loggedUser.email);

//     const heart = element.querySelector("i");
//     const likeCount = element.querySelector(".likeCount");

//     if (index === -1) {
//         post.likes.push(loggedUser.email);
//         heart.classList.remove("fa-regular");
//         heart.classList.add("fa-solid");
//     } else {
//         post.likes.splice(index, 1);
//         heart.classList.remove("fa-solid");
//         heart.classList.add("fa-regular");
//     }

//     likeCount.innerText = post.likes.length;
//     localStorage.setItem("post", JSON.stringify(allPosts));
//     loadUserPosts();
// }

// // ---------------- COMMENTS SYSTEM ----------------
// let currentPostId = null;
// const commentModal = document.getElementById('commentModal');
// const modalList = document.querySelector('.modalCommentList');
// const addCommentBtn = document.getElementById('commentAddBtn');

// function openCommentModal(postId) {
//     currentPostId = postId;
//     commentModal.style.display = "flex";
//     loadComments(postId);
// }

// document.getElementById('closeCommentModal').addEventListener('click', () => {
//     commentModal.style.display = "none";
// });

// function loadComments(id) {
//     let post = allPosts.find(p => p.id === id);
//     modalList.innerHTML = "";

//     post.comments.forEach(c => {
//         modalList.innerHTML += `<div class="singleModalComment">${c}</div>`;
//     });
// }

// addCommentBtn.addEventListener('click', () => {
//     const input = document.querySelector('.modalInput');
//     let text = input.value.trim();
//     if (!text) return;

//     let post = allPosts.find(p => p.id === currentPostId);
//     post.comments.push(text);

//     input.value = "";
//     localStorage.setItem("post", JSON.stringify(allPosts));

//     loadComments(currentPostId);
//     loadUserPosts();
// });






















// // ---------------- LOGIN ------------------
// let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

// if (!loggedUser) {
//     window.location.href = "login.html";
// } else {
//     document.getElementById("welcomeText").innerHTML = `Welcome, <strong>${loggedUser.name}</strong>`;
//     document.getElementById("logoutBtn").style.display = "inline-block";
// }

// document.getElementById('logoutBtn').addEventListener("click", function () {
//     localStorage.removeItem('loggedUser');
//     window.location.href = "login.html";
// });

// // ---------------- POSTS ------------------
// let allPosts = JSON.parse(localStorage.getItem("post")) || [];
// let editingPostId = null;

// const modal = document.getElementById('modal');
// const closeCreateBtn = document.querySelectorAll('#closeCreateBtn');

// // ---------------- SIMPLE TITLE SEARCH ----------------
// let searchValue = "";

// const searchInput = document.getElementById("searchInput");
// if (searchInput) {
//     searchInput.addEventListener("input", function () {
//         searchValue = this.value.toLowerCase();
//         loadDashboardPosts();
//         loadAllPosts();
//     });
// }

// function filterByTitle(posts) {
//     return posts.filter(p =>
//         p.title.toLowerCase().includes(searchValue)
//     );
// }

// // ---------------- SORTING SYSTEM ----------------
// let sortValue = "latest";

// const sortSelect = document.getElementById("sortSelect");
// if (sortSelect) {
//     sortSelect.addEventListener("change", function () {
//         sortValue = this.value;
//         loadDashboardPosts();
//         loadAllPosts();
//     });
// }

// function sortPosts(posts) {
//     if (sortValue === "latest") {
//         return posts.sort((a, b) => b.id - a.id);
//     }
//     if (sortValue === "oldest") {
//         return posts.sort((a, b) => a.id - b.id);
//     }
//     if (sortValue === "liked") {
//         return posts.sort((a, b) => b.likes.length - a.likes.length);
//     }
//     return posts;
// }

// // ---------------- CREATE POST MODAL ----------------
// function openCreatePostModal() {
//     modal.style.display = "flex";
// }

// closeCreateBtn.forEach(btn => {
//     btn.addEventListener('click', () => {
//         modal.style.display = "none";
//         resetModal();
//     });
// });

// function postModal() {
//     let postTitle = document.getElementById('postTitle').value.trim();
//     let postDescription = document.getElementById('postDescription').value.trim();
//     let postImage = document.getElementById('postImage').value;

//     if (!postTitle || !postDescription) {
//         alert("Please enter title and description!");
//         return;
//     }

//     if (editingPostId) {
//         allPosts = allPosts.map(p => {
//             if (p.id === editingPostId) {
//                 return {
//                     ...p,
//                     title: postTitle,
//                     desc: postDescription,
//                     image: postImage
//                 };
//             }
//             return p;
//         });
//         editingPostId = null;

//     } else {
//         let newPost = {
//             id: Date.now(),
//             userEmail: loggedUser.email,
//             userName: loggedUser.name,
//             title: postTitle,
//             desc: postDescription,
//             image: postImage,
//             time: new Date().toLocaleString(),
//             likes: [],
//             comments: []
//         };

//         allPosts.push(newPost);
//     }

//     localStorage.setItem("post", JSON.stringify(allPosts));
//     resetModal();
//     loadDashboardPosts();
//     loadAllPosts();
// }

// function resetModal() {
//     document.getElementById('postTitle').value = "";
//     document.getElementById('postDescription').value = "";
//     document.getElementById('postImage').value = "";
//     document.getElementById("modalHeading").innerText = "Create Post";
//     document.getElementById("postBtn").innerText = "Post";
//     modal.style.display = "none";
// }

// // ---------------- DASHBOARD POSTS ----------------
// const postContainer = document.querySelector('.postContainer');
// let userPost = [];

// function loadDashboardPosts() {
//     if (!postContainer) return;

//     userPost = allPosts.filter(p => p.userEmail === loggedUser.email);

//     userPost = filterByTitle(userPost);
//     userPost = sortPosts(userPost);

//     postContainer.innerHTML = "";

//     userPost.forEach(post => {
//         postContainer.innerHTML += `
//         <div class="postDiv">
//             <img class="postImage" src="${post.image}" alt="">
//             <div class="postContentDiv">
//                 <div class="postTitleContainer">
//                     <div class="userPostName">
//                         <h4>${post.userName}</h4>
//                         <p>${post.time}</p>   
//                     </div>
//                     <div class="postBtnContainer">
//                         <button class="postEditBtn" onclick="onePostEdit(${post.id})">Edit</button>
//                         <button class="postDeleteBtn" onclick="onePostDelete(${post.id})">Delete</button>
//                     </div>
//                 </div>

//                 <h4 class="postTitle">${post.title}</h4>
//                 <p class="descriptionDiv">${post.desc}</p>

//                 <div class="postReactContainer">
//                     <div class="likeWrapper" onclick="toggleLike(${post.id}, this)">
//                         <i class="${post.likes.includes(loggedUser.email) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
//                         <span class="likeCount">${post.likes.length}</span>
//                     </div>

//                     <button class="commentBtn" onclick="openCommentModal(${post.id})">
//                         <i class="fa-regular fa-comment"></i>
//                         <span class="commentCount">${post.comments.length}</span>
//                     </button>
//                 </div>
//             </div>
//         </div>`;
//     });
// }

// // ---------------- HOME PAGE: ALL POSTS ----------------
// function loadAllPosts() {
//     const homeContainer = document.querySelector('.allPostContainer');
//     if (!homeContainer) return;

//     let postsToShow = filterByTitle(allPosts);
//     postsToShow = sortPosts(postsToShow);

//     homeContainer.innerHTML = "";

//     postsToShow.forEach(post => {
//         let isOwner = post.userEmail === loggedUser.email;

//         homeContainer.innerHTML += `
//         <div class="postDiv">
//             <img class="postImage" src="${post.image}" alt="">
//             <div class="postContentDiv">
//                 <div class="postTitleContainer">
//                      <div class="userPostName">
//                         <h4>${post.userName}</h4>
//                         <p>${post.time}</p>   
//                     </div>
//                     <div class="postBtnContainer">
//                         ${isOwner ? `
//                         <button class="postDeleteBtn" onclick="onePostDelete(${post.id})">Delete</button>` : ""}
//                     </div>
//                 </div>

//                 <h4 class="postTitle">${post.title}</h4>
//                 <p class="descriptionDiv">${post.desc}</p>

//                 <div class="postReactContainer">
//                     <div class="likeWrapper" onclick="toggleLike(${post.id}, this)">
//                         <i class="${post.likes.includes(loggedUser.email) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
//                         <span class="likeCount">${post.likes.length}</span>
//                     </div>

//                     <button class="commentBtn" onclick="openCommentModal(${post.id})">
//                         <i class="fa-regular fa-comment"></i>
//                         <span class="commentCount">${post.comments.length}</span>
//                     </button>
//                 </div>
//             </div>
//         </div>`;
//     });
// }

// // ---------------- DELETE POST ----------------
// function onePostDelete(id) {
//     allPosts = allPosts.filter(p => p.id !== id);
//     localStorage.setItem("post", JSON.stringify(allPosts));
//     loadDashboardPosts();
//     loadAllPosts();
// }

// // ---------------- EDIT POST ----------------
// function onePostEdit(id) {
//     const found = allPosts.find(p => p.id === id);
//     editingPostId = id;

//     document.getElementById("postTitle").value = found.title;
//     document.getElementById("postDescription").value = found.desc;
//     document.getElementById("postImage").value = found.image;

//     document.getElementById("modalHeading").innerText = "Edit Post";
//     document.getElementById("postBtn").innerText = "Save";

//     modal.style.display = "flex";
// }

// // ---------------- LIKE SYSTEM ----------------
// function toggleLike(postId, element) {
//     let post = allPosts.find(p => p.id === postId);
//     let index = post.likes.indexOf(loggedUser.email);

//     const heart = element.querySelector("i");
//     const likeCount = element.querySelector(".likeCount");

//     if (index === -1) {
//         post.likes.push(loggedUser.email);
//         heart.classList.remove("fa-regular");
//         heart.classList.add("fa-solid");
//     } else {
//         post.likes.splice(index, 1);
//         heart.classList.remove("fa-solid");
//         heart.classList.add("fa-regular");
//     }

//     likeCount.innerText = post.likes.length;
//     localStorage.setItem("post", JSON.stringify(allPosts));

//     loadDashboardPosts();
//     loadAllPosts();
// }

// // ---------------- COMMENTS SYSTEM ----------------
// let currentPostId = null;
// const commentModal = document.getElementById('commentModal');
// const modalList = document.querySelector('.modalCommentList');

// function openCommentModal(postId) {
//     currentPostId = postId;
//     commentModal.style.display = "flex";
//     loadComments(postId);
// }

// function closeCommentModal() {
//     commentModal.style.display = "none";
// }

// function loadComments(id) {
//     let post = allPosts.find(p => p.id === id);
//     modalList.innerHTML = "";

//     post.comments.forEach((c, index) => {
//         modalList.innerHTML += `
//         <div class="singleModalComment">
//             <div class="commentHeader">
//                 <div class="commentUserName">
//                     <strong>${c.user}</strong>
//                     <small>${c.time}</small>
//                     ${c.user === loggedUser.name ? `<button onclick="deleteComment(${id}, ${index})" class="commentDeleteBtn">Delete</button>` : ""}
//                 </div>
//             </div>
//             <p>${c.text}</p>
//         </div>`;
//     });
// }

// function commentAddBtn() {
//     const input = document.querySelector('.modalInput');
//     let text = input.value.trim();
//     if (!text) return;

//     let post = allPosts.find(p => p.id === currentPostId);

//     let newComment = {
//         user: loggedUser.name,
//         text: text,
//         time: new Date().toLocaleString()
//     };

//     post.comments.push(newComment);

//     input.value = "";
//     localStorage.setItem("post", JSON.stringify(allPosts));

//     loadComments(currentPostId);
//     loadDashboardPosts();
//     loadAllPosts();
// }

// function deleteComment(postId, commentIndex) {
//     let post = allPosts.find(p => p.id === postId);
//     if (!post) return;

//     post.comments.splice(commentIndex, 1);
//     localStorage.setItem("post", JSON.stringify(allPosts));

//     loadComments(postId);
//     loadDashboardPosts();
//     loadAllPosts();
// }

// // ---------------- INITIAL LOAD ----------------
// loadDashboardPosts();
// loadAllPosts();
