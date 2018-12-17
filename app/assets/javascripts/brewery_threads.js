$( document ).on('turbolinks:load', function() {
    console.log('document loaded');
    attachListeners();
});

function attachListeners() {

    $(".js-more").on("click", function(e) {
        e.preventDefault();
        debugger
        const id = $(this).data("data-id");

       // $(this).parent().text("<%= escape_javascript(render(partial: brewery_thread.posts.first.body)) %>");
    });

}

