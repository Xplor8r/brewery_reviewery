//= require users
//= require brewery_states

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
            const userId = new User(data["user"]).jsFriendlyId();
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
            $(".thread-header").html(data["brewery"]);
            $(".thread-state").html(data["brewery_state"]["name"]);
            $(".thread-created").html(data["created_at"]);
            const userId = new User(data["user"]).jsFriendlyId();
            $(".thread-user").html('<a href="/users/' + userId + '"' + ">" + data["user"]["name"] + "</a>");
            $(".thread-posts").empty();
            $(".js-next").attr("data-id", data["id"]);
            $(".js-previous").attr("data-id", data["id"]);
            console.log( );
        }); 
    });
}

// class User {
//     constructor(attributes){
//         this.name = attributes["name"];
//     }
//     jsFriendlyId() {
//         return this.name.toString().toLowerCase()
//         .replace(/\s+/g, '-')           // Replace spaces with -
//         .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
//         .replace(/\-\-+/g, '-')         // Replace multiple - with single -
//         .replace(/^-+/, '')             // Trim - from start of text
//         .replace(/-+$/, '');            // Trim - from end of text
//     }
    
// }