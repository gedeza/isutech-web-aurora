import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

// Zod validation schema
const onboardingSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  whatsapp: z
    .string()
    .regex(/^\+27\d{9}$/, 'WhatsApp number must be in format: +27XXXXXXXXX (11 digits total)')
    .refine((val) => val.startsWith('+27'), 'Number must start with +27'),
  email: z.string().email('Please enter a valid email address'),
  businessType: z.enum(['sole-proprietor', 'partnership', 'company', 'other'], {
    required_error: 'Please select a business type',
  }),
  plan: z.enum(['starter', 'business', 'professional'], {
    required_error: 'Please select a plan',
  }),
  preferredStartDate: z.string().min(1, 'Please select a start date'),
  billingDay: z.string().min(1, 'Please select a billing day'),
  paymentMethod: z.enum(['eft', 'card', 'debit-order'], {
    required_error: 'Please select a payment method',
  }),
  specialRequests: z.string().optional(),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

interface AutoSlipOnboardingFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultPlan?: 'starter' | 'business' | 'professional';
}

const planDetails = {
  starter: { name: 'Starter', price: 299, originalPrice: 599, features: ['Up to 50 receipts/month', 'WhatsApp processing', 'Excel reports'] },
  business: { name: 'Business', price: 499, originalPrice: 999, features: ['Up to 200 receipts/month', 'Priority support', 'Advanced analytics'] },
  professional: { name: 'Professional', price: 899, originalPrice: 1799, features: ['Unlimited receipts', 'Dedicated support', 'Custom integrations'] },
};

const AutoSlipOnboardingForm: React.FC<AutoSlipOnboardingFormProps> = ({
  open,
  onOpenChange,
  defaultPlan = 'starter',
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      businessName: '',
      contactPerson: '',
      whatsapp: '+27',
      email: '',
      businessType: undefined,
      plan: defaultPlan,
      preferredStartDate: new Date().toISOString().split('T')[0],
      billingDay: '1',
      paymentMethod: undefined,
      specialRequests: '',
    },
  });

  const selectedPlan = form.watch('plan');

  const onSubmit = async (data: OnboardingFormData) => {
    setIsSubmitting(true);

    try {
      // Connect to backend API server
      // Production: HTTPS API at api.isutech.co.za
      // Development: localhost:4000
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://api.isutech.co.za' : 'http://localhost:4000');
      const response = await fetch(`${API_URL}/api/autoslip/onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          status: 'pending',
          source: 'landing_page',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      form.reset();

      // Auto-close after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        onOpenChange(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Failed to submit form. Please try again or contact us directly via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      form.reset();
      setIsSuccess(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {isSuccess ? (
          <div className="py-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">Thank You!</h3>
            <p className="text-gray-600 mb-2">
              We've received your trial request successfully.
            </p>
            <p className="text-gray-600">
              Our team will contact you within 24 hours via WhatsApp to complete your onboarding.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-900">
                Start Your Free Trial
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Fill in your details below and we'll get you started with AutoSlip. Our team will
                contact you within 24 hours to complete the setup.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Business Information</h3>

                  <FormField
                    control={form.control}
                    name="businessName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Business Name (Pty) Ltd" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Person *</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="whatsapp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>WhatsApp Number *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="+27821234567"
                            {...field}
                            onChange={(e) => {
                              let value = e.target.value;
                              // Ensure +27 prefix
                              if (!value.startsWith('+27')) {
                                value = '+27' + value.replace(/^\+?27?/, '');
                              }
                              // Remove non-digits after +27
                              value = '+27' + value.slice(3).replace(/\D/g, '');
                              field.onChange(value);
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@business.co.za" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="businessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Business Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select business type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="sole-proprietor">Sole Proprietor</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="company">Company (Pty Ltd)</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Plan Selection */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Select Your Plan</h3>

                  <FormField
                    control={form.control}
                    name="plan"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid gap-4"
                          >
                            {Object.entries(planDetails).map(([key, plan]) => (
                              <div
                                key={key}
                                className={`relative flex items-start space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                                  field.value === key
                                    ? 'border-primary bg-primary/5'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => field.onChange(key)}
                              >
                                <RadioGroupItem value={key} id={key} className="mt-1" />
                                <Label htmlFor={key} className="flex-1 cursor-pointer">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg text-gray-900">
                                      {plan.name}
                                    </span>
                                    <div className="text-right">
                                      <span className="text-2xl font-bold text-primary">
                                        R{plan.price}
                                      </span>
                                      <span className="text-sm text-gray-500 line-through ml-2">
                                        R{plan.originalPrice}
                                      </span>
                                      <span className="block text-xs text-gray-500">/month</span>
                                    </div>
                                  </div>
                                  <ul className="space-y-1 text-sm text-gray-600">
                                    {plan.features.map((feature, i) => (
                                      <li key={i} className="flex items-center">
                                        <svg
                                          className="w-4 h-4 mr-2 text-primary flex-shrink-0"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                          />
                                        </svg>
                                        {feature}
                                      </li>
                                    ))}
                                  </ul>
                                  {key === 'starter' && (
                                    <div className="mt-2">
                                      <span className="inline-block px-3 py-1 text-xs font-bold bg-primary text-white rounded-full">
                                        50% OFF - LIMITED TIME
                                      </span>
                                    </div>
                                  )}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Billing Information */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 text-lg">Billing Information</h3>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="preferredStartDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Start Date *</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} min={new Date().toISOString().split('T')[0]} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="billingDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Billing Day of Month *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select day" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString()}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="paymentMethod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preferred Payment Method *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select payment method" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="eft">EFT / Bank Transfer</SelectItem>
                            <SelectItem value="card">Credit/Debit Card</SelectItem>
                            <SelectItem value="debit-order">Debit Order</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Special Requests */}
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests or Questions (Optional)</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Any specific requirements or questions you'd like us to know about..."
                            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4 border-t">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Start My Free Trial'
                    )}
                  </Button>
                  <p className="text-xs text-gray-500 text-center mt-3">
                    By submitting this form, you agree to be contacted by our team to complete your onboarding.
                  </p>
                </div>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AutoSlipOnboardingForm;
