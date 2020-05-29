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

$(document).ready(function(){
    $(".edit-comment-form").hide();
    $('.edit-comment').on('click', function(e){
        e.stopPropagation();
        /**
        $target = $(e.target);
        const comment_id = $target.attr('comment-id');
        const comments = $target.attr('all-comments');
        console.log(comments);
        console.log(comment_id);
        for (c in comments){
            console.log(c);
            if (c == comment_id){
                console.log('found it');
                $("#edit-comment-form").toggle('slow');
            }
        }
         */
        $(".edit-comment-form").toggle('slow');
    });
});