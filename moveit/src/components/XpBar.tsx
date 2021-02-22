export function XpBar(){
    return (
        <header className="xp-bar">
            <span> 0 xp </span>
            <div>
                <div style={{width: '50%'}}/>
                
                <span className="current-xp" style={{ left: '50%' }}> 300xp</span>
            </div>
            <span> 600 xp</span>
        </header>
    );
}