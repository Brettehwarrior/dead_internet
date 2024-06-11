function createPostElement(post) {
    const date = new Date(post.post_date);
    const verifiedHtml = (post.user_verified != 1) ? "" : '<img class="post-user-verified-badge" src="img/patch-check-fill.svg" alt="Verified Badge">';

    let postEmbedContent = "";
    if (post.post_image_url) {
        postEmbedContent = `
            <div class="post-media-container">
                <img class="post-media-image" src="${post.post_image_url}" alt="Post image">
            </div>`;
    }

    const postHTML = `
        <div class="post-user-container">
            <img src="${post.user_pfp_directory}" alt="A user's profile picture" class="post-user-pfp">
            ${verifiedHtml}
            <span class="post-user-display-name">${post.user_display_name}</span>
            <span class="post-user-handle">@${post.user_handle}</span>
        </div>
        <p class="post-content">${post.post_content}</p>

        ${postEmbedContent}

        <div class="post-meta">
            <span class="post-meta-text">${date.toLocaleTimeString('en-us', {timeStyle:'short'})}</span>
            <span class="post-meta-text">${date.toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</span>
            <span class="post-meta-text">${post.post_source}</span>
        </div>
        <div class="post-metrics">
            <span class="post-metrics-text"><i class="fa-solid fa-heart"></i> ${post.post_like_count}</span>
            <span class="post-metrics-text"><i class="fa-solid fa-retweet"></i> ${post.post_repost_count}</span>
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

        const preparedStatement = db.prepare(`
            SELECT posts.*, users.*
            FROM posts
            JOIN users
            WHERE posts.post_id = :post_id
        `);
        const post = preparedStatement.getAsObject({":post_id":1});
        console.log(post);

        for (let i = 0; i < 20; i++){
            const postDiv = createPostElement(post);
            document.getElementById("posts").appendChild(postDiv);}
    })();
});