export default async function fetchOrders ({ token }) {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGY1N2Q0My1jYzRhLTQ4YjAtYmZmYi1jOThiNTA0YjhkMmQiLCJpYXQiOjE3MTkxNzY5MzgsImV4cCI6MTcyMTc2ODkzOCwianRpIjoiMyJ9.vpE47Oi_JpdtUnmjV82e6gQ3eVyK7VdK-sbg5DuQ2tE`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
