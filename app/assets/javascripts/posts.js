class Post {
    constructor(attributes) {
        this.body = attributes["body"];
        this.userId = attributes["user"]["id"];
        this.userName = attributes["user"]["name"];
        this.created = attributes["created_at"];
        this.threadId = attributes["brewery_thread_id"];
    }

    show() {

        var $div = $(".show-comments-" + this.threadId)
        $div.append(
                '<div class="card-header"><div class="post-user"><small><strong>' +
                '<a href="/users/' + this.userId + '"' + ">" + this.userName + "</a></strong></small>" + 
                '<small class="post-created"> commented on ' + 
                this.created + '</small></div></div><div class="card-body"><p class="text-muted post-body">' +
                this.body + '</p></div>'
            );
    }
}