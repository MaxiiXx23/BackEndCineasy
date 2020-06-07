

function updateTextArea() { 
    
  if ($("input:checked").length >=1 )
    {
      $(".seatStructure *").prop("disabled", true);
      
     var allNameVals = [];
     var allNumberVals = [];
     var allSeatsVals = [];
  
     //Storing in Array
     allNameVals.push($("#Username").val());
     allNumberVals.push($("#Numseats").val());
     $('#seatsBlock :checked').each(function() {
       allSeatsVals.push($(this).val());
     });
    
     //Displaying 
     $('#nameDisplay').val(allNameVals);
     $('#NumberDisplay').val(allNumberVals);
     $('#seatsDisplay').val(allSeatsVals);
    }
  else
    {
      alert("Por favor selecione um assento")
    }
  }

  $(document).ready(function() {
    $(".seats").click(function(e) {
        var checados = [];
        $.each($("#seatsBlock :checked"), function(){            
            checados.push($(this).val());
        });
        const allNameVals = checados.join(", ")
        $('#nameDisplay').val(allNameVals);
        console.log(checados.join(", "));
    });
});