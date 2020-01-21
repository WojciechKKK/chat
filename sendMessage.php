<?php 
    
    $imie = $_POST['name'];
    // $imie = htmlspecialchars(mysql_real_escape_string($_POST['name']));
    // sprawdzić to ! htmlspecialschars() oraz mysql_real_escape_string().
    // Zapobiegają one wpisaniu złośliwego kodu do pól tekstowych, które po wywołaniu z bazy danych mogłyby uszkodzić całą aplikację.
    $wiadomosc = $_POST['message'];

    $colorName = $_POST['colorName'];
    //blokada przed odpaleniem skryptu bez ustawionych zmiennych
    if(isset($imie) && isset($wiadomosc) && isset($colorName)){
        
        try{
            require_once "dateLogin.php";

            $db = new PDO("mysql:host=$host;dbname=$db_name", $db_user, $db_password, [
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
            $insert = $db->prepare("INSERT INTO $db_table (name, message, colorName) VALUES('$imie', '$wiadomosc', '$colorName')");
            $insert->execute();
            // echo 'dane zostały zapisane';
            
        } catch(PDOException $error){
            // echo $error->getMessage();
            // echo $error;
            exit('Database error');
        }

    } else{
        header('Location: index.html');
        exit();
    }

?>