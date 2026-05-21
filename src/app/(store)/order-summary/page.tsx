"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_CART } from "@/graphql/queries/cartQueries";
import { CREATE_ORDER } from "@/graphql/queries/orderQueries";
import { GET_PROFILE } from "@/graphql/queries/profileQueries";
import { ADD_ADDRESS } from "@/graphql/queries/profileQueries";
import { GET_PRODUCTS } from "@/graphql/queries/productQueries";
import { CREATE_RAZORPAY_ORDER, VERIFY_PAYMENT } from "@/graphql/queries/orderQueries"
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Pencil,
  ChevronDown,
  Check,
  CreditCard,
  Wallet,
  X,
  Home,
  Building2,
} from "lucide-react";
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
  const [addAddress, { loading: addingAddress }] =
    useMutation(ADD_ADDRESS);
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

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const [createRazorpayOrder] = useMutation(CREATE_RAZORPAY_ORDER);
  const [verifyPayment] = useMutation(VERIFY_PAYMENT);

  /* ================= QUERIES ================= */

  const { data: productData } = useQuery(GET_PRODUCTS, {
    variables: { first: 50, search: "", after: null },
    skip: !isBuyNow && !isCartCheckout,
  });

  const { data: cartData } = useQuery(GET_CART, {
    skip: isBuyNow || isCartCheckout,
  });

  const {
    data: profileData,
    refetch: refetchProfile,
  } = useQuery(GET_PROFILE);

  const products = productData?.products?.products || [];

  const product = products.find(
    (p: any) => Number(p.id) === parsedProductId
  );

  /* ================= ADDRESS ================= */

  const customer = profileData?.myCustomer;
  const addresses: Address[] = customer?.addresses ?? [];

  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

  const [showAddressModal, setShowAddressModal] =
    useState(false);

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    payment: "COD",
  });
  const [showAdvanceOrder, setShowAdvanceOrder] = useState(false);
  const [advanceDate, setAdvanceDate] = useState("");

  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  const selectedAddress = addresses.find(
    (a) => a.id === selectedAddressId
  );

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
  const handleAddAddress = async () => {
    if (
      !addressForm.name ||
      !addressForm.phone ||
      !addressForm.city
    ) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      const res = await addAddress({
        variables: {
          ...addressForm,
        },
      });

      await refetchProfile();

      const newAddress =
        res?.data?.addAddress?.address;

      if (newAddress) {
        setSelectedAddressId(newAddress.id);

        handleAddressSelect(newAddress.id);
      }

      setShowAddressModal(false);

      setAddressForm({
        name: "",
        phone: "",
        city: "",
        state: "",
        pincode: "",
        landmark: "",
        isDefault: false,
      });

      toast.success("Address added successfully");

    } catch (err: any) {
      toast.error(
        err.message || "Failed to add address"
      );
    }
  };
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

  const handlePlaceOrder = async (isAdvance = false) => {
    if (!form.name || !form.phone || !form.address) {
      toast.error("Please fill all required details");
      return;
    }

    if (!orderItems.length) {
      toast.error("No items to order!");
      return;
    }

    if (isAdvance && !advanceDate) {
      toast.error("Please select advance delivery date");
      return;
    }

    try {
      // ✅ STEP 1: Create Order
      const res = await createOrder({
        variables: {
          customerName: form.name,
          customerPhone: form.phone,
          customerEmail: form.email,
          shippingAddress: form.address,
          paymentMethod: form.payment,
          items: orderItems,

          // NEW
          advanceOrder: isAdvance,
          deliveryDate: isAdvance ? advanceDate : null,
        },
      });

      const order = res.data?.createCustomerOrder?.order;

      if (!order) {
        toast.error("Order creation failed");
        return;
      }

      // ============================
      // 💰 ONLINE PAYMENT FLOW
      // ============================
      if (form.payment === "ONLINE") {
        const scriptLoaded = await loadRazorpay();

        if (!scriptLoaded) {
          toast.error("Razorpay SDK failed to load");
          return;
        }

        // ✅ STEP 2: Create Razorpay Order
        const razorRes = await createRazorpayOrder({
          variables: { orderId: Number(order.id) },
        });

        const razorData = razorRes.data.createRazorpayOrder;

        const options = {
          key: razorData.key,
          amount: razorData.amount,
          currency: "INR",
          name: "Your Store",
          description: `Order #${order.orderNumber}`,
          order_id: razorData.razorpayOrderId,

          handler: async function (response) {
            try {
              // ✅ STEP 3: VERIFY PAYMENT
              const verifyRes = await verifyPayment({
                variables: {
                  razorpayOrderId: response.razorpay_order_id,
                  razorpayPaymentId: response.razorpay_payment_id,
                  razorpaySignature: response.razorpay_signature,
                },
              });

              if (verifyRes.data.verifyPayment.success) {
                toast.success("Payment successful 🎉");

                window.location.href = "/orders";
              } else {
                toast.error("Payment verification failed");
              }
            } catch (err) {
              toast.error("Verification error");
            }
          },

          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },

          theme: {
            color: "#6366f1",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();

      } else {
        // ============================
        // 💵 COD FLOW
        // ============================
        toast.success(`Order placed (#${order.orderNumber})`);

        setTimeout(() => {
          window.location.href = "/orders";
        }, 1200);
      }

    } catch (err) {
      toast.error("Something went wrong");
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

            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">
                Select Delivery Address
              </h3>

              <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="text-sm text-primary hover:underline"
              >
                + Add New Address
              </button>
            </div>

            {/* CUSTOM DROPDOWN */}
            <div className="relative">

              {/* SELECTED VALUE */}
              <button
                type="button"
                onClick={() =>
                  setShowAddressDropdown(!showAddressDropdown)
                }
                className="w-full border rounded-2xl p-4 flex items-center justify-between bg-background hover:border-primary transition"
              >

                <div className="flex items-start gap-3 text-left">

                  <div className="mt-1 text-primary">
                    <MapPin size={20} />
                  </div>

                  <div>
                    {selectedAddress ? (
                      <>
                        <p className="font-medium">
                          {selectedAddress.name}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.phone}
                        </p>

                        <p className="text-sm text-muted-foreground">
                          {selectedAddress.city}, {selectedAddress.state} -{" "}
                          {selectedAddress.pincode}
                        </p>
                      </>
                    ) : (
                      <p className="text-muted-foreground">
                        Select Address
                      </p>
                    )}
                  </div>

                </div>

                <ChevronDown
                  size={20}
                  className={`transition-transform duration-200 ${showAddressDropdown ? "rotate-180" : ""
                    }`}
                />

              </button>

              {/* DROPDOWN MENU */}
              {showAddressDropdown && (
                <div className="absolute z-50 mt-2 w-full bg-background border rounded-2xl shadow-xl overflow-hidden">

                  {addresses.map((addr) => {
                    const isSelected =
                      selectedAddressId === addr.id;

                    return (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => {
                          handleAddressSelect(addr.id);
                          setShowAddressDropdown(false);
                        }}
                        className={`w-full p-4 flex items-start justify-between text-left hover:bg-muted transition
                ${isSelected ? "bg-primary/5" : ""}
              `}
                      >

                        <div className="flex gap-3">

                          <div className="mt-1 text-primary">
                            <MapPin size={18} />
                          </div>

                          <div>

                            <div className="flex items-center gap-2">
                              <p className="font-medium">
                                {addr.name}
                              </p>

                              {addr.isDefault && (
                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                  Default
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-muted-foreground">
                              {addr.phone}
                            </p>

                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {addr.city}, {addr.state} -{" "}
                              {addr.pincode}
                            </p>

                          </div>

                        </div>

                        {/* CHECK ICON */}
                        {isSelected && (
                          <Check
                            size={18}
                            className="text-primary mt-1"
                          />
                        )}

                      </button>
                    );
                  })}

                </div>
              )}

            </div>

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
            <h3 className="font-medium mb-3 text-lg">
              Payment Method
            </h3>

            <div className="grid sm:grid-cols-2 gap-4">

              {/* COD */}
              <label
                className={`relative border rounded-2xl p-4 cursor-pointer transition-all duration-200 flex items-center gap-4
      ${form.payment === "COD"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "hover:border-primary/40"
                  }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="COD"
                  checked={form.payment === "COD"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment: e.target.value,
                    })
                  }
                  className="hidden"
                />

                {/* ICON */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center
        ${form.payment === "COD"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  <Wallet size={22} />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="font-semibold">
                    Cash on Delivery
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Pay when your order arrives
                  </p>
                </div>

              </label>

              {/* ONLINE */}
              <label
                className={`relative border rounded-2xl p-4 cursor-pointer transition-all duration-200 flex items-center gap-4
      ${form.payment === "ONLINE"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "hover:border-primary/40"
                  }`}
              >

                <input
                  type="radio"
                  name="payment"
                  value="ONLINE"
                  checked={form.payment === "ONLINE"}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      payment: e.target.value,
                    })
                  }
                  className="hidden"
                />

                {/* ICON */}
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center
        ${form.payment === "ONLINE"
                      ? "bg-primary text-white"
                      : "bg-muted text-muted-foreground"
                    }`}
                >
                  <CreditCard size={22} />
                </div>

                {/* CONTENT */}
                <div className="flex-1">
                  <p className="font-semibold">
                    Online Payment
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Pay securely with Razorpay
                  </p>
                </div>
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

          <div className="mt-6 space-y-4">

            {/* ADVANCE DATE PICKER */}
            {showAdvanceOrder && (
              <div className="border rounded-xl p-4 bg-muted/30">
                <label className="block text-sm font-medium mb-2">
                  Select Delivery Date
                </label>

                <input
                  type="date"
                  value={advanceDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setAdvanceDate(e.target.value)}
                  className="w-full border rounded-lg p-3"
                />

                {advanceDate && (
                  <p className="text-sm text-green-600 mt-2">
                    Delivery scheduled for{" "}
                    {new Date(advanceDate)
                      .toLocaleDateString("en-GB")
                      .replace(/\//g, "-")}
                  </p>
                )}

                {/* ACTION BUTTONS */}
                <div className="flex gap-3 mt-4">

                  {/* CONFIRM ADVANCE ORDER */}
                  <Button
                    type="button"
                    disabled={!advanceDate || loading}
                    onClick={() => handlePlaceOrder(true)}
                    className="flex-1"
                  >
                    {loading ? "Placing..." : "Confirm Advance Order"}
                  </Button>

                  {/* CANCEL */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowAdvanceOrder(false);
                      setAdvanceDate("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>

                </div>
              </div>
            )}

            {/* MAIN BUTTONS */}
            <div className="flex gap-3">

              {/* NORMAL ORDER */}
              <Button
                onClick={() => handlePlaceOrder(false)}
                disabled={loading || showAdvanceOrder}
                className="flex-1"
              >
                {loading
                  ? "Placing..."
                  : showAdvanceOrder
                    ? "Advance Order Active"
                    : "Place Order"}
              </Button>

              {/* ADVANCE ORDER */}
              {!showAdvanceOrder && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAdvanceOrder(true)}
                  className="flex-1"
                >
                  Advance Order
                </Button>
              )}

            </div>
          </div>
        </div>
      </div>
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

          <div className="bg-background w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

            {/* HEADER */}
            <div className="flex items-center justify-between p-5 border-b">

              <div>
                <h2 className="text-xl font-semibold">
                  Add New Address
                </h2>

                <p className="text-sm text-muted-foreground mt-1">
                  Save delivery address for future orders
                </p>
              </div>

              <button
                onClick={() => setShowAddressModal(false)}
                className="w-9 h-9 rounded-full hover:bg-muted flex items-center justify-center"
              >
                <X size={18} />
              </button>

            </div>

            {/* BODY */}
            <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">

              {/* NAME */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-3.5 text-muted-foreground"
                  />

                  <input
                    placeholder="Enter full name"
                    className="w-full border rounded-xl p-3 pl-10"
                    value={addressForm.name}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3.5 text-muted-foreground"
                  />

                  <input
                    placeholder="Enter phone number"
                    className="w-full border rounded-xl p-3 pl-10"
                    value={addressForm.phone}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* CITY + STATE */}
              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    City
                  </label>

                  <div className="relative">
                    <Building2
                      size={18}
                      className="absolute left-3 top-3.5 text-muted-foreground"
                    />

                    <input
                      placeholder="City"
                      className="w-full border rounded-xl p-3 pl-10"
                      value={addressForm.city}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          city: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    State
                  </label>

                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute left-3 top-3.5 text-muted-foreground"
                    />

                    <input
                      placeholder="State"
                      className="w-full border rounded-xl p-3 pl-10"
                      value={addressForm.state}
                      onChange={(e) =>
                        setAddressForm({
                          ...addressForm,
                          state: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

              </div>

              {/* PINCODE */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Pincode
                </label>

                <input
                  placeholder="Enter pincode"
                  className="w-full border rounded-xl p-3"
                  value={addressForm.pincode}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      pincode: e.target.value,
                    })
                  }
                />
              </div>

              {/* LANDMARK */}
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Landmark
                </label>

                <div className="relative">
                  <Home
                    size={18}
                    className="absolute left-3 top-3.5 text-muted-foreground"
                  />

                  <input
                    placeholder="Nearby landmark"
                    className="w-full border rounded-xl p-3 pl-10"
                    value={addressForm.landmark}
                    onChange={(e) =>
                      setAddressForm({
                        ...addressForm,
                        landmark: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              {/* DEFAULT */}
              <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                <input
                  type="checkbox"
                  checked={addressForm.isDefault}
                  onChange={(e) =>
                    setAddressForm({
                      ...addressForm,
                      isDefault: e.target.checked,
                    })
                  }
                />

                <div>
                  <p className="font-medium">
                    Set as default address
                  </p>

                  <p className="text-sm text-muted-foreground">
                    Automatically selected for future orders
                  </p>
                </div>

              </label>

            </div>

            {/* FOOTER */}
            <div className="border-t p-5 flex gap-3">

              <Button
                variant="outline"
                onClick={() =>
                  setShowAddressModal(false)
                }
                className="flex-1"
              >
                Cancel
              </Button>

              <Button
                onClick={handleAddAddress}
                disabled={addingAddress}
                className="flex-1"
              >
                {addingAddress
                  ? "Saving..."
                  : "Save Address"}
              </Button>

            </div>

          </div>

        </div>
      )}
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