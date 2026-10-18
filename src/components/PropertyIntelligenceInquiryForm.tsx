import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Loader2, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const inquirySchema = z.object({
  organizationName: z.string().min(2, 'Organization name must be at least 2 characters'),
  contactPerson: z.string().min(2, 'Contact person name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  propertyType: z.enum(['residential', 'commercial', 'industrial', 'mixed_use', 'other'], {
    required_error: 'Please select a property type',
  }),
  numberOfProperties: z.string().min(1, 'Please specify number of properties'),
  currentMethod: z.string().optional(),
  interestAreas: z.array(z.string()).min(1, 'Please select at least one area of interest'),
  timeline: z.string().min(1, 'Please select a timeline'),
  specialRequirements: z.string().optional(),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

const PropertyIntelligenceInquiryForm: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      organizationName: '',
      contactPerson: '',
      email: '',
      phone: '',
      propertyType: undefined,
      numberOfProperties: '',
      currentMethod: '',
      interestAreas: [],
      timeline: '',
      specialRequirements: '',
    },
  });

  const interestOptions = [
    'AI-Powered Valuations',
    'Mobile Property Inspections',
    'Market Intelligence Dashboard',
    'ROI Analytics',
    'MPRA Compliance',
    'Portfolio Management'
  ];

  const onSubmit = async (data: InquiryFormData) => {
    setIsSubmitting(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'https://api.isutech.co.za/api';

      await axios.post(`${API_URL}/property-intelligence/inquiry`, data);

      setIsSuccess(true);
      form.reset();

      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error: any) {
      console.error('Submission error:', error);
      alert(error.response?.data?.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Inquiry Submitted Successfully!</h3>
        <p className="text-green-700 mb-4">
          Thank you for your interest in Property Intelligence Platform. Our team will contact you within 24 hours.
        </p>
        <p className="text-sm text-green-600">
          Check your email for confirmation details.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Request a Demo</h2>
        <p className="text-gray-600">
          Fill out the form below and our team will get in touch to schedule a personalized demo.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="organizationName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Your organization" {...field} />
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
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="+27 XX XXX XXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Type *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="mixed_use">Mixed Use</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numberOfProperties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Properties *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="100+">100+</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="currentMethod"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Property Management Method (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Excel spreadsheets, Property management software" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="interestAreas"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel>Areas of Interest * (Select all that apply)</FormLabel>
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  {interestOptions.map((item) => (
                    <FormField
                      key={item}
                      control={form.control}
                      name="interestAreas"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item])
                                    : field.onChange(
                                        field.value?.filter((value) => value !== item)
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="timeline"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Implementation Timeline *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate (Within 1 month)</SelectItem>
                    <SelectItem value="1-3-months">1-3 Months</SelectItem>
                    <SelectItem value="3-6-months">3-6 Months</SelectItem>
                    <SelectItem value="6+-months">6+ Months</SelectItem>
                    <SelectItem value="just-exploring">Just Exploring</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequirements"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requirements or Questions (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about any specific needs or questions you have..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Inquiry'
            )}
          </Button>

          <p className="text-sm text-gray-500 text-center">
            By submitting this form, you agree to be contacted by our team regarding Property Intelligence Platform.
          </p>
        </form>
      </Form>
    </div>
  );
};

export default PropertyIntelligenceInquiryForm;
