import React from 'react';
import { Phone, Shield, Flame, Siren, ChevronFirst as FirstAid } from 'lucide-react';

export default function EmergencyContacts() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-2 mb-6">
        <Siren className="h-6 w-6 text-red-600" />
        <h2 className="text-xl font-semibold">Emergency Contacts</h2>
      </div>
      
      <div className="grid gap-4">
        <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg">
          <div className="flex-shrink-0">
            <Phone className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h3 className="font-semibold text-red-900">Emergency Services</h3>
            <p className="text-2xl font-bold text-red-600">911</p>
            <p className="text-sm text-red-700">For immediate life-threatening emergencies</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex-shrink-0">
            <Shield className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">LA Police Department</h3>
            <p className="text-lg font-bold text-blue-600">(877) 275-5273</p>
            <p className="text-sm text-blue-700">Non-emergency police assistance</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-orange-50 rounded-lg">
          <div className="flex-shrink-0">
            <Flame className="h-6 w-6 text-orange-600" />
          </div>
          <div>
            <h3 className="font-semibold text-orange-900">LA Fire Department</h3>
            <p className="text-lg font-bold text-orange-600">(213) 978-3800</p>
            <p className="text-sm text-orange-700">Fire-related inquiries and information</p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg">
          <div className="flex-shrink-0">
            <FirstAid className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h3 className="font-semibold text-green-900">Disaster Response</h3>
            <p className="text-lg font-bold text-green-600">(800) 675-4357</p>
            <p className="text-sm text-green-700">24/7 Emergency Management</p>
          </div>
        </div>
      </div>
    </div>
  );
}