import React, { useState } from 'react';

interface JobApplicationFormProps {
  jobId: number;
  jobTitle: string;
  onClose: () => void;
}

interface FormErrors {
  [key: string]: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ jobId, jobTitle, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    linkedin: '',
    portfolio: '',
    coverLetter: '',
    resume: null as File | null,
    yearsOfExperience: '',
    noticePeriod: '',
    currentCompany: '',
    expectedSalary: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: FormErrors = {};
    
    // Name validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    // URL validations
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (formData.linkedin && !urlRegex.test(formData.linkedin)) {
      newErrors.linkedin = 'Please enter a valid LinkedIn URL';
    }
    if (formData.portfolio && !urlRegex.test(formData.portfolio)) {
      newErrors.portfolio = 'Please enter a valid portfolio URL';
    }
    
    // Required fields
    if (!formData.yearsOfExperience) newErrors.yearsOfExperience = 'Please select years of experience';
    if (!formData.noticePeriod) newErrors.noticePeriod = 'Please select notice period';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    if (!formData.resume) newErrors.resume = 'Resume is required';
    
    // File size validation
    if (formData.resume && formData.resume.size > 5 * 1024 * 1024) {
      newErrors.resume = 'File size must be less than 5MB';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({ ...prev, resume: file }));
      // Clear error when user selects a file
      if (errors.resume) {
        setErrors(prev => ({ ...prev, resume: '' }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      
      // Show success message and close form after delay
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (fieldName: string) => `
    w-full px-4 py-3 rounded-lg border bg-background 
    transition-all duration-200 outline-none
    ${errors[fieldName]
      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 placeholder:text-red-300' 
      : 'border-border/40 hover:border-primary/50 focus:border-primary focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/60'
    }
    ${isSubmitting ? 'bg-background/50 cursor-not-allowed' : 'bg-background'}
  `;

  const labelClasses = `
    text-sm font-medium flex justify-between items-center
    transition-colors duration-200
  `;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div 
        className="bg-background rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/40 p-6 flex justify-between items-center z-10">
          <div>
            <h2 className="text-2xl font-bold">{jobTitle}</h2>
            <p className="text-sm text-muted-foreground">Complete the form below to apply</p>
          </div>
          {!isSubmitting && (
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-all hover:rotate-90 duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">First Name *</span>
                  {errors.firstName && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.firstName}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  disabled={isSubmitting}
                  className={inputClasses('firstName')}
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="Enter your first name"
                />
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Last Name *</span>
                  {errors.lastName && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.lastName}</span>
                  )}
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  disabled={isSubmitting}
                  className={inputClasses('lastName')}
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Enter your last name"
                />
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Email *</span>
                  {errors.email && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.email}</span>
                  )}
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  disabled={isSubmitting}
                  className={inputClasses('email')}
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Phone *</span>
                  {errors.phone && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.phone}</span>
                  )}
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  disabled={isSubmitting}
                  className={inputClasses('phone')}
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+27 12 345 6789"
                />
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">LinkedIn Profile</span>
                  {errors.linkedin && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.linkedin}</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="linkedin"
                    disabled={isSubmitting}
                    className={inputClasses('linkedin')}
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    placeholder="https://linkedin.com/in/..."
                  />
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Portfolio/Website</span>
                  {errors.portfolio && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.portfolio}</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="url"
                    name="portfolio"
                    disabled={isSubmitting}
                    className={inputClasses('portfolio')}
                    value={formData.portfolio}
                    onChange={handleInputChange}
                    placeholder="https://..."
                  />
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Years of Experience *</span>
                  {errors.yearsOfExperience && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.yearsOfExperience}</span>
                  )}
                </label>
                <div className="relative">
                  <select
                    name="yearsOfExperience"
                    required
                    disabled={isSubmitting}
                    className={`${inputClasses('yearsOfExperience')} appearance-none`}
                    value={formData.yearsOfExperience}
                    onChange={handleInputChange}
                  >
                    <option value="">Select experience</option>
                    <option value="0-2">0-2 years</option>
                    <option value="3-5">3-5 years</option>
                    <option value="5-8">5-8 years</option>
                    <option value="8+">8+ years</option>
                  </select>
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Notice Period *</span>
                  {errors.noticePeriod && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.noticePeriod}</span>
                  )}
                </label>
                <div className="relative">
                  <select
                    name="noticePeriod"
                    required
                    disabled={isSubmitting}
                    className={`${inputClasses('noticePeriod')} appearance-none`}
                    value={formData.noticePeriod}
                    onChange={handleInputChange}
                  >
                    <option value="">Select notice period</option>
                    <option value="immediate">Immediate</option>
                    <option value="15days">15 days</option>
                    <option value="30days">30 days</option>
                    <option value="60days">60 days</option>
                    <option value="90days">90 days</option>
                  </select>
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 pointer-events-none"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Current Company</span>
                </label>
                <input
                  type="text"
                  name="currentCompany"
                  disabled={isSubmitting}
                  className={inputClasses('currentCompany')}
                  value={formData.currentCompany}
                  onChange={handleInputChange}
                  placeholder="Enter your current company"
                />
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Expected Salary (Annual)</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">R</span>
                  <input
                    type="text"
                    name="expectedSalary"
                    disabled={isSubmitting}
                    className={`${inputClasses('expectedSalary')} pl-8`}
                    value={formData.expectedSalary}
                    onChange={handleInputChange}
                    placeholder="500,000"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Additional Information
            </h3>
            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Cover Letter *</span>
                  {errors.coverLetter && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.coverLetter}</span>
                  )}
                </label>
                <textarea
                  name="coverLetter"
                  required
                  disabled={isSubmitting}
                  rows={4}
                  className={`${inputClasses('coverLetter')} resize-none min-h-[120px]`}
                  value={formData.coverLetter}
                  onChange={handleInputChange}
                  placeholder="Tell us why you're interested in this position..."
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>Minimum 100 characters</span>
                  <span>{formData.coverLetter.length} characters</span>
                </div>
              </div>

              <div className="space-y-2 group">
                <label className={labelClasses}>
                  <span className="group-focus-within:text-primary transition-colors">Resume/CV *</span>
                  {errors.resume && (
                    <span className="text-red-500 text-xs animate-fade-in">{errors.resume}</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="resume"
                    required
                    disabled={isSubmitting}
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className={`
                      block w-full text-sm text-gray-500
                      file:mr-4 file:py-2.5 file:px-4
                      file:rounded-lg file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary/10 file:text-primary
                      hover:file:bg-primary/20
                      border border-border/40 rounded-lg
                      focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20
                      transition-all duration-200
                      ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  />
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Accepted formats: PDF, DOC, DOCX (Max 5MB)</span>
                  </div>
                  {formData.resume && (
                    <div className="flex items-center gap-2 mt-2 text-xs text-primary">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{formData.resume.name}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-border/40">
            {!isSubmitting && (
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-lg border border-border hover:border-primary transition-colors"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 ${
                isSubmitting 
                  ? 'bg-primary/50 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary/90'
              } text-white`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                      fill="none"
                    />
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <span>Submitting...</span>
                </>
              ) : submitStatus === 'success' ? (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Application Submitted!</span>
                </>
              ) : (
                <>
                  <span>Submit Application</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {submitStatus === 'error' && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              There was an error submitting your application. Please try again.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JobApplicationForm; 