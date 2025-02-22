function loadAllPosts (category){
    // if(category){
    //     console.log('https://openapi.programming-hero.com/api/retro-forum/posts?category=`${category}`')
        
    // }
    // else{
    //     console.log("https://openapi.programming-hero.com/api/retro-forum/posts")
    // }

    const apiUrl = category 
        ? `https://openapi.programming-hero.com/api/retro-forum/posts?category=${category}`
        : "https://openapi.programming-hero.com/api/retro-forum/posts";

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayAllPosts(data.posts));
}

loadAllPosts()

function handleSearchByCategory(){
    const searchText = document.getElementById('searchPosts').value;
    loadAllPosts(searchText);
}

function displayAllPosts(posts){
    // console.log(posts)
    document.getElementById('post-container').innerHTML = ""
    const postContainer = document.getElementById('post-container');
    for (const post of posts){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex items-center justify-center py-10 bg-gray-100">

    <div class="max-w-lg bg-white shadow-lg rounded-xl p-5 border border-gray-200">
        <!-- Author & Category -->
        <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="  text-4xl font-bold ${post.isActive?"text-green-500":"text-red-500"}">•</span>
            </div>
            <p class="text-sm text-gray-600">
                <span class="font-medium">${post.category}</span> · ${post.author.name}
            </p>
        </div>

        <!-- Title -->
        <h2 class="mt-3 text-lg font-semibold text-gray-900">
        ${post.title}
        </h2>

        <!-- Description -->
        <p class="mt-1 text-gray-600 text-sm">
        ${post.description}
        </p>

        <!-- Divider -->
        <hr class="my-3 border-gray-200" />

        <!-- Stats & Icons -->
        <div class="flex items-center justify-between text-gray-500 text-sm">
            <div class="flex items-center space-x-4">
                <span>💬 ${post.comment_count}</span>
                <span>👁️ ${post.view_count}</span>
                <span>⏳ ${post.posted_time}</span>
            </div>
            <div onclick="addDescription('${post.description}', '${post.view_count}')" class="text-green-500 cursor-pointer">📩</div>
        </div>
    </div>

</div>
        `
        postContainer.appendChild(div)
    }

}

function addDescription( description,view_count){
    const readContainer = document.getElementById('markAsReadContainer')
    
    
    const addCounterHistory = document.createElement('div');
    addCounterHistory.innerHTML=`
        <div class="flex justify-between">
            <p>${description}</p>
            <p>${view_count}</p>
        </div>
    `
    readContainer.appendChild(addCounterHistory)
   

}
// button clicked 




function latestPostLoader(){
    fetch(' https://openapi.programming-hero.com/api/retro-forum/latest-posts')
    .then(res=>res.json())
    .then(data=>displayLatestPost(data))
}

function displayLatestPost(data){
    // console.log(data);
    const latestPostContainer = document.getElementById('latest-post-container');
    data.forEach(e => {
        // console.log(element)
        const div = document.createElement('div');
        div.innerHTML=`
            <div class="card lg:w-96 pb-5 bg-base-100 shadow-2xl">
          <figure class="lg:px-6 px-4 pt-4 lg:pt-8">
              <img
                  src=${e.cover_image}
                  alt="Shoes"
                  class="rounded-xl"
              />
          </figure>
          <div class="p-5 lg:p-10 space-y-4 lg:space-y-5">
              <p class="opacity-50 text-start">
                  <i class="fa-solid fa-calendar-days me-2"></i>${e.author.posted_date ? e.author.posted_date : "No Publish Date"}
              </p>
              <h2 class="card-title text-start">${e.title}</h2>
              <p class="text-start">
                  ${e.description}
              </p>
              <div class="card-actions flex gap-5 items-center">
                  <div class="avatar">
                      <div
                          class="lg:w-12 w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      >
                          <img
                          src=${e.profile_image}
                          />
                      </div>
                  </div>
              <div>
              <h3 class="text-start font-extrabold">${e.author.name}</h3>
              <p class="text-start opacity-60">${e.author.designation ? e.author.designation : "Unknown "}</p>
          </div>
      </div>
        `

        latestPostContainer.appendChild(div)
    });


}


latestPostLoader()