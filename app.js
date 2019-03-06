$(document).ready(function(){
let edit = false;
  fetchTasks();
$('#task-result').hide();   
$('#search').keyup(function(e){
 
if($('#search').val()){

   let search = $('#search').val();
   console.log(search);
   $.ajax({
     url: 'task-search.php',
     type:'POST',
     data: { search },
     success: function(response){
        
      let tasks = JSON.parse(response);
      let template = '';
      tasks.forEach(task => {
          template += `<li>
          ${task.name}
          </li>`


      });

      $('#container').html(template);
      $('#task-result').show(); 
   
     }


   });



}

 
  

});

$('#task-form').submit(function(e){
 
const postData = {
     name: $('#name').val(),
     description: $('#description').val(),
     id: $('#taskId').val()

};

let url = edit === false ? 'task-add.php' : 'task-edit.php';
console.log(url);

$.post(url,postData,function(response){

  console.log(response);
  fetchTasks();

   $('#task-form').trigger('reset');
});

e.preventDefault();

});

function fetchTasks() {

  $.ajax({
    url: 'task-list.php',
    type: 'GET',
    success: function(response){
   let task = JSON.parse(response);
   let template= '';
   task.forEach(task =>{
       template += `
         <tr taskId="${task.id}">
         <td>${task.id}</td>
         <td>
         <a href="#" class="task-item">${task.name}</a>
         
         </td>
         <td>${task.description}</td>
         <td>  
         <button class="task-delete btn btn-danger">Eliminar
         </button> 
         
         </td>
         
         
         
         </tr>
       
       
       `
 
 
   });
 
   $('#tasks').html(template);
 
    }
 
 })




}

$(document).on('click','.task-delete', function(){ //cuando se haga clic sobre alguno de los btones con la clase task delete
 if(confirm('estas seguro de querer eliminarlo')){

  let element = $(this)[0].parentElement.parentElement; //obtenemos la fila del boton que fue clicqueado
  let id = $(element).attr('taskId'); //obtenemos la propiedad llamada task id de ese elemento
  $.post('task_delete.php', {id} , function (response) { //enviamos variable al backend y pasamos un funcion para escuhcar la respuesta
    console.log(response);
    fetchTasks();

  })
}


});


$(document).on('click','.task-item', function(){

let element = $(this)[0].parentElement.parentElement;
let id= $(element).attr('taskId');

$.post('task-single.php', {id} ,function(response){
const task = JSON.parse(response);
$('#name').val(task.name);
$('#description').val(task.description);
$('#taskId').val(task.id);
edit = true;

})

});



});