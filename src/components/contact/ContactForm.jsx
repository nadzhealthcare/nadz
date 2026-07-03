'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MdNavigateNext } from 'react-icons/md';

export function ContactForm({ form }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    requiredService: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
      console.error('Error submitting form:', error);
      const errorMsg = error.message || 'There was an error submitting the form.';
      alert(`${errorMsg}\n\nPlease try again or contact us directly at info@nadzhealthcare.com`);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!form) return null;

  return (
    <div className="bg-white rounded-[14px] p-6 md:p-8 shadow-sm border border-gray-100">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-primary-dark mb-2">
        {form.title}
      </h2>
      <p className="text-xs sm:text-sm md:text-base text-text-gray mb-6">
        {form.description}
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
            {form.fields.fullName.label}
            {form.fields.fullName.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder={form.fields.fullName.placeholder}
            required={form.fields.fullName.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray"
          />
        </div>

        {/* Age and Gender in a row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {/* Age */}
          <div>
            <label htmlFor="age" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
              {form.fields.age.label}
              {form.fields.age.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder={form.fields.age.placeholder}
              required={form.fields.age.required}
              min="1"
              max="120"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
              {form.fields.gender.label}
              {form.fields.gender.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="flex gap-4">
              {form.fields.gender.options.map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option.value}
                    checked={formData.gender === option.value}
                    onChange={handleChange}
                    required={form.fields.gender.required}
                    className="w-4 h-4 text-primary-main focus:ring-primary-main focus:ring-2 border-gray-300"
                  />
                  <span className="ml-2 text-xs sm:text-sm md:text-base text-text-gray">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phone" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
            {form.fields.phone.label}
            {form.fields.phone.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder={form.fields.phone.placeholder}
            required={form.fields.phone.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
            {form.fields.email.label}
            {form.fields.email.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={form.fields.email.placeholder}
            required={form.fields.email.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray"
          />
        </div>

        {/* Address for Visit */}
        <div>
          <label htmlFor="address" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
            {form.fields.address.label}
            {form.fields.address.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder={form.fields.address.placeholder}
            required={form.fields.address.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors text-text-gray"
          />
        </div>

        {/* Required Service */}
        <div>
          <label htmlFor="requiredService" className="block text-xs sm:text-sm md:text-base text-text-gray mb-2">
            {form.fields.requiredService.label}
            {form.fields.requiredService.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <select
            id="requiredService"
            name="requiredService"
            value={formData.requiredService}
            onChange={handleChange}
            required={form.fields.requiredService.required}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-main focus:border-primary-main outline-none transition-colors bg-white text-text-gray"
          >
            <option value="">{form.fields.requiredService.placeholder}</option>
            {form.fields.requiredService.options.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary-mediumBlue to-primary-main text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed text-xs sm:text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5"
        >
          {isSubmitting ? form.submitButton.loadingText : form.submitButton.text}
          {!isSubmitting && <MdNavigateNext className="text-xl" />}
        </button>
      </form>
    </div>
  );
}

