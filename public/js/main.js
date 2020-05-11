$(document).ready(function(){
    $('.delete-forum').on('click', function(e){
        $target = $(e.target);
        const _id = $target.attr('data-id');
        $.ajax({
            type: 'DELETE',
            url: '/forum-posts/'+_id,
            success: function(response){
                alert('Deleting Forum');
                window.location.href='/forum-posts';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});