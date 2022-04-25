let submit = $("submit");
let input = $("input");
let inputContainer = $("input-container");
let outputContainer = $("output-container");
let p = getParam("pokemon");

// check if a parameter was passed to the page
if (p !== null && p !== undefined && p !== "") {
    // set up random number generator
    let rand = seed(p);

    // generate types
    let primaryType = rand() % pokeTypes.length;
    let secondaryType = rand() % pokeTypes.length;

    // generate base stats
    let baseStats = {};
    for(let i = 0; i < 6; i++) {
        baseStats[i] = Math.floor(randBetween(rand(), 20, 190));
    }

    // generate the pokédex number
    let dexNo = Math.floor(randBetween(rand(), 1, 999));

    // generate the species from a list of pokédex entries (in data.js)
    let species = allSpecies[Math.floor(randBetween(rand(), 0, allSpecies.length))] + " Pokémon";

    // generate height & weight
    let height = Math.floor(randBetween(rand(), 0, 12)) + "'" + (Math.floor(randBetween(rand(), 0, 12))).toString().padStart(2, '0') + "\"";
    let weight = Math.floor((randBetween(rand(), 0, 255) * 2.205) * 10) / 10;

    // generate the description, based on type - two sentences, each from a random pokédex entry of a pokémon of the same type
    let description1 = descriptions[pokeTypes[primaryType]][Math.round(randBetween(rand(), 0,
        descriptions[pokeTypes[primaryType]].length - 1))].split(".")[0] + ".";

    let description2 = descriptions[pokeTypes[secondaryType]][Math.round(randBetween(rand(), 0,
        descriptions[pokeTypes[secondaryType]].length - 1))].split(".")[0] + ".";

    // now populate all the fields
    input.value = p;

    $("name").innerText = p;
    $("number").innerText = "• " + dexNo.toString().padStart(3, '0');

    let primaryDiv = $("primary-type"), secondaryDiv = $("secondary-type");
    primaryDiv.innerText = pokeTypes[primaryType];
    primaryDiv.style.backgroundColor = typeColours[primaryType];
    if(primaryType !== secondaryType) {
        secondaryDiv.innerText = pokeTypes[secondaryType];
        secondaryDiv.style.backgroundColor = typeColours[secondaryType];
    } else {
        secondaryDiv.style.display = "none";
    }


    $("height").innerText = height;
    $("weight").innerText = weight + "lbs.";

    $("species").innerText = species;

    $("description").innerText = description1 + " " + description2;

    $("base-hp").innerText = baseStats[0];
    $("base-attack").innerText = baseStats[1];
    $("base-defence").innerText = baseStats[2];
    $("base-special-attack").innerText = baseStats[3];
    $("base-special-defence").innerText = baseStats[4];
    $("base-speed").innerText = baseStats[5];

    $("intro").remove();

    // populate the twitter link
    let link = $("link");
    let types = pokeTypes[primaryType];
    if(primaryType !== secondaryType) {
        types += " & " + pokeTypes[secondaryType];
    }
    link.setAttribute("data-text", p + ": The " + species + "\n" + (types) + "\n" + description1 + "\n\nGenerate your own Pokémon:");
    link.setAttribute("data-url", "https://adamjle.github.io/pokedex?pokemon=" + p);

    $("twitter-share").style.display = "block";

    // animate input bar
    setTimeout(() => {
        inputContainer.style.transform = "translateY(0)";

        // then animate pokédex entry
        setTimeout(() => {
            outputContainer.style.opacity = "1";
            outputContainer.style.transform = "translateY(0)";
            outputContainer.style.pointerEvents = "all";

            // animate the share button a few seconds later
            setTimeout(() => {
                $("twitter-share").style.opacity = "1";
            }, 5000);
        }, 200);
    }, 50);

    // display the output
    outputContainer.style.display = "block";

}

// attach submit listener to redirect to a param'd page
submit.onclick = () => {
    window.location.href = "?pokemon=" + input.value;
};
// set up key listener for "return" key
input.onkeypress = (e) => {
    if(e.keyCode === 13) {
        submit.onclick();
    }
};