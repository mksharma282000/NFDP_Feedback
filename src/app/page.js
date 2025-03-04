"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import csc from "../assets/csc.png";
import iit from "../assets/iit.svg";
import Image from "next/image";
import background from "@/assets/background.png";

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
    <div className="h-screen ">
      <div className="absolute ">
        <Image
          src={background}
          alt="backgroundimg"
          className="min-h-screen bg-no-repeat bg-center"
        ></Image>
      </div>
      <div className="relative">
        <div className="md:p-8 p-4 grid md:space-y-0 space-y-2">
          <div className="flex flex-row justify-between px-6 items-center text-center md:text-left">
            <Image
              className="sm:w-[111px] w-16 sm:h-[60px]"
              src={csc}
              alt="csc"
            />
            <Image
              className="sm:w-[337px] w-48 sm:h-[68px]"
              src={iit}
              alt="iit"
            />
          </div>

          <h2 className="flex my-4 sm:my-10  justify-center sm:text-[40px] text-2xl md:text-3xl font-bold text-[#0060A9] text-center items-center">
            Matsya Saksharta
          </h2>
          {/* <p className="text-gray-500 text-xs">
            Share your experience with us!
          </p> */}

          <Card>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Full Name</Label>
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
                  <Label className="mt-6">Yours work</Label>
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-2 mb-[24px]">
                    {["Govt official", "V.L.E.", "Beneficiary"].map((role) => (
                      <Button
                        key={role}
                        type="button"
                        variant={formData.role === role ? "outline" : "default"}
                        className="text-xs sm:text-xl sm:w-44 w-20"
                        onClick={() => handleRoleSelect(role)}
                      >
                        {role}
                      </Button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label className="font-Montserrat">Rating</Label>
                  {[
                    {
                      key: "foodRating",
                      label:
                        "1. How easy was it to navigate and locate the information you needed on the platform?",
                    },
                    {
                      key: "arrangementRating",
                      label:
                        "2. How likely are you to recommend the platform to your peers or colleagues in the fisheries sector?",
                    },
                    {
                      key: "overallRating",
                      label:
                        "3. How satisfied are you with the accuracy and relevance of the information provided on the platform?",
                    },
                  ].map(({ key, label }) => (
                    <div key={key} className="grid border-b border-b-gray-200">
                      <Label className="mt-4 sm:mt-8 sm:pl-4 px-1 align-top items-start font-light sm:text-[20px] text-[14px]">
                        {label}
                      </Label>
                      <div className="flex justify-center space-x-2 sm:gap-6 gap-2 sm:mb-[38px] mb-[20px] pr-6">
                        {emojis.map((emoji) => (
                          <button
                            key={emoji.value}
                            type="button"
                            className={`p-0 rounded-full object-fill ${
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
                              className="w-8 h-8 sm:w-16 sm:h-16"
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <Label>Some Words</Label>
                  <Textarea
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    placeholder="Enter your comments"
                    className="w-full h-24 border rounded-lg p-2 focus:ring-2 focus:ring-blue-400"
                  />
                </div>
                <div className="border-b-2 border-[#D5D5D5] pt-5"></div>
                <div className="flex justify-end pt-5">
                  <Button
                    type="submit"
                    className="w-40 bg-blue-500 text-white py-3 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
