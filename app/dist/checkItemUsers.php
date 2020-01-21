<?php
 try {
     require_once "dateLogin.php";
     $db= new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
     $query = $db->prepare("SELECT COUNT(id) FROM $db_table_user ");
     $query ->execute();
     $result = $query->fetchColumn();
     $query -> closeCursor();
     echo $result;
 } catch(PDOException $error){
    // echo $error->getMessage();
    // echo $error;
    exit('Database error');
}

?>