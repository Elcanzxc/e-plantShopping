import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice'; // Убедитесь, что путь к CartSlice верен
import './ProductList.css';

function ProductList() {
    const [showCart, setShowCart] = useState(false);
    const dispatch = useDispatch();
    
    // Получаем список товаров в корзине для проверки состояния кнопок
    const cartItems = useSelector(state => state.cart.items);
    
    // Считаем общее количество товаров для иконки корзины
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const plantsArray = [
        {
            category: "Air Purifying Plants",
            plants: [
                { name: "Snake Plant", image: "https://cdn.pixabay.com/photo/2021/01/22/06/04/slither-5939223_1280.jpg", description: "Produces oxygen at night.", cost: "$15" },
                { name: "Spider Plant", image: "https://cdn.pixabay.com/photo/2018/07/11/06/47/chlorophytum-3530413_1280.jpg", description: "Filters formaldehyde and xylene.", cost: "$12" },
                { name: "Peace Lily", image: "https://cdn.pixabay.com/photo/2019/06/12/14/14/peace-lily-4269365_1280.jpg", description: "Removes mold spores from the air.", cost: "$18" },
                { name: "Aloe Vera", image: "https://cdn.pixabay.com/photo/2018/04/02/07/42/aloe-3283030_1280.jpg", description: "Purifies air and has medicinal uses.", cost: "$10" },
                { name: "Bamboo Palm", image: "https://cdn.pixabay.com/photo/2016/07/21/23/05/palm-1533816_1280.jpg", description: "Adds moisture to the indoor air.", cost: "$25" },
                { name: "Rubber Plant", image: "https://cdn.pixabay.com/photo/2020/02/15/11/49/flower-4850729_1280.jpg", description: "Tough and easy to care for.", cost: "$20" }
            ]
        },
        {
            category: "Aromatic Fragrant Plants",
            plants: [
                { name: "Lavender", image: "https://images.unsplash.com/photo-1506072951270-12774a49539d", description: "Calming scent, used in aromatherapy.", cost: "$15" },
                { name: "Jasmine", image: "https://images.unsplash.com/photo-1592729645009-b96d1e63d14b", description: "Sweet fragrance, blooms at night.", cost: "$18" },
                { name: "Rosemary", image: "https://images.unsplash.com/photo-1594190999659-7c9393e515d7", description: "Invigorating scent, used in cooking.", cost: "$12" },
                { name: "Mint", image: "https://cdn.pixabay.com/photo/2016/01/07/18/20/mint-1126282_1280.jpg", description: "Refreshing aroma, great for tea.", cost: "$10" },
                { name: "Lemon Balm", image: "https://cdn.pixabay.com/photo/2019/09/16/07/41/balm-4480134_1280.jpg", description: "Citrusy scent, relieves stress.", cost: "$14" },
                { name: "Hyacinth", image: "https://cdn.pixabay.com/photo/2019/04/07/20/20/hyacinth-4110726_1280.jpg", description: "Strong, floral fragrance.", cost: "$22" }
            ]
        }
    ];

    const handleAddToCart = (plant) => {
        dispatch(addItem(plant));
    };

    const isPlantInCart = (plantName) => {
        return cartItems.some(item => item.name === plantName);
    };

    return (
        <div>
            {/* Навигационная панель */}
            <div className="navbar">
                <div className="nav-links">
                    <a href="/" onClick={(e) => {e.preventDefault(); window.location.href='/'}}>Home</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setShowCart(false)}}>Plants</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setShowCart(true)}}>
                        Cart <span className="cart-count">({totalItems})</span>
                    </a>
                </div>
            </div>

            {!showCart ? (
                <div className="product-grid">
                    {plantsArray.map((category, index) => (
                        <div key={index}>
                            <h2 className="category-title">{category.category}</h2>
                            <div className="plants-list">
                                {category.plants.map((plant, idx) => (
                                    <div key={idx} className="plant-card">
                                        <img src={plant.image} alt={plant.name} className="plant-image" />
                                        <h3>{plant.name}</h3>
                                        <p>{plant.description}</p>
                                        <p className="plant-cost">{plant.cost}</p>
                                        <button 
                                            className="add-to-cart-btn"
                                            disabled={isPlantInCart(plant.name)}
                                            onClick={() => handleAddToCart(plant)}
                                        >
                                            {isPlantInCart(plant.name) ? "Added to Cart" : "Add to Cart"}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="cart-placeholder">
                    {/* Сюда обычно импортируется компонент CartItem */}
                    <h2>Your Cart is under development or displayed here</h2>
                    <button onClick={() => setShowCart(false)}>Continue Shopping</button>
                </div>
            )}
        </div>
    );
}

export default ProductList;
