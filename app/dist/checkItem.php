<?php

$actuallyUserDate = $_GET['dateInfo'];


if(isset($actuallyUserDate)){
    try {
        require_once "dateLogin.php";
        $db= new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
        $query = $db->prepare("SELECT COUNT(id) FROM $db_table WHERE date >= '$actuallyUserDate' ");
        $query ->execute();
        $result = $query->fetchColumn();
        $query -> closeCursor();
        echo $result;
    } catch(PDOException $error){
       // echo $error->getMessage();
       // echo $error;
       exit('Database error');
   }
} else {
    header('Location: index.html');
    exit();
}


?>