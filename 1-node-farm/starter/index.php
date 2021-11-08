<?php
$xml_string = file_get_contents("./samplejob.xml");

$xml = simplexml_load_string($xml_string); 
$json = json_encode($xml); // convert the XML string to JSON
$array = json_decode($json,TRUE); 
echo $json;
// echo print_r($array);
// $xmldata = simplexml_load_file("./samplejob.xml") or die("Failed to load");
// print_r($xmldata);

// $xml = simplexml_load_string($xmldata);
// $json = json_encode($xml);
// $array = json_decode($json,TRUE);
// // print_r($array);
// $xml = simplexml_load_file("./samplejob.xml");
// echo xml2js($xml);

// function xml2js($xmlnode) {
//   $root = (func_num_args() > 1 ? false : true);
//   $jsnode = array();

//   if (!$root) {
//       if (count($xmlnode->attributes()) > 0){
//           $jsnode["$"] = array();
//           foreach($xmlnode->attributes() as $key => $value)
//               $jsnode["$"][$key] = (string)$value;
//       }

//       $textcontent = trim((string)$xmlnode);
//       if (count($textcontent) > 0)
//           $jsnode["_"] = $textcontent;

//       foreach ($xmlnode->children() as $childxmlnode) {
//           $childname = $childxmlnode->getName();
//           if (!array_key_exists($childname, $jsnode))
//               $jsnode[$childname] = array();
//           array_push($jsnode[$childname], xml2js($childxmlnode, true));
//       }
//       return $jsnode;
//   } else {
//       $nodename = $xmlnode->getName();
//       $jsnode[$nodename] = array();
//       array_push($jsnode[$nodename], xml2js($xmlnode, true));
//       return json_encode($jsnode);
//   }
// }   


?>