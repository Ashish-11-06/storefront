"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Pencil,
  ShoppingBag,
  Heart,
  CreditCard,
  Phone,
  ShoppingCart,
  Mail,
} from "lucide-react";

import { useQuery, useMutation } from "@apollo/client/react";
import {
  GET_PROFILE,
  UPDATE_CUSTOMER,
  ADD_ADDRESS,
  EDIT_ADDRESS,
} from "@/graphql/queries/profileQueries";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function ProfilePage() {
  const [showEdit, setShowEdit] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEditAddressModal, setShowEditAddressModal] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
    isDefault: false,
  });

  // ✅ QUERY
  const { data, loading, error, refetch } = useQuery(GET_PROFILE);

  // ✅ MUTATIONS
  const [updateCustomer, { loading: updating }] =
    useMutation(UPDATE_CUSTOMER);

  const [addAddress, { loading: addingAddress }] =
    useMutation(ADD_ADDRESS);

  const [editAddress, { loading: editingAddress }] =
    useMutation(EDIT_ADDRESS);
  // ✅ DATA
  const customer = data?.myCustomer;
  const user = customer?.user;
  const addresses = customer?.addresses || [];

  if (loading) {
    return (
      <div className="bg-[#f8f8f8] min-h-screen py-14">
        <div className="max-w-5xl mx-auto px-6 space-y-10">

          {/* HEADER */}
          <Skeleton className="h-8 w-40" />

          {/* PROFILE */}
          <div className="bg-white p-6 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Skeleton className="w-14 h-14 rounded-full" />

              <div className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-60" />
                <Skeleton className="h-4 w-40" />
              </div>
            </div>

            <Skeleton className="h-8 w-24 rounded-full" />
          </div>

          {/* QUICK LINKS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>

          {/* ADDRESS */}
          <div>
            <Skeleton className="h-6 w-40 mb-4" />

            {[1, 2].map((_, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded mb-3 border space-y-2"
              >
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-60" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error)
    return <div className="p-10 text-red-500">Error loading profile</div>;

  // ✅ UPDATE PROFILE
  const handleUpdateProfile = async () => {
    try {
      await updateCustomer({
        variables: {
          id: customer?.id,
          firstName: editForm.firstName,
          lastName: editForm.lastName,
          phone: editForm.phone,
        },
      });

      await refetch();
      setShowEdit(false);

      toast.success("Profile updated successfully!");

    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    }
  };

  // ✅ ADD ADDRESS
  const handleAddAddress = async () => {
    if (!addressForm.name || !addressForm.phone || !addressForm.city) {
      toast.error("Please fill required fields ❗");
      return;
    }

    try {
      await addAddress({
        variables: {
          ...addressForm,
        },
      });

      await refetch();

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

      toast.success("Address added successfully!");

    } catch (err: any) {
      toast.error(err.message || "Failed to add address");
    }
  };


  const handleEditClick = (addr: any) => {
    setSelectedAddressId(Number(addr.id));

    setAddressForm({
      name: addr.name || "",
      phone: addr.phone || "",
      city: addr.city || "",
      state: addr.state || "",
      pincode: addr.pincode || "",
      landmark: addr.landmark || "",
      isDefault: addr.isDefault || false,
    });

    setShowEditAddressModal(true);
  };

  const handleUpdateAddress = async () => {
    try {
      await editAddress({
        variables: {
          addressId: Number(selectedAddressId),
          ...addressForm,
        },
      });

      await refetch();
      setShowEditAddressModal(false);

      toast.success("Address updated successfully!");

    } catch (err: any) {
      toast.error(err.message || "Failed to update address");
    }
  };

  return (
    <div className="bg-[#f8f8f8] min-h-screen py-14">
      <div className="max-w-5xl mx-auto px-6 space-y-10">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold">My Profile</h1>

        {/* PROFILE */}
        <div className="bg-white p-6 rounded-xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white font-semibold text-lg">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">
                {user?.firstName} {user?.lastName}
              </h2>

              <p className="flex items-center gap-1 mb-1">
                <Mail className="w-4 h-4" />
                {user?.email}
              </p>

              <p className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {user?.phone}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setShowEdit(true);
              setEditForm({
                firstName: user?.firstName || "",
                lastName: user?.lastName || "",
                phone: user?.phone || "",
              });
            }}
            className="flex items-center gap-2 px-4 py-2 text-sm rounded-full border cursor-pointer"
          >
            <Pencil className="w-4 h-4" />
            Edit Profile
          </button>
        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Orders", icon: ShoppingBag, link: "/orders" },
            { label: "Wishlist", icon: Heart, link: "/wishlist" },
            { label: "Cart", icon: ShoppingCart, link: "/cart" },
            // { label: "Payments", icon: CreditCard, link: "/payments" },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="bg-white p-4 rounded-xl text-center"
            >
              <item.icon className="mx-auto mb-2 text-rose-500" />
              {item.label}
            </Link>
          ))}
        </div>

        {/* ADDRESS SECTION */}
        <div>
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Saved Addresses</h2>

            <Button onClick={() => setShowAddressModal(true)}>
              + Add Address
            </Button>
          </div>

          {addresses.length === 0 ? (
            <p className="text-gray-500">No saved addresses</p>
          ) : (
            addresses.map((addr: any) => (
              <div
                key={addr.id}
                className="bg-white p-4 rounded mb-3 flex justify-between items-start border"
              >
                <div className="space-y-1">
                  <p className="font-medium">
                    {addr.name || user?.firstName}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    {addr.phone || user?.phone}
                  </p>

                  <p className="text-sm text-gray-600">
                    {addr.city}, {addr.state} - {addr.pincode}
                  </p>

                  {addr.landmark && (
                    <p className="text-xs text-gray-500">
                      {addr.landmark}
                    </p>
                  )}

                  {addr.isDefault && (
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button onClick={() => handleEditClick(addr)} className="cursor-pointer">
                    <Pencil className="w-4 h-4 text-gray-500 " />
                  </button>
                  {/* <MapPin className="text-gray-400 w-5 h-5" /> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">
            <h2 className="text-lg font-semibold">Edit Profile</h2>

            <input
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm({ ...editForm, firstName: e.target.value })
              }
              className="w-full border p-2"
              placeholder="First Name"
            />

            <input
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm({ ...editForm, lastName: e.target.value })
              }
              className="w-full border p-2"
              placeholder="Last Name"
            />

            <input
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
              className="w-full border p-2"
              placeholder="Phone"
            />

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>

              <Button onClick={handleUpdateProfile}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* ADD ADDRESS MODAL */}
      {showAddressModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
            <h2 className="text-lg font-semibold">Add Address</h2>

            <input
              placeholder="Full Name"
              className="w-full border p-2"
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full border p-2"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
            />

            <input
              placeholder="City"
              className="w-full border p-2"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              className="w-full border p-2"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
            />

            <input
              placeholder="Pincode"
              className="w-full border p-2"
              value={addressForm.pincode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, pincode: e.target.value })
              }
            />

            <input
              placeholder="Landmark"
              className="w-full border p-2"
              value={addressForm.landmark}
              onChange={(e) =>
                setAddressForm({ ...addressForm, landmark: e.target.value })
              }
            />

            <label className="flex items-center gap-2 text-sm">
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
              Set as Default
            </label>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </Button>

              <Button onClick={handleAddAddress}>
                {addingAddress ? "Adding..." : "Add Address"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {showEditAddressModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px] space-y-3">
            <h2 className="text-lg font-semibold">Edit Address</h2>

            <input
              placeholder="Full Name"
              className="w-full border p-2"
              value={addressForm.name}
              onChange={(e) =>
                setAddressForm({ ...addressForm, name: e.target.value })
              }
            />

            <input
              placeholder="Phone"
              className="w-full border p-2"
              value={addressForm.phone}
              onChange={(e) =>
                setAddressForm({ ...addressForm, phone: e.target.value })
              }
            />

            <input
              placeholder="City"
              className="w-full border p-2"
              value={addressForm.city}
              onChange={(e) =>
                setAddressForm({ ...addressForm, city: e.target.value })
              }
            />

            <input
              placeholder="State"
              className="w-full border p-2"
              value={addressForm.state}
              onChange={(e) =>
                setAddressForm({ ...addressForm, state: e.target.value })
              }
            />

            <input
              placeholder="Pincode"
              className="w-full border p-2"
              value={addressForm.pincode}
              onChange={(e) =>
                setAddressForm({ ...addressForm, pincode: e.target.value })
              }
            />

            <input
              placeholder="Landmark"
              className="w-full border p-2"
              value={addressForm.landmark}
              onChange={(e) =>
                setAddressForm({ ...addressForm, landmark: e.target.value })
              }
            />

            <label className="flex items-center gap-2 text-sm">
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
              Set as Default
            </label>

            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowEditAddressModal(false)}
              >
                Cancel
              </Button>

              <Button onClick={handleUpdateAddress}>
                {editingAddress ? "Updating..." : "Update Address"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}