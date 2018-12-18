class Post {
    constructor(attributes) {
        this.body = attributes["body"];
        this.userName = attributes["user"]["name"];
        this.created = attributes["created_at"];
        this.threadId = attributes["brewery_thread_id"];
    }

    show() {
        //console.log($(".show-comments-" + this.threadId))
        $(".show-comments-" + this.threadId)
            .html('<div class="card-header"><div class="post-user"><strong>' +
                this.userName + '</strong><small class="post-created"> commented on ' + 
                this.created + '</small></div></div><div class="card-body"><p class="post-body">' +
                this.body + '</p></div>'
            );
        $(".js-comments").empty();
    }
}