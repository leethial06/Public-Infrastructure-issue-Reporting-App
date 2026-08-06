## 1. Title
Public Infrastructure Issue Reporting App
(Smart CivicConnect – Full-Stack Solution for Public Infrastructure Issue Reporting and Resolution)

## 2. Domain
Full Stack Web Development
Smart City / E-Governance
Cloud Computing
GIS (Google Maps Integration)

## 3. Who is the User? (Roles)
1. Citizen
Register/Login
Report public issues
Upload images
Select location using Google Maps
Track complaint status
Like/Upvote issues
Earn points, badges, and awards
2. Government/Admin
Verify complaints
Assign issues to departments
Update issue status
Send notifications
Manage fake reports
Monitor dashboard
3. Department Officer
Receive assigned complaints
View issue location
Update repair progress
Mark issue as resolved
 
 ## 4. What Problem are We Solving?
Many public infrastructure problems such as potholes, garbage accumulation, broken street lights, water leakage, and drainage issues are not reported efficiently. Citizens often do not know where or how to report these problems, leading to delays in repairs.

Real-Life Example:
Suppose there is a large pothole on a busy road. Many people use the road daily, but no one knows how to report it to the concerned department. As a result, accidents may occur before the issue is fixed.
Our application provides a centralized platform where citizens can report problems with photos and Google Maps location. The government receives notifications, prioritizes important issues, and updates citizens on the resolution status.

## 5. Proposed Solution

The application allows citizens to:

Register and log in
Report infrastructure issues
Upload images
Select the exact location using Google Maps
View and track complaint status
Like/Upvote issues to increase priority
Receive notifications
Earn points, badges, and awards for genuine reports

The government can:

Verify complaints
Assign issues to departments
Update complaint status
Receive priority notifications
Detect fake reports
Warn or ban users who repeatedly submit false information

## 6. Core Entities / Database Tables
Citizen
Issue Report
Location
Department
Admin
Like / Upvote
Notification
Reward / Points
Badge
Complaint Status

## 7. User Roles & Permissions
Citizen
Register/Login
Report issues
Upload photos
Like/Upvote
Track status
View rewards
Admin
Verify reports
Assign departments
Update status
Send notifications
Manage users
Warn/Ban fake reporters
Department Officer
View assigned complaints
Update work progress
Resolve complaints

## 8. Success Criteria

The project is successful if users can:

Report an issue in less than 2 minutes
Upload an image successfully
Select the location using Google Maps
Track complaint status in real time
Receive notifications when the status changes
Increase issue priority through community upvotes
Earn rewards for genuine contributions
Reduce fake reports through the warning and ban system

## 9. Out of Scope

The project will NOT include:

Automatic road repair scheduling
Live CCTV monitoring
AI-based image recognition for issue detection (future enhancement)
Direct integration with government databases
Online payment services
Emergency ambulance or police dispatch

## 10. Chosen Track

Python – Flask (Backend)
Frontend: HTML, CSS, JavaScript, Bootstrap/Tailwind CSS
Database: MySQL
Cloud Deployment: Render / Firebase
Maps: Google Maps API
Version Control: Git & GitHub