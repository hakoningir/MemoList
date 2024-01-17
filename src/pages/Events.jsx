import { useEffect, useState } from "react";
// id fyrir events?
function Event(){
    let oldData;
    let content;
    if(content){
        oldData = JSON.parse(localStorage.getItem('event'));
    }
    const [input, setInput] = useState(oldData);
    function HandleSubmit(e){
        e.preventDefault();
        const parent = document.querySelector("ul");
        const evt = document.createElement("li");
        content = input;
        evt.textContent = content;
        parent.appendChild(evt);
    }
    useEffect(() =>{
        localStorage.setItem('event',JSON.stringify(content))
    }, [content]);
    return (
        <form onSubmit={HandleSubmit}>
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