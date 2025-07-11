// context/BillingContext.js
"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import { useUser } from '@/app/provider';

const BillingContext = createContext();

export function BillingProvider({ children }) {
  const { user, isAuthenticated } = useUser();
  const [billingData, setBillingData] = useState({
    credits: 10,
    usedInterviews: 0,
    subscriptionStatus: 'free',
    subscriptionEndDate: null,
    remainingInterviews: 10,
    canCreateInterview: true,
  });
  const [loading, setBillingLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchBillingData();
    } else {
      setBillingLoading(false);
    }
  }, [isAuthenticated, user]);

  const fetchBillingData = async () => {
    try {
      setBillingLoading(true);
      
      // Get user's current billing data
      const { data: userData, error } = await supabase
        .from('Users')
        .select('credits, subscription_status, subscription_end_date')
        .eq('id', user.id)
        .single();

      if (error) throw error;

      // If user doesn't have credits set, initialize with 10
      let credits = userData.credits;
      if (credits === null || credits === undefined) {
        credits = 10;
        // Update the user's credits in the database
        await supabase
          .from('Users')
          .update({ credits: 10 })
          .eq('id', user.id);
      }

      const subscriptionStatus = userData.subscription_status || 'free';
      
      // Count how many interviews the user has created
      const { data: interviews, error: interviewError } = await supabase
        .from('Interviews')
        .select('id')
        .eq('userEmail', user.email);

      if (interviewError) throw interviewError;

      const usedInterviews = interviews ? interviews.length : 0;
      
      // Calculate remaining interviews
      const remainingInterviews = subscriptionStatus === 'pro' 
        ? Infinity 
        : Math.max(0, credits - usedInterviews);

      // Determine if user can create more interviews
      const canCreateInterview = subscriptionStatus === 'pro' || remainingInterviews > 0;

      setBillingData({
        credits,
        usedInterviews,
        subscriptionStatus,
        subscriptionEndDate: userData.subscription_end_date,
        remainingInterviews,
        canCreateInterview,
      });
    } catch (error) {
      console.error('Error fetching billing data:', error);
      // Set default values on error
      setBillingData({
        credits: 10,
        usedInterviews: 0,
        subscriptionStatus: 'free',
        subscriptionEndDate: null,
        remainingInterviews: 10,
        canCreateInterview: true,
      });
    } finally {
      setBillingLoading(false);
    }
  };

  const canCreateInterview = () => {
    return billingData.canCreateInterview;
  };

  const refreshBillingData = async () => {
    if (isAuthenticated && user) {
      await fetchBillingData();
    }
  };

  const updateSubscriptionStatus = (status, endDate = null) => {
    setBillingData(prev => ({
      ...prev,
      subscriptionStatus: status,
      subscriptionEndDate: endDate,
      remainingInterviews: status === 'pro' ? Infinity : Math.max(0, prev.credits - prev.usedInterviews),
      canCreateInterview: status === 'pro' || Math.max(0, prev.credits - prev.usedInterviews) > 0,
    }));
  };

  const upgradeCredits = async (newCreditAmount) => {
    try {
      const { error } = await supabase
        .from('Users')
        .update({ credits: newCreditAmount })
        .eq('id', user.id);

      if (error) throw error;

      setBillingData(prev => {
        const remainingInterviews = prev.subscriptionStatus === 'free' 
          ? Math.max(0, newCreditAmount - prev.usedInterviews)
          : Infinity;
        
        return {
          ...prev,
          credits: newCreditAmount,
          remainingInterviews,
          canCreateInterview: prev.subscriptionStatus === 'pro' || remainingInterviews > 0,
        };
      });
    } catch (error) {
      console.error('Error updating credits:', error);
    }
  };

  // Function to consume a credit when an interview is created
  const consumeCredit = async () => {
    if (billingData.subscriptionStatus === 'pro') {
      return true; // Pro users have unlimited credits
    }

    if (billingData.remainingInterviews <= 0) {
      return false; // No credits left
    }

    // Refresh billing data to get the latest interview count
    await refreshBillingData();
    
    return billingData.remainingInterviews > 0;
  };

  const value = {
    billingData,
    loading,
    fetchBillingData,
    canCreateInterview,
    refreshBillingData,
    updateSubscriptionStatus,
    upgradeCredits,
    consumeCredit,
  };

  return (
    <BillingContext.Provider value={value}>
      {children}
    </BillingContext.Provider>
  );
}

export const useBilling = () => {
  const context = useContext(BillingContext);
  if (!context) {
    throw new Error('useBilling must be used within a BillingProvider');
  }
  return context;
};