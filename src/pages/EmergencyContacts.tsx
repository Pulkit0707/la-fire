import React from 'react';
import { Phone, Shield, Flame, Siren, ChevronFirst as FirstAid } from 'lucide-react';

export default function EmergencyContacts() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-8">
        <Siren className="h-8 w-8 text-red-600" />
        <h1 className="text-3xl font-bold">Emergency Contacts</h1>
      </div>

      <div className="grid gap-6">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start space-x-4 p-6 bg-red-50 rounded-lg">
            <div className="flex-shrink-0">
              <Phone className="h-8 w-8 text-red-600" />
            </div>
            <div>
              <h3 className="font-semibold text-red-900 text-xl">Emergency Services</h3>
              <p className="text-4xl font-bold text-red-600 my-2">911</p>
              <p className="text-red-700">For immediate life-threatening emergencies</p>
              <ul className="list-disc list-inside mt-2 text-red-700 space-y-1">
                <li>Medical emergencies</li>
                <li>Active fires</li>
                <li>Crimes in progress</li>
                <li>Immediate danger to life or property</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start space-x-4 p-6 bg-blue-50 rounded-lg">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-blue-900 text-xl">LA Police Department</h3>
              <p className="text-3xl font-bold text-blue-600 my-2">(877) 275-5273</p>
              <p className="text-blue-700">Non-emergency police assistance</p>
              <ul className="list-disc list-inside mt-2 text-blue-700 space-y-1">
                <li>File police reports</li>
                <li>Report suspicious activity</li>
                <li>General inquiries</li>
                <li>Community services</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start space-x-4 p-6 bg-orange-50 rounded-lg">
            <div className="flex-shrink-0">
              <Flame className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-orange-900 text-xl">LA Fire Department</h3>
              <p className="text-3xl font-bold text-orange-600 my-2">(213) 978-3800</p>
              <p className="text-orange-700">Fire-related inquiries and information</p>
              <ul className="list-disc list-inside mt-2 text-orange-700 space-y-1">
                <li>Fire safety inspections</li>
                <li>Fire prevention information</li>
                <li>Brush clearance requirements</li>
                <li>Public education programs</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="flex items-start space-x-4 p-6 bg-green-50 rounded-lg">
            <div className="flex-shrink-0">
              <FirstAid className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-900 text-xl">Disaster Response</h3>
              <p className="text-3xl font-bold text-green-600 my-2">(800) 675-4357</p>
              <p className="text-green-700">24/7 Emergency Management</p>
              <ul className="list-disc list-inside mt-2 text-green-700 space-y-1">
                <li>Evacuation assistance</li>
                <li>Emergency shelter information</li>
                <li>Disaster recovery resources</li>
                <li>Emergency preparedness</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}