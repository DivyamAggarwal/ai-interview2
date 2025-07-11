"use client"
import React, { useState, useEffect } from 'react'
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Database, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff,
  Save,
  RefreshCw,
  Trash2,
  Download,
  Upload,
  CheckCircle,
  AlertCircle
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { useUser } from '@/app/provider'
import { supabase } from '@/services/supabaseClient'

function SettingsPage() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  // Profile Settings State
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    bio: '',
    avatar: null
  })

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    interviewReminders: true,
    candidateUpdates: true,
    systemUpdates: false,
    marketingEmails: false
  })

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    sessionTimeout: '30',
    loginAlerts: true
  })

  // Appearance Settings State
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12'
  })

  // Data & Privacy Settings State
  const [privacySettings, setPrivacySettings] = useState({
    dataRetention: '12',
    shareAnalytics: false,
    profileVisibility: 'private',
    downloadData: false,
    deleteAccount: false
  })

  useEffect(() => {
    loadUserSettings()
  }, [user])

  const loadUserSettings = async () => {
    if (!user) return
    
    try {
      // Load user profile and settings from database
      setProfileData({
        fullName: user.user_metadata?.full_name || '',
        email: user.email || '',
        phone: user.user_metadata?.phone || '',
        company: user.user_metadata?.company || '',
        position: user.user_metadata?.position || '',
        bio: user.user_metadata?.bio || '',
        avatar: user.user_metadata?.avatar_url || null
      })
    } catch (error) {
      console.error('Error loading settings:', error)
    }
  }

  const handleSaveSettings = async (section) => {
    setLoading(true)
    try {
      switch (section) {
        case 'profile':
          await saveProfileSettings()
          break
        case 'notifications':
          await saveNotificationSettings()
          break
        case 'security':
          await saveSecuritySettings()
          break
        case 'appearance':
          await saveAppearanceSettings()
          break
        case 'privacy':
          await savePrivacySettings()
          break
      }
      toast.success('Settings saved successfully!')
    } catch (error) {
      toast.error('Failed to save settings. Please try again.')
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveProfileSettings = async () => {
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name: profileData.fullName,
        phone: profileData.phone,
        company: profileData.company,
        position: profileData.position,
        bio: profileData.bio
      }
    })
    if (error) throw error
  }

  const saveNotificationSettings = async () => {
    // Save to user preferences table
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        notification_settings: notificationSettings
      })
    if (error) throw error
  }

  const saveSecuritySettings = async () => {
    if (securitySettings.newPassword) {
      const { error } = await supabase.auth.updateUser({
        password: securitySettings.newPassword
      })
      if (error) throw error
    }
    // Save other security preferences
  }

  const saveAppearanceSettings = async () => {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        appearance_settings: appearanceSettings
      })
    if (error) throw error
  }

  const savePrivacySettings = async () => {
    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        privacy_settings: privacySettings
      })
    if (error) throw error
  }

  const handleExportData = async () => {
    try {
      // Export user data
      const { data, error } = await supabase
        .from('Interviews')
        .select('*')
        .eq('userEmail', user.email)
      
      if (error) throw error
      
      const dataStr = JSON.stringify(data, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'interview-data.json'
      link.click()
      
      toast.success('Data exported successfully!')
    } catch (error) {
      toast.error('Failed to export data')
    }
  }

  const settingsTabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Data & Privacy', icon: Database }
  ]

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 py-8'>
      <div className='max-w-7xl mx-auto px-6'>
        {/* Header */}
        <div className='bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100'>
          <div className='flex items-center gap-4'>
            <div className='p-3 bg-blue-100 rounded-xl'>
              <User className='h-8 w-8 text-blue-600' />
            </div>
            <div>
              <h1 className='text-2xl font-bold text-gray-900'>Account Settings</h1>
              <p className='text-gray-600 mt-1'>Manage your account preferences and security settings</p>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* Sidebar Navigation */}
          <div className='lg:col-span-1'>
            <div className='bg-white rounded-2xl shadow-lg p-6 border border-gray-100'>
              <nav className='space-y-2'>
                {settingsTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200
                      ${activeTab === tab.id 
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <tab.icon className='h-5 w-5' />
                    <span className='font-medium'>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className='lg:col-span-3'>
            <div className='bg-white rounded-2xl shadow-lg border border-gray-100'>
              
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className='p-8'>
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-blue-100 rounded-xl'>
                      <User className='h-6 w-6 text-blue-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Profile Information</h2>
                      <p className='text-gray-600'>Update your personal information and profile details</p>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Full Name</label>
                        <Input
                          value={profileData.fullName}
                          onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                          placeholder='Enter your full name'
                          className='h-12'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Email Address</label>
                        <Input
                          value={profileData.email}
                          disabled
                          className='h-12 bg-gray-50'
                        />
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder='+1 (555) 123-4567'
                          className='h-12'
                        />
                      </div>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Company</label>
                        <Input
                          value={profileData.company}
                          onChange={(e) => setProfileData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder='Your company name'
                          className='h-12'
                        />
                      </div>
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Position/Title</label>
                      <Input
                        value={profileData.position}
                        onChange={(e) => setProfileData(prev => ({ ...prev, position: e.target.value }))}
                        placeholder='Your job title'
                        className='h-12'
                      />
                    </div>

                    <div>
                      <label className='block text-sm font-medium text-gray-700 mb-2'>Bio</label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder='Tell us about yourself...'
                        className='min-h-[120px]'
                      />
                    </div>

                    <div className='flex justify-end'>
                      <Button
                        onClick={() => handleSaveSettings('profile')}
                        disabled={loading}
                        className='px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
                      >
                        {loading ? (
                          <>
                            <RefreshCw className='animate-spin mr-2 h-4 w-4' />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className='mr-2 h-4 w-4' />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className='p-8'>
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-green-100 rounded-xl'>
                      <Bell className='h-6 w-6 text-green-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Notification Preferences</h2>
                      <p className='text-gray-600'>Choose how you want to be notified about updates</p>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive notifications via email' },
                      { key: 'pushNotifications', label: 'Push Notifications', desc: 'Receive browser push notifications' },
                      { key: 'interviewReminders', label: 'Interview Reminders', desc: 'Get reminded about upcoming interviews' },
                      { key: 'candidateUpdates', label: 'Candidate Updates', desc: 'Notifications when candidates complete interviews' },
                      { key: 'systemUpdates', label: 'System Updates', desc: 'Important system and feature updates' },
                      { key: 'marketingEmails', label: 'Marketing Emails', desc: 'Promotional content and tips' }
                    ].map((setting) => (
                      <div key={setting.key} className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
                        <div>
                          <h3 className='font-medium text-gray-900'>{setting.label}</h3>
                          <p className='text-sm text-gray-600'>{setting.desc}</p>
                        </div>
                        <Switch
                          checked={notificationSettings[setting.key]}
                          onCheckedChange={(checked) => 
                            setNotificationSettings(prev => ({ ...prev, [setting.key]: checked }))
                          }
                        />
                      </div>
                    ))}

                    <div className='flex justify-end'>
                      <Button
                        onClick={() => handleSaveSettings('notifications')}
                        disabled={loading}
                        className='px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                      >
                        {loading ? (
                          <>
                            <RefreshCw className='animate-spin mr-2 h-4 w-4' />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className='mr-2 h-4 w-4' />
                            Save Preferences
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className='p-8'>
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-red-100 rounded-xl'>
                      <Shield className='h-6 w-6 text-red-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Security Settings</h2>
                      <p className='text-gray-600'>Manage your account security and authentication</p>
                    </div>
                  </div>

                  <div className='space-y-8'>
                    {/* Password Change */}
                    <div className='bg-gray-50 rounded-xl p-6'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Change Password</h3>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>Current Password</label>
                          <div className='relative'>
                            <Input
                              type={showPassword ? 'text' : 'password'}
                              value={securitySettings.currentPassword}
                              onChange={(e) => setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))}
                              placeholder='Enter current password'
                              className='h-12 pr-12'
                            />
                            <button
                              type='button'
                              onClick={() => setShowPassword(!showPassword)}
                              className='absolute right-3 top-1/2 transform -translate-y-1/2'
                            >
                              {showPassword ? <EyeOff className='h-5 w-5 text-gray-400' /> : <Eye className='h-5 w-5 text-gray-400' />}
                            </button>
                          </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>New Password</label>
                            <Input
                              type='password'
                              value={securitySettings.newPassword}
                              onChange={(e) => setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))}
                              placeholder='Enter new password'
                              className='h-12'
                            />
                          </div>
                          <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Confirm Password</label>
                            <Input
                              type='password'
                              value={securitySettings.confirmPassword}
                              onChange={(e) => setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder='Confirm new password'
                              className='h-12'
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Options */}
                    <div className='space-y-4'>
                      <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
                        <div>
                          <h3 className='font-medium text-gray-900'>Two-Factor Authentication</h3>
                          <p className='text-sm text-gray-600'>Add an extra layer of security to your account</p>
                        </div>
                        <Switch
                          checked={securitySettings.twoFactorEnabled}
                          onCheckedChange={(checked) => 
                            setSecuritySettings(prev => ({ ...prev, twoFactorEnabled: checked }))
                          }
                        />
                      </div>

                      <div className='flex items-center justify-between p-4 bg-gray-50 rounded-xl'>
                        <div>
                          <h3 className='font-medium text-gray-900'>Login Alerts</h3>
                          <p className='text-sm text-gray-600'>Get notified of new login attempts</p>
                        </div>
                        <Switch
                          checked={securitySettings.loginAlerts}
                          onCheckedChange={(checked) => 
                            setSecuritySettings(prev => ({ ...prev, loginAlerts: checked }))
                          }
                        />
                      </div>

                      <div className='p-4 bg-gray-50 rounded-xl'>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Session Timeout</label>
                        <Select
                          value={securitySettings.sessionTimeout}
                          onValueChange={(value) => setSecuritySettings(prev => ({ ...prev, sessionTimeout: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='15'>15 minutes</SelectItem>
                            <SelectItem value='30'>30 minutes</SelectItem>
                            <SelectItem value='60'>1 hour</SelectItem>
                            <SelectItem value='240'>4 hours</SelectItem>
                            <SelectItem value='never'>Never</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <Button
                        onClick={() => handleSaveSettings('security')}
                        disabled={loading}
                        className='px-8 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                      >
                        {loading ? (
                          <>
                            <RefreshCw className='animate-spin mr-2 h-4 w-4' />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Lock className='mr-2 h-4 w-4' />
                            Update Security
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className='p-8'>
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-purple-100 rounded-xl'>
                      <Palette className='h-6 w-6 text-purple-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Appearance & Language</h2>
                      <p className='text-gray-600'>Customize how the application looks and feels</p>
                    </div>
                  </div>

                  <div className='space-y-6'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Theme</label>
                        <Select
                          value={appearanceSettings.theme}
                          onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, theme: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='light'>Light</SelectItem>
                            <SelectItem value='dark'>Dark</SelectItem>
                            <SelectItem value='system'>System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Language</label>
                        <Select
                          value={appearanceSettings.language}
                          onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, language: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='en'>English</SelectItem>
                            <SelectItem value='es'>Spanish</SelectItem>
                            <SelectItem value='fr'>French</SelectItem>
                            <SelectItem value='de'>German</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Timezone</label>
                        <Select
                          value={appearanceSettings.timezone}
                          onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, timezone: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='UTC'>UTC</SelectItem>
                            <SelectItem value='EST'>Eastern Time</SelectItem>
                            <SelectItem value='PST'>Pacific Time</SelectItem>
                            <SelectItem value='GMT'>GMT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Date Format</label>
                        <Select
                          value={appearanceSettings.dateFormat}
                          onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, dateFormat: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='MM/DD/YYYY'>MM/DD/YYYY</SelectItem>
                            <SelectItem value='DD/MM/YYYY'>DD/MM/YYYY</SelectItem>
                            <SelectItem value='YYYY-MM-DD'>YYYY-MM-DD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>Time Format</label>
                        <Select
                          value={appearanceSettings.timeFormat}
                          onValueChange={(value) => setAppearanceSettings(prev => ({ ...prev, timeFormat: value }))}
                        >
                          <SelectTrigger className='h-12'>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value='12'>12 Hour</SelectItem>
                            <SelectItem value='24'>24 Hour</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <Button
                        onClick={() => handleSaveSettings('appearance')}
                        disabled={loading}
                        className='px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
                      >
                        {loading ? (
                          <>
                            <RefreshCw className='animate-spin mr-2 h-4 w-4' />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Palette className='mr-2 h-4 w-4' />
                            Save Appearance
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Data & Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className='p-8'>
                  <div className='flex items-center gap-4 mb-8'>
                    <div className='p-3 bg-orange-100 rounded-xl'>
                      <Database className='h-6 w-6 text-orange-600' />
                    </div>
                    <div>
                      <h2 className='text-xl font-bold text-gray-900'>Data & Privacy</h2>
                      <p className='text-gray-600'>Manage your data and privacy preferences</p>
                    </div>
                  </div>

                  <div className='space-y-8'>
                    {/* Data Management */}
                    <div className='bg-blue-50 rounded-xl p-6 border border-blue-200'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Data Management</h3>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-700 mb-2'>Data Retention Period</label>
                          <Select
                            value={privacySettings.dataRetention}
                            onValueChange={(value) => setPrivacySettings(prev => ({ ...prev, dataRetention: value }))}
                          >
                            <SelectTrigger className='h-12'>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value='6'>6 months</SelectItem>
                              <SelectItem value='12'>1 year</SelectItem>
                              <SelectItem value='24'>2 years</SelectItem>
                              <SelectItem value='indefinite'>Indefinite</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
                          <div>
                            <h4 className='font-medium text-gray-900'>Share Analytics Data</h4>
                            <p className='text-sm text-gray-600'>Help improve our service by sharing anonymous usage data</p>
                          </div>
                          <Switch
                            checked={privacySettings.shareAnalytics}
                            onCheckedChange={(checked) => 
                              setPrivacySettings(prev => ({ ...prev, shareAnalytics: checked }))
                            }
                          />
                        </div>
                      </div>
                    </div>

                    {/* Data Export & Deletion */}
                    <div className='bg-yellow-50 rounded-xl p-6 border border-yellow-200'>
                      <h3 className='font-semibold text-gray-900 mb-4'>Data Export & Deletion</h3>
                      <div className='space-y-4'>
                        <div className='flex items-center justify-between p-4 bg-white rounded-lg border'>
                          <div>
                            <h4 className='font-medium text-gray-900'>Export Your Data</h4>
                            <p className='text-sm text-gray-600'>Download a copy of all your interview data</p>
                          </div>
                          <Button
                            onClick={handleExportData}
                            variant='outline'
                            className='border-blue-300 text-blue-600 hover:bg-blue-50'
                          >
                            <Download className='mr-2 h-4 w-4' />
                            Export Data
                          </Button>
                        </div>

                        <div className='p-4 bg-red-50 rounded-lg border border-red-200'>
                          <div className='flex items-start gap-3'>
                            <AlertCircle className='h-5 w-5 text-red-600 mt-0.5' />
                            <div className='flex-1'>
                              <h4 className='font-medium text-red-900'>Delete Account</h4>
                              <p className='text-sm text-red-700 mb-3'>
                                Permanently delete your account and all associated data. This action cannot be undone.
                              </p>
                              <Button
                                variant='destructive'
                                className='bg-red-600 hover:bg-red-700'
                              >
                                <Trash2 className='mr-2 h-4 w-4' />
                                Delete Account
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex justify-end'>
                      <Button
                        onClick={() => handleSaveSettings('privacy')}
                        disabled={loading}
                        className='px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700'
                      >
                        {loading ? (
                          <>
                            <RefreshCw className='animate-spin mr-2 h-4 w-4' />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Database className='mr-2 h-4 w-4' />
                            Save Privacy Settings
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
