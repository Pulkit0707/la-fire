import React from 'react';
import { AlertTriangle, Heart, Wind, Thermometer } from 'lucide-react';

export default function FirstAid() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">First Aid Instructions</h1>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Wind className="h-6 w-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Smoke Inhalation</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Move to fresh air immediately</li>
            <li>Call emergency services (911)</li>
            <li>Take slow, steady breaths</li>
            <li>Sit upright to make breathing easier</li>
            <li>Loosen any tight clothing around neck and chest</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Thermometer className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold">Burns</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Cool the burn under cool (not cold) running water for at least 10 minutes</li>
            <li>Remove any jewelry or tight items near the burned area</li>
            <li>Cover with a sterile gauze bandage</li>
            <li>Take an over-the-counter pain reliever if needed</li>
            <li>Seek immediate medical attention for severe burns</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-6 w-6 text-red-500" />
            <h2 className="text-xl font-semibold">Heat Exhaustion</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Move to a cool place</li>
            <li>Lie down and elevate feet slightly</li>
            <li>Remove tight or unnecessary clothing</li>
            <li>Apply cool, wet cloths to body</li>
            <li>Sip water if fully conscious</li>
            <li>Seek medical attention if symptoms worsen</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-2 mb-4">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            <h2 className="text-xl font-semibold">When to Call 911</h2>
          </div>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Difficulty breathing or shortness of breath</li>
            <li>Severe burns or burns covering large areas</li>
            <li>Loss of consciousness</li>
            <li>Chest pain or pressure</li>
            <li>Severe headache or confusion</li>
          </ul>
        </div>
      </div>
    </div>
  );
}