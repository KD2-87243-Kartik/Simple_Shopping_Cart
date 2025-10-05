import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'
// import { dummyOrders } from '../assets/assets'

const MyOrders = () => {

    const { currency, products, orders } = useAppContext() 
    const [mappedOrders, setMappedOrders] = useState([]) // Local state for displaying enriched orders

    // Helper to enrich orders with live product data
    const mapOrdersToProducts = ()=> {
        // Safety Check: Crash Prevention
        if (!orders || orders.length === 0 || !products || products.length === 0) { 
            setMappedOrders([]); 
            return; 
        }

        const enrichedOrders = orders.map(order => {
            
            const itemsWithLiveProducts = order.items.map(item => {
                const productId = item.product.id || item.product.id; 
                
                const liveProduct = products.find(p => p.id == productId); 
                
                return {
                    ...item,
                    product: liveProduct || item.product, 
                };
            });

            return { ...order, items: itemsWithLiveProducts };
        });

        setMappedOrders(enrichedOrders);
    }

    useEffect(()=> {
        // 2. Map orders whenever the live 'orders' or 'products' state updates
        mapOrdersToProducts()
    },[orders, products])

  return (
    <div className='mt-16 pb-16'>
        <div className='flex flex-col items-end w-max mb-8'>    
            <p className='text-2xl font-medium uppercase'>My Orders</p>
            <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>
        {mappedOrders.length > 0 ? (
            mappedOrders.map((order, index)=> (
            <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
                <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
                    <span>OrderId: {order.id}</span>
                    <span>Payment: {order.paymentType}</span>
                    <span>Total Amount: {currency}{order.amount}</span>
                </p>
                {order.items.map((item, index)=> (
                  item.product && item.product.image && item.product.image[0] ? ( 
                    <div key={index} className= {`relative bg-white text-gray-500/70 
                        ${order.items.length !== index + 1 && "border-b"} 
                            border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w 4xl"`}>
                        <div className='flex items-center mb-4 md:mb-0'>
                            <div className='bg-primary/10 p-4 rounded-lg'>
                                <img src={item.product.image[0]} alt="" className='w-16 h-16'/>
                            </div>
                            <div className='ml-4'>
                                <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                                <p>Category: {item.product.category}</p>
                            </div>
                        </div>
                        <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                            <p>Quantity: {item.quantity || "1"}</p>
                            <p>Status: {order.status}</p>
                            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                            <p className='text-primary text-lg font-medium'>
                                Amount: {currency}{item.product.offerPrice * item.quantity}
                            </p>
                    </div>
                        ) : null 
                    ))}
                </div>
            ))
        ) : (
             // Display a message if no orders are present
             <div className='flex items-center justify-center h-[60vh]'>
                <p className='text-2xl font-medium text-gray-500'>
                    You haven't placed any orders yet.
                </p>
            </div>
        )}
    </div>
  )
}

export default MyOrders