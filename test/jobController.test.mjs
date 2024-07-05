import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { expect } from 'chai';
import app from '../app';
import Job from '../models/jobModel';
import UserInfo from '../models/applyUserModel';
import * as jobController from '../controllers/jobController';

chai.use(chaiHttp);
dotenv.config();

describe('Job Controller', () => {
    describe('POST /addJob', () => {
        it('should add a job successfully', (done) => {
            const req = {
                body: {
                    designation: 'Developer',
                    company_name: 'ABC Corp',
                    company_location: 'NYC',
                    company_email: 'abc@corp.com',
                    company_phone: '1234567890',
                    website: 'https://abc.com',
                    company_detail: 'A great company',
                    salary: '100000',
                    description: 'Job description',
                    qualification_requirements: 'Bachelor\'s Degree',
                    requirements: '3 years of experience'
                },
                file: {
                    filename: 'logo.png'
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            const multerSingleStub = sinon.stub(multer.prototype, 'single').returns((req, res, next) => next());

            jobController.addJob(req, res);
            expect(res.send.calledWith('Job posted successfully')).to.be.true;

            multerSingleStub.restore();
            done();
        });
    });

    describe('GET /job/:id', () => {
        it('should get job details successfully', (done) => {
            const jobId = mongoose.Types.ObjectId();
            const req = { params: { id: jobId } };
            const res = {
                render: sinon.spy(),
                status: sinon.stub().returnsThis(),
                send: sinon.spy()
            };

            const jobFindByIdStub = sinon.stub(Job, 'findById').resolves({
                _id: jobId,
                designation: 'Developer',
                company_name: 'ABC Corp'
            });

            jobController.getJobDetails(req, res).then(() => {
                expect(res.render.calledWith('job-details')).to.be.true;
                jobFindByIdStub.restore();
                done();
            });
        });
    });

    describe('POST /applyuser', () => {
        it('should apply user successfully', (done) => {
            const req = {
                body: {
                    firstname: 'John',
                    lastname: 'Doe',
                    dob: '1990-01-01',
                    number: '1234567890',
                    address: '123 Street',
                    personal_designation: 'Developer',
                    age: '30',
                    gender: 'Male',
                    email: 'john@example.com',
                    about_me: 'A skilled developer',
                    skill_name: 'JavaScript',
                    skill_percentage: '90',
                    education_title: 'BSc',
                    education_degree: 'Computer Science',
                    education_institute: 'XYZ University',
                    education_year: '2012-01-01',
                    experience_company: 'ABC Corp',
                    experience_designation: 'Developer',
                    job_form: 'Full-time',
                    experience_end_on: '2018-01-01',
                    experience_location: 'NYC',
                    experience_about_company: 'A great company',
                    portfolio_project_name: 'Project1',
                    portfolio_start_from: '2018-01-01',
                    portfolio_end_on: '2020-01-01',
                    portfolio_project_description: 'A great project'
                },
                files: {
                    'portfolio_image': [{ filename: 'portfolio_image.png' }],
                    'cv': [{ filename: 'cv.pdf' }]
                }
            };
            const res = {
                send: sinon.spy(),
                status: sinon.stub().returnsThis()
            };

            const multerFieldsStub = sinon.stub(multer.prototype, 'fields').returns((req, res, next) => next());

            jobController.applyuser(req, res).then(() => {
                expect(res.status.calledWith(200)).to.be.true;
                expect(res.send.calledWith('Form submitted successfully!')).to.be.true;
                multerFieldsStub.restore();
                done();
            });
        });
    });

    describe('POST /deleteuserpost', () => {
        it('should delete user post successfully', (done) => {
            const req = {
                body: { postID: mongoose.Types.ObjectId() }
            };
            const res = {
                redirect: sinon.spy(),
                status: sinon.stub().returnsThis(),
                send: sinon.spy()
            };

            const userInfoFindByIdAndDeleteStub = sinon.stub(UserInfo, 'findByIdAndDelete').resolves();

            jobController.deleteuserpost(req, res).then(() => {
                expect(res.redirect.calledWith('/dashbord')).to.be.true;
                userInfoFindByIdAndDeleteStub.restore();
                done();
            });
        });
    });

    describe('GET /approved/:email', () => {
        it('should approve user and send email successfully', (done) => {
            const req = { params: { email: 'test@example.com' } };
            const res = {
                send: sinon.spy()
            };

            const transporterStub = {
                sendMail: sinon.stub().callsArgWith(1, null, { response: '250 OK' })
            };

            const nodemailerCreateTransportStub = sinon.stub(nodemailer, 'createTransport').returns(transporterStub);

            jobController.approved(req, res).then(() => {
                expect(transporterStub.sendMail.called).to.be.true;
                expect(res.send.calledWith('Application Approved')).to.be.true;
                nodemailerCreateTransportStub.restore();
                done();
            });
        });
    });
});
