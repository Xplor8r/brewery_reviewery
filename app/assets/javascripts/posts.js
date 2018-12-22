class Post {
    constructor(attributes) {

        this.body = attributes["body"];
        this.userId = attributes["user"]["id"];
        this.userName = attributes["user"]["name"];
        this.created = new Date(attributes["created_at"]).format();
        this.threadId = attributes["brewery_thread_id"];
    }
    // render comment
    render() {
        return `<div class="card-header"><div class="post-user"><small>
        <a href="/users/${this.userId}">${this.userName}</a></small>
        <small class="post-created"> commented on ${this.created}</small></div>
        </div><div class="card-body"><p class="text-muted post-body">${this.body}</p></div>`
    }
    //show comments on index page
    showIndex() {
        const $div = $(`.show-comments-${this.threadId}`)
         $div.append(this.render());
    }
    //show comments on show page
    show() {
        const $div = $(".show-comments")
        $div.append(this.render());
    }
}
// Post.prototype.showIndex = function() {
//     const $div = $(`.show-comments-${this.threadId}`)
//     $div.append(this.render());
// }

// Post.prototype.show = function() {
//     const $div = $(".show-comments")
//     $div.append(this.render());
// }

// format created_at
Date.prototype.format = function() {
    var month_names =["Jan","Feb","Mar",
    "Apr","May","Jun",
    "Jul","Aug","Sep",
    "Oct","Nov","Dec"];   
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    return `${month_names[month_index]} ${day} ${year}`;
}
