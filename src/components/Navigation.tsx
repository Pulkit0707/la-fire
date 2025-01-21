import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flame, LogOut, LogIn, Heart, Phone } from 'lucide-react';
import { supabase, signInAnonymously } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export default function Navigation() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Try anonymous sign in if no user
    const attemptAnonymousSignIn = async () => {
      if (!user) {
        await signInAnonymously();
      }
    };
    attemptAnonymousSignIn();

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-red-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Flame className="h-8 w-8" />
              <span className="font-bold text-xl">LA Fires Emergency Response</span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to="/emergency-contacts" 
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-700 hover:bg-red-800"
            >
              <Phone className="h-5 w-5" />
              <span>Emergency Contacts</span>
            </Link>
            <Link 
              to="/first-aid" 
              className="flex items-center space-x-2 px-4 py-2 rounded-md bg-red-700 hover:bg-red-800"
            >
              <Heart className="h-5 w-5" />
              <span>First Aid</span>
            </Link>
            {user ? (
              <>
                <Link 
                  to="/donate" 
                  className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50"
                >
                  Donate Now
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-2 hover:text-red-100"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link 
                to="/signin" 
                className="flex items-center space-x-2 hover:text-red-100"
              >
                <LogIn className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}