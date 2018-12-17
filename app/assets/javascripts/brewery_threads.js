$( document ).on('turbolinks:load', function() {
    console.log('document loaded');
    attachListeners();
});


function attachListeners() {
    $(".js-more").on("click", function(e) {
        e.preventDefault();
        var id = parseInt($(".js-more").attr("data-id"));
        $.get("/threads/" + id + ".json", function(data) {
            let postBody = data["posts"][0]["body"]
            console.log(postBody);
        }); 
    });
}

