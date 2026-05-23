const CheckoutButton = () => {
  const handleCheckout = async () => {
    const response = await fetch("http://localhost:8000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: "Premium Listing",
        amount: 999, // €9.99
        quantity: 1,
      }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="rounded-lg bg-black px-4 py-2 text-white"
    >
      Pay now
    </button>
  );
};

export default CheckoutButton;