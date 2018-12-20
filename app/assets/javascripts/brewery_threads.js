//= require users
//= require brewery_states
//= require posts

$( document ).on('turbolinks:load', function() {
    attachListeners();
});

function attachListeners() {
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
    // show next brewery_thread
    $(".js-next").on("click", function(e) {
        e.preventDefault();

        var nextId = parseInt($(".js-next").attr("data-id")) + 1;
        $.get("/threads/" + nextId + ".json", function(data) {

            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            console.log(data["created_at"])
            const userId = new User(data["user"]).jsFriendlyId();
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html('<a href="/threads/brewery_state/' + stateId + '"' + ">" + data["brewery_state"]["name"] + "</a>");
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html('<a href="/users/' + userId + '"' + ">" + data["user"]["name"] + "</a>");
            $(".thread-posts").empty();
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
        });

    });
    // show previous brewery_thread
    $(".js-previous").on("click", function(e) {
        e.preventDefault();
        var previousId = parseInt($(".js-previous").attr("data-id")) - 1;
        $.get("/threads/" + previousId + ".json", function(data) {
            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            const userId = new User(data["user"]).jsFriendlyId();
            const posts = data["posts"];
            console.log()
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html('<a href="/threads/brewery_state/' + stateId + '"' + ">" + data["brewery_state"]["name"] + "</a>");
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html('<a href="/users/' + userId + '"' + ">" + data["user"]["name"] + "</a>");
            posts.forEach(function(attributes){
                const comment = new Post(attributes);
                comment.showPrev();
            })
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
        })
        .error(function(error){
            alert("Oops! There was an error!")
        });
    });
    // show comments
    $(".js-comments").on("click", function(e){
        e.preventDefault();
        $(this).empty();
        $.ajax({
            method: 'GET',
            url: this.href + ".json",
        }).done(function(data){
            $("#brewery_thread-" + data["id"]).html(data["posts"][0]["body"])
            data["posts"].shift();
            const posts = data["posts"];
            posts.forEach(function(attributes){
                const comment = new Post(attributes);
                comment.show();
            })
        })
        .error(function(error){
            alert("Oops! There was an error!")
        });
    })
    // post a comment
    //"js-submit"
    $("#new_post").on("submit", function(e){
        e.preventDefault();
        $.ajax({          
            url: this.action + ".json",
            data: $(this).serialize(),
            type: ($("input[name='_method']").val() || this.method),
            success: function(data){
                const comment = new Post(data);
                $(".show-comments-").append(comment.show());
                $("input[type=text], textarea").val("");
            }
        })
        .error(function(error){
            alert("Oops! There was an error!")
        });
    });
}
