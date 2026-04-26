"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CART } from "@/graphql/queries/cartQueries";
import { CREATE_ORDER } from "@/graphql/queries/orderQueries";
import { GET_PROFILE } from "@/graphql/queries/profileQueries";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { User, Phone, Mail, MapPin, Pencil } from "lucide-react";
import { toast } from "sonner";

/* ================= TYPES ================= */

type CartParamItem = {
  id: number;
  quantity: number;
};

type Address = {
  id: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
};

export default function OrderSummaryPage() {
  const searchParams = useSearchParams();

  /* ================= PARAMS ================= */

  const productIdParam = searchParams.get("productId");
  const quantityParam = searchParams.get("quantity");
  const cartParam = searchParams.get("cart");

  const parsedProductId = productIdParam ? Number(productIdParam) : null;
  const quantity = Math.max(1, Number(quantityParam) || 1);

  let parsedCart: CartParamItem[] = [];

  if (cartParam) {
    try {
      parsedCart = JSON.parse(decodeURIComponent(cartParam));
    } catch (e) {
      console.error("Invalid cart param");
    }
  }

  const isBuyNow = !!parsedProductId && parsedCart.length === 0;
  const isCartCheckout = parsedCart.length > 0;

  /* ================= QUERIES ================= */

  const { data: productData } = useQuery(GET_PRODUCTS, {
    variables: { first: 50, search: "", after: null },
    skip: !isBuyNow && !isCartCheckout,
  });

  const { data: cartData } = useQuery(GET_CART, {
    skip: isBuyNow || isCartCheckout,
  });

  const { data: profileData } = useQuery(GET_PROFILE);

  const products = productData?.products?.products || [];

  const product = products.find(
    (p: any) => Number(p.id) === parsedProductId
  );

  /* ================= ADDRESS ================= */

  const customer = profileData?.myCustomer;
  const addresses: Address[] = customer?.addresses ?? [];

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "COD",
  });

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddressId) {
      const defaultAddr =
        addresses.find((a) => a.isDefault) || addresses[0];

      if (!defaultAddr) return;

      setSelectedAddressId(defaultAddr.id);

      setForm({
        name: defaultAddr.name || customer?.user?.firstName || "",
        phone: defaultAddr.phone || customer?.user?.phone || "",
        email: customer?.user?.email || "",
        address: `${defaultAddr.city}, ${defaultAddr.state} - ${defaultAddr.pincode}`,
        payment: "COD",
      });
    }
  }, [addresses, selectedAddressId, customer]);

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);

    const addr = addresses.find((a) => a.id === id);

    if (addr) {
      setForm({
        name: addr.name || customer?.user?.firstName || "",
        phone: addr.phone || customer?.user?.phone || "",
        email: customer?.user?.email || "",
        address: `${addr.city}, ${addr.state} - ${addr.pincode}`,
        payment: form.payment,
      });
    }
  };

  /* ================= ORDER ITEMS ================= */

  const orderItems = useMemo(() => {
    if (isBuyNow) {
      return [{ productId: parsedProductId, quantity }];
    }

    if (isCartCheckout) {
      return parsedCart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));
    }

    return (
      cartData?.myCart?.items?.map((item: any) => ({
        productId: Number(item.product.id),
        quantity: item.quantity,
      })) || []
    );
  }, [isBuyNow, isCartCheckout, parsedCart, cartData]);

  /* ================= PRICING ================= */

  const subtotal = useMemo(() => {
    if (isBuyNow && product) {
      const price = Number(product.discountPrice || product.price || 0);
      return price * quantity;
    }

    if (isCartCheckout) {
      return parsedCart.reduce((acc, item) => {
        const p = products.find((p: any) => Number(p.id) === item.id);
        const price = Number(p?.discountPrice || p?.price || 0);
        return acc + price * item.quantity;
      }, 0);
    }

    return (
      cartData?.myCart?.items?.reduce(
        (acc: number, item: any) =>
          acc + Number(item.product.price) * item.quantity,
        0
      ) || 0
    );
  }, [isBuyNow, isCartCheckout, parsedCart, product, products, cartData, quantity]);

  const shipping = 10;
  const total = subtotal + shipping;

  /* ================= ORDER ================= */

  const [createOrder, { loading }] = useMutation(CREATE_ORDER);

  const handlePlaceOrder = async () => {
  // ✅ Basic validation
  if (!form.name || !form.phone || !form.address) {
    toast.error("Please fill all required details");
    return;
  }

  if (!orderItems.length) {
    toast.error("No items to order 🛒");
    return;
  }

  try {
    const res = await createOrder({
      variables: {
        customerName: form.name,
        customerPhone: form.phone,
        customerEmail: form.email,
        shippingAddress: form.address,
        paymentMethod: form.payment,
        items: orderItems,
      },
    });

    const order = res.data?.createCustomerOrder?.order;

    if (order) {
      toast.success(`Order placed successfully (#${order.orderNumber})`);

      // 👉 optional redirect
      setTimeout(() => {
        window.location.href = "/orders";
      }, 1200);

    } else {
      toast.error("Failed to place order");
    }

  } catch (err: any) {
    toast.error(err.message || "Something went wrong");
  }
};

  const originalTotal = useMemo(() => {
    if (isCartCheckout) {
      return parsedCart.reduce((acc, item) => {
        const p = products.find((p: any) => Number(p.id) === item.id);
        return acc + Number(p?.price || 0) * item.quantity;
      }, 0);
    }

    if (isBuyNow && product) {
      return Number(product.price || 0) * quantity;
    }

    return 0;
  }, [parsedCart, products, product, quantity, isCartCheckout, isBuyNow]);

  const discount = originalTotal - subtotal;
  const tax = subtotal * 0.05;
  const finalTotal = subtotal + shipping + tax;

  /* ================= UI ================= */

  return (
    <div className="bg-background min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-10">

        {/* ================= FORM ================= */}
        <div className="space-y-6">
          <h2 className="text-2xl font-heading">Delivery Details</h2>

          <div className="space-y-4">

            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Select Delivery Address</h3>

              {/* Optional Add New */}
              <button className="text-sm text-primary hover:underline">
                + Add New
              </button>
            </div>

            {addresses.map((addr) => {
              const isSelected = selectedAddressId === addr.id;

              return (
                <div
                  key={addr.id}
                  onClick={() => handleAddressSelect(addr.id)}
                  className={`relative border rounded-2xl p-4 cursor-pointer transition-all duration-200
        ${isSelected
                      ? "border-primary bg-primary/5 shadow-md"
                      : "hover:border-primary/50 hover:shadow-sm"
                    }`}
                >

                  {/* DEFAULT BADGE */}
                  {addr.isDefault && (
                    <span className="absolute top-3 right-3 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}

                  <div className="flex gap-4">

                    {/* ICON */}
                    <div className="mt-1 text-primary">
                      <MapPin size={20} />
                    </div>

                    {/* CONTENT */}
                    <div className="flex-1">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="font-medium text-base">
                            {addr.name}
                          </p>

                          <p className="text-sm text-muted-foreground">
                            {addr.phone}
                          </p>

                          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                            {addr.city}, {addr.state} - {addr.pincode}
                          </p>
                        </div>

                        {/* RADIO */}
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center 
                ${isSelected ? "border-primary" : "border-gray-400"}`}
                        >
                          {isSelected && (
                            <div className="w-2.5 h-2.5 bg-primary rounded-full" />
                          )}
                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="flex justify-between items-center mt-4">

                        {/* Deliver Here Button */}
                        {isSelected ? (
                          <button className="bg-primary text-white text-sm px-4 py-1.5 rounded-full">
                            Deliver Here
                          </button>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            Click to select
                          </span>
                        )}

                        {/* Edit */}
                        {/* <button
                          onClick={(e) => {
                            e.stopPropagation();
                            console.log("Edit address", addr.id);
                          }}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Pencil size={14} />
                          Edit
                        </button> */}

                      </div>

                    </div>

                  </div>
                </div>
              );
            })}

          </div>
          <Input icon={<User />} name="name" value={form.name} onChange={(e: any) => setForm({ ...form, name: e.target.value })} placeholder="Name" />
          <Input icon={<Phone />} name="phone" value={form.phone} onChange={(e: any) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" />
          <Input icon={<Mail />} name="email" value={form.email} onChange={(e: any) => setForm({ ...form, email: e.target.value })} placeholder="Email" />

          <textarea
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full border p-3 rounded-lg"
          />

          {/* ✅ PAYMENT OPTIONS */}
          <div>
            <h3 className="font-medium mb-2">Payment Method</h3>

            <div className="flex gap-4">
              <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={form.payment === "COD"}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-2 border p-3 rounded-lg cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  checked={form.payment === "ONLINE"}
                  onChange={(e) => setForm({ ...form, payment: e.target.value })}
                />
                Online Payment
              </label>
            </div>
          </div>
        </div>

        {/* ================= SUMMARY ================= */}
       <div className="bg-card border p-6 rounded-xl flex flex-col h-fit">
          <h2 className="text-xl font-heading mb-4">Order Summary</h2>

          {/* ITEMS */}
          {isBuyNow && product && (
            <ItemRow product={product} qty={quantity} />
          )}

          {isCartCheckout &&
            parsedCart.map((item, i) => {
              const p = products.find((p: any) => Number(p.id) === item.id);
              if (!p) return null;

              return <ItemRow key={i} product={p} qty={item.quantity} />;
            })}

          {/* 🔥 UPDATED BILLING */}
          <div className="mt-4 space-y-3 text-sm border-t pt-4">

            <div className="flex justify-between">
              <span>Items ({isCartCheckout ? parsedCart.length : 1})</span>
              <span>₹{originalTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>- ₹{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>

            <div className="flex justify-between">
              <span>GST (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between border-t pt-3 font-semibold text-lg">
              <span>Total</span>
              <span>₹{(subtotal + shipping + tax).toFixed(2)}</span>
            </div>

          </div>
          {/* 
  🎉 OPTIONAL UX */}
          {/* {discount > 0 && (
    <p className="text-green-600 text-sm mt-2">
      You saved ₹{discount.toFixed(2)} 🎉
    </p>
  )} */}

          <Button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full mt-6"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================= UI HELPERS ================= */

function Row({ label, value, bold = false }: any) {
  return (
    <div className={`flex justify-between ${bold ? "font-bold" : ""}`}>
      <span>{label}</span>
      <span>₹{value}</span>
    </div>
  );
}

function ItemRow({ product, qty }: any) {
  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/media/`;

  const image = product?.images?.[0]?.image
    ? product.images[0].image.startsWith("http")
      ? product.images[0].image
      : `${BASE_URL}${product.images[0].image}`
    : "https://via.placeholder.com/80";

  const price = Number(product.discountPrice || product.price || 0);

  return (
    <div className="flex items-center justify-between border p-3 rounded-lg mb-3">
      <div className="flex items-center gap-4">
        <img src={image} className="w-16 h-16 rounded-md" />
        <div>
          <p>{product.name}</p>
          <p className="text-sm">₹{price} × {qty}</p>
        </div>
      </div>
      <p className="font-semibold">₹{price * qty}</p>
    </div>
  );
}

function Input({ icon, ...props }: any) {
  return (
    <div className="relative">
      <div className="absolute left-3 top-3 text-gray-400">{icon}</div>
      <input {...props} className="w-full border p-3 pl-10 rounded-lg" />
    </div>
  );
}