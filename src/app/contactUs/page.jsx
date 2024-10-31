'use client';

import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function Contact() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  // Use a default path or set it in a way that makes sense for your app
  const from = "/"; // Set this to your default redirect path

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/contactEmail', data);
      if (response.status === 200) { // Check for success status
        toast.success('Mail Sent Successfully');
        reset();
        router.push(from);
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error(error); // Log the error for debugging
      toast.error('Email failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div className="flex justify-center items-center min-h-screen">
        <div className="card w-full max-w-lg shadow-lg p-8 border-[1px]">
          <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-full"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Subject</span>
              </label>
              <input
                type="text"
                placeholder="Your subject"
                className="input input-bordered w-full"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && (
                <span className="text-red-500 text-sm">{errors.subject.message}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Message</span>
              </label>
              <textarea
                placeholder="Your message"
                className="textarea textarea-bordered w-full"
                {...register('message', { required: 'Message is required' })}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 text-sm">{errors.message.message}</span>
              )}
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
