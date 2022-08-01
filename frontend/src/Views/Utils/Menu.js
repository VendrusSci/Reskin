
export function Menu(){
    var domain = window.location.origin;
    return(
        <div className="Menu">
            <button className="Menu_button" onClick={(e) =>{
                e.preventDefault();
                window.location.href = domain;
            } }>Get Started</button>
                
            <button className="Menu_button" onClick={(e) =>{
                e.preventDefault();
                window.location.href = domain + '/about';
            } }>About</button>

            <button className="Menu_button" onClick={(e) =>{
                e.preventDefault();
                window.open('https://github.com/VendrusSci/Reskin','_blank');
            } }>Source Code</button>
        </div>
    );
}