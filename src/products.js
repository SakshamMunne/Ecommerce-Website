// all the products of our shop
export const products = [
  { id: 1, name: 'Everyday Tote', category: 'Accessories', price: 1499, info: 'Roomy cotton canvas bag for daily use.', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=85' },
  { id: 2, name: 'Weekend Knit', category: 'Clothing', price: 2999, info: 'Soft and cosy knit for lazy mornings.', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85' },
  { id: 3, name: 'Sculptural Vase', category: 'Home', price: 1899, info: 'Handmade ceramic vase for your table.', image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85' },
  { id: 4, name: 'Daylight Shirt', category: 'Clothing', price: 2199, info: 'Light linen shirt, comfy in any weather.', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=900&q=85' },
  { id: 5, name: 'Form Hoop Earrings', category: 'Accessories', price: 999, info: 'Light brass hoops with a shiny finish.', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=85' },
  { id: 6, name: 'Soft Landing Throw', category: 'Home', price: 3499, info: 'Big warm blanket for sofa or bed.', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85' },
  { id: 7, name: 'The Essential Tee', category: 'Clothing', price: 899, info: 'Thick cotton t-shirt that keeps its shape.', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85' },
  { id: 8, name: 'Daily Ritual Mug', category: 'Home', price: 699, info: 'Speckled stoneware mug, 350 ml.', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=85' },
  { id: 9, name: 'Cloud Hoodie', category: 'Clothing', price: 2499, info: 'Fleece hoodie, super soft inside.', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85' },
  { id: 10, name: 'Denim Overshirt', category: 'Clothing', price: 3299, info: 'Washed denim layer that goes with everything.', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85' },
  { id: 11, name: 'Sunlit Sunglasses', category: 'Accessories', price: 1799, info: 'Light frames with UV protection.', image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=900&q=85' },
  { id: 12, name: 'Leather Card Wallet', category: 'Accessories', price: 1299, info: 'Slim leather wallet, holds 4 cards.', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=900&q=85' },
  { id: 13, name: 'Everyday Backpack', category: 'Accessories', price: 3799, info: 'Water resistant, fits a 15 inch laptop.', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85' },
  { id: 14, name: 'Amber Soy Candle', category: 'Home', price: 799, info: 'Soy wax candle, burns for 45 hours.', image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85' },
  { id: 15, name: 'Linen Cushion Set', category: 'Home', price: 1599, info: 'Set of 2 linen cushion covers.', image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=85' },
  { id: 16, name: 'Terracotta Planter', category: 'Home', price: 1099, info: 'Clay pot with saucer for small plants.', image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=900&q=85' },
]

export const categories = ['All', 'Clothing', 'Accessories', 'Home']

// shipping is free above this amount, otherwise we charge a small fee
export const FREE_SHIPPING_LIMIT = 2999
export const SHIPPING_FEE = 99

// shows a number like ₹1,499
export function rupees(amount) {
  return '₹' + amount.toLocaleString('en-IN')
}

// pretends to fetch one product from a server (waits half a second)
// if the id is wrong it gives an error, so we can show an error message
export function fetchProduct(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const found = products.find((p) => p.id === Number(id))
      if (found) {
        resolve(found)
      } else {
        reject(new Error('Sorry, we could not find this product.'))
      }
    }, 500)
  })
}
