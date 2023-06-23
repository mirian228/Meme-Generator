import React from "react";

function MemeForm() {
  
  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "https://i.imgflip.com/1g8my4.jpg",
  });
  
  const [allMemeImages, setAllMemeImages] = React.useState([]);

    React.useEffect(function() {
    fetch("https://api.imgflip.com/get_memes")
    .then(res => res.json())
    .then(data => setAllMemeImages(data.data.memes))  }, []
  )

  function handleClick() {
    const memesArray = allMemeImages;
    let randomNumber = Math.floor(Math.random() * memesArray.length);
    const url = memesArray[randomNumber].url;
    setMeme(function(prevMeme) {
        return {
          ...prevMeme,
          randomImage: url,
        }
    });
  }

  function handleChange(event) {
    const {name, value} = event.target;
    setMeme(function(prevMeme) {
      return {
        ...prevMeme,
        [name]: value,
      }
    })
  }


  return (
    <main>
      <div className="form">
        <div className="form--inputs">
          <input 
          type="text" 
          className="form--inputs--first" 
          placeholder="Top Text"
          name="topText" value={meme.topText} 
          onChange={handleChange}>
          </input>
          <input 
          type="text" 
          placeholder="Bottom Text"
          className="form--inputs--second" 
          name="bottomText" 
          value={meme.bottomText} 
          onChange={handleChange}>
          </input>
        </div>
        <div className="form--button--div">
          <button className="form--button" onClick={handleClick}>
            Get a new meme image 🖼
          </button>
        </div>
        <div className="form--image--box">
          <img src={meme.randomImage} className="form--image" />
          <p className="form--paragraph--first">{meme.topText}</p>
          <p className="form--paragraph--second">{meme.bottomText}</p>
        </div>
      </div>
    </main>
  );
}

export default MemeForm;
