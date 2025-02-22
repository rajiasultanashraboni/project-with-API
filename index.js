function loadAllPosts (){
    fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    .then(res=>res.json())
    .then(data=>displayAllPosts(data.posts))
}

loadAllPosts()

function displayAllPosts(posts){
    // console.log(posts)
    const postContainer = document.getElementById('post-container');
    for (const post of posts){
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="flex items-center justify-center py-10 bg-gray-100">

    <div class="max-w-lg bg-white shadow-lg rounded-xl p-5 border border-gray-200">
        <!-- Author & Category -->
        <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span class="text-green-500 text-lg font-bold">•</span>
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

