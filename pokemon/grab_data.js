
function Grab_data(){
    var self = this;
    /***************************************************************************************************
     * grab card api - gets the information from the card api
     * @param  {data}
     * @returns {data.cards}
     * @calls {undefined}
     */
    this.make_pokemon_object = function(data){
        available_cards = data.cards;//store cards in global for future use
    }
    this.failed_to_get_data = function(data){
        console.log('failed',data);
    }
    /***************************************************************************************************
     * grab card api - gets the information from the card api
     * @param  {undefined} none
     * @returns {an object of pokemon cards} none
     * @calls {make_pokemon_object or failed to get data through promises} none
     */
    this.get_card_data = function(){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            dataType:'json',
            url:'https://api.pokemontcg.io/v1/cards?page=5&pageSize=1000',
            method: 'get',
            success:function(data){
                if(data !== undefined){
                    promise.resolve(data);
                }
            },
            error:function(data){
                promise.reject(data);
            }
        })//end call
        return promise;
    }//get get data
    this.random_number_gen = function(end_num){
        var number = Math.floor(Math.random()*end_num+1)//random number generator to select random cards
        return number;
    }
    /***************************************************************************************************
     * make pokemon - creates pokemon object with stats for use in game
     * @param  {undefined}
     * @returns {a pokemon object with stats based on cards}
     * @calls {this.pick_attack to pick an attack from card}
     */
    this.make_pokemon = function(){
        var random_pick = this.random_number_gen(1000);
        var pokeData = {};
        var pokemon_card = available_cards[random_pick];//pick random pokemo
        pokeData.name = pokemon_card.name;//set stats
        pokeData.hp = pokemon_card.hp || false;
        pokeData.image = pokemon_card.imageUrl;
        pokeData.type = pokemon_card.types;
        pokeData.attack = this.pick_attack(pokemon_card.attacks);
        if(pokeData.hp === false || pokeData.attack===false || pokeData.name.indexOf("-EX") !==  -1 || pokeData.name.indexOf("-GX") !==  -1){
            return this.make_pokemon();//if card is unusable search again
        }
        return  pokeData;//return completed object
    };
    this.pick_attack = function(card_attack){
        if(card_attack===undefined){//if no attack value in pokemon card exist dont use
            return false;
        }
        for(var i = 0; i<card_attack.length; i++){//find first attack in array and use its damage value
            if(card_attack[i].damage !== "" && Number(card_attack[i].damage)){
                return card_attack[i].damage
            }
            else{
                return false;
            }
        }
    }//end pick attack
    this.resolve_pokeDB = function(data,player){//if get pokemonDB succeeds append the text to the player stats display
        $(player).append('<ul>');
        for(var item in data){
            var poke_info = $('<li>').append(item + " : " + data[item]);
            $(player +' ul').append(poke_info);
        }
    }
    this.reject_pokeDB = function(data){
        console.log('error');
    }
    /***************************************************************************************************
     * grab pokemon api - gets the information from the pokemon api
     * @param  {pokemon name and the player} none
     * @returns {information about the pokemon} none
     * @calls {resolve_pokeDB or reject_pokeDB} none
     */
    this.get_pokemonDB = function(pokemon,player){
        var promise = {
            then:function(resolve,reject){
                this.resolve = resolve;
                this.reject = reject;
            }
        }
        $.ajax({
            url: 'http://danielpaschal.com/pokeyproxy.php?name='+pokemon,
            dataType: 'text',
            success: function(data){
                var page = new DOMParser().parseFromString(data,'text/html');//grabs the table information from site
                // console.log('test text: ',page);
                var pokemonObj = {name: pokemon};//grabs the text in the table to pass on in an object
                var pokedataRows = $(page).find('.vitals-table tr');
                pokedataRows.each(function(){
                    var header = $(this).find('th').text();
                    var data = $(this).find('td').text();
                    pokemonObj[header] = data;
                });
                promise.resolve(pokemonObj,player)//pass to promise resolve
            },
            error: function(data){
                promise.reject(data);
            }
        })
        return promise;
    }
}

