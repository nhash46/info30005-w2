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

// allows user to edit comment
$(document).ready(function(){
    $(".edit-comment-form").hide();
    $('.edit-comment').on('click', function(e){
        e.stopPropagation();
        $(this).siblings().toggle('slow');
    });
});

// deletes consultation
$(document).ready(function(){
    $('.delete-consultation').on('click', function(e){
        if (!confirm("Are you sure you want to cancel this consultation?")){
            return false;
        }
        $target = $(e.target);
        const _id = $target.attr('consultation-id');
        $.ajax({
            type: 'DELETE',
            url: '/consultations/manage/'+_id,
            success: function(response){
                alert('Cancelling consultation');
                window.location.href='/consultations/manage';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});

// loads edit form for consultationS
$(document).ready(function(){
    $('.manage-consultation').on('click', function(e){
        $target = $(e.target);
        const _id = $target.attr('consultation-id');
        $.ajax({
            type: 'GET',
            url: '/consultations/manage/'+_id,
            success: function(response){
                window.location.href='/consultations/manage/'+_id;
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});

// changes consultation status from pending to confirmed
$(document).ready(function(){
    $('.accept-request').on('click', function(e){
        if (!confirm("Are you sure you want to accept this consultation?")){
            return false;
        }
        $target = $(e.target);
        const _id = $target.attr('consultation-id');
        $.ajax({
            type: 'POST',
            url: '/consultations/requests/'+_id,
            success: function(response){
                window.location.href='/consultations/confirmed';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});

// changes consultation status from schedhuled to 
$(document).ready(function(){
    $('.mark-as-complete').on('click', function(e){
        if (!confirm("Are you sure you have completed this consultation?")){
            return false;
        }
        $target = $(e.target);
        const _id = $target.attr('consultation-id');
        $.ajax({
            type: 'POST',
            url: '/consultations/requests/'+_id+'/complete',
            success: function(response){
                window.location.href='/consultations/confirmed';
            },
            error: function(err){
                console.log(err);
            }
        });
    });
});