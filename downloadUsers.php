<?php

$example = $_GET['nameExample'];

if(isset($example)){
    try{
        require_once "dateLogin.php";
        $db = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
        
        $query = $db -> prepare("SELECT * FROM $db_table_user");
        $query -> execute();
    
        while($fetch = $query->fetch(PDO::FETCH_ASSOC)){
            $name = $fetch['name'];
            $color = $fetch['color'];
            echo "<i class='actuallyUsers-el' style=color:".$color.">".$name."</i>";
        }
    } catch(PDOException $error){
        exit('Database error');
    }
} else {
    header('Location: index.html');
    exit();
}


?>




