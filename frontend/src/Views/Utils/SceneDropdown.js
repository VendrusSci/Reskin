export function SceneDropdown(props){
    return(
        <select className='Skin-dropdown' value={props.scene} onChange={(e)=>{props.onSceneChange(e.target.value)}}>
            <option value="0">None</option>
            {props.showDefault &&
                <optgroup label="Default">
                    <option value="9">Arcane</option>
                    <option value="1">Earth</option>
                    <option value="11">Fire</option>
                    <option value="6">Ice</option>
                    <option value="8">Light</option>
                    <option value="5">Lightning</option>
                    <option value="10">Nature</option>
                    <option value="2">Plague</option>
                    <option value="7">Shadow</option>
                    <option value="4">Water</option>
                    <option value="3">Wind</option>
                </optgroup>
            }
            <optgroup label="Elemental Festival">
                <option value="36048">Arcanist's Domain</option>
                <option value="36759">Earthshaker's Domain</option> 
                <option value="35702">Flamecaller's Domain</option>
                <option value="39569">Gladekeeper's Domain</option>
                <option value="37882">Icewarden's Domain</option>
                <option value="35018">Lightweaver's Domain</option>
                <option value="36376">Plaguebringer's Domain</option>
                <option value="38411">Shadowbinder's Domain</option>
                <option value="35033">Stormcatcher's Domain</option>
                <option value="39215">Tidelord's Domain</option>
                <option value="38799">Windsinger's Domain</option>
            </optgroup>

            <optgroup label="Coliseum Venue">
                <option value="39684">Arena</option>
                <option value="39686">Blooming Grove</option>
                <option value="52050">Crystal Pools</option>
                <option value="54179">Forbidden Portal</option>
                <option value="55818">Forgotten Cave</option>
                <option value="54182">Ghostlight Ruins</option>
                <option value="37028">Golem Workshop</option>
                <option value="52051">Harpy's Roost</option>
                <option value="44049">Kelp Beds</option>
                <option value="41976">Mire</option>
                <option value="54178">Redrock Cove</option>
                <option value="39685">Sandswept Delta</option>
                <option value="51937">Silk-Strewn Wreckage</option>
                <option value="52049">Scorched Forest</option>
                <option value="39073">Training Fields</option>
                <option value="39683">Waterway</option>
                <option value="43921">Woodland Path</option>
            </optgroup>

            <optgroup label="Event">
                <option value="39745">8th Anniversary</option>
                <option value="40841">Armory</option>
                <option value="40824">Battlefield</option>
                <option value="53737">Cabinet of Curiosities</option>
                <option value="49890">Deep Space</option>
                <option value="41418">Drakeharvest</option>
                <option value="37359">Dusty Attic</option>
                <option value="42686">Enchanted Dungeon</option>
                <option value="48173">Enchanted Library</option>
                <option value="46542">Foundry Battle</option>
                <option value="42541">Frigidfin Expedition</option>
                <option value="46543">Hall of Armor</option>
                <option value="42685">Haunted Museum</option>
                <option value="49891">Polar Bear Ice Castle</option>
                <option value="47042">Port Town</option>
                <option value="34848">Remembrance</option>
                <option value="43685">Springswarm</option>
                <option value="37361">Strange Chests</option>
                <option value="54812">Sweetheart Basket</option>
                <option value="40825">Target Practice</option>
                <option value="35959">Voyage of the Tenacity</option>
                <option value="48174">Witch's Kitchen</option>
            </optgroup>

            <optgroup label="Achievements">
                <option value="50692">Bleached Roots</option>
                <option value="50693">Lilypad Pool</option>
                <option value="50694">Cottage Garden</option>
                <option value="50695">Roadside Tavern</option>
                <option value="50696">Art Studio</option>
                <option value="50697">Crystal Shop</option>
            </optgroup>

            <optgroup label="Seasonal">
                <option value="47090">Autumn</option>
                <option value="52963">Autumn Storm</option>
                <option value="48995">Spring</option>
                <option value="52965">Spring Day</option>
                <option value="45956">Summer</option>
                <option value="52966">Summer Sunset</option>
                <option value="48233">Winter</option>
                <option value="52964">Winter Night</option>
            </optgroup>

            <optgroup label="Other">
                <option value="44082">Ancient Harpy Canyon</option>
                <option value="34837">Autumn Clearing</option>
                <option value="45486">Cartographer's Office</option>
                <option value="47663">Elder Sea</option>
                <option value="38215">Flowering Wasteland</option>
                <option value="34838">Foxfire Grove</option>
                <option value="34839">Frostbite Falls</option>
                <option value="53082">Frozen Tunnel</option>
                <option value="43382">Garden Arches</option>
                <option value="48120">Harpy City</option>
                <option value="38283">Lovebird Landscape</option>
                <option value="34842">Moonbeam Aqueduct</option>
                <option value="34841">Pillow Palace</option>
                <option value="50939">Progression of Flowers</option>
                <option value="37360">Quaint Parlor</option>
                <option value="34843">Rocky Refuge</option>
                <option value="34844">Royal Chambers</option>
                <option value="37865">Serpent Shrine</option>
                <option value="34845">Shoreline Serenity</option>
                <option value="34846">Starksand Dunes</option>
                <option value="39895">Sunparched Prowl</option>
                <option value="42764">Thunder Lizards</option>
                <option value="34847">Titan's Fall</option>
                <option value="34840">Webfiend Cave</option>
                
            </optgroup>
        </select>
    );
}