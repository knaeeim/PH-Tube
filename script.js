function loadCategory() {
  // fetch the category data from the server
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => {
      displayCategory(data.categories);
    });
}

function loadVideos(searchText = '') {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos));
}

function displayCategory(categories) {
  // console.log(categories);
  const categoryContainer = document.getElementById("category-container");

  for (let category of categories) {
    const button = document.createElement("button");
    button.classList.add(
      "btn",
      "hover:bg-red-500",
      "hover:text-white",
      "cat-button"
    );
    button.setAttribute(
      "onclick",
      `loadCategoryVideos(${category.category_id})`
    );
    button.setAttribute("id", `${category.category_id}`);
    button.innerText = category.category;
    // console.log(category.category);
    categoryContainer.appendChild(button);
  }
}

const displayVideos = (videos) => {
  const videoCotainer = document.getElementById("video-container");
  videoCotainer.innerHTML = "";

  if (videos.length === 0) {
    videoCotainer.innerHTML = `
        <div class="col-span-full flex flex-col justify-center items-center py-24">
            <img src="assets/Icon.png" alt="">
            <h1 class="text-4xl font-bold">Oops!! Sorry, There is no content here</h1>
        </div>
    `;
    return;
  }

  videos.forEach((video) => {
    // console.log(video.authors[0].profile_picture);
    // const verifiedBadge = video.authors[0].verified ? (<img src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" class="w-5 h-5" />) : ("");
    const videoCard = document.createElement("div");
    videoCard.innerHTML = `
            <div class="card bg-base-100 shadow-lg">
                <figure class="relative">
                    <img class="w-full h-56 object-cover"
                    src="${video.thumbnail}"
                    alt="Shoes" />
                    <span class="absolute bottom-2 right-2 bg-blue-950 text-white px-3 py-1 rounded-lg text-sm"> 3 hrs 56 min ago </span>
                </figure>
                <div class="card-body">
                    <div class="flex gap-5"> 
                        <div>
                            <img src="${video.authors[0].profile_picture}" alt="author" class="rounded-full w-10 h-10 object-cover" /> 
                        </div>
                        <div class="space-y-1">
                            <h2 class="card-title font-bold">${video.title}</h2>
                            <p class="text-sm flex gap-1 text-gray-500"> ${video.authors[0].profile_name} ${video.authors[0].verified ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" />` : ``}</p>
                            <p class="text-sm"> ${video.others.views} Views</p>
                        </div>
                    </div>
                    <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block">Show Details</button>
                </div>
            </div>
        `;
    videoCotainer.appendChild(videoCard);
  });
};

const loadVideoDetails = (Videoid) => {
  const url = fetch(`https://openapi.programming-hero.com/api/phero-tube/video/${Videoid}`)
  .then(res => res.json())
  .then(data => displayVideoDetails(data.video));
}

const displayVideoDetails = (video) => {
  const videoModal = document.getElementById("video_details").showModal();
  const deatilsContainer = document.getElementById("details-container");

  deatilsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
      <figure>
        <img
          src=${video.thumbnail}
          alt="Shoes" />
      </figure>
      <div class="card-body">
        <h2 class="card-title">${video.title}</h2>
        <p>${video.description}</p>
      </div>
    </div>
  `;

}

const loadCategoryVideos = (id) => {
  const url = fetch(
    `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
  )
    .then((res) => res.json())
    .then((data) => displayVideos(data.category));
  bgColorOfCategory(id);
};

const bgColorOfCategory = (id) => {
  const categoryBtns = document.querySelectorAll(".cat-button");
  categoryBtns.forEach((btn) => {
    btn.classList.remove("bg-red-500", "text-white");
  });
  const categoryBtn = document.getElementById(id);
  console.log(categoryBtn);
  categoryBtn.classList.add("bg-red-500", "text-white");
};

document.getElementById("static-btn").addEventListener("click", () => {
  const categoryBtns = document.querySelectorAll(".cat-button");
  categoryBtns.forEach((btn) => {
    btn.classList.remove("bg-red-500", "text-white");
  });
  document
    .getElementById("static-btn")
    .classList.add("bg-red-500", "text-white");
});

document.getElementById("search-box").addEventListener("keyup", (e)=>{
  loadVideos(e.target.value);
})

loadCategory();