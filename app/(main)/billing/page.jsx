// app/billing/page.jsx
"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { 
  CreditCard, 
  Check, 
  Star, 
  Zap, 
  Crown, 
  Shield,
  Infinity,
  Clock,
  Users,
  BarChart3
} from 'lucide-react';
import { BillingProvider, useBilling } from '@/context/BillingContext';
import { useUser } from '@/app/provider';
import ProtectedRoute from './_components/ProtectedRoute';

// Extract the main billing component
function BillingPageContent() {
  const { billingData, loading } = useBilling();
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpgrade = async (planType) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: planType === 'monthly' ? 'price_monthly' : 'price_yearly',
          userId: user.id,
          userEmail: user.email,
        }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mb-6">
            <Crown className="h-4 w-4 text-indigo-600" />
            <span className="text-indigo-600 font-medium text-sm">BILLING & PLANS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock unlimited interviews and advanced features with our Pro plan
          </p>
        </div>

        {/* Current Usage Card - Updated to use credits */}
        <div className="bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-xl mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Current Usage</h2>
              <p className="text-gray-600">Track your interview creation progress</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-indigo-600">
                {billingData.usedInterviews}/{billingData.credits}
              </div>
              <div className="text-sm text-gray-500">Interviews Used</div>
            </div>
          </div>

          {/* Progress Bar - Updated calculation */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Credits Progress</span>
              <span>{billingData.remainingInterviews} credits remaining</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(billingData.usedInterviews / billingData.credits) * 100}%` }}
              />
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              billingData.subscriptionStatus === 'pro' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              {billingData.subscriptionStatus === 'pro' ? '✨ Pro Member' : '🆓 Free Plan'}
            </div>
            {billingData.remainingInterviews === 0 && billingData.subscriptionStatus === 'free' && (
              <div className="px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                ⚠️ Credits Exhausted
              </div>
            )}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Free Plan */}
          <div className="relative bg-white/80 backdrop-blur-xl border border-gray-200/50 rounded-3xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full mb-4">
                <Users className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600 font-medium text-sm">STARTER</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Free Plan</h3>
              <div className="text-4xl font-bold text-gray-800 mb-2">$0</div>
              <p className="text-gray-600">Perfect for getting started</p>
            </div>

            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>{billingData.credits} Interview Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Basic AI Questions</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Voice Interaction</span>
              </li>
              <li className="flex items-center gap-3">
                <Check className="h-5 w-5 text-green-500" />
                <span>Basic Analytics</span>
              </li>
            </ul>

            <Button 
              className="w-full py-3 bg-gray-100 text-gray-600 hover:bg-gray-200"
              disabled
            >
              Current Plan
            </Button>
          </div>

          {/* Pro Plan */}
          <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                ⭐ MOST POPULAR
              </div>
            </div>

            <div className="text-center mb-8 text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/20 rounded-full mb-4">
                <Crown className="h-4 w-4" />
                <span className="font-medium text-sm">PROFESSIONAL</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <div className="text-4xl font-bold mb-2">$19<span className="text-lg">/month</span></div>
              <p className="text-white/80">Everything you need to succeed</p>
            </div>

            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center gap-3">
                <Infinity className="h-5 w-5 text-yellow-300" />
                <span>Unlimited Interview Credits</span>
              </li>
              <li className="flex items-center gap-3">
                <Zap className="h-5 w-5 text-yellow-300" />
                <span>Advanced AI Questions</span>
              </li>
              <li className="flex items-center gap-3">
                <BarChart3 className="h-5 w-5 text-yellow-300" />
                <span>Detailed Analytics</span>
              </li>
              <li className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-yellow-300" />
                <span>Priority Support</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-yellow-300" />
                <span>Extended Sessions</span>
              </li>
              <li className="flex items-center gap-3">
                <Star className="h-5 w-5 text-yellow-300" />
                <span>Custom Scenarios</span>
              </li>
            </ul>

            <Button 
              className="w-full py-3 bg-white text-indigo-600 hover:bg-gray-100 font-semibold"
              onClick={() => handleUpgrade('monthly')}
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-indigo-600/30 border-t-indigo-600 rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                <>
                  <CreditCard className="mr-2 h-4 w-4" />
                  Upgrade to Pro
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Features Comparison - Updated to reflect credits */}
        <div className="bg-white/80 backdrop-blur-xl border border-blue-200/50 rounded-3xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Feature Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-4 font-semibold text-gray-800">Features</th>
                  <th className="text-center py-4 px-4 font-semibold text-gray-600">Free</th>
                  <th className="text-center py-4 px-4 font-semibold text-indigo-600">Pro</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Interview Credits</td>
                  <td className="text-center py-4 px-4">{billingData.credits}</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">Unlimited</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">AI Question Types</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">Advanced</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Session Duration</td>
                  <td className="text-center py-4 px-4">15 min</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">60 min</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Analytics & Reports</td>
                  <td className="text-center py-4 px-4">Basic</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">Detailed</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4">Priority Support</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">✅</td>
                </tr>
                <tr>
                  <td className="py-4 px-4">Custom Scenarios</td>
                  <td className="text-center py-4 px-4">❌</td>
                  <td className="text-center py-4 px-4 text-indigo-600 font-semibold">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/60 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can cancel your subscription at any time with no cancellation fees.</p>
            </div>
            <div className="bg-white/60 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-800 mb-2">What happens to my data?</h3>
              <p className="text-gray-600 text-sm">Your interview history and progress are always saved, even if you downgrade.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component with provider wrapper
function BillingPage() {
  return (
    <ProtectedRoute>
      <BillingProvider>
        <BillingPageContent />
      </BillingProvider>
    </ProtectedRoute>
  );
}

export default BillingPage;