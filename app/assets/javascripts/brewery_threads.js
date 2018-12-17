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


}

