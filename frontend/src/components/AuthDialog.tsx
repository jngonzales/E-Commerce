import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useAuthStore } from '../store';
import { toast } from 'sonner';

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const { login, register } = useAuthStore();

  const validatePassword = (password: string) => {
    if (!isLogin && password.length > 0) {
      if (password.length < 8) {
        setPasswordError('Password must be at least 8 characters');
        return false;
      }
      if (!/(?=.*[a-z])/.test(password)) {
        setPasswordError('Password must contain at least one lowercase letter');
        return false;
      }
      if (!/(?=.*[A-Z])/.test(password)) {
        setPasswordError('Password must contain at least one uppercase letter');
        return false;
      }
      if (!/(?=.*\d)/.test(password)) {
        setPasswordError('Password must contain at least one number');
        return false;
      }
    }
    setPasswordError('');
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && !validatePassword(formData.password)) {
      toast.error(passwordError);
      return;
    }
    
    setLoading(true);

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        toast.success('Welcome back!');
      } else {
        await register(formData.name, formData.email, formData.password);
        toast.success('Account created successfully!');
      }
      onOpenChange(false);
      setFormData({ name: '', email: '', password: '' });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{isLogin ? 'Login' : 'Create Account'}</DialogTitle>
          <DialogDescription>
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Fill in your details to create a new account'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
                validatePassword(e.target.value);
              }}
              required
              minLength={isLogin ? 6 : 8}
              className={passwordError ? 'border-red-500' : ''}
            />
            {passwordError && !isLogin && (
              <p className="text-sm text-red-500 animate-fade-in">{passwordError}</p>
            )}
            {!isLogin && (
              <p className="text-xs text-muted-foreground">
                Must be 8+ characters with uppercase, lowercase, and number
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
          </Button>
        </form>
        <div className="text-center text-sm">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Login'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
