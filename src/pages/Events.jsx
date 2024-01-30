import { useEffect, useState } from "react";
import './Events.css';
import trashcan from './../trashcan.png'
function Event() {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');
  const [data, setData] = useState([]);
  const [isTitle, setIsTitle] = useState(false);
  const [IsDescription, setIsDescription] = useState(false);

  useEffect(() => {
    data.length > 0 && window.localStorage.setItem("event", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const storedData = JSON.parse(window.localStorage.getItem("event"));
    if (!!storedData) setData(storedData);
  }, []);

  function HandleSubmit(e) {
    e.preventDefault();

    // Cannot create an event without title and/or description and input cannot be white space
    if (inputTitle.length > 0 && inputDescription.length > 0 && inputTitle.trim() !== '' && inputDescription.trim() !== '') {
      let submitted = [inputTitle, inputDescription];
      submitted && setData([...data, submitted]);
      setInputTitle('');
      setInputDescription('');
      setIsTitle('');
      setIsDescription('');
    }
    // remove warning 
    if (inputDescription.length > 0) setIsDescription('');
    if (inputTitle.length > 0) setIsTitle('');

    // set warning if input is not valid
    if (inputDescription.trim() === '') setIsDescription(true);
    if (inputTitle.trim() === '') setIsTitle(true);
    if (inputTitle.length === 0) setIsTitle(true);
    if (inputDescription.length === 0) setIsDescription(true);
  }
  let titlemsg = "Must set a title";
  let descriptionmsg = "Must set a description";

  function deleteEvent(key) {
    setData(data.filter((_, index) => index !== key));
  }

  function editEventTitle(key, value) {
    setData(data.map((d, i) => { if (i === key) { d[0] = value; } return d }));
  }

  function editEventDescription(key, value) {
    setData(data.map((d, i) => { if (i === key) { d[1] = value; } return d }));
  }
  const [key, setKey] = useState(0);
  function onReverse() {
    setData([...data].reverse());
    setKey(prevKey => prevKey + 1); // To force re-render
  }

  return (
    <>
      <form onSubmit={HandleSubmit}>
        <div className="inputContainer">
          <p
            className="titlemsg"
            style={{ visibility: isTitle ? "visible" : "hidden" }}>
            {titlemsg}
          </p>
          <input
            type="title"
            className="title"
            placeholder="Event title"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
          />
          <p
            className="descriptionmsg"
            style={
              { visibility: IsDescription ? "visible" : "hidden" }}>
            {descriptionmsg}
          </p>
          <textarea
            type="description"
            className="description"
            placeholder="Event description"
            value={inputDescription}
            onChange={(e) => setInputDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <button type="submit" className="createEvent">Create event</button>
        </div>
      </form>
      <div key={key}>
        <button className="reverseCards" onClick={() => onReverse()}>Reverse order</button>
        <ul className="card-container">
          {data.map((item, ke) => (
            <div key={ke} className="card">
              <input className="editTitle" defaultValue={item[0]} onChange={e => editEventTitle(ke, e.target.value)}></input>
              <textarea className="editDescription" defaultValue={item[1]} onChange={e => editEventDescription(ke, e.target.value)}></textarea>
              <button type="delete" value={ke} onClick={() => deleteEvent(ke)} >
                <img src={trashcan} alt="" />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Event;
