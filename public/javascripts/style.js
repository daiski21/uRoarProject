$('#delete').on('click', function(e){
  e.preventDefault();

  $('input:checked').each(function(index, value){
    var val = $(this).attr('id');
    console.log($(this));
    var $thisInput = $(this);

    $.ajax({
      url:'/'+val+'/edit',
      type:'DELETE'
    }).done(function(){
      $thisInput.parents('tr').remove();
      fetch('/api/v1/items/count').then(function(res){
		res.json().then(function(count){
			console.log('count', count)
			var totalCount = document.getElementById('totalCount');
			setTimeout(function() {
				totalCount.innerHTML = count.count;
			}, 500)
			
		});
	  });
    });

  });

});	

$('#searchbtn').on('click', function(e){
  e.preventDefault();
  var inputbox = document.getElementById("searchbox").value;
  var filterbox = document.getElementById("filter").value;
  inputbox = $.trim(inputbox);
  console.log(inputbox);
  if(inputbox != ""){
  	fetch('/api/v1/items?query={"'+ filterbox +'":"~('+ inputbox +')"}').then(function(res) {
	    res.json().then(function(items) {	
	      console.log('items', items);
	      var tbody = document.getElementById('table-body');
	      if(items.length > 0){
	      	  $('#table-body').html('');
		      items.forEach(function(items) {
		        tbody.insertAdjacentHTML('beforeend', '<tr><td><a href="/' 
	        	+ items._id + '">' + items.name + '</td><td>'
	        	+ items.description + '</td><td>' 
	        	+ items.price + '</td><td>' 
	        	+ items.category + '</td><td>' 
	        	+ items.user + '</td><td>' 
	        	+ items.date + '</td></tr>' );
		      });
		  } 
	    })
	});

  } else{
  	fetch('/api/v1/items?sort=date').then(function(res) {
	    res.json().then(function(items) {	
	      console.log('items', items);
	      var tbody = document.getElementById('table-body');
	      $('#table-body').html('');
	      items.forEach(function(items) {
	        tbody.insertAdjacentHTML('beforeend', '<tr><td><a href="/' 
	        	+ items._id + '">' + items.name + '</td><td>'
	        	+ items.description + '</td><td>' 
	        	+ items.price + '</td><td>' 
	        	+ items.category + '</td><td>' 
	        	+ items.user + '</td><td>' 
	        	+ items.date + '</td></tr>' );

	      });
	    })
	 });
  }
});

$(document).ready(function() {



	if (window.location.pathname === '/') {
			  fetch('/api/v1/items?sort=date').then(function(res) {
			    res.json().then(function(items) {	
			      console.log('items', items);
			      var tbody = document.getElementById('table-body');
			      items.forEach(function(items) {
			        tbody.insertAdjacentHTML('beforeend', '<tr><td><a href="/' 
			        	+ items._id + '">' + items.name + '</td><td>'
			        	+ items.description + '</td><td>' 
			        	+ items.price + '</td><td>' 
			        	+ items.category + '</td><td>' 
			        	+ items.user + '</td><td>' 
			        	+ items.date + '</td></tr>' );

			      });
			    })
			  });

			  fetch('/api/v1/items/count').then(function(res){
				res.json().then(function(count){
					console.log('count', count)
					var totalCount = document.getElementById('totalCount');
					setTimeout(function() {
						totalCount.innerHTML = count.count;
					}, 500)
					
				});
			  });
	}
	if (window.location.pathname === '/me') {
			var user = document.getElementById("user").value;
			  fetch('/api/v1/items?query={"user":"~('+ user +')"}').then(function(res) {
			    res.json().then(function(items) {	
			      console.log('items', items);
			      var tbody = document.getElementById('table-body');
			      items.forEach(function(items) {
			        tbody.insertAdjacentHTML('beforeend', '<tr><td> <input type="checkbox" id="' + items._id + '" />  </td><td><a href="/' 
			        	+ items._id + '">' + items.name + '</td><td>'
			        	+ items.description + '</td><td>' 
			        	+ items.price + '</td><td>' 
			        	+ items.category + '</td><td>' 
			        	+ items.user + '</td><td>' 
			        	+ items.date + '</td><td><a href="/' 
			         	+ items._id + '/edit">' + 'Edit' + '</td></tr>');

			      });
			    })
			  });
	}
	
});