"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    User,
    MapPin,
    Pencil,
    Plus,
    ShoppingBag,
    Heart,
    CreditCard,
    Gift,
    Wallet,
    ChevronRight,
    Phone,
    Crown,
} from "lucide-react";

type Address = {
    id: string;
    name: string;
    phone: string;
    address: string;
};

export default function ProfilePage() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: "1",
            name: "Atharva Kadam",
            phone: "9876543210",
            address: "Pune, Maharashtra, India",
        },
    ]);

    const [editing, setEditing] = useState<Address | null>(null);
    const [showForm, setShowForm] = useState(false);

    const [form, setForm] = useState<Address>({
        id: "",
        name: "",
        phone: "",
        address: "",
    });

    const handleSubmit = () => {
        if (editing) {
            setAddresses((prev) =>
                prev.map((addr) => (addr.id === editing.id ? form : addr))
            );
        } else {
            setAddresses((prev) => [
                ...prev,
                { ...form, id: Date.now().toString() },
            ]);
        }

        setForm({ id: "", name: "", phone: "", address: "" });
        setEditing(null);
        setShowForm(false);
    };

    const handleEdit = (addr: Address) => {
        setEditing(addr);
        setForm(addr);
        setShowForm(true);
    };

    return (
        <div className="bg-[#f8f8f8] h-[92vh] py-14">
            <div className="max-w-5xl mx-auto px-6 space-y-10">

                {/* HEADER */}
                <div className="flex items-center gap-4">
                    <h1 className="text-2xl lg:text-3xl font-[var(--font-heading)] text-gray-800">
                        My Profile
                    </h1>
                    <div className="w-12 h-[1px] bg-gray-400"></div>
                </div>

                {/* PROFILE CARD */}
                <div className="relative overflow-hidden rounded-3xl border bg-white/70 backdrop-blur-xl p-6 shadow-sm">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-50 to-pink-50 opacity-50" />

                    <div className="relative flex flex-col lg:flex-row justify-between gap-6">

                        <div className="flex items-center gap-5">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
                                AK
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold text-gray-900">
                                    Atharva Kadam
                                </h2>
                                <p className="text-sm text-gray-500">atharva@email.com</p>

                                <div className="flex gap-4 mt-4 text-xs text-gray-500">

                                    <span className="flex items-center gap-1">
                                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                                        9876543210
                                    </span>

                                    <span className="flex items-center gap-1">
                                        <MapPin className="w-3.5 h-3.5 text-gray-400" />
                                        Pune
                                    </span>

                                </div>

                                <div className="flex gap-6 mt-4">
                                    <div>
                                        <p className="font-semibold text-gray-900">12</p>
                                        <p className="text-xs text-gray-500">Orders</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">5</p>
                                        <p className="text-xs text-gray-500">Wishlist</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start gap-3">

                            {/* Membership Badge */}
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-medium shadow-sm">
                                <Crown className="w-3.5 h-3.5" />
                                Premium Member
                            </div>

                            {/* Edit Button */}
                            <button className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border border-gray-300 bg-white hover:bg-gray-50 transition shadow-sm">
                                <Pencil className="w-4 h-4 text-gray-500" />
                                <span className="text-gray-700 font-medium">Edit Profile</span>
                            </button>

                        </div>
                    </div>
                </div>

                {/* QUICK ACTIONS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                        { label: "My Orders", icon: ShoppingBag },
                        { label: "Wishlist", icon: Heart },
                        { label: "Payments", icon: CreditCard },
                        { label: "Coupons", icon: Gift },
                    ].map((item, i) => (
                        <div
                            key={i}
                            className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border hover:shadow-md transition"
                        >
                            <item.icon className="w-5 h-5 text-rose-500" />
                            <p className="text-sm font-medium text-black">{item.label}</p>
                        </div>
                    ))}
                </div>

                {/* ADDRESS SECTION */}
                <div className="space-y-6">

                    <div className="flex justify-between items-center mb-2">

                        <h2 className="text-lg font-[var(--font-heading)] text-gray-900">
                            Saved Addresses
                        </h2>

                        <button
                            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-black text-white hover:opacity-90 transition shadow-sm"
                            onClick={() => {
                                setShowForm(true);
                                setEditing(null);
                                setForm({ id: "", name: "", phone: "", address: "" });
                            }}
                        >
                            <Plus className="w-4 h-4" />
                            <span className="font-medium">Add Address</span>
                        </button>

                    </div>

                    <div className="grid gap-4">
                        {addresses.map((addr) => (
                            <div
                                key={addr.id}
                                className="border rounded-2xl p-4 bg-white flex justify-between"
                            >
                                <div className="flex gap-3">
                                    <MapPin className="text-rose-500" />

                                    <div>
                                        <p className="font-medium text-black">{addr.name}</p>
                                        <p className="text-sm text-gray-500">{addr.phone}</p>
                                        <p className="text-sm text-gray-600">
                                            {addr.address}
                                        </p>
                                    </div>
                                </div>

                                <Pencil
                                    className="w-4 h-4 cursor-pointer"
                                    onClick={() => handleEdit(addr)}
                                />
                            </div>
                        ))}
                    </div>

                    {/* FORM */}
                    {showForm && (
                        <div className="bg-white p-5 rounded-xl border space-y-3">
                            <input
                                placeholder="Name"
                                value={form.name}
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />

                            <input
                                placeholder="Phone"
                                value={form.phone}
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />

                            <textarea
                                placeholder="Address"
                                value={form.address}
                                onChange={(e) =>
                                    setForm({ ...form, address: e.target.value })
                                }
                                className="w-full border px-3 py-2 rounded"
                            />

                            <div className="flex gap-2">
                                <Button onClick={handleSubmit}>
                                    {editing ? "Update" : "Save"}
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* REWARDS */}
                {/* <div className="bg-white p-5 rounded-2xl border space-y-4">
                    <h2 className="text-lg font-[var(--font-heading)] text-black">
                        Rewards & Wallet
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex justify-between items-center border p-4 rounded-xl">
                            <div className="flex gap-2 items-center text-black">
                                <Wallet className="text-green-500" />
                                Wallet
                            </div>
                            <ChevronRight />
                        </div>

                        <div className="flex justify-between items-center border p-4 rounded-xl">
                            <div className="flex gap-2 items-center text-black">
                                <Gift className="text-yellow-500" />
                                Coupons
                            </div>
                            <ChevronRight />
                        </div>
                    </div>
                </div> */}

            </div>
        </div>
    );
}