export function BreedDropdown(props){
    return(
        <select className='Skin-dropdown' value={props.breed} onChange={(e)=>{props.setBreed(e.target.value)}}>
            <option value="20">Aberration</option>
            <option value="22">Aether</option>
            <option value="18">Banescale</option>
            <option value="14">Bogsneak</option>
            <option value="12">Coatl</option>
            <option value="1">Fae</option>
            <option value="17">Gaoler</option>
            <option value="2">Guardian</option>
            <option value="8">Imperial</option>
            <option value="3">Mirror</option>
            <option value="11">Nocturne</option>
            <option value="15">Obelisk</option>
            <option value="4">Pearlcatcher</option>
            <option value="5">Ridgeback</option>
            <option value="23">Sandsurge</option>
            <option value="13">Skydancer</option>
            <option value="9">Snapper</option>
            <option value="7">Spiral</option>
            <option value="6">Tundra</option>
            <option value="21">Undertide</option>
            <option value="19">Veilspun</option>
            <option value="10">Wildclaw</option> 
        </select>
    );
}