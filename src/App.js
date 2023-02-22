import { useEffect, useState } from "react";
import { checkoutlist } from './Basket';
function List() {
    const [counts, setCounts] = useState(new Array(checkoutlist.length).fill(0));

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

    const listItems = checkoutlist.map((item, index) => {
        const total = item.price * counts[index];
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
            </tr>
        );
    });

    let totalSum = 0;
    for (let i = 0; i < checkoutlist.length; i++) {
        const item = checkoutlist[i];
        const count = counts[i];
        totalSum += item.price * count;
    }

    return (
        <table>
            <thead>
            <tr>
                <td>ID</td>
                <td>Price</td>
                <td>Quantity</td>
                <td>Total</td>
            </tr>
            </thead>
            <tbody>
            {listItems}
            <tr>

                <td colSpan={3}>Total price:</td>
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
