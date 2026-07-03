'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

const DEFAULT_SERVICE_OPTIONS = [
  'Elderly Care at Home',
  'Doctor at Home',
  'Doctor at Hotel',
  'Doctor at Office',
  'Post-Hospitalization Support',
  'Memory & Mobility-Focused Care',
  'Nursing care at home',
];

export function ElderlyConsultationForm({ serviceOptions = [] }) {
  const router = useRouter();
  const options =
    Array.isArray(serviceOptions) && serviceOptions.length > 0
      ? serviceOptions
      : DEFAULT_SERVICE_OPTIONS;

  const [formData, setFormData] = useState({
    yourName: '',
    patientName: '',
    patientAge: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    requiredService: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/elderly', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        router.push('/thank-you');
      } else {
        const errorMessage = result.error || result.message || 'Failed to submit form';
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error submitting elderly consultation form:', error);
      const errorMsg = error.message || 'There was an error submitting the form.';
      alert(`${errorMsg}\n\nPlease try again or contact us at info@nadzhealthcare.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    'w-full min-h-[48px] px-4 py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray [-webkit-tap-highlight-color:transparent]';

  return (
    <div className="bg-white rounded-[14px] p-4 sm:p-6 md:p-8 shadow-sm border border-gray-100 w-full min-w-0">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark mb-4 sm:mb-6 leading-snug">
        Request a consultation
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="yourName" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Your Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="yourName"
            name="yourName"
            value={formData.yourName}
            onChange={handleChange}
            required
            autoComplete="name"
            enterKeyHint="next"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="patientName" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Patient&apos;s Name<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            autoComplete="name"
            enterKeyHint="next"
            className={fieldClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          <div>
            <label htmlFor="patientAge" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
              Patient&apos;s Age<span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="number"
              id="patientAge"
              name="patientAge"
              value={formData.patientAge}
              onChange={handleChange}
              required
              min="1"
              max="120"
              inputMode="numeric"
              enterKeyHint="next"
              className={fieldClass}
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
              Gender<span className="text-red-500 ml-1">*</span>
            </label>
            <div className="flex flex-wrap gap-x-6 gap-y-3 pt-1 min-h-[48px] items-center">
              {[
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ].map((option) => (
                <label
                  key={option.value}
                  className="inline-flex items-center gap-2.5 cursor-pointer min-h-[44px] pr-2 -mr-2 touch-manipulation"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formData.gender === option.value}
                    onChange={handleChange}
                    required
                    className="w-5 h-5 sm:w-4 sm:h-4 text-primary-main focus:ring-primary-main focus:ring-2 border-gray-300 shrink-0"
                  />
                  <span className="text-base text-text-gray">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Phone No.<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            autoComplete="tel"
            inputMode="tel"
            enterKeyHint="next"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Email Id.<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
            enterKeyHint="next"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Address for Visit<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            autoComplete="street-address"
            enterKeyHint="next"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="requiredService" className="block text-sm sm:text-base text-text-gray mb-1.5 sm:mb-2">
            Required Service<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            id="requiredService"
            name="requiredService"
            value={formData.requiredService}
            onChange={handleChange}
            required
            className={`${fieldClass} bg-white`}
          >
            <option value="">Select a service</option>
            {options.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full min-h-[48px] sm:min-h-[52px] bg-gradient-to-r from-primary-mediumBlue to-primary-main text-white font-semibold py-3.5 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-base shadow-lg active:scale-[0.99] touch-manipulation sm:hover:shadow-xl sm:hover:-translate-y-0.5"
        >
          {isSubmitting ? 'Sending…' : 'Submit'}
          {!isSubmitting && <MdNavigateNext className="text-xl shrink-0" aria-hidden />}
        </button>
      </form>
    </div>
  );
}
