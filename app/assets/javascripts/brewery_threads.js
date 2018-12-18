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
        var id = parseInt($(".js-more").attr("data-id"));
        $.get("/threads/" + id + ".json", function(data) {
            let postBody = data["posts"][0]["body"]
            $("#brewery_thread-" + id).html(postBody);
        }); 
    });
    
    // show next brewery_thread
    $(".js-next").on("click", function(e) {
        e.preventDefault();
        var nextId = parseInt($(".js-next").attr("data-id")) + 1;
        $.get("/threads/" + nextId + ".json", function(data) {
            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            const userId = new User(data["user"]).jsFriendlyId();
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html('<a href="/threads/brewery_state/' + stateId + '"' + ">" + data["brewery_state"]["name"] + "</a>");
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html('<a href="/users/' + userId + '"' + ">" + data["user"]["name"] + "</a>");
            $(".thread-posts").empty();
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
            //console.log()
        }); 
    });
    // show previous brewery_thread
    $(".js-previous").on("click", function(e) {
        e.preventDefault();
        var previousId = parseInt($(".js-previous").attr("data-id")) - 1;
        $.get("/threads/" + previousId + ".json", function(data) {
            const stateId = new State(data["brewery_state"]).jsFriendlyId();
            const userId = new User(data["user"]).jsFriendlyId();
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html('<a href="/threads/brewery_state/' + stateId + '"' + ">" + data["brewery_state"]["name"] + "</a>");
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html('<a href="/users/' + userId + '"' + ">" + data["user"]["name"] + "</a>");
            $(".thread-posts").empty();
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
            console.log( );
        }); 
    });

    $(".js-comments").on("click", function(e){
        e.preventDefault();
        $.ajax({
            method: 'GET',
            url: this.href + ".json",
        }).done(function(data){
            console.log(data)
            const posts = data["posts"]
            posts.forEach(function(data){
                const comment = new Post(data);
                comment.show();
           })

        })
    })
}