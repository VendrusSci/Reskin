export function PoseDropdown(props){
    return(
        <select className='Skin-dropdown' value={props.pose} onChange={(e)=>{props.setPose(e.target.value)}}>
            <option value="1">Male</option>
            <option value="2">Female</option>
        </select>
    );
}
