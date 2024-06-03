import { createContext, useContext, useState, useEffect } from 'react';

export const CardContext = createContext({});

function CardProvider({ children }) {
    const [card, setCard] = useState( JSON.parse(localStorage.getItem(`@foodexplorer:card`)) || [])

    const [orders, setOrders] = useState([])

    function handleAddDishPay(data, quantity, image) {

        try {
            const { id, title, price} = data
            const priceFormatted = quantity * Number(price.replace(',', '.'))
            
            const order = {id, title, price: priceFormatted, image, quantity}
            
            const orderExists = card.some((userOrder) => userOrder.title === order.title)
            if (orderExists) {
                return alert("Item já adicionado.")
            }
        
            setCard(prevState => [...prevState, order])
        } catch (error) {
            if (error.response) {
                alert(error.response.data.message)
            } else {
                alert("Item indisponível.")
            }
        }

        alert("Item adicionado!")
    }

    function handleRemoveDishPay(deleted) {
        setCard(prevState => prevState.filter(item => item.id !== deleted))
    }

    const total = card.reduce((value, item) => {
        return value + item.price
    }, 0) 

    async function handleResetPay() {
        localStorage.removeItem(`@foodexplorer:card`);
        setCard([]);
    }

    useEffect(() => {
        localStorage.setItem(`@foodexplorer:card`, JSON.stringify(card));
    }, [card])

    return (
        <CardContext.Provider value={{ 
            card,
            handleAddDishPay,
            handleRemoveDishPay,
            total: String(total.toFixed(2)).replace('.', ','),
            orders,
            setOrders,
            handleResetPay,
        }}>
            { children }
        </CardContext.Provider>
    )
}

function useCard() {
    const context = useContext(CardContext);
    return context;
}

export { CardProvider, useCard };