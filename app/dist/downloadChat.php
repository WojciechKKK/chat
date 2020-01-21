<?php

$actuallyUserDate = $_GET['dateInfo'];
$actuallyUserName = $_GET['loginName'];

if(isset($actuallyUserDate) && isset($actuallyUserName)){
    try{

        require_once "dateLogin.php";
        $db = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password);
    
        $query = $db->prepare("SELECT * FROM $db_table");
        $query ->execute();
    
        while($fetch = $query->fetch(PDO::FETCH_ASSOC)){
        $name = $fetch['name'];
        $message = $fetch['message'];
        $colorName = $fetch['colorName'];
        $date = $fetch['date'];  
    
        if($actuallyUserDate <= $date ){
            $dateHourTimeSec = substr($date, 11, strlen($date));
            if($actuallyUserName == $name){
                echo "<li class='allMessages-element'><p class='allMessages-info myMessage'><b class='allMessages-name' style=color:" .$colorName.">".$name."</b><i class='allMessages-date'>".$dateHourTimeSec."</i><br />".$message."</p></li>";
            } else if (!$message){
                echo "<li class='allMessages-element'><p class='allMessages-info joined'><b class='allMessages-name' style=color:" .$colorName.">".$name."</b><i class='allMessages-date'>".$dateHourTimeSec."</i><br />".$message."</p></li>";
            } else {
                echo "<li class='allMessages-element'><p class='allMessages-info'><b class='allMessages-name' style=color:" .$colorName.">".$name."</b><i class='allMessages-date'>".$dateHourTimeSec."</i><br />".$message."</p></li>";
            }
        }
    }
    
    
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