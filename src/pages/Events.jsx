import { useEffect, useState } from "react";

function Event() {
    const [input, setInput] = useState("");
    const [data, setData] = useState([]);

    function HandleSubmit(e) {
        e.preventDefault();
        const parent = document.querySelector("ul");
        const evt = document.createElement("li");
        const temp = input;
        evt.textContent = temp;
        parent.appendChild(evt);
        setData(prevData => [...prevData, input]);
        console.log(data);
        setInput('');
    }

    useEffect(() => {
        const storedData = window.localStorage.getItem("event");
        // console.log(storedData);
        if(storedData){
            setData(JSON.parse(storedData));
        } else {
            setData([])
        }
    }, []);

    useEffect(() => {
        window.localStorage.setItem("event", JSON.stringify(data));
    }, [data]);

    return (
        <form onSubmit={HandleSubmit}>
            <div className="card">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div>
                <button type="submit">Create event</button>
            </div>
            <div>
                <ul>
                    {data.map((data, i) =>(
                        <li key={i}>{data}</li>
                    ))}
                </ul>
            </div>
        </form>
    );
}

export default Event;
