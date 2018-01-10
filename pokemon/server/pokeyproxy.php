<?php
/**
 * Created by PhpStorm.
 * User: collin
 * Date: 10/10/17
 * Time: 4:42 PM
 */

header("Access-Control-Allow-Origin: *");
$pokemon_name = addslashes($_GET['name']);
readfile("https://pokeapi.co/api/v2/pokemon/${$pokemon_name}/");