<?php
include('database.php');

echo $_POST['id'];
echo $_POST['name'];
echo $_POST['description'];
$id =  $_POST['id'];
$name =  $_POST['name'];
$description = $_POST['description'];

$query = "UPDATE tareas SET nombre = '$name' , descripcion = '$description'  WHERE id = '$id' ";



$result = mysqli_query($connection,$query);

if(!$result) {
die('Consulta invalida');


}


echo "Tarea Actualizada satisfactoriamente";


?>