import { Request, Response } from 'express';
import Job from '../models/Job';
import JobApplication from '../models/JobApplication';
import nodemailer from 'nodemailer';

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Private (Admin)
export const createJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating job',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Get all jobs
// @route   GET /api/jobs
// @access  Public
export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find({ isActive: true }).sort('-createdAt');
    res.status(200).json({
      success: true,
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching jobs',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Get single job
// @route   GET /api/jobs/:id
// @access  Public
export const getJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching job',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Update job
// @route   PUT /api/jobs/:id
// @access  Private (Admin)
export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    res.status(200).json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating job',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Delete job
// @route   DELETE /api/jobs/:id
// @access  Private (Admin)
export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }
    await job.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Job deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting job',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Submit job application
// @route   POST /api/jobs/:id/apply
// @access  Public
export const submitApplication = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({
        success: false,
        message: 'Job not found',
      });
    }

    const application = await JobApplication.create({
      ...req.body,
      job: job._id,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: application.email,
      subject: `Application Received - ${job.title}`,
      html: `
        <h3>Thank you for your application</h3>
        <p>Dear ${application.fullName},</p>
        <p>We have received your application for the position of ${job.title}.</p>
        <p>Our team will review your application and get back to you shortly.</p>
        <p>Best regards,</p>
        <p>The iSuTech Team</p>
      `,
    });

    // Send notification to admin
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@isutech.co.za',
      subject: `New Job Application - ${job.title}`,
      html: `
        <h3>New Job Application Received</h3>
        <p><strong>Position:</strong> ${job.title}</p>
        <p><strong>Applicant:</strong> ${application.fullName}</p>
        <p><strong>Email:</strong> ${application.email}</p>
        <p><strong>Phone:</strong> ${application.phone}</p>
        <p><strong>Resume:</strong> <a href="${application.resumeUrl}">View Resume</a></p>
      `,
    });

    res.status(201).json({
      success: true,
      data: application,
    });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({
      success: false,
      message: 'Error submitting application',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
};

// @desc    Get all applications for a job
// @route   GET /api/jobs/:id/applications
// @access  Private (Admin)
export const getJobApplications = async (req: Request, res: Response) => {
  try {
    const applications = await JobApplication.find({ job: req.params.id })
      .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: applications.length,
      data: applications,
    });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching applications',
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    });
  }
}; 