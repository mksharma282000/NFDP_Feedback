"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("./api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
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
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error("Submit Error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-md rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-semibold text-center mb-4">
          Matya Saksharta
        </h2>
        <p className="text-center text-gray-500 mb-6">Tagline</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full"
            />
          </div>
          <div>
            <Label>You are...</Label>
            <div className="flex space-x-2">
              {["Govt official", "VLE", "Fisherman"].map((role) => (
                <button
                  key={role}
                  type="button"
                  className={`px-4 py-2 rounded-md ${
                    formData.role === role
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                  onClick={() => handleRoleSelect(role)}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>How would you rate the event?</Label>
            {[
              { label: "Food", name: "foodRating" },
              { label: "Arrangement", name: "arrangementRating" },
              { label: "Overall", name: "overallRating" },
            ].map((category) => (
              <div key={category.name} className="mb-2">
                <Label>{category.label}</Label>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <label
                      key={`${category.name}-${num}`}
                      className="flex items-center space-x-1"
                    >
                      <input
                        type="radio"
                        name={category.name}
                        value={num}
                        checked={formData[category.name] === String(num)}
                        onChange={handleChange}
                      />
                      <span>{num}</span>
                    </label>
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
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
