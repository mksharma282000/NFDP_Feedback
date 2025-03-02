"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import csc from "../assets/csc.png";
import iit from "../assets/iit.png";
import Image from "next/image";

// Import GIF and static Emojis
import angryEmoji from "../assets/rate1.gif";
import sadEmoji from "../assets/rate2.gif";
import neutralEmoji from "../assets/rate3.gif";
import happyEmoji from "../assets/rate4.gif";
import loveEmoji from "../assets/rate5.gif";

import angryStatic from "../assets/1.1.png";
import sadStatic from "../assets/2.2.png";
import neutralStatic from "../assets/3.1.png";
import happyStatic from "../assets/4.1.png";
import loveStatic from "../assets/5.1.png";

const emojis = [
  { label: "Angry", value: "1", gif: angryEmoji, static: angryStatic },
  { label: "Sad", value: "2", gif: sadEmoji, static: sadStatic },
  { label: "Neutral", value: "3", gif: neutralEmoji, static: neutralStatic },
  { label: "Happy", value: "4", gif: happyEmoji, static: happyStatic },
  { label: "Love", value: "5", gif: loveEmoji, static: loveStatic },
];

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    foodRating: "",
    arrangementRating: "",
    overallRating: "",
    comments: "",
    deviceInfo: "",
  });

  const [activeAnimation, setActiveAnimation] = useState({
    foodRating: null,
    arrangementRating: null,
    overallRating: null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getDeviceInfo = () => {
      const userAgent = navigator.userAgent;
      setFormData((prevData) => ({ ...prevData, deviceInfo: userAgent }));
    };
    getDeviceInfo();
  }, []);

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleRatingSelect = (category, value) => {
    setFormData((prev) => ({ ...prev, [category]: value }));

    // Toggle the GIF for this specific category
    setActiveAnimation((prev) => ({
      ...prev,
      [category]: prev[category] === value ? null : value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Thank you for your feedback!");
        setFormData((prev) => ({
          name: "",
          role: "",
          foodRating: "",
          arrangementRating: "",
          overallRating: "",
          comments: "",
          deviceInfo: prev.deviceInfo, // Retain device info
        }));

        setActiveAnimation({
          foodRating: null,
          arrangementRating: null,
          overallRating: null,
        });
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-50 md:p-6 p-2 grid md:space-y-6 space-y-2 min-h-screen">
      <div className="flex flex-row justify-between px-6 items-center text-center md:text-left">
        <Image className="w-12 md:w-20" src={csc} alt="csc" />
        <div className="my-4 md:my-0">
          <h2 className="text-xl md:text-3xl font-bold text-gray-800">
            Matya Saksharta
          </h2>
          <p className="text-gray-500 text-xs">
            Share your experience with us!
          </p>
        </div>
        <Image className="w-10 md:w-20" src={iit} alt="iit" />
      </div>
      <div className="w-[90%] mx-auto bg-white p-4 md:p-8 shadow-xl rounded-2xl">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <Label>You are</Label>
                <div className="flex flex-wrap gap-2">
                  {["Govt official", "VLE", "Fisherman"].map((role) => (
                    <Button
                      key={role}
                      type="button"
                      variant={formData.role === role ? "default" : "outline"}
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-4">How would you rate the event?</Label>
                {[
                  { key: "foodRating", label: "Food Quality" },
                  { key: "arrangementRating", label: "Arrangements" },
                  { key: "overallRating", label: "Overall Experience" },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <Label>{label}</Label>
                    <div className="flex justify-center space-x-2 mt-2 mb-4">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji.value}
                          type="button"
                          className={`p-2 rounded-full ${
                            formData[key] === emoji.value
                              ? "bg-blue-400"
                              : "bg-gray-100"
                          }`}
                          onClick={() => handleRatingSelect(key, emoji.value)}
                        >
                          <Image
                            src={
                              activeAnimation[key] === emoji.value
                                ? emoji.gif
                                : emoji.static
                            }
                            alt={emoji.label}
                            width={40}
                            height={40}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div>
                <Label>Comments</Label>
                <Textarea
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  placeholder="Enter your comments"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
