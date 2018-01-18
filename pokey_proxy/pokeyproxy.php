<?php
header("Access-Control-Allow-Origin: *");
$pokemon_name = addslashes($_GET['name']);
if(empty($pokemon_name)){
        print(json_encode(['success'=>false]));
}
//readfile("https://pokeapi.co/api/v2/pokemon/{$pokemon_name}");
readfile("https://pokemondb.net/pokedex/{$pokemon_name}");
?>