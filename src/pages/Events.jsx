import { useState } from "react";
// id fyrir events?
// þarf að setja inn local storage!!!
function Event(){
    const [input, setInput] = useState('');
    // useEffect() gera það dæmi her
    function handleSubmit(e){
        e.preventDefault();
        createElement();
    }
    function createElement(){
        const parent = document.querySelector("ul");
        const evt = document.createElement("li");
        evt.textContent = input
        parent.appendChild(evt);
        window.localStorage.setItem(parent, evt);
        //get item set item eh staðar?
    }

    function getOldEvents(){
        // const prev = window.localStorage.getItem(parent);
        // þarf að skoða betur hvernig þetta er
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="card">
                <input type="string" value={input} onInput={e => setInput(e.target.value)} />
            </div>
            <div>
                <button type="submit" value="Submit"> Create event</button>
            </div>
            <div>
                <ul/>
            </div>
        </form>
    )
}

export default Event;