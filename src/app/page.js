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

const emojis = ["😡", "😟", "😐", "😊", "😍"]; // Emoji ratings

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

  useEffect(() => {
    const getDeviceInfo = () => {
      const userAgent = navigator.userAgent;
      setFormData((prevData) => ({ ...prevData, deviceInfo: userAgent }));
    };
    getDeviceInfo();
  }, []);

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
  };

  const handleRatingSelect = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (error) {
        console.error("Response is not valid JSON:", text);
        alert("Unexpected server response. Please try again.");
        return;
      }

      if (response.ok) {
        alert("Thank you for your feedback!");
        setFormData({
          name: "",
          role: "",
          foodRating: "",
          arrangementRating: "",
          overallRating: "",
          comments: "",
          deviceInfo: "",
        });
      } else {
        alert(`Error: ${result.error || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again later.");
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
      <div className="w-[90%] max-w-lg mx-auto bg-white p-4 md:p-8 shadow-xl rounded-2xl">
        <Card>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label>Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div>
                <Label>You are</Label>
                <div className=" flex flex-wrap gap-2">
                  {["Govt official", "VLE", "Fisherman"].map((role) => (
                    <button
                      key={role}
                      type="button"
                      className={`md:px-4  md:py-2 px-4 py-2 rounded-full transition-all duration-200 font-semibold shadow-md hover:shadow-lg ${
                        formData.role === role
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                      onClick={() => handleRoleSelect(role)}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label className="mb-4">How would you rate the event?</Label>
                {[
                  { label: "Food", name: "foodRating" },
                  { label: "Arrangement", name: "arrangementRating" },
                  { label: "Overall", name: "overallRating" },
                ].map((category) => (
                  <div key={category.name} className="mb-2">
                    <Label>{category.label}</Label>
                    <div className="flex justify-center md:justify-start space-x-2 mt-2 mb-4">
                      {emojis.map((emoji, index) => (
                        <button
                          key={`${category.name}-${index + 1}`}
                          type="button"
                          className={`p-2 text-2xl md:text-3xl rounded-full transition-all duration-200 shadow-md hover:scale-110 ${
                            formData[category.name] === String(index + 1)
                              ? "bg-blue-400 text-white"
                              : "bg-gray-100"
                          }`}
                          onClick={() =>
                            handleRatingSelect(category.name, String(index + 1))
                          }
                        >
                          {emoji}
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
                className="w-full bg-blue-500 hover:bg-blue-600 transition-all duration-200 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg"
              >
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackForm;
