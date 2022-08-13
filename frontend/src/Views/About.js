export function About(){

    return(
        <div className="About_body">
            <div className="About_text">
                <h2>General Info</h2>
                <p>RESKIN is a scrape-free, hotlink-free skin checker and previewer written by Vendrus (#4101)</p>
                <p>All dragon and apparel images must be saved by the user and uploaded manually, and all Flight Rising proprietary images
                    have been manually downloaded and and stored on the server that runs RESKIN.
                </p>
                <p>This tool has been primarily built using the React framework, and performs almost all of its functionality in the front end.
                    That said, this is my first time writing a React front end, so please bear with (and report) any issues that occur.
                </p>
                <p>Errors, problems and wants can be submitted either via Github (preferred, see Source Code menu link) or directly to me on FR via PM.<br/>
                If you want your skin removed, you can do that via the admin page. I can also manually delete them on demand, with a preview link and <br/>
                evidence the skin is yours (e.g. shop link).</p>

                <h2>Future Plans</h2>
                <p>The disclaimer - nothing is guaranteed. I intend to maintain this tool for as long as it's needed, but life happens.<br/>
                At the very least, this site will continue to exist in its current form until it is fully replaced by site functionality.
                </p>
                <p>Features in the works:</p>
                <li>Fix skin preview scene offset</li>
                <li>Improved mobile compatibility</li>
                <li>Addition of new breeds as they appear</li>
                <li>Eye type selection (preview with other eye types, prevent skin obscuration)</li>
            </div>
        </div>
        
    );
}