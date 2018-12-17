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
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html(data["brewery_state"]["name"]);
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html(data["user"]["name"]);
            $("#post_").empty();
            $(".js-previous").attr("data-id", data["id"]);
            console.log(data)
        }); 
    });
    // show previous brewery_thread
    $(".js-previous").on("click", function(e) {
        e.preventDefault();
        var previousId = parseInt($(".js-previous").attr("data-id")) - 1;
        $.get("/threads/" + previousId + ".json", function(data) {
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html(data["brewery_state"]["name"]);
            $(".thread-created").html(data["created_at"]);
            $(".thread-user").html(data["user"]["name"]);
            $("#post_").empty();
            $(".js-previous").attr("data-id", data["id"]);
            //console.log(data["user"]["name"])
        }); 
    });
}

