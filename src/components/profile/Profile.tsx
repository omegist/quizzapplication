import { useEffect, useState, useRef, type ChangeEvent } from 'react';
import { useAuth } from '@/auth/AuthContext';
import { Camera, Mail, User as UserIcon, Lock, Eye, EyeOff, Loader2, CheckCircle2, Save } from 'lucide-react';

export function Profile() {
  const { user, updateProfile, uploadAvatar, updatePassword } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState(user?.name ?? '');
  const [avatarUrl, setAvatarUrl] = useState<string | null>(user?.avatarUrl ?? null);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [profileMessage, setProfileMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPasswords, setShowPasswords] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    setName(user?.name ?? '');
    setAvatarUrl(user?.avatarUrl ?? null);
  }, [user]);

  async function handlePhotoChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage({ type: 'error', text: 'Image must be under 5 MB.' });
      return;
    }
    setUploadingPhoto(true);
    setProfileMessage(null);
    const { avatarUrl: uploadedUrl, error } = await uploadAvatar(file);
    setUploadingPhoto(false);
    if (error) {
      setProfileMessage({ type: 'error', text: error });
    } else if (uploadedUrl) {
      setAvatarUrl(uploadedUrl);
      setProfileMessage({ type: 'success', text: 'Profile photo updated successfully.' });
    }
  }

  async function handleSaveProfile() {
    setSavingProfile(true);
    setProfileMessage(null);
    const { error } = await updateProfile({ name, avatarUrl });
    setSavingProfile(false);
    if (error) {
      setProfileMessage({ type: 'error', text: error });
    } else {
      setProfileMessage({ type: 'success', text: 'Profile updated successfully.' });
    }
  }

  async function handleChangePassword() {
    setPasswordMessage(null);
    if (newPassword !== confirmNewPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    if (newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters.' });
      return;
    }
    setSavingPassword(true);
    const { error } = await updatePassword(newPassword);
    setSavingPassword(false);
    if (error) {
      setPasswordMessage({ type: 'error', text: error });
    } else {
      setPasswordMessage({ type: 'success', text: 'Password changed successfully.' });
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-600">Account</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-slate-900">Your profile</h1>
        <p className="mt-1 text-slate-500">Manage your account information and security settings.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile info card */}
        <div className="card p-6 lg:col-span-2">
          <h2 className="text-lg font-semibold text-slate-900">Personal Information</h2>

          {/* Avatar */}
          <div className="mt-5 flex items-center gap-5">
            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-2xl font-bold text-brand-700">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={name} className="h-full w-full object-cover" />
                ) : (
                  name?.charAt(0).toUpperCase()
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploadingPhoto}
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-md ring-2 ring-white transition-all hover:bg-brand-700 hover:scale-110"
                title="Change photo"
              >
                <Camera size={15} />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-700">Profile Photo</p>
              <p className="text-xs text-slate-400">Click the camera icon to upload a new photo (max 5 MB).</p>
            </div>
          </div>

          {/* Name field */}
          <div className="mt-6">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
            <div className="relative">
              <UserIcon className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field pl-11"
              />
            </div>
          </div>

          {/* Email (read-only) */}
          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                value={user?.email ?? ''}
                disabled
                className="input-field pl-11 bg-slate-50 text-slate-500 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Save button */}
          {profileMessage && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm animate-fade-in ${
                profileMessage.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {profileMessage.type === 'success' && <CheckCircle2 size={16} />}
              {profileMessage.text}
            </div>
          )}
          <button
            onClick={handleSaveProfile}
            disabled={savingProfile || uploadingPhoto || name === user?.name}
            className="btn-primary mt-5"
          >
            {savingProfile ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            {savingProfile ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Password change card */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-slate-900">Change Password</h2>
          <p className="mt-1 text-sm text-slate-500">Update your password to keep your account secure.</p>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Current Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Enter current password"
                  className="input-field pl-11 pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPasswords ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">New Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input-field pl-11"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Confirm New Password</label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type={showPasswords ? 'text' : 'password'}
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="input-field pl-11"
                />
              </div>
            </div>
          </div>

          {passwordMessage && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm animate-fade-in ${
                passwordMessage.type === 'success'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : 'bg-red-50 border-red-200 text-red-700'
              }`}
            >
              {passwordMessage.type === 'success' && <CheckCircle2 size={16} />}
              {passwordMessage.text}
            </div>
          )}
          <button
            onClick={handleChangePassword}
            disabled={savingPassword || !newPassword || !confirmNewPassword}
            className="btn-primary mt-5 w-full"
          >
            {savingPassword ? <Loader2 className="animate-spin" size={18} /> : <Lock size={18} />}
            {savingPassword ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </div>
    </div>
  );
}
