import { useState } from 'react';

export default function App() {
    const [leftBox, setLeftBox] = useState([1, 2, 3, 4]);
    const [rightBox, setRightBox] = useState([]);
    const [leftChbx, setLeftChbx] = useState([]);
    const [rightChbx, setRightChbx] = useState([]);

    const handleCheckBox = (item, type) => {
        if(type === 'left') {
            setLeftChbx(el => [...el, item]);
        } 

        if(type === 'right') {
            setRightChbx(el => [...el, item]);
        }
    }

    const handleButtonClick = (type) => {
        if(type === 'left') {
            setRightBox(el => [...el, ...leftChbx]);
            setLeftBox(el => el.filter(item => !leftChbx.includes(item)));
            setLeftChbx([]);
        }

        if(type === 'right') {
            setLeftBox(el => [...el, ...rightChbx]);
            setRightBox(el => el.filter(item => !rightChbx.includes(item)));
            setRightChbx([]);
        }
    }

    return <div className="listWrapper">
        <div className='leftBox'>
            {leftBox.map(item => {
                return <div key={item} className='leftItem'>
                    <input type="checkbox" id={item} name={item} value={item} onClick={() => handleCheckBox(item, 'left')} />
                    <label htmlFor={item}>{item}</label>
                </div>
            })}
        </div>
        <div className='btnWrapper'>
            <button onClick={() => handleButtonClick('left')}>{`>`}</button>
            <button onClick={() => handleButtonClick('right')}>{`<`}</button>
        </div>
        <div className='rightBox'>
            {rightBox.map(item => {
                return <div key={item} className='rightItem'>
                    <input type="checkbox" id={item} name={item} value={item} onClick={() => handleCheckBox(item, 'right')} />
                    <label htmlFor={item}>{item}</label>
                </div>
            })}
        </div>
    </div >;
}
