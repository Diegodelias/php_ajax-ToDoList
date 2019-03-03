<?php

include('database.php');

if (isset($_POST['name'])){

    $name = $_POST['name'];
    $description= $_POST['description'];
    $query = "INSERT into tareas (nombre,descripcion) VALUES ('$name', '$description')";
    $result = mysqli_query($connection,$query);
    if(!$result){
        die('La consulta ha fallado');


    }
    echo "Tarea agrgada satisfactoriamente";

}
?>