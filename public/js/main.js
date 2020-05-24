// deletes post
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

// deletes edit comment
$(document).ready(function(){
    $('.delete-comment').on('click', function(e){
        $target = $(e.target);
        const forum_id = $target.attr('forum-id');
        const comment_id =$target.attr('comment-id');
        $.ajax({
            type: 'DELETE',
            url: '/comments/'+comment_id,
            success: function(response){
                alert('Deleting Comment');
                window.location.href='/forum-posts/'+forum_id;
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});