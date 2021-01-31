// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDYg-WRPZseC9CUFQGXJVVqdLU23KuG9fw",
    authDomain: "learningtime-8938a.firebaseapp.com",
    databaseURL: "https://learningtime-8938a-default-rtdb.firebaseio.com",
    projectId: "learningtime-8938a",
    storageBucket: "learningtime-8938a.appspot.com",
    messagingSenderId: "736036474381",
    appId: "1:736036474381:web:eed09a299fe74d796d0f44"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


$(document).ready(function(){
	readdata();

	$("#md-save").click(function(){
		var nm=$("#md-name").val();
		var em=$("#md-email").val();
		var ms=$("#md-msg").val();
		var uid=$("#md-uid").val();

		firebase.database().ref('clientdetails/'+uid).update({
  		name: nm,
  		email: em,
  		message: ms
		});

	});
	

$("#file-upload").change(function(e){
			var file     = e.target.files[0];
			var filename = file.name;
			var name     = document.getElementById('exampleFormControlInput1').value;
			if(name==''){
				alert('Pls provide name then upload your file!');
				document.forms['clientdetails'].elements['file'].value='';
			}
			else{
				firebase.storage().ref(`${name}/`+filename).put(file);
			}
});


$("#client-form").submit(function(e){
		e.preventDefault();
		var email	=	document.forms['clientdetails'].elements['clientemail'].value;
		var name	=	document.forms['clientdetails'].elements['clientname'].value;
		var msg		=	document.forms['clientdetails'].elements['clientmsg'].value;


	firebase.database().ref('clientdetails/').push().set({
    name: name,
    email: email,
    message: msg
  });



	document.forms['clientdetails'].elements['clientemail'].value='';
	document.forms['clientdetails'].elements['clientname'].value='';
	document.forms['clientdetails'].elements['clientmsg'].value='';
	document.forms['clientdetails'].elements['file'].value='';

});

});

function deletedata(name){
	firebase.database().ref('clientdetails/'+name).remove();
}

function updatedata(uid,clname,clemail,clmsg){
	$("#md-name").val(clname);
	$("#md-email").val(clemail);
	$("#md-msg").val(clmsg);
	$("#md-uid").val(uid);
}

function readdata(){
	firebase.database().ref('clientdetails/').on('value',(snapshot)=>{ 
		var data = snapshot.val();  
		var html = '';
		for(var i in data){
			
			var uid					=	i;
			var clientname	=	data[i].name;
			var clientemail	=	data[i].email;
			var clientmsg   = data[i].message;
			var dl          = `onclick="deletedata('${uid}')"`;
			var up          = `onclick="updatedata('${uid}','${clientname}','${clientemail}','${clientmsg}')"`;

			html	+="<tr> <td>"+clientname+"</td> <td>"+clientemail+"</td>  <td>"+clientmsg+"</td> <td><button type='button' class='btn-primary' data-bs-toggle='modal' data-bs-target='#exampleModal' "+up+">Update</button></td> <td><button class='btn-primary' "+dl+">Delete</button></td> </tr>";
		}
		$("#displaydata-body").html(html);
	});
}

