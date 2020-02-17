<?php
include './.env.php';

//Generate Bearer Token
	$public = TCG_PUBLIC_KEY;
	$private = TCG_PRIVATE_KEY;
	$appId = TCG_APP_ID;
	$ch = curl_init();

	$headers = array(
		"Content-Type: application/json",
		"Accept: application/json"
	);
	$fields = "grant_type=client_credentials&client_id=" . $public . "&client_secret=" . $private;

	curl_setopt($ch, CURLOPT_URL,"https://api.tcgplayer.com/token");
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

	$token = curl_exec ($ch);

	$the_json = json_decode($token);

	$bearer = $the_json->access_token;

	curl_close ($ch);

	//Set Game Name
	$categoryId = 27; //ID for DBS
	$productName = "Dragon Ball Super CCG";
	$ch = curl_init();
  $groupId = 2590; //Universal Onslaught Test

  $headers = array("Accept: application/json",
  	"Content-Type: application/json",
  	"Authorization: bearer ".$bearer
  );
  // List Different GETS
  $requestListAllCategoryRarities = "http://api.tcgplayer.com/v1.32.0/catalog/categories/". $categoryId ."/printings"; // Request GEt
  $requestGetGroupDetails = "http://api.tcgplayer.com/v1.32.0/catalog/products?categoryId=".$categoryId."&groupId=".$groupId."&limit=10000";


  // GET and print all the sets name

  curl_setopt($ch, CURLOPT_URL,$requestGetGroupDetails);
  curl_setopt($ch, CURLOPT_POST, 1);
  curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
  curl_setopt($ch, CURLOPT_HEADER, 0);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
  curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
  
  $result = curl_exec ($ch);

  $jsonDecode = json_decode($result, false);

  foreach($jsonDecode->results as $sets){
      if($sets->productId  !== null){
      	echo  
          "Product ID: " . $sets->productId . "<br>" .
          "Name: " . $sets->name . "<br>" .
      		"Clean Name: " . $sets->cleanName . "<br>" .
      		"Image URL: " . $sets->imageUrl . "<br>" .
          "Category Id: " . $sets->categoryId . "<br>" .
          "Group Id: " . $sets->groupId . "<br>" .
          "TCG URL: " . $sets->url . "<br>" .
          "Last Modified: " . $sets->modifiedOn . "<br><br>";
      }
  }

  $jsonEncode = json_encode($result);
	//Encoded Results
	// echo $jsonEncode;


   curl_close ($ch);