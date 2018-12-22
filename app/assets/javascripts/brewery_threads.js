//= require users
//= require brewery_states
//= require posts

$( document ).on('turbolinks:load', function() {
    showMoreListener();
    showNextListener();
    showPrevListener();
    showPostsListener();
    newPostListener();
});

function showMoreListener() {
    // show more of brewery_thread text
    $(".js-more").on("click", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: this.href + ".json",
        }).done(function(data){
            $("#brewery_thread-" + data["id"]).html(data["posts"][0]["body"])
        })
        .error(function(error){
            alert("Oops! There was an error!")
        });
    }); 
}

function showNextListener() {
    // show next brewery_thread
    $(".js-next").on("click", function(e) {
        e.preventDefault();
        var nextId = parseInt($(".js-next").attr("data-id")) + 1;
        $.get(`/threads/${nextId}.json`, function(data) {
            const brewery = new BreweryThread(data["brewery"]).jsFriendlyId();
            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            const userId = new User(data["user"]).jsFriendlyId();
            const created = new Date(data["created_at"]).format();
            const posts = data["posts"].filter(a => a !== data["posts"][0]);

            $(".edit-thread").remove();
            $("#new_post").attr("action", `/threads/${brewery}/posts`);
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html(`<a href="/threads/brewery_state/${stateId}">${data["brewery_state"]["name"]}</a>`);
            $(".thread-created").html(`• Posted on ${created}`);
            $(".thread-user").html(`<a href="/users/${userId}">${data["user"]["name"]}</a>`);
            $(".show-comments").html(`<p class="text-muted" id="posts_${data["id"]}">${data["posts"][0]["body"]}</p>`);
            posts.forEach(function(attributes){
                const comment = new Post(attributes);
                comment.show();
            })
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
        })
        .error(function(error){
            alert("Sorry, no newer reviews.")
        });
    });
}
function showPrevListener() {
    // show previous brewery_thread
    $(".js-previous").on("click", function(e) {
        e.preventDefault();       
        var previousId = parseInt($(".js-next").attr("data-id")) - 1;
        $.get(`/threads/${previousId}.json`, function(data) {
            const brewery = new BreweryThread(data["brewery"]).jsFriendlyId();
            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            const userId = new User(data["user"]).jsFriendlyId();
            const created = new Date(data["created_at"]).format();
            const posts = data["posts"].filter(a => a !== data["posts"][0]);

            $(".edit-thread").remove();
            $("#new_post").attr("action", `/threads/${brewery}/posts`);
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html(`<a href="/threads/brewery_state/${stateId}">${data["brewery_state"]["name"]}</a>`);
            $(".thread-created").html(`• Posted on ${created}`);
            $(".thread-user").html(`<a href="/users/${userId}">${data["user"]["name"]}</a>`);
            $(".show-comments").html(`<p class="text-muted" id="posts_${data["id"]}">${data["posts"][0]["body"]}</p>`);
            posts.forEach(function(attributes){
                const comment = new Post(attributes);
                comment.show();
            })
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
        })
        .error(function(error){
            alert("Sorry, no older reviews.")
        });
    });
}
function showPostsListener() {
    // show comments
    $(".js-comments").on("click", function(e){
        e.preventDefault();
        $(this).remove();
        $.ajax({
            method: 'GET',
            url: this.href + ".json",
        }).done(function(data){
            const brewery = new BreweryThread(data["brewery"]).jsFriendlyId();
            const posts = data["posts"].filter(a => a !== data["posts"][0]);
            $(`#brewery_thread-${data["id"]}`).html(data["posts"][0]["body"])
            posts.forEach(function(attributes){
                const comment = new Post(attributes);
                comment.showIndex();
            });
            $(`.post-comment-${data["id"]}`).append(`<a class="text-muted" href="/threads/${brewery}">post a comment</a>`)
        })
        .error(function(error){
            alert("Oops! There was an error!")
        });
    })
}
function newPostListener() {
    // post a comment
    $("#new_post").on("submit", function(e){
        e.preventDefault();
        $.ajax({          
            url: this.action + ".json",
            data: $(this).serialize(),
            type: ($("input[name='_method']").val() || this.method),
            success: function(data){
                const comment = new Post(data);
                comment.show();
                $("input[type=text], textarea").val("");
                $(".btn").removeAttr("disabled");
            }
        })
        .error(function(error){
            alert("Please enter comment text.");
            $(".btn").removeAttr("disabled");
        });
    });
}

class BreweryThread {
    constructor(name){
        this.brewery = name;
    }
    // create slug
    jsFriendlyId() {
        return this.brewery.toString().toLowerCase()
        .replace(/\s+/g, '-')           // Replace spaces with -
        .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
        .replace(/\-\-+/g, '-')         // Replace multiple - with single -
        .replace(/^-+/, '')             // Trim - from start of text
        .replace(/-+$/, '');            // Trim - from end of text
    }      
}

