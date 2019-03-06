<?php
include('database.php');

$id = $_POST['id'];

$query = "SELECT * FROM tareas where id = $id";

$result = mysqli_query($connection,$query);

if(!$result) {

    die('consulta fallida');
}

$json = array();
 while ($row = mysqli_fetch_array($result)){   
     $json[] = array(
        'name' => $row['nombre'],
        'description' => $row['descripcion'],
        'id'=> $row['id']
     );
}

$jsonstring = json_encode($json[0]);
echo $jsonstring;


?>