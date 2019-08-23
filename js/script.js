$(function() {

  let index = 0;


  $("#activityText").text(header);
  $('.wrapper').css({'outline':borderColor});
  $('body').css({'background':bgColor});
  $('#LetterText').text(alphabate);

  // url value
  let url = window.location.href;
  if(url.indexOf('?') > 0){
    let params = new URLSearchParams(url.substring(1));
    index = parseInt(params.get('qno'));
    console.log("available....");
  }else{
    console.log("not available...");
     let mainAudio = new Audio(data[0].audio);
     mainAudio.play();
  }
  
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
                let audioData = new Audio(wellDone);
                audioData.play();
                  if(index == data.length-1){
                    $('#next').hide();
                  }else{
                    $('#next').fadeIn();
                  }
            } else{
                console.log("incorrect");
                $(this).addClass('wrong');
                $('.sad').slideUp().fadeIn();
                let audioData = new Audio(tryAgain);
                audioData.play();
            }
        }
  }); 

  }  //end here drag and drop 



  let questionHtml = '';

  // function to load the data
  function loadData(){
      let question = data[index].question;

      // to append the questions
      $.each(question, function( index, value ) {
        let x = `<div class="suggData"><span>${value}</span></div>`;
        questionHtml = questionHtml +x;
      });
      console.log(question);
      $('.dropSuggestions').html(questionHtml);
      
      // to play audio
      let mainAudio = new Audio(data[index].audio);
      mainAudio.play();
      // to append the suggestions
      let suggHtml = `<div id="match" class="suggData dragg"><span>${data[index].corrAns}</span></div>
                     <div class="suggData suggData1 dragg"><span>${data[index].sugg1}</span></div>
                     <div class="suggData suggData2 dragg"><span>${data[index].sugg2}</span></div>`;
      $('.suggestionContainer').html(suggHtml);

      // to append the img
      $('.imgContainer').html(`<img id="image" src="${data[index].img}" class="animated zoomIn slow">`);
  }  // end function to load the data


  // function to generate random index
  function randomsuggestion(){
   $('#match').css({  'order': Math.floor((Math.random() * 3) + 1)});
   $('.suggData1').css({  'order': Math.floor((Math.random() * 3) + 1)});
   $('.suggData2').css({  'order': Math.floor((Math.random() * 3) + 1)});
  }  // end function to generate random index

  loadData();
  dragDrop();
  randomsuggestion();

  $('#tryAgain').click(function(){
       location.reload();
  })

  $('#next').click(function(){
    console.log("i am the next one...");
    let audioData = new Audio(beepSound);
    audioData.play();
    index++;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;

    setTimeout(function(){
      window.location.href = newurl;
    },500)
    
  })

  $('#prev').click(function(){
    console.log("i am the next one...");
    let audioData = new Audio(beepSound);
    audioData.play();
    index--;
    let url2 = window.location.pathname;
    var newurl = url2 + `?data=all&qno=${index}`;
    setTimeout(function(){
      window.location.href = newurl;
    },500)
  })

  if(index > 0){
    $('#prev').fadeIn();
  }else{
     $('#prev').hide();
  }

  if(index > 0){
    $('#next').fadeIn();
  }
  if(index == data.length-1){
    $('#next').hide();
  }

});