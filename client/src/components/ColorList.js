import React, { useState } from "react";
//import axios from "axios";
import { axiosWithAuth } from "../auth/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, setUpdate }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    console.log(colorToEdit.id); // is the color I want tp push

    // Make a put request to save your updated color
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(responce => {
        console.log(responce.data);

        setUpdate(Math.random());
        //props.history.push(`/protected`);
      })
      .catch(err => console.log(err));

    // think about where will you get the id from...
    // where is is saved right now?
  };

  const deleteColor = color => {
    console.log(color.id);
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        setUpdate(Math.random());
      })
      .catch(err => console.log(err));
  };

//STREWACH FUNTIONS
/*  const handleChange = (event) => {
    setColorToEdit(
      {
        ...colorToEdit,
        if ([event.target.name] == "color") {
          [event.target.name]: event.target.value
        } else {
          code: { hex: event.target.value }
        }
      }
    );
    console.log(colorToEdit);
  };*/

  const addColor = (event) => {
    event.preventDefault();
    axiosWithAuth()
      .post(`/colors`, colorToEdit)
      .then(response => {
        console.log(response)
        setUpdate(Math.random());
      })
      .catch( error => {
        console.log("error", error.message)
      })
  };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColor}>
          <input
            type="text"
            name="color"
            value={colorToEdit.color}
            placeholder="New Color"
            onChange={e =>
              setColorToEdit({ ...colorToEdit, color: e.target.value })
            }
          />
          <input
            type="text"
            name="hex"
            value={colorToEdit.code.hex}
            placeholder="#hex"
            onChange={e =>
              setColorToEdit({
                ...colorToEdit,
                code: { hex: e.target.value }
              })
            }
          />
          <button>Submit</button>
        </form>

    </div>
  );
};

export default ColorList;
