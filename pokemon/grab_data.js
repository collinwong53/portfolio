function GrabData() {
    var self = this;
    /***************************************************************************************************
     * grab card api - gets the information from the card api
     * @param  {data}
     * @returns {data.cards}
     * @calls {undefined}
     */
    this.makePokemonObject = function (data) {
        availableCards = data.cards; //store cards in global for future use
    };
    // this.failedToGetData = function (data) {
    //     console.log('failed', data);
    // };
    /***************************************************************************************************
     * grab card api - gets the information from the card api
     * @param  {undefined} none
     * @returns {an object of pokemon cards} none
     * @calls {make_pokemon_object or failed to get data through promises} none
     */
    this.getCardData = function () {
        var promise = {
            then: function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
            }
        };
        $.ajax({
            dataType: 'json',
            url: 'https://api.pokemontcg.io/v1/cards?page=5&pageSize=1000',
            method: 'get',
            success: function (data) {
                if (data !== undefined) {
                    promise.resolve(data);
                }
            },
            error: function (data) {
                promise.reject(data);
            }
        });
        return promise;
    };
    this.randomNumberGen = function (endNum) {
        var number = Math.floor(Math.random() * endNum + 1) //random number generator to select random cards
        return number;
    };
    /***************************************************************************************************
     * make pokemon - creates pokemon object with stats for use in game
     * @param  {undefined}
     * @returns {a pokemon object with stats based on cards}
     * @calls {this.pick_attack to pick an attack from card}
     */
    this.makePokemon = function () {
        var randomPick = this.randomNumberGen(1000);
        var pokeData = {};
        var pokemonCard = availableCards[randomPick]; //pick random pokemo
        pokeData.name = pokemonCard.name; //set stats
        pokeData.hp = pokemonCard.hp || false;
        pokeData.image = pokemonCard.imageUrl;
        pokeData.type = pokemonCard.types;
        pokeData.attack = this.pickAttack(pokemonCard.attacks);
        if (pokeData.hp === false || pokeData.attack === false || pokeData.name.indexOf("-EX") !== -1 || pokeData.name.indexOf("-GX") !== -1) {
            return this.makePokemon(); //if card is unusable search again
        }
        return pokeData; //return completed object
    };
    this.pickAttack = function (cardAttack) {
        if (cardAttack === undefined) { //if no attack value in pokemon card exist dont use
            return false;
        }
        for (var i = 0; i < cardAttack.length; i++) { //find first attack in array and use its damage value
            if (cardAttack[i].damage !== "" && Number(cardAttack[i].damage)) {
                return cardAttack[i].damage
            } else {
                return false;
            }
        }
    }; //end pick attack
    this.resolvePokeDB = function (data, player) { //if get pokemonDB succeeds append the text to the player stats display
        $(player).append('<ul>');
        for (var item in data) {
            var pokeInfo = $('<li>').append(item + " : " + data[item]);
            $(player + ' ul').append(pokeInfo);
        }
    };
    // this.rejectPokeDB = function (data) {
    //     console.log('error');
    // };
    /***************************************************************************************************
     * grab pokemon api - gets the information from the pokemon api
     * @param  {pokemon name and the player} none
     * @returns {information about the pokemon} none
     * @calls {resolve_pokeDB or reject_pokeDB} none
     */
    this.getPokemonDB = function (pokemon, player) {
        var promise = {
            then: function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
            }
        };
        $.ajax({
            url: 'https://collindev.com/pokey_proxy/pokeyproxy.php?name=' + pokemon,
            dataType: 'text',
            success: function (data) {
                var page = new DOMParser().parseFromString(data, 'text/html'); //grabs the table information from site
                var pokemonObj = {
                    name: pokemon
                }; //grabs the text in the table to pass on in an object
                var pokeDataRows = $(page).find('.vitals-table tr');
                pokeDataRows.each(function () {
                    var header = $(this).find('th').text();
                    var data = $(this).find('td').text();
                    pokemonObj[header] = data;
                });
                promise.resolve(pokemonObj, player) //pass to promise resolve
            },
            error: function (data) {
                promise.reject(data);
            }
        });
        return promise;
    }
}