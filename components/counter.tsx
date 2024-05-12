import React , {useState} from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { increment, amountAdded } from '../features/counter-slice';

export default () => {

    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    const [amountToAdd, setAmountToAdd] = useState(0);

    const handleClick = () => dispatch(increment())
    const handleAmountAdded = () => dispatch(amountAdded(amountToAdd))

    return(
        <div>
            <p> This is a counter: 
                <br/> 
                <button onClick={handleClick}>
                    {count} 
                </button>
            </p>
            <button onClick={handleAmountAdded}> Add {amountToAdd} </button>
            <input value={amountToAdd} onChange={e => setAmountToAdd(Number(e.target.value))}/>
        </div>

    )
}
    
