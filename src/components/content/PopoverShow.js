import React, { useEffect, useState, useRef } from 'react';
import styles from './popover.module.css'
import Popover from '@mui/material/Popover';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import { setText, setShowIcon, setShowPopover, setXY } from '../../redux/textSlice'
import { useSelector, useDispatch } from 'react-redux'
import Audi from './Audi'

function PopoverShow(props) {
    //width and Height of Popover
    const {widthPop, heightPop} = props

    const dispatch = useDispatch()

    const text_ = useSelector(state => state.text);
    const { top, bottom, left, y_, showPopover,arrowPositionSelect,selectText } = text_;

    const style = top ? {
      left: `${left}px`,
      top: `${top}px`
    } : {
      left: `${left}px`,
      bottom: `${bottom}px`
    };


    const [optionSpeed, setOptionSpeed] = useState([1, 2, 3]);
    const [speed, setSpeed] = useState(1);

    const clickOptionSpeed = (popupState, optionSpeed) => {
        popupState.close();
        setSpeed(optionSpeed);
    }

    const tagOptionSpeed = (popupState, optionSpeed, speed) => {
        let result = optionSpeed.filter((item) => item != speed);
        return result.map((item, index) => <MenuItem key={index} onClick={() => { clickOptionSpeed(popupState, item) }}> <SpeedOutlinedIcon sx={{ marginRight: '5px' }} /> x{item}</MenuItem>)
    }


    const handleClose = () => {
        const action=setShowPopover(false);
        dispatch(action);
    };

    const id = showPopover ? 'simple-popover' : undefined;

    return (

        <div>
            <Popover
             id={id}
             open={showPopover}
             onClose={handleClose}
             style={style}
            >
                <section className={`${top?styles.Text__wrapper:styles.Text__wrapper_bottom}`} data-popup-direction="downward" >


                    <section data-translatex="-50%" className={`${styles.Text__translation_popup}`} style={style} >
                        <div className={`${top?styles.Text__arrow:styles.Text__arrow_bottom}`} style={{left:`${arrowPositionSelect}%`}}></div>

                        {/* Header popover */}
                        <section className={`${styles.Text__header}`}>
                            <div data-hook="content-page.save-card" title="Save as a card" className={`${styles.Text__btn}  ${styles.Text__disabled} ${styles.Button__btn__1lr0f} ${styles.Button__disabled__38AlQ}`}  tabIndex={-1}>
                                <HeadsetMicIcon sx={{ marginTop: '2px' }} />
                            </div>


                            <section className={`${styles.Text__languages}`}>
                                <PopupState variant="popover" popupId="demo-popup-menu" >
                                    {(popupState) => (
                                        <React.Fragment>
                                            <Button variant="outlined" {...bindTrigger(popupState)}>
                                                <SpeedOutlinedIcon sx={{ marginRight: '5px' }} /> x{speed}
                                            </Button>
                                            <Menu {...bindMenu(popupState)}>
                                                {tagOptionSpeed(popupState, optionSpeed, speed)}
                                            </Menu>
                                        </React.Fragment>
                                    )}
                                </PopupState>
                            </section>

                            <div data-hook="content-page.close-Text" title="Cancel" className={`${styles.Text__btn} ${styles.Button__btn__1lr0f}`} tabIndex={0}>
                                <HighlightOffOutlinedIcon sx={{ marginTop: '2px' }} />
                            </div>

                        </section>


                        {/* Content popover */}
                        <section data-hook="Text_wrapper" className={`${styles.Text__content_body}`}>
                            <section data-hook="Text-original-section" className={`${styles.Text__original}`}>{/* react-text: 240 */}
                                        {selectText}
                            {/* /react-text */}
                            </section>
                            <section className={`${styles.Text__translations}`}>
                                <section data-hook="translation-view.pos-section" className={`${styles.Text__pos_wrapper}`}>
                                    <section className={`${styles.Text__pos_header}`}>{/* react-text: 244 */}Text{/* /react-text */}
                                    </section>

                                    {/* Audio */}
                                    <section className={`${styles.Text__term_line}`}>
                                        {/* <div data-hook="translation-view.term.toggle" className={`${styles.Text__checkbox} ${styles.Button__btn__1lr0f}`} tabIndex={0}>
                                            <i className="icon_ok" />
                                        </div>
                                        <div className={`${styles.Text__term}`}>Phần tử mẫu là một trong ba công nghệ chính của Thành phần Web. Chúng được sử dụng để giữ nội dung HTML không được hiển thị ngay lập tức và có thể được khởi tạo sau đó trong thời gian chạy. Vì chúng ta sẽ cần đánh dấu văn bản nhiều lần và nó sẽ không được nhìn thấy ngay từ đầu, nên sử dụng công nghệ này là rất hợp lý.
                                            Tạo kiểu
                                            Để làm cho highlighter của chúng ta trông đẹp và xuất hiện ở đúng vị trí, chúng ta cần xác định một số kiểu động:
                                        </div> */}
                                        <Audi/>
                                    </section>
                                </section>
                            </section>
                        </section>

                    </section>



                </section>
            </Popover>
        </div>




    );
}

export default PopoverShow;