<?php

    $imie = $_POST['name'];
    $color = $_POST['color'];

    if(isset($imie) && isset($color)){
        try{
            require_once "dateLogin.php";

            $db = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password, [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            $insert = $db->prepare("INSERT INTO $db_table_user (name, color) VALUES('$imie', '$color')");
            $insert->execute();
            // echo 'dane zostały zapisane';
        } catch(PDOException $error){
            exit('Database error');
        }
    } else {
        header('Location: index.html');
        exit();
    }

?>