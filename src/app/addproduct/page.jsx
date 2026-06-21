"use client";

import Image from "next/image";
import { useState } from "react";
import { IoIosStar } from "react-icons/io";
import { toast } from "react-toastify";

const STATUS_OPTIONS = ["In Stock", "Low Stock", "Out of Stock"];

const defaultProduct = {
  image: "",
  name: "",
  brand: "",
  price: "",
  reviewCount: "",
  status: "",
  rating: 5,
};

export default function ProductCardForm() {
  const [form, setForm] = useState(defaultProduct);
  const [imagePreview, setImagePreview] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imgError, setImgError] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Product name is required.";
    if (!form.brand.trim()) e.brand = "Brand is required.";
    if (
      !form.price ||
      isNaN(parseFloat(form.price)) ||
      parseFloat(form.price) < 0
    )
      e.price = "Enter a valid price.";
    if (
      !form.reviewCount ||
      isNaN(parseInt(form.reviewCount)) ||
      parseInt(form.reviewCount) < 0
    )
      e.reviewCount = "Enter a valid review count.";
    if (!form.status) e.status = "Select a status.";
    return e;
  };

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handlePreview =async () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setImgError(false);
   const product = {
    ...form,
    price: parseFloat(form.price).toFixed(2),
    reviewCount: parseInt(form.reviewCount),
  };

  setPreview(product);
const res = await fetch("http://localhost:8000/product", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(product),
});
  //  const data = await res.json()
  //  console.log(data);
    toast.success("card added")
  };

  const handleReset = () => {
    setForm(defaultProduct);
    setPreview(null);
    setErrors({});
    setImgError(false);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center p-8">
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8">
        {/* ── Form panel ── */}
        <div className="flex-1 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          <h2 className="text-lg font-medium text-zinc-900 mb-1">
            Product details
          </h2>
          <p className="text-sm text-zinc-400 mb-6">
            Fill in the fields to generate a product card.
          </p>

          <div className="space-y-5">
            {/* Image URL */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                Image URL
              </label>
              <input
                type="file"
                // value={form.image}
                //  accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    const imageUrl = URL.createObjectURL(file);

                    setImagePreview(imageUrl);

                    handleChange("image", imageUrl);
                  }
                }}
                placeholder="https://example.com/photo.jpg"
                className="w-full rounded-xl border border-zinc-200 px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 focus:border-zinc-400 transition"
              />
            </div>

            {/* Name + Brand */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Product name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="e.g. Air Max 90"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition ${errors.name ? "border-red-400" : "border-zinc-200 focus:border-zinc-400"}`}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Brand
                </label>
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => handleChange("brand", e.target.value)}
                  placeholder="e.g. Nike"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition ${errors.brand ? "border-red-400" : "border-zinc-200 focus:border-zinc-400"}`}
                />
                {errors.brand && (
                  <p className="mt-1 text-xs text-red-500">{errors.brand}</p>
                )}
              </div>
            </div>

            {/* Price + Reviews */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Price (USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-zinc-400">
                    $
                  </span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) => handleChange("price", e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={`w-full rounded-xl border pl-7 pr-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition ${errors.price ? "border-red-400" : "border-zinc-200 focus:border-zinc-400"}`}
                  />
                </div>
                {errors.price && (
                  <p className="mt-1 text-xs text-red-500">{errors.price}</p>
                )}
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                  Review count
                </label>
                <input
                  type="number"
                  value={form.reviewCount}
                  onChange={(e) => handleChange("reviewCount", e.target.value)}
                  placeholder="e.g. 128"
                  min="0"
                  className={`w-full rounded-xl border px-3.5 py-2.5 text-sm text-zinc-800 placeholder-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900/10 transition ${errors.reviewCount ? "border-red-400" : "border-zinc-200 focus:border-zinc-400"}`}
                />
                {errors.reviewCount && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.reviewCount}
                  </p>
                )}
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                Status
              </label>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleChange("status", s)}
                    className={`flex-1 rounded-xl border py-2 text-xs font-medium transition ${
                      form.status === s
                        ? "bg-zinc-900 border-zinc-900 text-white"
                        : "border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-700"
                    } ${errors.status ? "border-red-300" : ""}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {errors.status && (
                <p className="mt-1 text-xs text-red-500">{errors.status}</p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-xs font-medium text-zinc-500 mb-1.5 uppercase tracking-wide">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => handleChange("rating", n)}
                    className="p-0.5 focus:outline-none"
                  >
                    <IoIosStar
                      size={26}
                      className={`transition ${n <= form.rating ? "text-yellow-400" : "text-zinc-200"}`}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-8">
            <button
              onClick={handlePreview}
              className="flex-1 bg-zinc-900 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-zinc-700 active:scale-[.98] transition"
            >
              Preview card
            </button>
            <button
              onClick={handleReset}
              className="px-4 border border-zinc-200 rounded-xl text-sm font-medium text-zinc-500 hover:border-zinc-400 hover:text-zinc-700 active:scale-[.98] transition"
            >
              Reset
            </button>
          </div>
        </div>

        {/* ── Preview panel ── */}
        <div className="lg:w-[420px] flex flex-col">
          <h2 className="text-lg font-medium text-zinc-900 mb-1">Preview</h2>
          <p className="text-sm text-zinc-400 mb-6">
            Live render of your product card.
          </p>

          {preview ? (
            <div className="max-w-[386px] bg-white px-6 pt-4 pb-9 rounded-2xl shadow-xl border border-zinc-100">
              {/* Image */}
              <div className="w-full h-[244px] rounded-[10px] overflow-hidden bg-zinc-100 flex items-center justify-center">
                {preview.image && !imgError ? (
                  <img
                    // width={200}
                    // height={200}
                    src={preview.image}
                    alt={preview.name}
                    // onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-zinc-300 text-sm">No image</span>
                )}
              </div>

              {/* Name + stars */}
              <div className="flex items-center justify-between pt-3">
                <div>
                  <h3 className="text-[20px] font-medium text-zinc-900 leading-tight">
                    {preview.name}
                  </h3>
                  <p className="text-[12px] leading-3 font-medium text-zinc-400 mt-1">
                    {preview.brand}
                  </p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array(5)
                    .fill(null)
                    .map((_, i) => (
                      <IoIosStar
                        key={i}
                        size={19}
                        className={
                          i < preview.rating
                            ? "text-yellow-400"
                            : "text-zinc-200"
                        }
                      />
                    ))}
                </div>
              </div>

              {/* Review count */}
              <h4 className="text-[12px] leading-3 font-medium text-zinc-900 pt-6">
                ({preview.reviewCount}) Customer Reviews
              </h4>

              {/* Price + status */}
              <div className="flex items-center justify-between pt-6">
                <strong className="text-2xl font-medium text-zinc-900 tracking-tight">
                  ${preview.price}
                </strong>
                <span className="text-[12px] leading-5 font-normal text-[#FF4646]">
                  {preview.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex-1 min-h-[360px] border-2 border-dashed border-zinc-200 rounded-2xl flex flex-col items-center justify-center text-zinc-300 gap-2">
              <svg
                width="40"
                height="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <p className="text-sm">Fill the form and click Preview</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
