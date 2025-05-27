import React, { useEffect, useState } from 'react';
import { getProfile } from '../api/api';

function Profile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error('Failed to load profile:', error.response || error);
      }
    };
    fetchProfile();
  }, []);

  if (!profile)
    return (
      <div className="p-6 text-center text-gray-600 text-lg font-medium">
        Loading profile...
      </div>
    );

  return (
    
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-gradient-to-br from-indigo-400 via-purple-500 rounded-xl shadow-lg ring-1 ring-indigo-100">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow-md">
        Welcome Back, {profile.full_name.split(' ')[0]}!
      </h2>

      {/* Avatar Placeholder */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-4xl font-bold shadow-inner select-none">
          {profile.full_name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="space-y-5">
        <ProfileField icon="📧" label="Email" value={profile.email} />
        <ProfileField icon="🧑" label="Full Name" value={profile.full_name} />
        <ProfileField
          icon="📞"
          label="Phone Number"
          value={profile.phone_number || 'N/A'}
        />
        <ProfileField
          icon="⚧"
          label="Gender"
          value={
            profile.gender === 'M'
              ? 'Male'
              : profile.gender === 'F'
              ? 'Female'
              : 'Other'
          }
        />
        <ProfileField
          icon="🎓"
          label="Role"
          value={profile.is_mentor ? 'Mentor' : 'Normal User'}
        />
      </div>
    </div>
  
  );
}

function ProfileField({ icon, label, value }) {
  return (
    
    <div className="flex items-center space-x-4 rounded-md p-3 hover:bg-indigo-50 transition-colors cursor-default">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-sm font-semibold text-indigo-500">{label}</p>
        <p className="text-base font-medium text-gray-700">{value}</p>
      </div>
    </div>
  );
}

export default Profile;
