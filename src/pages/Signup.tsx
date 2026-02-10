import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

// Feature flag
const SIGNUP_ENABLED = false;

export default function Signup() {
  if (!SIGNUP_ENABLED) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="text-yellow-600 w-6 h-6" />
            <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>
          </div>

          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-4">
            <p className="font-medium">Signup is disabled</p>
            <p className="text-sm mt-2">
              Sign up functionality is currently disabled. Please contact the admin for access.
            </p>
          </div>

          <Button disabled className="w-full">
            Sign Up (Currently Disabled)
          </Button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Use demo credentials to login instead.
          </p>
        </Card>
      </div>
    );
  }

  return null;
}
