import React from "react";

export default function LatterAvatar({ name }) {
  function getInitials(name) {
    let initials;
    const nameSplit = name?.split(" ");
    const nameLength = nameSplit?.length;
    if (nameLength > 1) {
        initials =
            nameSplit[0].substring(0, 1) +
            nameSplit[nameLength - 1].substring(0, 1);
    } else if (nameLength === 1) {
        initials = nameSplit[0].substring(0, 1);
    } else return;

    return initials.toUpperCase();

    //return `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`;
  }

  function generateBackground() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function createImageFromInitials (size, name, color) {
    if (name == null) return;
    name = getInitials(name);
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = canvas.height = size;
    
    // context.fillStyle = "#ffffff";
    // context.fillRect(0, 0, size, size);
    
    // context.fillStyle = `${color}50`;
    // context.fillRect(0, 0, size, size);
    
    // Draw a circle instead of a rectangle
    context.beginPath();
    context.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    
    context.fillStyle = "#ffffff";
    context.textBaseline = 'middle';
    context.textAlign = 'center';
    context.font = `${size / 2}px Roboto`;
    context.fillText(name, size / 2, size / 2);
    
    return canvas.toDataURL();
    
  }

  let initials = getInitials(name);
  let color = generateBackground();
  let img_url = createImageFromInitials( 100, name, color)
  const customStyle = {
    display: "flex",
    height: "50px",
    width: "50px",
    borderRadius: "100px",
    color: "white",
    background: color,
    margin: "auto"
  };

  return (
    <>
    {/* <div style={customStyle}>
      <span style={{ margin: "auto"}}> {initials} </span>
    </div> */}

    <img
				id='preview'
				src={img_url}
				alt='profile-pic'
			/> 
      </>
  );
}
