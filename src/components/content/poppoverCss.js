const PoppoverCss = `
.Text__wrapper[data-popup-direction="downward"] {
  top: 0;
  transform: translateY(9px);
}

.Text__wrapper_bottom[data-popup-direction="downward"] {
  bottom: 0;
  transform: translateY(9px);
}

.Text__wrapper_bottom {
  position: fixed;
  left: 0;
  z-index: 1010;
  width: 100vw;
  opacity: 1;
  transition: opacity 200ms cubic-bezier(0.18, 0.65, 0.26, 0.98),
    transform 200ms ease-out;
}

.Text__wrapper {
  position: fixed;
  left: 0;
  z-index: 1010;
  width: 100vw;
  opacity: 1;
  transition: opacity 200ms cubic-bezier(0.18, 0.65, 0.26, 0.98),
    transform 200ms ease-out;
}

.Text__translation_popup[data-translateX="-50%"] {
  transform: translateX(-50%);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-thumb {
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.45);
}

.Text__translation_popup {
  position: absolute;
  display: flex;
  width: 450px;
  border: 1px solid #cf87c6;
  border-radius: 4px;
  box-shadow: 0 0 8px rgb(1 22 39 / 30%);
  flex-direction: column;
  color: #011627;
  background-color: #fdfffc;
}

.Text__translation_popup[data-translateX="-50%"] > .Text__arrow,
.Text__translation_popup[data-translateX="-50%"]:after {
  left: 50%;
}

.Text__translation_popup[data-translateX="-50%"] > .Text__arrow_bottom,
.Text__translation_popup[data-translateX="-50%"]:after {
  left: 50%;
}

.Text__wrapper:not([data-popup-direction="none"])
  > .Text__translation_popup:after {
  position: absolute;
  transform: translateX(-50%);
  width: 32px;
  height: 16px;
  background-color: #fdfffc;
  content: "";
}

.Text__wrapper_bottom:not([data-popup-direction="none"])
  > .Text__translation_popup:after {
  position: absolute;
  transform: translateX(-50%);
  width: 32px;
  height: 16px;
  background-color: #fdfffc;
  content: "";
}

.Text__translation_popup > .Text__header > .Text__btn.Text__disabled {
  color: #fdfffc;
}

.Text__translation-popup > .Text__header > .Text__btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  outline: none;
  flex-shrink: 0;
  color: #fdfffc;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px #20897f;
}

.Button__btn__1lr0f:not(.Button__keep-cursor__V97qw).Button__disabled__38AlQ {
  cursor: pointer;
}

.Icon_settings:hover {
  color: #75677c;
}

.Text__wrapper:not([data-popup-direction="none"])
  > .Text__translation_popup
  > .Text__arrow {
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 1px solid #cf87c6;
  border-left: 1px solid #cf87c6;
  box-shadow: 0 0 8px rgb(1 22 39 / 30%);
}

.Text__wrapper:not([data-popup-direction="none"])
  > .Text__translation_popup
  > .Text__arrow_bottom {
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 1px solid #cf87c6;
  border-left: 1px solid #cf87c6;
}

.Text__wrapper_bottom:not([data-popup-direction="none"])
  > .Text__translation_popup
  > .Text__arrow {
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 1px solid #cf87c6;
  border-left: 1px solid #cf87c6;
  box-shadow: 0 0 8px rgb(1 22 39 / 30%);
}

.Text__wrapper_bottom:not([data-popup-direction="none"])
  > .Text__translation_popup
  > .Text__arrow_bottom {
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 1px solid #cf87c6;
  border-left: 1px solid #cf87c6;
}

/* .Text__wrapper[data-popup-direction="downward"] > .Text__translation_popup > .Text__arrow {
    top: -8px;
    transform: translateX(-50%) rotate(45deg);
    background-color: #cf87c6;
} */

.Text__arrow {
  top: -8px;
  transform: translateX(-50%) rotate(45deg);
  background-color: #cf87c6;
}

.Text__arrow_bottom {
  bottom: -8px;
  transform: translateX(-50%) rotate(-135deg);
  background-color: #fdfffc;
}

.Text__translation_popup > .Text__header {
  z-index: 1;
  display: flex;
  height: 30px;
  background-color: #cf87c6;
}

.Text__translation_popup > .Text__header > .Text__languages {
  vertical-align: top;
  display: inline-flex;
  margin: 5px 5px;
  flex-grow: 1;
  justify-content: center;
}

.Text__translation_popup > .Text__header > .Text__btn {
  display: inline-block;
  width: 30px;
  height: 30px;
  outline: none;
  flex-shrink: 0;
  color: #fdfffc;
  font-size: 18px;
  line-height: 30px;
  text-align: center;
  text-shadow: 0 1px #9b698d;
}

.Button__btn__1lr0f:not(.Button__keep_cursor__V97qw) {
  cursor: pointer;
}

.Text__translation_popup > .Text__content_body {
  position: relative;
  min-height: 30px;
  padding: 16px 5px;
}

.Text__translation_popup > .Text__content_body > .Text__original {
  max-height: 216px;
  margin-bottom: 7px;
  padding: 0 8px;
  font-style: italic;
  word-break: break-word;
  overflow: auto;
}

.Text__translations {
  max-height: 150px;
  padding: 0 8px;
}

.Text__pos_header {
  display: flex;
  border-bottom: 1px dotted #9b698d;
  justify-content: flex-end;
  color: #b18ea7;
  font-size: 0.9em;
}

.display_text_play {
  display: flex;
  align-items: center;
  color: darkcyan;
}

.display_text {
  display: flex;
  align-items: center;
}

.display_text_icon {
  cursor: pointer;
}

.display_text_icon:hover {
  color: brown;
}

.Text__term_line{
  text-align: center;
  margin-top:15px
}

`

export default PoppoverCss