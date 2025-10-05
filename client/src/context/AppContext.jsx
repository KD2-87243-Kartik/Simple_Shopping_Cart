import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { assets, dummyOrders, dummyProducts } from "../assets/assets";
import toast from "react-hot-toast";

export const AppContext = createContext();

const API_URL = 'http://localhost:3001';
const FALLBACK_IMAGE_KEY = 'potato_image_1';

export const AppContextProvider = ({children})=> {

    const currency = import.meta.env.VITE_CURRENCY;

    const navigate = useNavigate();
    const [user, setuser] = useState(null);
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [orders, setOrders] = useState(dummyOrders); 
    
     const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('shoppingCart');
        return savedCart ? JSON.parse(savedCart) : {};
    });

    const [searchQuery, setSearchQuery] = useState({})

    const mapProductImage = (product) => {
    
    const keyFromBackend = product.imageKey; 

    const imageKeyToUse = assets[keyFromBackend] 
        ? keyFromBackend         // Use the backend key if it's found in assets
        : FALLBACK_IMAGE_KEY;    // Otherwise, safely use the fallback

    // 3. Look up the image asset variable
    const finalImage = assets[imageKeyToUse];

    return {
        ...product,
        // Map the product object property that the frontend expects
        image: [finalImage], 
    };
};

    //Fetching all products
    // const fetchproducts = async () => {
    //     setProducts(dummyProducts);
    // }

    const fetchproducts = async () => {
        try {
            const response = await fetch(`${API_URL}/products`);
            if (!response.ok) {
                throw new Error('Failed to fetch products from backend');
            }
            const data = await response.json();
            
            // Apply the mapping to handle images correctly
            const productsWithImages = data.map(mapProductImage);
            setProducts(productsWithImages); 

        } catch (error) {
            console.error("Error fetching products:", error);
            toast.error("Could not load products. Check backend on port 3001.");
            setProducts(dummyProducts); // Fallback to dummy data
        }
    }

    const checkoutOrder = async () => {
        const cartItemsForApi = Object.keys(cartItems).map(productId => ({
            id: Number(productId), 
            quantity: cartItems[productId]
        }));

        if (cartItemsForApi.length === 0) {
            toast.error("Your cart is empty!");
            return false;
        }

        try {
            const response = await fetch(`${API_URL}/checkout`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cartItems: cartItemsForApi }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setCartItems({}); // Clear cart on success
                toast.success(data.message || "Order placed successfully!");
                return true;
            } else {
                toast.error(data.message || "Checkout failed due to a server error.");
                return false;
            }
        } catch (error) {
            console.error("Error during checkout:", error);
            toast.error('Network error. Could not connect to the backend.');
            return false;
        }
    };

    const addOrderToHistory = (newOrder) => {
        // This simulates adding the new order to the history
        setOrders(prevOrders => [newOrder, ...prevOrders]);
        setCartItems({}); // Clear cart after successful order
    }

    //Add to Cart
    const addToCart = (itemId)=> {
        let cartData = structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1
        } else {
        cartData[itemId] = 1
        }
        setCartItems(cartData);
        toast.success("Added to Cart")
    }
    //Update Cart Items Quantity
    const  updateCartItem = (itemId, quantity)=> {
        let cartData = structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart Updated")
    }

    const removeFromCart = (itemId)=> {
        let cartData = structuredClone(cartItems);
        
        if(cartData[itemId] > 0)
        {
            cartData[itemId] -= 1;
            // CORRECTED CONDITION: Only delete if quantity is 0 or less
            if(cartData[itemId] <= 0) 
            {
                delete cartData[itemId]; 
            }
        }
        toast.success("Removed from Cart")
        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const item in cartItems){
            totalCount += cartItems[item];
        }
        return totalCount;
    }
    
    // const getCartAmount = () => {
    //     let totalAmount = 0;
    //     for(const items in cartItems){
    //         let itemInfo = products.find((product)=> product._id === items);
    //         if(cartItems[items] > 0){
    //             totalAmount += itemInfo.offerPrice * cartItems[items]
    //         }
    //     }
    //     return Math.floor(totalAmount * 100) / 100;
    // }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            // Use the correct variable name 'itemId' for lookup
            let itemInfo = products.find((product)=> product.id == items); 
            
            if(itemInfo && cartItems[items] > 0){
                // Correctly check for offerPrice and fall back to price
                const priceKey = itemInfo.offerPrice !== undefined ? itemInfo.offerPrice : itemInfo.price;
                
                // Add an additional check to ensure priceKey is a valid number
                if (typeof priceKey === 'number') {
                     totalAmount += priceKey * cartItems[items];
                }
            }
        }
        return Math.floor(totalAmount * 100) / 100;
    }
    useEffect(() => {
        localStorage.setItem('shoppingCart', JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(()=> {
        fetchproducts()
    },[])

    const value = { navigate, user, setuser, setIsSeller, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart,
         cartItems, searchQuery, setSearchQuery, getCartAmount, getCartCount, checkoutOrder, orders, addOrderToHistory };
    
    return <AppContext.Provider value={value}>
            {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}