<?php


    $host = "s

    try{

        $db = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
    
        $query = $db->prepare("SELECT * FROM $db_table");
        $query ->execute();
    
        while($fetch = $query->fetch(PDO::FETCH_ASSOC)){
        $name = $fetch['name'];
        $message = $fetch['message'];
        $colorName = $fetch['colorName'];
        $date = $fetch['date'];  
    
        echo $name;
    }
    
    
    } catch(PDOException $error){
        // echo $error->getMessage();
        // echo $error;
        exit('Database error');
    }





?>
