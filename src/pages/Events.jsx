import { useEffect, useState } from "react";
import './Events.css';
function Event() {
    const [inputTitle, setInputTitle] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [data, setData] = useState([]);

    useEffect(() => {
        data.length > 0 && window.localStorage.setItem("event", JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        const storedData = JSON.parse(window.localStorage.getItem("event"));
        if (!!storedData) setData(storedData);
    }, []);

    function HandleSubmit(e) {
        e.preventDefault();
        let submitted = [inputTitle, inputDescription]
        submitted && setData([...data, submitted]);
        setInputTitle('');
        setInputDescription('');
    }

    function deleteEvent(key) {
        setData(data.filter((_, index) => index !== key));
      }
    
      return (
        <>
          <form onSubmit={HandleSubmit}>
            <div>
              <div>
                <input
                  type="title"
                  placeholder="Event title"
                  value={inputTitle}
                  onChange={(e) => setInputTitle(e.target.value)}
                />
              </div>
              <div>
                <textarea
                  type="description"
                  placeholder="Event description"
                  value={inputDescription}
                  onChange={(e) => setInputDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div>
              <button type="submit">Create event</button>
            </div>
          </form>
          <div>
            <ul className="card-container">
              {data.map((item, ke) => (
                <div key={ke} className="card">
                  <h1>{item[0]}</h1>
                  <p>{item[1]}</p>
                  <button type="delete" value={ke} onClick={() => deleteEvent(ke)}>
                    Delete event
                  </button>
                </div>
              ))}
            </ul>
          </div>
        </>
      );
}

export default Event;
