import { useEffect, useState } from "react";
import './Events.css';
function Event() {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);

    useEffect(()=>{
        data.length > 0 && window.localStorage.setItem("event", JSON.stringify(data));
    },[data]);

    useEffect(() => {
        const storedData = JSON.parse(window.localStorage.getItem("event"));
        if (!!storedData) setData(storedData);
    }, []);

    function HandleSubmit(e) {
        e.preventDefault();
        input && setData([...data, input]);
        setInput('');
    }

    return (
        <form onSubmit={HandleSubmit}>
            <div>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div>
                <button type="submit">Create event</button>
            </div>
            <div>
                <ul className="card-container">
                    {data.map((item, ke) => (
                       <div key={ke} className="card">{item}</div>
                    ))
                    }
                </ul>
            </div>
        </form>
    );
}

export default Event;
