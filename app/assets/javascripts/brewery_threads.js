$( document ).on('turbolinks:load', function() {
    console.log('document loaded');
    attachListeners();
});

function attachListeners() {

    $(".js-more").on("click", function(e) {
        e.preventDefault();
        const id = parseInt($(".js-more").attr("data-id"));
        $.get("/threads/" + id + ".json", function(data) {
            console.log(data)
        });
        
    });

}

