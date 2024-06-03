function createPostElement(post) {
    const date = new Date(post.time);
    const postHTML = `
        <div class="post-user-container">
            <img src="${'user.png'}" alt="A user's profile picture" class="post-user-pfp">
            <span class="post-user-username">@${post.user_id}</span>
        </div>
        <p class="post-content">${post.text}</p>
        <div class="post-meta">
            <span class="post-meta-text">${date.toLocaleTimeString()}</span>
            <span class="post-meta-text">${date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</span>
            <span class="post-meta-text">${'tinder for ipone'}</span>
        </div>
        <div class="post-metrics">
            <span class="post-metrics-text"><i class="fa-solid fa-heart"></i> ${post.like_count}</span>
            <span class="post-metrics-text"><i class="fa-solid fa-retweet"></i> ${'retweets'}</span>
        </div>
    `;
  
    const container = document.createElement('div');
    container.innerHTML = postHTML;
    container.className = "post";
  
    return container;
}

window.initSqlJs().then(function (SQL) {
    console.log(SQL);

    (async function(){
        const file_data = await fetch("../test.db");
        const buffer = await file_data.arrayBuffer();

        const db = new SQL.Database(new Uint8Array(buffer));

        const preparedStatement = db.prepare("SELECT * FROM posts WHERE id=:user_id");
        const post = preparedStatement.getAsObject({":user_id":1});
        console.log(post);

        const postDiv = createPostElement(post);
        document.getElementById("posts").appendChild(postDiv);
    })();
});