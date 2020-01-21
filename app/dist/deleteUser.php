<?php

$actuallyUser = $_POST['user'];
    
if(isset($actuallyUser)){
    try {
        require_once "dateLogin.php";
        $db= new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
        $query = $db->prepare("DELETE FROM $db_table_user WHERE $db_table_user.`name` = '$actuallyUser' ");
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