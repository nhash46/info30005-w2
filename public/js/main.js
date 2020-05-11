$(document).ready(function(){
    $('.delete-forum').on('click', function(e){
        $target = $(e.target);
        console.log($target.attr('data-id'));
    });
});