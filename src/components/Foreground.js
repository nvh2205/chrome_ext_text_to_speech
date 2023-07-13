import React, { useContext, useEffect, useState } from "react";
import ForegroundA from "./content/ForegroundA";
import ShowIcon from "./content/ShowIcon";
import { useSelector, useDispatch } from "react-redux";
import {
  setText,
  setShowIcon,
  setShowPopover,
  setXY,
  setCharPerReq,
  setCharPerMonth
} from "../redux/textSlice";
import PopoverShow from "./content/PopoverShow";
import { setPopoverCoordinates } from "../utils/ultis";
import AudioCss from './content/audioCss'
import PoppoverCss from './content/poppoverCss'
import ModalSettingCss from './content/modalSettingCss'
import ShowIconCss from './content/showIconCss'

function Foreground() {
  const dispatch = useDispatch();

  const text_ = useSelector((state) => state.text);
  const { selectText, x_, y_, showIcon, showPopover, charPerReq } = text_;

  //Get char per request and char per month when init
  useEffect(() => {
    //Set redux for the number of characters per request and char per month
    async function getChromeStorage() {
      await new Promise((resolve, reject) => {
        chrome.storage.local.get(["charPerReq", "charPerMonth"], function (value) {
          const charPerReq = value["charPerReq"] ? value["charPerReq"] : process.env.DEFAULT_CHAR_PER_REQ
          const action = setCharPerReq(charPerReq);
          dispatch(action);

          const charPerMonth = value["charPerMonth"] ? value["charPerMonth"] : null;
          const actionCharPerMonth = setCharPerMonth(charPerMonth);
          dispatch(actionCharPerMonth);

          resolve();
        });
      });
    }
    getChromeStorage();
  }, [])

  //Width and height of popover to set coordinates for reasonable
  const [widthPop, setWidthPop] = useState(450);
  const [heightPop, setHeightPop] = useState(370);

  const onMouseUp = () => {
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (!selection) {
      return;
    }

    const selectionRange = selection.getRangeAt(0);

    const { x, y, width, height } = selectionRange.getBoundingClientRect();

    if (width.toFixed(1) == 0) {
      const action = setShowIcon(false);
      dispatch(action);
      return;
    }

    //Number of cut characters
    // const splitText = 70;

    if (text) {
      //Cut large strings into smaller ones for faster api delivery
      // const arrText = text.split(" ");
      // const arrResult = [];
      // let indexCurrentCut = 0;

      // while (indexCurrentCut <= arrText.length) {
      //   const arrCut = arrText.slice(
      //     indexCurrentCut,
      //     indexCurrentCut + splitText
      //   );
      //   const stringConvert = arrCut.join(" ");
      //   indexCurrentCut += splitText;

      //   arrResult.push(stringConvert);
      // }


      //Cut text By char per req
      const arrText = text.split(" ");
      let cutText = ''
      let arrCutText = [];
      if (charPerReq > 0) {
        arrCutText = arrText.length > charPerReq ? arrText.splice(0, charPerReq) : arrText;
      } else {
        arrCutText = arrText.splice(0, 150);
      }
      cutText = arrCutText.join(" ");

      //Handle the icon click event first and then dispatch the showicon when double clicked on the container of the window select
      const checkShowIcon = text == selectText ? false : true;
      const timeoutShowIcon = setTimeout(() => {
        const actionShowIcon = setShowIcon(checkShowIcon);
        dispatch(actionShowIcon);
        clearTimeout(timeoutShowIcon);
      }, 0);

      //Send text to reducer
      const actionText = setText(cutText);
      dispatch(actionText);
      const xNew = x + width / 2;
      const heightSelect = height;
      const yNew = y;
      //const yNew = y;

      const coordinates = setPopoverCoordinates(
        xNew,
        yNew,
        widthPop,
        heightPop,
        heightSelect
      );

      const actionXY = setXY({
        x: xNew,
        y: yNew + window.scrollY + 10 + height,
        ...coordinates,
      });
      dispatch(actionXY);
    } else {
      const actionText = setText('');
      dispatch(actionText);

      const actionShowIcon = setShowIcon(false);
      dispatch(actionShowIcon);
    }
  };

  useEffect(() => {
    showPopover == false && window.addEventListener("mouseup", onMouseUp);
    //window.addEventListener("mousedown", onMouseDown);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
    };
  });

  const onMouseDown = () => {
    if (window.getSelection) {
      if (window.getSelection().empty) {
        // Chrome
        window.getSelection().empty();
      } else if (window.getSelection().removeAllRanges) {
        // Firefox
        window.getSelection().removeAllRanges();
      }
    } else if (document.selection) {
      // IE?
      document.selection.empty();
    }

    //window.removeEventListener("mouseup", onMouseUp);

    // const selection = window.getSelection();
    // const text = selection.toString().trim();

    // if (selectText.join(" ") == text) {
    //   const action = setShowIcon(false);
    //   dispatch(action);
    // }
  };

  const aavv = () => {
    const result = [];
    for (let i = 0; i < 10; i++) {
      result.push(
        <p key={i}>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old. Richard McClintock, a Latin professor at
          Hampden-Sydney College in Virginia, looked up one of the more obscure
          Latin words, consectetur, from a Lorem Ipsum passage, and going
          through the cites of the word in classical literature, discovered the
          undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
          1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and
          Evil) by Cicero, written in 45 BC. This book is a treatise on the
          theory of ethics, very popular during the Renaissance. The first line
          of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in
          section 1.10.32.
        </p>
      );
    }
    return result;
  };

  return (
    <main
    //onMouseDown={onMouseDown}
    >
      {/* <ForegroundA /> */}
      {/* {aavv()} */}
      <style>
        {ShowIconCss}
        {PoppoverCss}
        {ModalSettingCss}
        {AudioCss}
      </style>
      {showIcon && <ShowIcon />}
      {showPopover && <PopoverShow widthPop={widthPop} heightPop={heightPop} />}
    </main>
  );
}

export default Foreground;
