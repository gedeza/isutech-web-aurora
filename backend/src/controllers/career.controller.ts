import { Request, Response } from 'express';
import Job from '../models/job.model';
import Application from '../models/application.model';
import { sendEmail } from '../utils/email';

// Job Management
export const createJob = async (req: Request, res: Response) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    console.error('Create job error:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

export const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Error getting jobs' });
  }
};

export const getJobById = async (req: Request, res: Response) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    res.status(500).json({ message: 'Error getting job' });
  }
};

export const updateJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Delete job error:', error);
    res.status(500).json({ message: 'Error deleting job' });
  }
};

// Application Management
export const submitApplication = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.status === 'closed') {
      return res.status(400).json({ message: 'This position is no longer accepting applications' });
    }

    const application = new Application({
      ...req.body,
      job: jobId,
      resumeUrl: req.file?.path,
    });

    await application.save();

    // Send confirmation email to applicant
    await sendEmail({
      to: application.email,
      subject: 'Application Received - iSu Technologies',
      text: `
        Dear ${application.name},

        Thank you for applying for the position of ${job.title} at iSu Technologies.
        We have received your application and will review it shortly.

        Best regards,
        iSu Technologies Recruitment Team
      `,
    });

    // Send notification to admin
    await sendEmail({
      to: process.env.ADMIN_EMAIL || 'info@isutech.co.za',
      subject: 'New Job Application Received',
      text: `
        New application received for ${job.title}
        Applicant: ${application.name}
        Email: ${application.email}
        Phone: ${application.phone}
      `,
    });

    res.status(201).json({
      message: 'Application submitted successfully',
      application,
    });
  } catch (error) {
    console.error('Submit application error:', error);
    res.status(500).json({ message: 'Error submitting application' });
  }
};

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find()
      .populate('job', 'title')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Error getting applications' });
  }
};

export const getApplicationById = async (req: Request, res: Response) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ message: 'Error getting application' });
  }
};

export const updateApplicationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate('job');

    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    // Send status update email to applicant
    await sendEmail({
      to: application.email,
      subject: 'Application Status Update - iSu Technologies',
      text: `
        Dear ${application.name},

        Your application status for the position of ${(application.job as any).title} has been updated to: ${status}

        Best regards,
        iSu Technologies Recruitment Team
      `,
    });

    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    res.status(500).json({ message: 'Error updating application status' });
  }
}; 