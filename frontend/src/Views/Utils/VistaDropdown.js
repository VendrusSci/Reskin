export function VistaDropdown(props){
    return(
        <select className='Skin-dropdown' value={props.vista} onChange={(e)=>{props.onVistaChange(e.target.value)}}>
            <option value="0">None</option>
            <optgroup label="Elemental Festival">
                <option value="88">Lightweaver</option>
                <option value="93">Stormcatcher</option>
                <option value="95">Flamecaller</option>
                <option value="96">Arcanist</option>
                <option value="99">Plaguebringer</option>
                <option value="100">Earthshaker</option>
                <option value="106">Icewarden</option>
                <option value="108">Shadowbinder</option>
                <option value="109">Windsinger</option>
                <option value="110">Tidelord</option>
                <option value="113">Gladekeeper</option>

                <option value="51">Brightshine Jubilee</option>
                <option value="53">Thundercrack Carnivale</option>
                <option value="55">Flameforger's Festival</option>
                <option value="57">Starfall Celebration</option>
                <option value="60">Riot of Rot</option>
                <option value="63">Rockbreaker's Ceremony</option>
                <option value="76">Crystalline Gala</option>
                <option value="80">Trickmurk Circus</option>
                <option value="84">Mistral Jamboree</option>
                <option value="85">Wavecrest Saturnalia</option>
                <option value="87">Greenskeeper Gathering</option>
            </optgroup>

            <optgroup label="Coliseum">
                <option value="26">Training Fields</option>
                <option value="27">Woodland Path</option>
                <option value="28">Scorched Forest</option>
                <option value="29">Sandswept Delta</option>
                <option value="30">Forgotten Cave</option>
                <option value="31">Bamboo Falls</option>
                <option value="32">Waterway</option>
                <option value="33">Arena</option>
                <option value="35">Rainsong Jungle</option>
                <option value="36">Boreal Wood</option>
                <option value="38">Harpy's Roost</option>
                <option value="39">Crystal Pools</option>
                <option value="41">Ghostlight Ruins</option>
                <option value="42">Mire</option>
                <option value="43">Kelp Beds</option>
                <option value="44">Golem Workshop</option>
                <option value="59">Redrock Cove</option>
                <option value="77">Volcanic Vents</option>
                <option value="86">Training Fields II</option>
                <option value="94">Blooming Grove</option>
                <option value="98">Arena II</option>
                <option value="107">Waterway II</option>
                <option value="116">Thunderhead Savannah</option>
                <option value="123">Boreal Wood II</option>
                <option value="129">Forbidden Portal</option>
                <option value="131">Forgotten Cave II</option>
                <option value="146">Mire II</option>
                <option value="193">Silk-Strewn Wreckage</option>
                <option value="190">Talonok</option>
            </optgroup>

            <optgroup label="Recurring Event">
                <option value="67">Conjurer's Hat</option>
                <option value="68">Gossamer Flame</option>
                <option value="69">Glowing Globs</option>
                <option value="70">Feral Visage</option>
                <option value="71">Hourglass</option>
                <option value="72">Strange Chest</option>
                <option value="79">Lovebirds</option>
                <option value="102">Animated Statue</option>
                <option value="103">Grimoire</option>
                <option value="104">Living Stones</option>
                <option value="105">Jester</option>
                <option value="117">Spectral Shroud</option>
                <option value="118">Dreary Dirge</option>
                <option value="119">Eye See You</option>
                <option value="126">Plasmpool Armor</option>
                <option value="127">Banshee Brooch</option>
                <option value="128">Vigorous Goblet</option>
                <option value="130">Pirate's Life</option>
                <option value="134">Broken Mirror</option>
                <option value="135">Spidered Seat</option>
                <option value="136">Tinkered Clock</option>
                <option value="145">Broken Spear</option>
                <option value="144">Practice Weapons</option>
                <option value="147">Haunted Museum</option>
                <option value="149">Sweetheart Rose</option>
                <option value="153">Battlefield</option>
                <option value="154">Drakeharvest</option>
                <option value="155">Treasure Map</option>
                <option value="158">Frigidfin Expedition</option>
                <option value="159">Steadfast Sweeper</option>
                <option value="160">Snarling Mimic</option>
                <option value="176">Springswarm</option>
                <option value="188">Sunparched Prowl</option>
                <option value="192">Castle Siege</option>
            </optgroup>

            <optgroup label="Grand Exchange">
                <option value="17">Spring</option>
                <option value="49">Summer</option>
                <option value="56">Autumn</option>
                <option value="73">Winter</option>
                <option value="183">Lilypad Pool</option>
                <option value="182">Bleached Roots</option>
                <option value="181">Cottage Garden</option>
                <option value="185">Roadside Tavern</option>
                <option value="186">Art Studio</option>
                <option value="184">Crystal Shop</option>
            </optgroup>

            <optgroup label="Marketplace (Pride)">
                <option value="161">Transgender Ribbon</option>
                <option value="163">Demigirl Ribbom</option>
                <option value="162">Asexual Ribbon</option>
                <option value="164">Bisexual Ribbon</option>
                <option value="165">Genderfluid Ribbon</option>
                <option value="166">Lesbian Ribbon</option>
                <option value="167">Progress Ribbon</option>
                <option value="168">Rainbow Ribbon</option>
                <option value="169">Intersex Ribbon</option>
                <option value="170">Pansexual Ribbon</option>
                <option value="171">Nonbinary Ribbon</option>
                <option value="172">Aromantic Ribbon</option>
                <option value="173">Gay Ribbon</option>
                <option value="174">Demiboy Ribbon</option>
                <option value="178">Agender Ribbon</option>
                <option value="179">Genderqueer Ribbon</option>
                <option value="180">Demisexual Ribbon</option>
            </optgroup>

            <optgroup label="Marketplace (Breeds)">
                <option value="64">Fae Dragons</option>
                <option value="65">Guardian Dragons</option>
                <option value="66">Tundra Dragons</option>
                <option value="81">Mirror Dragons</option>
                <option value="82">Pearlcatcher Dragons</option>
                <option value="78">Ridgeback Dragons</option>
                <option value="81">Snapper Dragons</option>
                <option value="82">Spiral Dragons</option>
                <option value="89">Imperial Dragons</option>
                <option value="90">Wildclaw Dragons</option>
                <option value="97">Coatl Dragons</option>
                <option value="101">Nocturne Dragons</option>
                <option value="111">Skydancer Dragons</option>
                <option value="112">Bogsneak Dragons</option>
                <option value="122">Gaoler Dragons</option>
                <option value="125">Banescale Dragons</option>
                <option value="133">Veilspun Dragons</option>
                <option value="141">Obelisk Dragons</option>
                <option value="150">Aberration Dragons</option>
                <option value="157">Undertide Dragons</option>
                <option value="177">Aether Dragons</option>
                <option value="189">Sandsurge Dragons</option>
            </optgroup>

            <optgroup label="Marketplace (Treasure)">
                <option value="16">Treasure Hoarder</option>
                <option value="83">Archer's Way</option>
                <option value="114">Snowy Owl</option>
                <option value="121">Something Swarming</option>
                <option value="132">Cozy Harvest</option>
                <option value="138">Blighted Pines</option>
                <option value="140">Starksand Dunes</option>
            </optgroup>

            <optgroup label="Marketplace (Gem)">
                <option value="18">Axolotl</option>
                <option value="19">Black Rose</option>
                <option value="20">Black Widow</option>
                <option value="21">Boneyard</option>
                <option value="22">Gem Hoarder</option>
                <option value="23">Lantern Forest</option>
                <option value="24">Rainy Day</option>
                <option value="25">Twilight Firefly</option>
                <option value="50">Chandelier</option>
                <option value="52">Armory</option>
                <option value="54">Butterflies</option>
                <option value="91">Night Sky</option>
                <option value="92">Solar</option>
                <option value="137">Corgi Sploot</option>
            </optgroup>

            <optgroup label="Contest Reward">
                <option value="9">Writing Contest</option>
                <option value="10">Skin Contest</option>
                <option value="13">Comic Contest</option>
                <option value="14">Familiar Colouring Contest</option>
            </optgroup>

            <optgroup label="Trading Post">
                <option value="34">Swap Stand</option>
                <option value="37">Fungi</option>
                <option value="40">Swan Lake</option>
                <option value="45">Succulents</option>
                <option value="46">Baldwin's Brew</option>
                <option value="47">Sea Slugs</option>
                <option value="48">Tentacles</option>
                <option value="58">Foxfire Grove</option>
                <option value="61">Alchemical Formula</option>
                <option value="62">Ribbons and Bows</option>
                <option value="115">Herb Rack</option>
                <option value="124">Stagcrest</option>
                <option value="139">Avian Anatomy</option>
                <option value="148">Thunder Lizards</option>
                <option value="151">Ancient Aerie</option>
                <option value="156">Deepsea Dive</option>
                <option value="191">Chess</option>
            </optgroup>

            <optgroup label="Other">
                <option value="15">3rd Anniversary</option>
                <option value="152">Cartographer's Office</option>
                <option value="120">Sticker Star</option>
                <option value="187">Plush Collection</option>
            </optgroup>

            <optgroup label="Untradeable">
                <option value="1">Fiendish</option>
                <option value="2">Cloudy</option>
                <option value="3">Gilded</option>
                <option value="4">Clockwork</option>
                <option value="5">Beta</option>
                <option value="12">MVP</option>
            </optgroup>

            <optgroup label="Staff & Mods">
                <option value="6">Staff</option>
                <option value="7">Volunteer Moderator</option>
                <option value="8">Retired Moderator</option>
                <option value="11">Hiveworks</option>
            </optgroup>
        </select>
    );
}