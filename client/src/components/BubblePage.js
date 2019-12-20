import React, { useState, useEffect } from "react";
//import axios from "axios";
import { axiosWithAuth } from "../auth/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  useEffect(() => {
      axiosWithAuth().get(`/colors`)
      .then(response => {
        console.log(response.data)
        setColorList(response.data)
      })
      .catch( error => {
        console.log("error", error.message)
      })
  },[])

  // set that data to the colorList state property

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
