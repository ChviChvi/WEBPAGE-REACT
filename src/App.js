import { useEffect, useState } from "react";
import { checkoutlist } from './Basket';
import './stylesheets/checkouttable.css'; // import CSS styles
function List() {


    // Initialize 'counts' state with 0 for each item in the basket.js
    const [counts, setCounts] = useState(new Array(checkoutlist.length).fill(0));
    // initialize a sletknap state which is an empty array --.
    const [sletKnap, setSletKnap] = useState([]);
    // Adds count button +/- and function
    function Counter({index }) {
        const count = counts[index];
        const clickHandlerIncrement = () => {
            setCounts((counts) =>
                counts.map((c, i) =>(i === index ? c + 1 : c)));
        };
        const clickHandlerDecrement = () => {
            setCounts((counts) =>
                counts.map((c, i) => (i === index && c > 0 ? c - 1 : c))
            );
        };
        return (
            <div>
                <button onClick={clickHandlerIncrement}>+</button>
                <button onClick={clickHandlerDecrement}>-</button>
                <span>{count}</span>
            </div>
        );
    }


    // creates the table
    const listItems = checkoutlist.map((item, index) => {
        // we remove the row if the index of the row is in the removed array.
        if (sletKnap.includes(index)) return null;
        // here we calculate the total price..
        const total = item.price * counts[index];
        // handling the clicks for removing the item. -> (adds index to of the item in the array initialized earlier.
        const clickHandlerRemove = () => {
            setSletKnap((removed) => [...removed, index]);
        };
        // 1 row with every id the item has. + slet knap (item.d/pice/count/total)
        return (
            <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                    {item.price}
                    {item.currency}
                </td>
                <td>
                    <Counter index={index} />
                </td>
                <td>
                    {total}
                    {item.currency}
                </td>

                <td>
                    <button onClick={clickHandlerRemove}>SLET</button>
                </td>


            </tr>
        );
    });

    // calculates the total price of all the items which are not in the sletknap array.
    let totalSum = 0;
    for (let i = 0; i < checkoutlist.length; i++) {
        if (sletKnap.includes(i)) continue;
        const item = checkoutlist[i];
        const count = counts[i];
        totalSum += item.price * count;
    }
    // Renders the headers, body, and bottom row.
    return (
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
                <td>Slet</td>
            </tr>
            </thead>
            <tbody>
            {listItems}
            <tr className="rows-css">

                <td colSpan={4}>Total price:</td>
                <td>
                    {totalSum}
                    {checkoutlist[0].currency}
                </td>
            </tr>
            </tbody>
        </table>
    );
}

function App() {
    return (
        <>
            <div>
                <h1>Checkout</h1>
                <List/>
            </div>
        </>
    );
}

export default App;
