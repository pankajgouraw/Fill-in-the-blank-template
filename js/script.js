$(function() {
  $("#activityText").text(header);
  $('.wrapper').css({'outline':borderColor});
  $('body').css({'background':bgColor});
  $('#LetterText').text(alphabate);
  
  // function for drag and drop

  function dragDrop(){
  $('.dragg').draggable({
        revert: 'invalid'
  });

  $(".dropp" ).droppable({
        accept:".dragg",
        drop: function (event, ui) {
            $(".dragg" ).draggable({ disabled: true });
            // let dragItem = event.target;
            ui.draggable.draggable({ disabled: true });
            var dragId = ui.draggable.attr("id");
            console.log(dragId);
            if(dragId=='match'){
                console.log("correct")
                $(this).addClass('right');
                $('.happy').slideUp().fadeIn();
            } else{
                console.log("incorrect");
                $(this).addClass('wrong');
                $('.sad').slideUp().fadeIn();
            }
        }
  }); 

  }  //end here drag and drop 

  dragDrop();


  // Try Again

  $('#tryAgain').click(function(){
       location.reload();
  })

});